# 📈 ApexVoid Trading Knowledge Base

![React](https://img.shields.io/badge/react-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white)

A comprehensive trading knowledge documentation site built with React, TypeScript, and Tailwind CSS. The curriculum covers foundational Dow Theory, market structure, price action, order blocks, SMC, ICT concepts, and advanced confluence analysis.

> ⚠️ **Disclaimer**: This is educational material only — not financial advice.

---

## 🛠️ Tech Stack

- ⚡ **Vite** + ⚛️ **React 18** + 📘 **TypeScript** (strict mode)
- 🎨 **Tailwind CSS** v4 for styling
- 🛣️ **React Router v6** for client-side routing
- 📝 **MDX** for content authoring with embedded React components
- 🔍 **Fuse.js** for fast client-side search (⌘K)

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🐳 Docker

### Standalone

```bash
docker build -t apexvoid-trading-frontend .
docker run -p 8080:80 apexvoid-trading-frontend
```

### With Routing Infrastructure

The app is designed to run behind the central Nginx ingress (`mach1el/routing`).

```bash
# 1. Make sure the routing network exists (start the router first)
cd /path/to/routing
docker compose up -d

# 2. Start this app
cd /path/to/apexvoid-trading-kb
docker compose up -d --build
```

The container:
- 🔒 Exposes port `80` internally (no host port mapping)
- 🌐 Joins the external `routing` Docker network
- 🚀 Serves the static `dist/` bundle via `nginx:alpine`
- 🩺 Includes `/_health` endpoint returning 200
- 🔄 SPA fallback via `try_files $uri $uri/ /index.html`

### ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TRADING_HOST` | `trading.apexvoid.net` | Target hostname for the site |

## 🔗 Routing Integration

See [routing-snippet.md](./routing-snippet.md) for the Nginx config block and instructions to add to the `mach1el/routing` repo.

## 📂 Project Structure

```
src/
├── components/     # Reusable pedagogical components
├── content/        # MDX pages + nav.ts (source of truth for sidebar & routes)
├── layouts/        # AppShell, Sidebar, SearchDialog
├── lib/            # Utilities
└── types/          # TypeScript declarations
```

## 📜 License

MIT
