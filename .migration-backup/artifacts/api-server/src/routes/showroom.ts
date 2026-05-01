// ============================================
// Showroom proxy route
// Forwards car/house/gas-station/grocery purchase events from the AFMOD website
// to the AFMOD bot, which performs all in-game actions (bank deduction, etc).
// ============================================
import { Router, type IRouter, type Request, type Response } from "express";
import { getSession, SESSION_COOKIE_NAME } from "../lib/sessions";
import { logger } from "../lib/logger";

const router: IRouter = Router();

const BOT_BASE_URL = process.env.AFMOD_BOT_URL || "";
const BOT_API_KEY  = process.env.AFMOD_BOT_API_KEY || "";

function requireUser(req: Request, res: Response): { userId: string; username: string; displayName: string } | null {
  const cookies = req.cookies as Record<string, string> | undefined;
  const sessionId = cookies?.[SESSION_COOKIE_NAME];
  if (!sessionId) {
    res.status(401).json({ error: "unauthorized", message: "Not signed in" });
    return null;
  }
  const user = getSession(sessionId);
  if (!user) {
    res.status(401).json({ error: "unauthorized", message: "Session expired" });
    return null;
  }
  return { userId: user.id, username: user.username, displayName: user.displayName };
}

async function forwardToBot(path: string, body: unknown) {
  if (!BOT_BASE_URL || !BOT_API_KEY) {
    return { ok: false as const, status: 503, message: "Bot not configured" };
  }
  try {
    const res = await fetch(BOT_BASE_URL.replace(/\/$/, "") + path, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-AFMOD-API-Key": BOT_API_KEY },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(10_000),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    logger.error({ err, path }, "Failed to reach AFMOD bot");
    return { ok: false as const, status: 503, message: "Bot unreachable" };
  }
}

async function getFromBot(path: string) {
  if (!BOT_BASE_URL || !BOT_API_KEY) {
    return { ok: false as const, status: 503, message: "Bot not configured" };
  }
  try {
    const res = await fetch(BOT_BASE_URL.replace(/\/$/, "") + path, {
      method: "GET",
      headers: { "X-AFMOD-API-Key": BOT_API_KEY },
      signal: AbortSignal.timeout(8_000),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    logger.error({ err, path }, "Failed to reach AFMOD bot");
    return { ok: false as const, status: 503, message: "Bot unreachable" };
  }
}

// ── Balance ─────────────────────────────────────────────────────────────────
router.get("/showroom/balance", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const result = await getFromBot(`/afmod/balance/${user.userId}`);
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: "message" in result ? result.message : "Failed" });
    return;
  }
  res.json(result.data);
});

// ── Buy car ─────────────────────────────────────────────────────────────────
router.post("/showroom/buy-car", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const carId = typeof req.body?.carId === "string" ? req.body.carId : "";
  if (!carId) { res.status(400).json({ error: "bad_request", message: "carId is required" }); return; }
  const result = await forwardToBot("/afmod/buy-car", {
    carId, userId: user.userId, username: user.username, displayName: user.displayName,
  });
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: ("message" in result && result.message) || "Bot rejected the purchase" });
    return;
  }
  res.json({ ok: true, ...(result.data || {}) });
});

// ── Buy house ────────────────────────────────────────────────────────────────
router.post("/showroom/buy-house", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const houseId = typeof req.body?.houseId === "string" ? req.body.houseId : "";
  if (!houseId) { res.status(400).json({ error: "bad_request", message: "houseId is required" }); return; }
  const result = await forwardToBot("/afmod/buy-house", {
    houseId, userId: user.userId, username: user.username, displayName: user.displayName,
  });
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: ("message" in result && result.message) || "Bot rejected the purchase" });
    return;
  }
  res.json({ ok: true, ...(result.data || {}) });
});

// ── Buy gas station (project) ────────────────────────────────────────────────
router.post("/showroom/buy-gas-station", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const stationId = typeof req.body?.stationId === "string" ? req.body.stationId : "";
  if (!stationId) { res.status(400).json({ error: "bad_request", message: "stationId is required" }); return; }
  const result = await forwardToBot("/afmod/buy-gas-station", {
    stationId, userId: user.userId, username: user.username, displayName: user.displayName,
  });
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: ("message" in result && result.message) || "Bot rejected the purchase" });
    return;
  }
  res.json({ ok: true, ...(result.data || {}) });
});

// ── My Properties ────────────────────────────────────────────────────────────
router.get("/showroom/my-properties", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const result = await getFromBot(`/afmod/my-properties/${user.userId}`);
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: "message" in result ? result.message : "Failed" });
    return;
  }
  res.json(result.data);
});

// ── Buy grocery store ────────────────────────────────────────────────────────
router.post("/showroom/buy-grocery", async (req, res) => {
  const user = requireUser(req, res);
  if (!user) return;
  const stationId = typeof req.body?.stationId === "string" ? req.body.stationId : "";
  if (!stationId) { res.status(400).json({ error: "bad_request", message: "stationId is required" }); return; }
  const result = await forwardToBot("/afmod/buy-grocery", {
    stationId, userId: user.userId, username: user.username, displayName: user.displayName,
  });
  if (!result.ok) {
    res.status(result.status).json({ error: "bot_error", message: ("message" in result && result.message) || "Bot rejected the purchase" });
    return;
  }
  res.json({ ok: true, ...(result.data || {}) });
});

export default router;
