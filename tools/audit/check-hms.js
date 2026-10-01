// Behaviour checks for the HMS demo: anchors clear the sticky header, filter hides cards, mobile menu opens/closes.
const puppeteer = require("puppeteer-core");
const assert = require("node:assert");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  for (const [w, h, mobile] of [[1280, 800, false], [390, 844, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: mobile });
    await page.goto(BASE, { waitUntil: "networkidle0" });
    if (mobile) {
      await page.click('button[aria-label="Deschide meniul"]');
      await sleep(300);
      assert(await page.$eval("dialog", (d) => d.open), "menu opens");
    }
    for (const id of ["servicii", "proiecte", "despre", "contact"]) {
      if (mobile) { if (!(await page.$eval("dialog", (d) => d.open))) await page.click('button[aria-label="Deschide meniul"]'); await sleep(200); await page.click(`dialog a[href="/#${id}"]`); }
      else await page.click(`header nav a[href="/#${id}"]`);
      await sleep(1500);
      const { top, atEnd } = await page.$eval(`#${id}`, (s) => ({ top: Math.round(s.getBoundingClientRect().top), atEnd: scrollY + innerHeight >= document.documentElement.scrollHeight - 2 }));
      assert((top >= 0 && top <= 90) || (atEnd && top >= 0), `${w}px #${id} top=${top} (sticky header is 72px)`);
      if (mobile) assert(!(await page.$eval("dialog", (d) => d.open)), "menu closes after click");
    }
    await page.goto(BASE, { waitUntil: "networkidle0" });
    const visible = () => page.$$eval(".proj", (els) => els.filter((e) => getComputedStyle(e).display !== "none").length);
    assert.equal(await visible(), 12, "all projects shown");
    await page.evaluate(() => document.getElementById("f-locuinte").click());
    assert.equal(await visible(), 5, "5 housing projects");
    await page.evaluate(() => document.getElementById("f-interioare").click());
    assert.equal(await visible(), 3, "3 interior projects");
    await page.evaluate(() => document.getElementById("f-toate").click());
    assert.equal(await visible(), 12, "filter reset");
    console.log(`${w}px ok`);
  }
  await browser.close();
})().catch((e) => { console.error("FAIL:", e.message); process.exit(1); });
