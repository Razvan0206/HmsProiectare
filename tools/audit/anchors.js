const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  for (const [w, h] of [[1280, 800], [390, 844]]) {
    const page = await browser.newPage();
    await page.setViewport({ width: w, height: h, isMobile: w < 500 });
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("rafgym-intro", "1"));
    await page.goto(BASE, { waitUntil: "networkidle2" });
    const res = [];
    for (const id of ["servicii", "galerie", "abonamente", "antrenori", "recenzii", "program", "contact"]) {
      await page.evaluate((id) => { document.querySelector(`a[href="#${id}"]`) ? document.querySelector(`a[href="#${id}"]`).click() : (location.hash = id); }, id);
      await sleep(1600);
      const r = await page.evaluate((id) => {
        const s = document.getElementById(id); const t = s.getBoundingClientRect().top;
        const h = s.querySelector("h2"); const ht = h ? h.getBoundingClientRect() : null;
        const op = h ? parseFloat(getComputedStyle(h.parentElement).opacity) : null; // Reveal wrapper
        return { top: Math.round(t), headingTop: ht ? Math.round(ht.top) : null, headingVisible: ht ? ht.top > 60 && ht.top < innerHeight : null, opacity: op };
      }, id);
      res.push(`${id}: sectionTop=${r.top} headingTop=${r.headingTop} opacity=${r.opacity} ${r.headingVisible ? "OK" : "HIDDEN?"}`);
    }
    console.log(`\n${w}px anchors (header is ~72px tall):\n  ` + res.join("\n  "));
    await page.close();
  }
  await browser.close();
})();
