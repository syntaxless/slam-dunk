// Renders tools/og.html to og.png (1200x630) for the og:image / twitter:image link preview.
// Usage: node tools/og.js   (needs Playwright with Chromium, and network for Google Fonts)
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.goto('file://' + path.join(__dirname, 'og.html'), { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.screenshot({ path: path.join(__dirname, '..', 'og.png') });
  await b.close();
})();
