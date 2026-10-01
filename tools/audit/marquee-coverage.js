const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  for (const [w, h, mobile] of [[1920, 1080, false], [3440, 1440, false], [390, 844, true]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: mobile });
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => sessionStorage.setItem("rafgym-intro", "1"));
    await page.reload({ waitUntil: "networkidle2" });
    await sleep(800);
    const res = await page.evaluate(() => {
      const track = document.querySelector('[class*="marquee_"]');
      const anim = track.getAnimations()[0];
      const dur = anim.effect.getTiming().duration;
      const out = [];
      for (const f of [0, 0.25, 0.5, 0.75, 0.9999]) {
        anim.pause(); anim.currentTime = dur * f;
        const r = track.getBoundingClientRect();
        // the band is scaled 1.05 and rotated; require the track to cover the full viewport width
        out.push({ f, left: Math.round(r.left), right: Math.round(r.right), covers: r.left <= 0 && r.right >= innerWidth });
      }
      return { vw: innerWidth, trackW: Math.round(track.scrollWidth), out };
    });
    console.log(`${w}px`, JSON.stringify(res));
    if (w === 1920) {
      await page.evaluate(() => { const t = document.querySelector('[class*="marquee_"]'); const a = t.getAnimations()[0]; a.pause(); a.currentTime = a.effect.getTiming().duration * 0.5; window.scrollTo(0, 760); });
      await sleep(400);
      await page.screenshot({ path: OUT + "/marquee_1920.png" });
    }
    await page.close();
  }
  await browser.close();
})();
