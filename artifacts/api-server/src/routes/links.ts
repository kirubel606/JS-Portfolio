import { Router } from "express";
import { db } from "@workspace/db";
import { featuredLinksTable } from "@workspace/db";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/links", async (req, res) => {
  try {
    const links = await db.select().from(featuredLinksTable).orderBy(featuredLinksTable.createdAt);
    res.json(links);
  } catch (err) {
    req.log.error({ err }, "Failed to fetch links");
    res.status(500).json({ error: "Failed to fetch links" });
  }
});

router.post("/links", async (req, res) => {
  const { title, description, url } = req.body;

  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "A valid url is required." });
  }

  try {
    const [inserted] = await db.insert(featuredLinksTable).values({
      title: title || "Google Drive Link",
      description: description || "Featured portfolio item",
      url,
    }).returning();
    const all = await db.select().from(featuredLinksTable).orderBy(featuredLinksTable.createdAt);
    return res.status(201).json(all);
  } catch (err) {
    req.log.error({ err }, "Failed to insert link");
    return res.status(500).json({ error: "Failed to save link." });
  }
});

router.put("/links", async (req, res) => {
  const { id, title, description, url } = req.body;

  if (!id) {
    return res.status(400).json({ error: "id is required." });
  }
  if (!url || !isValidUrl(url)) {
    return res.status(400).json({ error: "A valid url is required." });
  }

  try {
    const result = await db.update(featuredLinksTable)
      .set({ title: title || "Google Drive Link", description: description || "", url })
      .where(eq(featuredLinksTable.id, id))
      .returning();

    if (result.length === 0) {
      return res.status(404).json({ error: "Link not found." });
    }

    const all = await db.select().from(featuredLinksTable).orderBy(featuredLinksTable.createdAt);
    return res.status(200).json(all);
  } catch (err) {
    req.log.error({ err }, "Failed to update link");
    return res.status(500).json({ error: "Failed to update link." });
  }
});

router.delete("/links", async (req, res) => {
  const id = req.query.id as string;

  if (!id) {
    return res.status(400).json({ error: "id is required." });
  }

  try {
    await db.delete(featuredLinksTable).where(eq(featuredLinksTable.id, id));
    const all = await db.select().from(featuredLinksTable).orderBy(featuredLinksTable.createdAt);
    return res.status(200).json(all);
  } catch (err) {
    req.log.error({ err }, "Failed to delete link");
    return res.status(500).json({ error: "Failed to delete link." });
  }
});

function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

export default router;
