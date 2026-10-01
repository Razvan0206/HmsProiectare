const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const fs = require("fs");
const out = OUT;
fs.mkdirSync(out, { recursive: true });
const queries = process.argv.slice(2);

(async () => {
  const all = {};
  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: "new",
    args: ["--disable-gpu"],
  });
  for (const q of queries) {
    const url = `https://api.openverse.org/v1/images/?q=${encodeURIComponent(q)}&license=cc0,pdm&page_size=20&mature=false`;
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    const data = await res.json();
    const items = (data.results || [])
      .filter((r) => (r.width || 0) >= 900)
      .slice(0, 12)
      .map((r, n) => ({ n, url: r.url, w: r.width, h: r.height, provider: r.provider, title: r.title }));
    all[q] = items;
    const html = `<body style="margin:0;background:#222;display:grid;grid-template-columns:repeat(4,340px);gap:6px;padding:6px">${items
      .map((it) => `<div style="position:relative;width:340px;height:240px;background:#000"><img src="${it.url}" style="width:340px;height:240px;object-fit:cover"><b style="position:absolute;left:6px;top:6px;background:#f0f;color:#fff;font:bold 22px sans-serif;padding:2px 8px">${it.n}</b></div>`)
      .join("")}</body>`;
    const page = await browser.newPage();
    await page.setViewport({ width: 1400, height: 780 });
    await page.setContent(html, { waitUntil: "networkidle2", timeout: 60000 }).catch(() => {});
    await new Promise((r) => setTimeout(r, 1500));
    await page.screenshot({ path: `${out}/ov_${q.replace(/\W+/g, "_")}.png` });
    await page.close();
    console.log(q, items.length);
  }
  fs.writeFileSync(`${out}/openverse_${Date.now()}.json`, JSON.stringify(all, null, 1));
  fs.writeFileSync(`${out}/openverse_last.json`, JSON.stringify(all, null, 1));
  await browser.close();
})();
