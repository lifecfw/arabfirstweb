import { getApp } from "../artifacts/api-server/dist/handler.mjs";

let cachedApp = null;

export default async function handler(req, res) {
  if (!cachedApp) {
    cachedApp = await getApp();
  }
  cachedApp(req, res);
}
