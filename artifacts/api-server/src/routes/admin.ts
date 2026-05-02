import { Router } from "express";
import { createHmac } from "node:crypto";

const router = Router();

export function computeToken(username: string, password: string): string {
  const secret = `${username}:${password}`;
  return createHmac("sha256", secret).update("admin-session-v1").digest("hex");
}

export function verifyAuthHeader(authHeader: string | undefined): boolean {
  const username = process.env["ADMIN_USERNAME"];
  const password = process.env["ADMIN_PASSWORD"];

  if (!username || !password) return false;
  if (!authHeader?.startsWith("Bearer ")) return false;

  const token = authHeader.slice(7);
  const expected = computeToken(username, password);
  return token === expected;
}

router.post("/admin/login", (req, res) => {
  const { username, password } = req.body as { username?: string; password?: string };

  const envUser = process.env["ADMIN_USERNAME"];
  const envPass = process.env["ADMIN_PASSWORD"];

  if (!envUser || !envPass) {
    return res.status(500).json({ error: "Admin credentials not configured." });
  }

  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required." });
  }

  if (username !== envUser || password !== envPass) {
    return res.status(401).json({ error: "Invalid username or password." });
  }

  const token = computeToken(envUser, envPass);
  return res.status(200).json({ token });
});

export default router;
