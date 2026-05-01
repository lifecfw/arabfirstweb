import { Router, type IRouter, type Request, type Response } from "express";
import {
  RequestVerificationCodeBody,
  RequestVerificationCodeResponse,
  VerifyCodeBody,
  VerifyCodeResponse,
  GetCurrentUserResponse,
  LogoutResponse,
} from "@workspace/api-zod";
import {
  findGuildMemberByUsername,
  sendVerificationDm,
  DiscordDmError,
  getUserById,
} from "../lib/discord";
import {
  issueCode,
  consumeCode,
  CodeRateLimitError,
  CODE_TTL_SECONDS,
} from "../lib/codes";
import {
  createSession,
  destroySession,
  getSession,
  updateSessionUser,
  SESSION_COOKIE_NAME,
  SESSION_COOKIE_MAX_AGE_MS,
} from "../lib/sessions";

const router: IRouter = Router();

function sendError(res: Response, status: number, error: string, message: string) {
  res.status(status).json({ error, message });
}

router.post("/auth/request-code", async (req: Request, res: Response) => {
  const parsed = RequestVerificationCodeBody.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, 400, "invalid_request", "اسم المستخدم غير صالح");
  }
  const { discordUsername } = parsed.data;

  try {
    const member = await findGuildMemberByUsername(discordUsername);
    if (!member) {
      return sendError(res, 404, "user_not_found", "لم نجد مستخدم ديسكورد بهذا الاسم في السيرفر");
    }

    const issued = await issueCode(member);

    try {
      await sendVerificationDm(member.id, issued.code);
    } catch (err) {
      if (err instanceof DiscordDmError && err.code === "dm_blocked") {
        return sendError(res, 403, "dm_blocked", "البوت لا يستطيع إرسال رسالة خاصة لك. تأكد من تفعيل الرسائل الخاصة من أعضاء السيرفر");
      }
      throw err;
    }

    const body = RequestVerificationCodeResponse.parse({
      ok: true,
      expiresInSeconds: issued.expiresInSeconds,
      discordUsername: member.username,
    });

    void CODE_TTL_SECONDS;
    return res.json(body);
  } catch (err) {
    if (err instanceof CodeRateLimitError) {
      res.setHeader("Retry-After", String(err.retryAfterSeconds));
      return sendError(res, 429, "rate_limited", `الرجاء الانتظار ${err.retryAfterSeconds} ثانية قبل طلب رمز جديد`);
    }
    req.log.error({ err }, "request-code failed");
    return sendError(res, 500, "internal_error", "حدث خطأ غير متوقع");
  }
});

router.post("/auth/verify-code", async (req: Request, res: Response) => {
  const parsed = VerifyCodeBody.safeParse(req.body);
  if (!parsed.success) {
    return sendError(res, 400, "invalid_request", "البيانات غير صالحة");
  }
  const { discordUsername, code } = parsed.data;

  const user = await consumeCode(discordUsername, code);
  if (!user) {
    return sendError(res, 401, "invalid_code", "الرمز غير صحيح أو منتهي الصلاحية");
  }

  const cookie = createSession(user);
  res.cookie(SESSION_COOKIE_NAME, cookie, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env["NODE_ENV"] === "production",
    maxAge: SESSION_COOKIE_MAX_AGE_MS,
    path: "/",
  });

  const body = VerifyCodeResponse.parse(user);
  return res.json(body);
});

router.get("/auth/me", async (req: Request, res: Response) => {
  const cookie = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  const user = getSession(cookie);
  if (!user) {
    return sendError(res, 401, "unauthenticated", "غير مسجل الدخول");
  }
  try {
    const fresh = await getUserById(user.id);
    if (fresh) {
      updateSessionUser(cookie, fresh);
      const body = GetCurrentUserResponse.parse(fresh);
      return res.json(body);
    }
  } catch (err) {
    req.log.warn({ err }, "auth/me refresh failed, returning cached user");
  }
  const body = GetCurrentUserResponse.parse(user);
  return res.json(body);
});

router.post("/auth/logout", (req: Request, res: Response) => {
  const cookie = req.cookies?.[SESSION_COOKIE_NAME] as string | undefined;
  destroySession(cookie);
  res.clearCookie(SESSION_COOKIE_NAME, { path: "/" });
  const body = LogoutResponse.parse({ ok: true });
  return res.json(body);
});

export default router;
