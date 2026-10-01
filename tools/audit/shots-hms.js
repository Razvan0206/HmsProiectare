// Section screenshots for the HMS demo: node shots-hms.js [mobile]
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
  await page.goto(BASE, { waitUntil: "networkidle0" });
  await sleep(1200);
  await page.screenshot({ path: `${OUT}/${tag}_hero.png` });
  for (const id of ["servicii", "proiecte", "despre", "contact"]) {
    await page.evaluate((id) => { const el = document.getElementById(id); window.scrollTo(0, el.getBoundingClientRect().top + scrollY - 70); }, id);
    await sleep(1200);
    await page.screenshot({ path: `${OUT}/${tag}_${id}.png` });
  }
  await page.goto(BASE + "proiecte/casa-g", { waitUntil: "networkidle0" });
  await sleep(800);
  await page.screenshot({ path: `${OUT}/${tag}_detail.png` });
  console.log("home overflow-x:", await (async () => { await page.goto(BASE, { waitUntil: "networkidle0" }); return page.evaluate(() => document.documentElement.scrollWidth > innerWidth); })());
  console.log(errors.length ? [...new Set(errors)].join("\n") : "no errors");
  await browser.close();
})();
