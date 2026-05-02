import { Router } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import { verifyAuthHeader } from "./admin.js";

const router = Router();

const DATA_FILE = path.join(process.cwd(), "data", "about-data.json");

async function readAbout(): Promise<any> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

async function writeAbout(data: any): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

function requireAuth(req: any, res: any): boolean {
  if (!verifyAuthHeader(req.headers["authorization"])) {
    res.status(401).json({ error: "Unauthorized." });
    return false;
  }
  return true;
}

router.get("/about", async (req, res) => {
  try {
    const data = await readAbout();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch about data." });
  }
});

router.put("/about", async (req, res) => {
  if (!requireAuth(req, res)) return;
  try {
    await writeAbout(req.body);
    res.json(req.body);
  } catch (err) {
    res.status(500).json({ error: "Failed to save about data." });
  }
});

export default router;
