const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const fs = require("fs");
const out = OUT;
const mobile = process.argv[2] === "mobile";
const tag = mobile ? "m" : "d";
const ids = ["servicii", "orar", "galerie", "abonamente", "antrenori", "recenzii", "program", "contact"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu", "--autoplay-policy=no-user-gesture-required"] });
  const page = await browser.newPage();
  await page.setViewport(mobile ? { width: 390, height: 844, isMobile: true } : { width: 1280, height: 800 });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text().slice(0, 200)));
  page.on("requestfailed", (r) => errors.push("reqfailed: " + r.url().slice(0, 100)));
  const t0 = Date.now();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  if (!mobile) for (const [i, t] of [600, 1500, 2500].entries()) { await sleep(Math.max(0, t - (Date.now() - t0))); await page.screenshot({ path: `${out}/${tag}_intro${i}.png` }); }
  await sleep(5000);
  await page.screenshot({ path: `${out}/${tag}_hero.png` });
  const total = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < total; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await sleep(50); }
  await page.evaluate(() => window.scrollTo(0, 780)); await sleep(1300);
  await page.screenshot({ path: `${out}/${tag}_marquee.png` });
  for (const id of ids) {
    await page.evaluate((id) => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + scrollY + 20); }, id);
    await sleep(2200);
    await page.screenshot({ path: `${out}/${tag}_${id}.png` });
  }
  await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await sleep(1500);
  await page.screenshot({ path: `${out}/${tag}_footer.png` });
  console.log("overflow-x:", await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), "height:", total);
  console.log(errors.length ? [...new Set(errors)].join("\n") : "no errors");
  await browser.close();
})();
