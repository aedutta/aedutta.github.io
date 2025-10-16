# Ashmit Dutta — React/Vite Site

This repository hosts my personal site, rebuilt with React, Vite, and React Router. The app renders core pages (home, about, projects, blog, coursework) and a collection of interactive p5.js sketches wrapped in React components.

## Prerequisites

- Node.js 18+

## Install & run

```powershell
npm install
npm run dev
```

The development server runs on http://localhost:5173 and supports hot reloading.

## Build for production

```powershell
npm run build
```

Static output lands in `dist/` and is published to GitHub Pages via the existing CI workflow.

## Project layout

- `src/components` – shared layout components (header/footer, p5 wrapper, sections)
- `src/pages` – routeable pages and animation sub-pages
- `src/sketches` – p5.js sketches migrated to modular functions
- `public/assets` – static assets (PDFs, images, CNAME)

## Scripts

- `npm run dev` – start the Vite dev server
- `npm run build` – create a production build
- `npm run preview` – serve the production build locally
- `npm run lint` – run ESLint on the `src` directory

## Deployment

GitHub Actions builds the site on pushes to `main` and deploys the Vite output to GitHub Pages. Static assets in `public/` are copied to the final artifact automatically.
