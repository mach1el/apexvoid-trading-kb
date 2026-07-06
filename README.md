# 📈 ApexVoid Trading Platform

![React](https://img.shields.io/badge/React-19-%2320232a.svg?style=flat-square&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-6-%23007ACC.svg?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-%23646CFF.svg?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-%2338B2AC.svg?style=flat-square&logo=tailwind-css&logoColor=white)
![MDX](https://img.shields.io/badge/MDX-content-%23f9ac00.svg?style=flat-square&logo=mdx&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-behind%20ingress-%230db7ed.svg?style=flat-square&logo=docker&logoColor=white)

The frontend application for the ApexVoid Trading ecosystem. Today this repository
houses the **Trading Knowledge Base (KB)** — a documentation site covering
foundations, Dow Theory, Wyckoff, market structure, price action, order blocks,
SMC, ICT, momentum/EMAs, volatility, key levels, confluence, strategies and risk
management. Each lesson is authored in **MDX** and can embed interactive React
widgets (charts, simulators, quizzes).

The `src/features/*` layout is deliberately feature-based so the app can grow
beyond the KB without reshuffling existing code.

> ⚠️ **Disclaimer**: Educational material only — not financial advice.

---

## 🛠️ Tech Stack

- ⚡ **Vite 8** + ⚛️ **React 19** + 📘 **TypeScript 6** (strict, `tsc -b`)
- 🎨 **Tailwind CSS v4** via `@tailwindcss/vite`
- 🛣️ **React Router v7** (`react-router-dom`) for client-side routing
- 📝 **MDX** (`@mdx-js/rollup`) with `remark-gfm`, `remark-frontmatter`,
  `remark-mdx-frontmatter` for lesson content
- 📈 **lightweight-charts** for the chart-based widgets
- 🔍 **Fuse.js** for the client-side ⌘K search
- 🧹 **oxlint** for linting

## 💻 Local Development

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server
npm run build     # type-check (tsc -b) + production build to dist/
npm run preview   # preview the production build
npm run lint      # oxlint
```

## 📂 Project Structure

Feature-based architecture: each domain lives under `src/features/`, with
generic building blocks in `src/shared/`.

```text
apexvoid-trading/
├── public/                 # favicon.svg, icons.svg
├── src/
│   ├── assets/             # hero image, static art
│   ├── features/
│   │   └── kb/             # the Knowledge Base feature
│   │       ├── components/ # ~35 interactive widgets (charts, sims, quizzes, calculators)
│   │       ├── content/    # MDX lessons grouped by topic
│   │       │               #   nav.ts (sidebar tree) + chartRegistry.ts (widget registry)
│   │       └── layouts/     # AppShell, MdxLayout, Sidebar, SearchDialog
│   ├── shared/
│   │   ├── components/     # Callout, ConceptCard, CompareTable, StepFlow, KeyTakeaways…
│   │   ├── lib/            # generic utilities
│   │   └── types/          # mdx.d.ts and shared types
│   ├── App.tsx             # root app + routing
│   ├── main.tsx            # entry point
│   └── index.css           # Tailwind entry
├── Dockerfile              # node:22 build → nginx:alpine runtime
├── nginx.conf              # SPA fallback, gzip, asset caching, /_health
├── docker-compose.yml      # joins the external `routing` network, expose 80
├── routing-snippet.md      # ingress integration guide (mach1el/routing)
├── content-standards.md    # authoring guide for MDX lessons
└── vite.config.ts
```

### KB content topics

`src/features/kb/content/` groups lessons by framework:

`start-here` · `foundations` · `dow-theory` · `wyckoff` · `price-action` ·
`support-resistance` · `key-levels` · `order-block` · `smc` · `ict` ·
`momentum` · `volatility` · `divergence` · `confluence` · `strategies` ·
`risk-management` · `gold-context` · `together`

See [content-standards.md](./content-standards.md) before adding or editing lessons.

## 🐳 Docker

### Standalone

```bash
docker build -t apexvoid-trading-frontend .
docker run -p 8080:80 apexvoid-trading-frontend   # http://localhost:8080
```

The image is a two-stage build: `node:22-alpine` compiles the bundle, then
`nginx:alpine` serves the static `dist/` with SPA fallback and a `/_health`
endpoint.

### Behind the central ingress

In production the app runs on the shared host behind the central Nginx ingress
([`mach1el/routing`](https://github.com/mach1el/routing)). The container exposes
port `80` **internally only** and joins the external `routing` Docker network —
no host port is published.

```bash
# 1. Start the router first so the shared network exists
docker compose -f ../routing/docker-compose.yml up -d

# 2. Start this app
docker compose up -d --build
```

The ingress terminates TLS and proxies `trading.apexvoid.net/` →
`apexvoid-trading-frontend:80`.

### ⚙️ Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `TRADING_HOST` | `trading.apexvoid.net` | Public hostname for the site (used by the ingress) |

## 🔗 Routing Integration

This app is one upstream in the central ingress. Live route:

| Host | Path | Upstream |
|------|------|----------|
| `trading.apexvoid.net` | `/` | `apexvoid-trading-frontend:80` |

The Nginx server block and cert bootstrap steps live in
[routing-snippet.md](./routing-snippet.md). Host names, TLS and the route table
are owned by the `mach1el/routing` repo — do not add ingress config here.

## 📜 License

MIT
