import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const DATA_FILE = path.join(process.cwd(), 'data', 'featured-links.json');

async function readLinks() {
  try {
    const raw = await fs.readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeLinks(links) {
  await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(links, null, 2), 'utf8');
}

function normalizeLink(item, index) {
  return {
    id: item.id || `link-${Date.now()}-${index}`,
    title: item.title || 'Google Drive Link',
    description: item.description || 'Featured portfolio item',
    url: item.url || item.link || item.driveUrl
  };
}

function parseJsonBody(req) {
  if (!req.body) return {};
  if (typeof req.body === 'string') {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }
  return req.body;
}

function isValidUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

function getIdFromRequest(req, body) {
  const queryId = req.query?.id;
  if (typeof queryId === 'string' && queryId.trim()) return queryId.trim();
  if (Array.isArray(queryId) && queryId[0]) return String(queryId[0]).trim();
  if (typeof body?.id === 'string' && body.id.trim()) return body.id.trim();
  return '';
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const links = await readLinks();
    return res.status(200).json(links.map(normalizeLink));
  }

  if (req.method === 'POST') {
    const body = parseJsonBody(req);
    const normalized = normalizeLink(body, 0);

    if (!normalized.url || !isValidUrl(normalized.url)) {
      return res.status(400).json({ error: 'A valid url is required.' });
    }

    try {
      const current = await readLinks();
      const next = [{ ...normalized, id: `link-${Date.now()}` }, ...current];
      await writeLinks(next);
      return res.status(201).json(next);
    } catch {
      return res.status(500).json({
        error: 'Unable to save link in this environment. Edit data/featured-links.json directly.'
      });
    }
  }

  if (req.method === 'PUT') {
    const body = parseJsonBody(req);
    const id = getIdFromRequest(req, body);
    const normalized = normalizeLink(body, 0);

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    if (!normalized.url || !isValidUrl(normalized.url)) {
      return res.status(400).json({ error: 'A valid url is required.' });
    }

    try {
      const current = await readLinks();
      const index = current.findIndex((item) => item.id === id);
      if (index < 0) {
        return res.status(404).json({ error: 'Link not found.' });
      }

      current[index] = { ...normalized, id };
      await writeLinks(current);
      return res.status(200).json(current.map(normalizeLink));
    } catch {
      return res.status(500).json({
        error: 'Unable to update link in this environment. Edit data/featured-links.json directly.'
      });
    }
  }

  if (req.method === 'DELETE') {
    const body = parseJsonBody(req);
    const id = getIdFromRequest(req, body);

    if (!id) {
      return res.status(400).json({ error: 'id is required.' });
    }

    try {
      const current = await readLinks();
      const next = current.filter((item) => item.id !== id);
      await writeLinks(next);
      return res.status(200).json(next.map(normalizeLink));
    } catch {
      return res.status(500).json({
        error: 'Unable to delete link in this environment. Edit data/featured-links.json directly.'
      });
    }
  }

  res.setHeader('Allow', 'GET, POST, PUT, DELETE');
  return res.status(405).json({ error: 'Method Not Allowed' });
}
