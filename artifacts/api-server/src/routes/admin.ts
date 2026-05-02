import { Router } from "express";
import { createHmac } from "node:crypto";

const ADMIN_USERNAME = "kirubel606";
const ADMIN_PASSWORD = "Kirubel@123";

const router = Router();

export function computeToken(): string {
  return createHmac("sha256", `${ADMIN_USERNAME}:${ADMIN_PASSWORD}`)
    .update("admin-session-v1")
    .digest("hex");
}

export function verifyAuthHeader(authHeader: string | undefined): boolean {
  if (!authHeader?.startsWith("Bearer ")) return false;
  return authHeader.slice(7) === computeToken();
}

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  return res.status(200).json({ token: computeToken() });
});

export default router;
