// Render frames so you can look at them. Verifying by assumption is how a beat
// ships with the arm behind a desk.
//
//     node tools/shot.js films/01-claude-code-story 24.5 46.8 107
//
// Writes st/<time>.jpg and prints which beat each frame landed in. Runs against
// the BUILT artifact — the clip cannot be seeked from a plain file server, so a
// screenshot taken there silently shows frame zero of the video.
// playwright lives wherever it lives; the tools should not care
const {chromium} = (() => {
  for (const m of ['playwright', 'playwright-core',
                   process.env.HOME + '/Projects/heuristic-eval/node_modules/playwright'])
    try { return require(m) } catch (e) {}
  console.error('playwright not found — npm i -D playwright, or symlink node_modules');
  process.exit(1);
})();
const path = require('path'), fs = require('fs');

const dir = process.argv[2];
const times = process.argv.slice(3).map(Number).filter(n => !isNaN(n));
const film = path.resolve(dir, path.basename(path.resolve(dir)) + '-OPEN-ME.html');

(async () => {
  const b = await chromium.launch({args: ['--autoplay-policy=no-user-gesture-required']});
  const p = await b.newPage({viewport: {width: 1650, height: 1180}});
  const errs = [];
  p.on('pageerror', e => errs.push(String(e)));
  await p.goto('file://' + film, {waitUntil: 'load', timeout: 60000});
  await p.waitForFunction('window.__seek', null, {timeout: 40000});

  const out = path.join(path.resolve(dir), 'st');
  fs.rmSync(out, {recursive: true, force: true});
  fs.mkdirSync(out, {recursive: true});
  const el = await p.$('#c');

  for (const t of times) {
    const label = await p.evaluate(x => window.__seek(x), t);
    await p.waitForFunction('!document.querySelector("video") || !document.querySelector("video").seeking',
                            null, {timeout: 6000}).catch(() => {});
    await p.waitForTimeout(120);
    await el.screenshot({path: path.join(out, `${t}.jpg`), quality: 88, type: 'jpeg'});
    process.stdout.write(`${t}s → ${label}   `);
  }
  console.log('\nwrote', out);
  console.log('errors:', errs.length ? errs : 'none');
  await b.close();
})();
