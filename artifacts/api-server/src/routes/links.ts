import { Router } from "express";
import { promises as fs } from "node:fs";
import path from "node:path";
import { verifyAuthHeader } from "./admin.js";

const router = Router();

const DATA_FILE = path.join(process.cwd(), "data", "featured-links.json");

interface LinkItem {
  id: string;
  title: string;
  description: string;
  url: string;
}

async function readLinks(): Promise<LinkItem[]> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLinks(links: LinkItem[]): Promise<void> {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2), "utf8");
}

function normalizeLink(item: Partial<LinkItem>, index: number): LinkItem {
  return {
    id: item.id || `link-${Date.now()}-${index}`,
    title: item.title || "Google Drive Link",
    description: item.description || "Featured portfolio item",
    url: item.url || "",
  };
}

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function requireAuth(req: any, res: any): boolean {
  if (!verifyAuthHeader(req.headers["authorization"])) {
    res.status(401).json({ error: "Unauthorized." });
    return false;
  }
  return true;
}

router.get("/links", async (req, res) => {
  try {
    const links = await readLinks();
    res.json(links.map(normalizeLink));
  } catch (err) {
    req.log.error({ err }, "Failed to fetch links");
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

router.post("/links", async (req, res) => {
  if (!requireAuth(req, res)) return;

  const { title, description, url } = req.body as Partial<LinkItem>;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "A valid url is required." });
  }

  try {
    const current = await readLinks();
    const newItem = normalizeLink({ title, description, url, id: `link-${Date.now()}` }, 0);
    const next = [newItem, ...current];
    await writeLinks(next);
    return res.status(201).json(next);
  } catch (err) {
    req.log.error({ err }, "Failed to save link");
    return res.status(500).json({ error: "Failed to save link." });
  }
});

router.put("/links", async (req, res) => {
  if (!requireAuth(req, res)) return;

  const { id, title, description, url } = req.body as Partial<LinkItem>;

  if (!id) {
    return res.status(400).json({ error: "id is required." });
  }
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "A valid url is required." });
  }

  try {
    const current = await readLinks();
    const index = current.findIndex((item) => item.id === id);
    if (index < 0) {
      return res.status(404).json({ error: "Link not found." });
    }
    current[index] = normalizeLink({ id, title, description, url }, 0);
    await writeLinks(current);
    return res.status(200).json(current);
  } catch (err) {
    req.log.error({ err }, "Failed to update link");
    return res.status(500).json({ error: "Failed to update link." });
  }
});

router.delete("/links", async (req, res) => {
  if (!requireAuth(req, res)) return;

  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "id is required." });
  }

  try {
    const current = await readLinks();
    const next = current.filter((item) => item.id !== id);
    await writeLinks(next);
    return res.status(200).json(next);
  } catch (err) {
    req.log.error({ err }, "Failed to delete link");
    return res.status(500).json({ error: "Failed to delete link." });
  }
});

export default router;
