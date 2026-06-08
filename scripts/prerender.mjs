// Prerenders the homepage to static HTML and injects it into dist/index.html.
// Runs after `vite build` as part of `npm run build`.

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const ssrOut = path.join(root, '.ssr-build');

console.log('[prerender] building server bundle…');
execSync(
  `npx vite build --ssr src/entry-server.jsx --outDir ${path.relative(root, ssrOut)} --logLevel warn`,
  { stdio: 'inherit', cwd: root },
);

console.log('[prerender] rendering /…');
const entryPath = path.join(ssrOut, 'entry-server.js');
const url = 'file:///' + entryPath.replace(/\\/g, '/');
const { render } = await import(url);
const appHtml = render('/');

const indexPath = path.join(root, 'dist', 'index.html');
const template = readFileSync(indexPath, 'utf-8');

// Replace the splash div (and only it) with the rendered app HTML.
// Mark the root with data-prerendered so client picks hydrateRoot.
// Greedy match captures from `<div id="root">` through the last `</div>` that
// precedes `</body>` — handles the splash containing nested divs.
const replaced = template.replace(
  /<div id="root">[\s\S]*<\/div>(\s*<\/body>)/,
  `<div id="root" data-prerendered="true">${appHtml}</div>$1`,
);

if (replaced === template) {
  console.warn('[prerender] WARNING: did not find #root splash to replace; output unchanged');
}

writeFileSync(indexPath, replaced);
rmSync(ssrOut, { recursive: true, force: true });
console.log('[prerender] ✓ dist/index.html updated');
