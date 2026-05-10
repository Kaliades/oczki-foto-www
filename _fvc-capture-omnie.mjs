// Capture per-section screenshots of /test/v2/o-mnie at 1366x900 viewport
import { chromium } from '/Users/simon/Workspace/oczki-foto-www/node_modules/.pnpm/playwright@1.58.2/node_modules/playwright/index.mjs';

const URL = 'http://localhost:3000/test/v2/o-mnie';
const OUT = '/tmp/claude-501/oczki-figma-vs-chrome/o-mnie';
const SECTIONS = [
  { n: 1,  slug: 'OMnieNavbar' },
  { n: 2,  slug: 'OMnieHero' },
  { n: 3,  slug: 'OMnieManifest' },
  { n: 4,  slug: 'OMnieSesjaJakSpotkanie' },
  { n: 5,  slug: 'OMnieKompetencje' },
  { n: 6,  slug: 'OMnieFullWidthImage' },
  { n: 7,  slug: 'OMnieDuet' },
  { n: 8,  slug: 'OMnieKroki' },
  { n: 9,  slug: 'OMnieInstagram' },
  { n: 10, slug: 'OMnieCtaSection' },
  { n: 11, slug: 'OMnieFooterNewsletter' },
];

const browser = await chromium.launch({
  executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
});
const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

// Count children of <main>
const mainChildCount = await page.evaluate(() => {
  const m = document.querySelector('main');
  return m ? m.children.length : 0;
});
console.log('main children count:', mainChildCount);

for (const s of SECTIONS) {
  const idx = s.n - 1;
  // Scroll to top - 20
  await page.evaluate((i) => {
    const m = document.querySelector('main');
    if (!m || !m.children[i]) return null;
    const r = m.children[i].getBoundingClientRect();
    const top = r.top + window.scrollY - 20;
    window.scrollTo({ top, behavior: 'instant' });
    return { rectTop: r.top, scrollTo: top, height: r.height, tag: m.children[i].tagName };
  }, idx);
  await page.waitForTimeout(1000); // lazy-load
  const padded = String(s.n).padStart(2, '0');
  const path = `${OUT}/chrome-${padded}-${s.slug}.png`;
  await page.screenshot({ path, fullPage: false, type: 'png' });
  console.log('saved', path);
}

await browser.close();
console.log('done');
