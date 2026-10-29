// The verification suite. Run it before every handoff.
//
//     node tools/check.js films/01-claude-code-story
//
// Four checks, in the order they catch things:
//   errors    the page loads and nothing throws
//   sweep     no non-finite pose value on any frame — a NaN angle draws nothing
//             at all, and the figure just quietly loses a limb
//   timing    every piece of copy is on screen long enough to read
//   isolated  the artifact resolves from an EMPTY directory. An asset referenced
//             by filename instead of inlined looks perfect here and is broken on
//             the viewer's machine.
// playwright lives wherever it lives; the tools should not care
const {chromium} = (() => {
  for (const m of ['playwright', 'playwright-core',
                   process.env.HOME + '/Projects/heuristic-eval/node_modules/playwright'])
    try { return require(m) } catch (e) {}
  console.error('playwright not found — npm i -D playwright, or symlink node_modules');
  process.exit(1);
})();
const path = require('path'), fs = require('fs'), os = require('os');

const KEYS = ['t','h','al1','al2','ar1','ar2','ll1','ll2','lr1','lr2','dy','f'];
const need = (s) => 0.45 + String(s||'').replace(/\s+/g,' ').length * 0.045;
const dir  = process.argv[2] || 'films/01-claude-code-story';
const film = path.resolve(dir, path.basename(path.resolve(dir)) + '-OPEN-ME.html');

(async () => {
  if (!fs.existsSync(film)) { console.log('no build — run tools/build.py first'); process.exit(1) }
  const b = await chromium.launch();
  let fail = 0;
  const say = (ok, name, detail) => {
    if (!ok) fail++;
    console.log(`${ok ? '  ok  ' : ' FAIL '} ${name.padEnd(9)} ${detail}`);
  };

  // ── errors + sweep + timing, all from one load ──────────────────────
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + film, {waitUntil: 'load', timeout: 60000});
  await p.waitForFunction('window.__seek && window.__TOTAL', null, {timeout: 40000});
  say(errs.length === 0, 'errors', errs.length ? errs[0] : 'none');

  const sw = await p.evaluate((KEYS) => {
    const seen = {}, bad = [];
    for (let t = 0; t < window.__TOTAL; t += 1/30) {
      const st = stateAt(t);
      seen[st.label] = (seen[st.label] || 0) + 1;
      for (const k of KEYS) if (!isFinite(st.pose[k])) bad.push([t.toFixed(2), k]);
      if (!isFinite(st.x) || !isFinite(st.cam)) bad.push([t.toFixed(2), 'x/cam']);
    }
    return {seen, bad, total: window.__TOTAL};
  }, KEYS);
  const mm = Math.floor(sw.total / 60), ss = (sw.total % 60).toFixed(0).padStart(2, '0');
  say(sw.bad.length === 0, 'sweep',
      `${mm}:${ss} · ${Object.keys(sw.seen).length} beats · ` +
      (sw.bad.length ? `non-finite ${JSON.stringify(sw.bad.slice(0,3))}` : 'no non-finite values'));

  const T = await p.evaluate('window.__timed');
  const short = T.filter(r => ((r.out == null ? sw.total : r.out) - r.in) < need(r.txt));
  say(short.length === 0, 'timing',
      short.length ? `${short.length} too short to read, first: "${short[0].txt.slice(0,40)}"`
                   : `${T.length} pieces of copy, all readable`);

  // ── isolated: same file, empty directory, nothing else to fall back on ──
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'film-iso-'));
  fs.copyFileSync(film, path.join(tmp, 'f.html'));
  const q = await b.newPage();
  const qerr = [];
  q.on('pageerror', e => qerr.push(String(e)));
  await q.goto('file://' + path.join(tmp, 'f.html'), {waitUntil: 'load', timeout: 60000});
  await q.waitForFunction('window.__seek', null, {timeout: 40000});
  const iso = await q.evaluate(() => ({
    external: [...document.querySelectorAll('[src]')].filter(e => !e.src.startsWith('data:')).length,
    broken: [...document.images].filter(i => !i.naturalWidth).length,
  }));
  say(iso.external === 0 && iso.broken === 0 && qerr.length === 0, 'isolated',
      iso.external ? `${iso.external} assets not inlined`
        : iso.broken ? `${iso.broken} images failed to load` : 'fully self-contained');
  fs.rmSync(tmp, {recursive: true, force: true});

  await b.close();
  console.log(fail ? `\n${fail} check(s) failed` : '\nall checks passed');
  process.exit(fail ? 1 : 0);
})();
