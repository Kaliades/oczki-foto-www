const { chromium } = require('/Users/simon/Workspace/oczki-foto-www/node_modules/.pnpm/playwright@1.58.2/node_modules/playwright');
const fs = require('fs');
const path = require('path');

const SECTIONS = [
  { n: 1, slug: 'GaleriaNavbar' },
  { n: 2, slug: 'GaleriaBreadcrumbs' },
  { n: 3, slug: 'GaleriaHero' },
  { n: 4, slug: 'GaleriaGrid' },
  { n: 5, slug: 'GaleriaOMnieTeaser' },
  { n: 6, slug: 'GaleriaFaq' },
  { n: 7, slug: 'GaleriaCallout' },
  { n: 8, slug: 'GaleriaFooterNewsletter' },
];

const OUT = '/tmp/claude-501/oczki-figma-vs-chrome/galeria';

(async () => {
  const browser = await chromium.launch({ headless: true, executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome' });
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();

  console.log('navigating');
  await page.goto('http://localhost:3000/test/v2/galeria', { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);

  // Determine bounds of each top-level <main > * in document coords.
  const bounds = await page.evaluate(() => {
    const main = document.querySelector('main');
    if (!main) return null;
    const children = Array.from(main.children);
    return children.map((el, i) => {
      const r = el.getBoundingClientRect();
      return { i, tag: el.tagName, top: r.top + window.scrollY, height: r.height };
    });
  });
  console.log('bounds:', JSON.stringify(bounds, null, 2));

  for (const sec of SECTIONS) {
    const idx = sec.n - 1;
    if (!bounds[idx]) {
      console.log(`SKIP ${sec.slug} - no element at index ${idx}`);
      continue;
    }
    const b = bounds[idx];
    const scrollY = Math.max(0, Math.floor(b.top - 20));
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(900);

    const file = path.join(OUT, `chrome-${String(sec.n).padStart(2, '0')}-${sec.slug}.png`);
    await page.screenshot({ path: file, fullPage: false });
    console.log(`saved ${file}  (top=${b.top.toFixed(0)} h=${b.height.toFixed(0)} scrollY=${scrollY})`);
  }

  await browser.close();
})();
