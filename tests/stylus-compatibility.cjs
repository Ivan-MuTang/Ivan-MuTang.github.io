'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const os = require('node:os');
const path = require('node:path');
const { createRequire } = require('node:module');
const rendererRequire = createRequire(require.resolve('hexo-renderer-stylus'));
const stylus = rendererRequire('stylus');
const nib = rendererRequire('nib');

async function main() {
  const temporaryRoot = path.resolve(os.tmpdir());
  const directory = await fs.mkdtemp(path.join(temporaryRoot, 'hexo-stylus-check-'));
  try {
    await fs.mkdir(path.join(directory, 'parts'));
    await fs.writeFile(path.join(directory, 'parts', '01-variables.styl'), 'accent = #123456\n');
    await fs.writeFile(path.join(directory, 'parts', '02-card.styl'), '.imported\n  color accent\n');
    const source = "@import 'nib'\n@import 'parts/*'\n.fixture\n  border-radius 3px\n  user-select none\n@media (max-width: 600px)\n  .fixture\n    width 100%\n";
    const css = await new Promise((resolve, reject) => stylus(source)
      .set('filename', path.join(directory, 'main.styl'))
      .use(nib())
      .render((error, result) => error ? reject(error) : resolve(result)));
    assert(css.includes('.imported'));
    assert(css.includes('color: #123456'));
    assert(css.includes('border-radius: 3px'));
    assert(css.includes('user-select: none'));
    assert(css.includes('@media (max-width: 600px)'));
    assert(css.includes('width: 100%'));
    console.log('Stylus checks passed: wildcard imports, shared variables, nib and responsive rules.');
  } finally {
    const resolved = path.resolve(directory);
    assert.equal(path.dirname(resolved), temporaryRoot);
    assert(path.basename(resolved).startsWith("hexo-stylus-check-"));
    await fs.rm(resolved, { recursive: true, force: true });
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
