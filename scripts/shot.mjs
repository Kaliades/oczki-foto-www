import { chromium } from '@playwright/test'
import { mkdir } from 'fs/promises'

const URL = process.env.SHOT_URL || 'http://localhost:3000/galeria'
const OUT = process.env.SHOT_DIR || '/tmp/shots'
const widths = [360, 768, 1366, 1920]

await mkdir(OUT, { recursive: true })
const browser = await chromium.launch()
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 900 } })
  await page.goto(URL, { waitUntil: 'networkidle', timeout: 60000 })
  await page.waitForTimeout(800)
  await page.screenshot({ path: `${OUT}/${width}.png`, fullPage: true })
  console.log(`shot ${width} -> ${OUT}/${width}.png`)
  await page.close()
}
await browser.close()
