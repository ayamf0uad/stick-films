// Prove a refactor changed nothing you can see.
//
//     node tools/pixdiff.js <reference.html> <candidate.html>
//
// Seeks both films to the same times and hashes the canvas pixels. Identical hash
// means an identical frame — which is the only claim worth making after moving
// 2500 lines of code between files.
//
// Frames inside a video-clip window are skipped: HTML video seeking is not
// frame-exact, so two loads can legitimately land on different frames of the clip
// without anything being wrong. Pass the window as --skip=159,196.
// playwright lives wherever it lives; the tools should not care
const {chromium} = (() => {
  for (const m of ['playwright', 'playwright-core',
                   process.env.HOME + '/Projects/heuristic-eval/node_modules/playwright'])
    try { return require(m) } catch (e) {}
  console.error('playwright not found — npm i -D playwright, or symlink node_modules');
  process.exit(1);
})();
const path = require('path');

const [ref, cand] = process.argv.slice(2).filter(a => !a.startsWith('--')).map(a => path.resolve(a));
const skipArg = (process.argv.find(a => a.startsWith('--skip=')) || '').slice(7);
const skip = skipArg ? skipArg.split(',').map(Number) : null;
const step = Number((process.argv.find(a => a.startsWith('--step=')) || '--step=4').slice(7));

async function frames(browser, file, times) {
  const p = await browser.newPage();
  await p.goto('file://' + file, {waitUntil: 'load', timeout: 60000});
  await p.waitForFunction('window.__seek', null, {timeout: 40000});
  const out = [];
  for (const t of times) {
    await p.evaluate(x => window.__seek(x), t);
    out.push(await p.evaluate(() => {
      const d = ctx.getImageData(0, 0, cv.width, cv.height).data;
      let h = 2166136261, ink = 0;
      for (let i = 0; i < d.length; i += 4) {          // every pixel, RGB only
        h = Math.imul(h ^ d[i], 16777619) ^ d[i+1] ^ d[i+2];
        ink += d[i] + d[i+1] + d[i+2];
      }
      return {h: h >>> 0, ink};
    }));
  }
  await p.close();
  return out;
}

(async () => {
  const b = await chromium.launch();
  const total = await (async () => {
    const p = await b.newPage();
    await p.goto('file://' + ref, {waitUntil: 'load', timeout: 60000});
    await p.waitForFunction('window.__TOTAL', null, {timeout: 40000});
    const t = await p.evaluate('window.__TOTAL');
    await p.close();
    return t;
  })();

  const times = [];
  for (let t = 1; t < total; t += step)
    if (!skip || t < skip[0] || t > skip[1]) times.push(+t.toFixed(2));

  const A = await frames(b, ref, times);
  const B = await frames(b, cand, times);
  await b.close();

  const bad = times.map((t, i) => ({t, a: A[i], c: B[i]})).filter(r => r.a.h !== r.c.h);
  console.log(`compared ${times.length} frames` +
              (skip ? ` (skipped the clip window ${skip[0]}..${skip[1]}s)` : ''));
  if (!bad.length) { console.log('every frame pixel-identical'); process.exit(0) }
  console.log(`${bad.length} frame(s) differ:`);
  for (const r of bad.slice(0, 12)) {
    const d = Math.abs(r.a.ink - r.c.ink) / r.a.ink * 100;
    console.log(`  t=${String(r.t).padStart(6)}s   ink differs by ${d.toFixed(4)}%`);
  }
  process.exit(1);
})();
