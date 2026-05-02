import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const featuredLinksTable = pgTable("featured_links", {
  id: text("id").primaryKey().$defaultFn(() => `link-${Date.now()}-${Math.random().toString(36).slice(2)}`),
  title: text("title").notNull().default("Google Drive Link"),
  description: text("description").notNull().default(""),
  url: text("url").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export type FeaturedLink = typeof featuredLinksTable.$inferSelect;
export type InsertFeaturedLink = typeof featuredLinksTable.$inferInsert;
