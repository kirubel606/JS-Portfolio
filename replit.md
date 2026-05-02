# Kirubel Fekadu Portfolio

## Overview
A personal portfolio website built with React + Vite + Tailwind CSS (v4), featuring a neumorphic design system with light/dark theme support. Displays the developer's intro, skills, GitHub projects, and featured Google Drive portfolio items.

## Architecture
- **Frontend**: `artifacts/portfolio/` — React + Vite app with react-router-dom, tailwind v4
- **Backend**: `artifacts/api-server/` — Express API server with Drizzle ORM + PostgreSQL
- **Database**: `lib/db/` — Drizzle schema, PostgreSQL via `DATABASE_URL`

## Key Features
- Neumorphic UI (custom CSS classes: `.neumorphism`, `.neumorphism-inset`, `.featured-neumorphism`)
- Light/dark theme toggle stored in localStorage, controlled via `data-theme` attribute
- Typewriter animation on hero page (`react-simple-typewriter`)
- GitHub repos grid (live fetch from GitHub API)
- Featured links (Google Drive videos) managed via CRUD API
- Hidden admin panel at `/adgjm` for managing featured links
- Parallax tilt on project cards (`react-parallax-tilt`)

## Routes
- `/` — Hero/home page with profile photo and typewriter
- `/about` — Skills and experience
- `/projects` — GitHub repos + Featured Google Drive items
- `/contact` — Contact form
- `/adgjm` — Admin panel for featured links (CRUD)

## API
- `GET /api/links` — List featured links
- `POST /api/links` — Add featured link
- `PUT /api/links` — Update featured link (requires `id` in body)
- `DELETE /api/links?id=<id>` — Delete featured link

## Database Schema
- `featured_links` table: `id` (text PK), `title`, `description`, `url`, `created_at`

## Theming
- Light mode: `#e5e5e5` bg, `#e7e7e7` card
- Dark mode: `#2d2d2d` bg, `#2a2a2a` card
- Accent: `blue-600`
- Custom dark variant via `data-theme="dark"` attribute (not `.dark` class)
