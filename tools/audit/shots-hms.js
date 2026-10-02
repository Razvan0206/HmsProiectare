// Section screenshots for the HMS demo: node shots-hms.js [mobile]
// Scrolls in small steps so scroll-driven animations settle, then shoots each section near its top.
const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });
const mobile = process.argv[2] === "mobile";
const tag = mobile ? "m" : "d";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  const page = await browser.newPage();
  await page.setViewport(mobile ? { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 } : { width: 1280, height: 800 });
  const errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
  page.on("console", (m) => m.type() === "error" && errors.push("console: " + m.text().slice(0, 200)));
  const t0 = Date.now();
  await page.goto(BASE, { waitUntil: "domcontentloaded" });
  for (const [i, t] of [250, 700, 1300].entries()) { await sleep(Math.max(0, t - (Date.now() - t0))); await page.screenshot({ path: `${OUT}/${tag}_intro${i}.png` }); }
  await sleep(2500);
  await page.screenshot({ path: `${OUT}/${tag}_hero.png` });
  const targets = [["stats", "section[aria-label='Portofoliu în cifre']"], ["marquee", ".mq"], ["servicii", "#servicii"], ["proces", "#proces"], ["proiecte", "#proiecte"], ["despre", "#despre"], ["contact", "#contact"]];
  for (const [name, sel] of targets) {
    await page.evaluate(async (sel) => {
      const el = document.querySelector(sel);
      const y = el.getBoundingClientRect().top + scrollY - 70;
      const from = scrollY, steps = 14;
      for (let i = 1; i <= steps; i++) { scrollTo(0, from + ((y - from) * i) / steps); await new Promise((r) => setTimeout(r, 40)); }
    }, sel);
    await sleep(1600);
    await page.screenshot({ path: `${OUT}/${tag}_${name}.png` });
  }
  await page.goto(BASE + "proiecte/casa-h", { waitUntil: "networkidle0" });
  await sleep(1500);
  await page.screenshot({ path: `${OUT}/${tag}_detail.png` });
  console.log("overflow-x:", await page.evaluate(() => document.documentElement.scrollWidth > innerWidth));
  console.log(errors.length ? [...new Set(errors)].join("\n") : "no errors");
  await browser.close();
})();
