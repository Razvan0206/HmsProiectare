const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const fs = require("fs");
const out = OUT;
fs.mkdirSync(out, { recursive: true });
const sites = { golds: "https://www.goldsgym.com/", stayfit: "https://stayfit.ro/" };

(async () => {
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--disable-gpu"],
  });
  for (const [name, url] of Object.entries(sites)) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 45000 });
    } catch (e) {
      console.log(name, "goto:", e.message);
    }
    await new Promise((r) => setTimeout(r, 3500));
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    console.log(name, "height", total, "title:", await page.title());
    for (let i = 0; i < 6; i++) {
      const y = i * 800;
      if (y > total) break;
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await new Promise((r) => setTimeout(r, 1200));
      await page.screenshot({ path: `${out}/${name}_${i}.png` });
    }
    await page.close();
  }
  await browser.close();
})();
