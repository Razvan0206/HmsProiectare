const puppeteer = require("puppeteer-core");
const BASE = process.env.BASE_URL || "http://localhost:3100/";
const OUT = process.env.OUT_DIR || "./out";
const CHROME = process.env.CHROME_PATH || "C:/Program Files/Google/Chrome/Application/chrome.exe";
require("fs").mkdirSync(OUT, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const URL = BASE;
const kb = (n) => Math.round(n / 1024);

(async () => {
  const browser = await puppeteer.launch({ executablePath: CHROME, headless: "new", args: ["--disable-gpu", "--autoplay-policy=no-user-gesture-required"] });

  // ---------- 1. Mobile performance (throttled), intro skipped = returning visitor
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 });
    const cdp = await page.createCDPSession();
    await cdp.send("Network.enable");
    await cdp.send("Network.emulateNetworkConditions", { offline: false, latency: 150, downloadThroughput: (1.6 * 1024 * 1024) / 8, uploadThroughput: (750 * 1024) / 8 });
    await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    const bytes = new Map();
    cdp.on("Network.responseReceived", (e) => bytes.set(e.requestId, { url: e.response.url, type: e.type, status: e.response.status }));
    cdp.on("Network.loadingFinished", (e) => { const r = bytes.get(e.requestId); if (r) r.size = e.encodedDataLength; });
    await page.evaluateOnNewDocument(() => {
      sessionStorage.setItem("rafgym-intro", "1");
      window.__m = { cls: 0, lcp: 0, lcpEl: "", longTasks: 0, tbt: 0 };
      new PerformanceObserver((l) => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__m.cls += e.value; }).observe({ type: "layout-shift", buffered: true });
      new PerformanceObserver((l) => { const e = l.getEntries().at(-1); window.__m.lcp = e.startTime; window.__m.lcpEl = (e.element && (e.element.tagName + "." + String(e.element.className).slice(0, 50))) || ""; }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((l) => { for (const e of l.getEntries()) { window.__m.longTasks++; window.__m.tbt += Math.max(0, e.duration - 50); } }).observe({ type: "longtask", buffered: true });
    });
    const t0 = Date.now();
    await page.goto(URL, { waitUntil: "load", timeout: 90000 });
    const loadMs = Date.now() - t0;
    await sleep(3500);
    const m = await page.evaluate(() => window.__m);
    const total = [...bytes.values()].reduce((a, r) => a + (r.size || 0), 0);
    const byType = {};
    for (const r of bytes.values()) byType[r.type] = (byType[r.type] || 0) + (r.size || 0);
    const big = [...bytes.values()].filter((r) => r.size > 60 * 1024).sort((a, b) => b.size - a.size).slice(0, 8);
    console.log("== MOBILE (4x CPU, ~1.6 Mbps, 150 ms), returning visitor");
    console.log(`load event: ${loadMs} ms | LCP: ${Math.round(m.lcp)} ms (${m.lcpEl}) | CLS: ${m.cls.toFixed(3)} | long tasks: ${m.longTasks}, TBT~${Math.round(m.tbt)} ms`);
    console.log(`transferred: ${kb(total)} KB in ${bytes.size} requests; by type:`, Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, kb(v) + " KB"])));
    console.log("largest:", big.map((r) => `${kb(r.size)}KB ${r.type} ${r.url.replace(/^https?:\/\/[^/]+/, "").slice(0, 60)}`).join("\n         "));
    await page.close();
  }

  // ---------- 2. Accessibility + structure (desktop, real DOM)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("rafgym-intro", "1"));
    await page.goto(URL, { waitUntil: "networkidle2" });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await sleep(40); }
    await page.evaluate(() => window.scrollTo(0, 0));
    await sleep(500);
    const a11y = await page.evaluate(() => {
      const out = {};
      out.lang = document.documentElement.lang;
      out.title = document.title;
      out.metaDesc = !!document.querySelector('meta[name="description"]');
      out.themeColor = !!document.querySelector('meta[name="theme-color"]');
      out.og = !!document.querySelector('meta[property="og:title"]');
      out.jsonLd = !!document.querySelector('script[type="application/ld+json"]');
      out.canonical = !!document.querySelector('link[rel="canonical"]');
      out.skipLink = !![...document.querySelectorAll("a")].find((a) => /skip|sari/i.test(a.textContent));
      out.landmarks = { header: document.querySelectorAll("header").length, nav: document.querySelectorAll("nav").length, main: document.querySelectorAll("main").length, footer: document.querySelectorAll("footer").length };
      out.headings = [...document.querySelectorAll("h1,h2,h3,h4")].map((h) => h.tagName + ":" + h.textContent.trim().slice(0, 28));
      out.imgNoAlt = [...document.querySelectorAll("img")].filter((i) => !i.hasAttribute("alt")).length;
      out.imgEmptyAlt = [...document.querySelectorAll("img")].filter((i) => i.getAttribute("alt") === "").length;
      const name = (el) => (el.getAttribute("aria-label") || el.textContent || el.getAttribute("title") || "").trim();
      out.buttonsNoName = [...document.querySelectorAll("button,a")].filter((el) => !name(el) && !el.querySelector("img[alt]:not([alt=''])")).length;
      out.videoAria = [...document.querySelectorAll("video")].map((v) => ({ ariaLabel: v.getAttribute("aria-label"), hidden: v.getAttribute("aria-hidden"), controls: v.controls, autoplayLoop: v.loop && v.muted }));
      out.htmlScrollPad = getComputedStyle(document.documentElement).scrollPaddingTop;
      out.sectionScrollMargin = [...document.querySelectorAll("section[id]")].map((s) => s.id + ":" + getComputedStyle(s).scrollMarginTop);
      out.viewportMeta = document.querySelector('meta[name="viewport"]')?.content;
      out.textWrapBalance = getComputedStyle(document.querySelector("h2")).textWrap;
      out.touchAction = getComputedStyle(document.querySelector("a")).touchAction;
      return out;
    });
    console.log("\n== A11Y / STRUCTURE");
    console.log(JSON.stringify(a11y, null, 1).slice(0, 2600));

    // focus visibility: tab through the first 12 focusables, compare style before/after
    const focus = [];
    for (let i = 0; i < 12; i++) {
      await page.keyboard.press("Tab");
      const info = await page.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        return { tag: el.tagName, text: (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 22), outline: cs.outlineStyle !== "none" && parseFloat(cs.outlineWidth) > 0, shadow: cs.boxShadow !== "none", bg: cs.backgroundColor, under: r.top < 72 };
      });
      if (info) focus.push(info);
    }
    console.log("focus order (first 12):", focus.map((f) => `${f.tag}[${f.text}] outline=${f.outline} bg=${f.bg.replace("rgba(0, 0, 0, 0)", "none")}`).join("\n   "));
    await page.close();
  }

  // ---------- 3. Contrast + touch targets (mobile)
  {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 844, isMobile: true });
    await page.evaluateOnNewDocument(() => sessionStorage.setItem("rafgym-intro", "1"));
    await page.goto(URL, { waitUntil: "networkidle2" });
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += 300) { await page.evaluate((y) => window.scrollTo(0, y), y); await sleep(40); }
    await sleep(600);
    const res = await page.evaluate(() => {
      const parse = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if (!m) return null; const p = m[1].split(",").map((s) => parseFloat(s)); return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] }; };
      const lum = ({ r, g, b }) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
      const blend = (fg, bg) => ({ r: fg.r * fg.a + bg.r * (1 - fg.a), g: fg.g * fg.a + bg.g * (1 - fg.a), b: fg.b * fg.a + bg.b * (1 - fg.a), a: 1 });
      const bgOf = (el) => { let e = el; while (e) { const c = parse(getComputedStyle(e).backgroundColor); if (c && c.a > 0.95) return c; if (getComputedStyle(e).backgroundImage !== "none") return null; e = e.parentElement; } return { r: 10, g: 10, b: 10, a: 1 }; };
      const fails = []; const seen = new Set();
      document.querySelectorAll("p,h1,h2,h3,span,a,li,dt,dd,address,figcaption,blockquote,button").forEach((el) => {
        if (![...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return;
        const cs = getComputedStyle(el); if (cs.visibility === "hidden" || parseFloat(cs.opacity) === 0) return;
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        const bg = bgOf(el); if (!bg) return;
        let fg = parse(cs.color); if (!fg) return; fg = blend(fg, bg);
        const L1 = lum(fg), L2 = lum(bg); const ratio = (Math.max(L1, L2) + 0.05) / (Math.min(L1, L2) + 0.05);
        const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700;
        const need = size >= 24 || (size >= 18.66 && bold) ? 3 : 4.5;
        const key = el.textContent.trim().slice(0, 30);
        if (ratio < need && !seen.has(key)) { seen.add(key); fails.push(`${ratio.toFixed(2)}:1 (need ${need}) "${key}" ${cs.color}`); }
      });
      const small = []; const seenT = new Set();
      document.querySelectorAll("a,button,summary").forEach((el) => {
        const r = el.getBoundingClientRect(); if (!r.width || !r.height) return;
        const inFlow = getComputedStyle(el).display !== "inline"; if (!inFlow && r.height < 24) return;
        if (r.height < 44 || r.width < 44) { const k = (el.getAttribute("aria-label") || el.textContent || "").trim().slice(0, 24) + Math.round(r.width) + "x" + Math.round(r.height); if (!seenT.has(k)) { seenT.add(k); small.push(k); } }
      });
      return { fails, small, hOverflow: document.documentElement.scrollWidth > innerWidth };
    });
    console.log("\n== CONTRAST (text over solid backgrounds), mobile");
    console.log(res.fails.length ? res.fails.join("\n") : "no failures found");
    console.log("== TOUCH TARGETS < 44px:", res.small.length ? "\n  " + res.small.join("\n  ") : "none");
    await page.close();
  }

  // ---------- 4. JavaScript disabled: is content visible?
  {
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(false);
    await page.setViewport({ width: 1280, height: 800 });
    await page.goto(URL, { waitUntil: "load" });
    await sleep(500);
    const nojs = await page.evaluate(() => {
      const vis = (el) => { const cs = getComputedStyle(el); return parseFloat(cs.opacity) > 0.05; };
      const hidden = [...document.querySelectorAll("h1,h2,h3,p,li,article")].filter((el) => {
        let e = el; while (e && e !== document.body) { if (parseFloat(getComputedStyle(e).opacity) < 0.05) return true; e = e.parentElement; } return false;
      });
      const h1 = document.querySelector("h1");
      const h1Clip = h1 ? [...h1.querySelectorAll("span")].some((s) => /translateY|matrix/.test(getComputedStyle(s).transform) && getComputedStyle(s).transform !== "none") : null;
      return { hiddenTextBlocks: hidden.length, totalTextBlocks: document.querySelectorAll("h1,h2,h3,p,li,article").length, h1Translated: h1Clip, introOverlayDisplayed: !!document.querySelector("[data-intro-overlay]") && getComputedStyle(document.querySelector("[data-intro-overlay]")).display };
    });
    console.log("\n== NO-JS RENDER:", JSON.stringify(nojs));
    await page.close();
  }

  await browser.close();
})().catch((e) => { console.error(e); process.exit(1); });
