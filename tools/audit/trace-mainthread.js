const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const fs = require("fs");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu"] });
  // ---- main-thread breakdown under 4x CPU
  const page = await browser.newPage();
  await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
  const cdp = await page.createCDPSession();
  await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
  await page.evaluateOnNewDocument(() => sessionStorage.setItem("rafgym-intro", "1"));
  await page.tracing.start({ path: OUT + "/trace.json", categories: ["devtools.timeline", "disabled-by-default-devtools.timeline"] });
  await page.goto(BASE, { waitUntil: "load" });
  await sleep(3000);
  await page.tracing.stop();
  await page.close();
  const t = JSON.parse(fs.readFileSync(OUT + "/trace.json", "utf8")).traceEvents;
  const agg = {};
  for (const e of t) if (e.ph === "X" && e.dur && e.dur > 3000) { const k = e.name; agg[k] = (agg[k] || 0) + e.dur / 1000; }
  const top = Object.entries(agg).filter(([k]) => !/^(RunTask|ThreadControllerImpl|RunMicrotasks)/.test(k)).sort((a, b) => b[1] - a[1]).slice(0, 12);
  console.log("main-thread ms by event (4x CPU, events >3ms):");
  for (const [k, v] of top) console.log(String(Math.round(v)).padStart(6), k);
  // biggest scripts by URL
  const scripts = {};
  for (const e of t) if ((e.name === "EvaluateScript" || e.name === "v8.compile") && e.dur) { const u = (e.args?.data?.url || e.args?.fileName || "").replace(/^https?:\/\/[^/]+/, "").slice(0, 55); if (u) scripts[u] = (scripts[u] || 0) + e.dur / 1000; }
  console.log("script eval/compile ms by file:", JSON.stringify(Object.entries(scripts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([u, v]) => [u, Math.round(v)])));

  // ---- no-JS: scroll through, then count text blocks that are still invisible
  const p2 = await browser.newPage();
  await p2.setJavaScriptEnabled(false);
  await p2.setViewport({ width: 1280, height: 800 });
  await p2.goto(BASE, { waitUntil: "load" });
  const total = await p2.evaluate(() => document.documentElement.scrollHeight);
  const stillHidden = [];
  for (let y = 0; y <= total; y += 250) { await p2.evaluate((y) => window.scrollTo(0, y), y); await sleep(30); }
  await sleep(1200);
  // now check elements in the current viewport at each stop instead: revisit and test visibility when on screen
  const hiddenWhenVisible = await (async () => {
    let bad = 0, checked = 0;
    for (let y = 0; y <= total; y += 400) {
      await p2.evaluate((y) => window.scrollTo(0, y), y); await sleep(400);
      const r = await p2.evaluate(() => {
        let bad = 0, checked = 0;
        document.querySelectorAll("h1,h2,h3,h4,p,li,dt,dd").forEach((el) => {
          const b = el.getBoundingClientRect(); if (b.bottom < 0 || b.top > innerHeight || !b.width) return;
          checked++;
          let e = el, op = 1; while (e && e !== document.body) { op *= parseFloat(getComputedStyle(e).opacity); e = e.parentElement; }
          if (op < 0.9) bad++;
        });
        return { bad, checked };
      });
      bad += r.bad; checked += r.checked;
    }
    return { bad, checked };
  })();
  console.log("NO-JS (text visible whenever it is on screen):", JSON.stringify(hiddenWhenVisible));
  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
