'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const path = require('node:path');
const os = require('node:os');
const Hexo = require('hexo');
const { createRequire } = require('node:module');
const pluginRequire = createRequire(require.resolve('hexo-deployer-git'));
const hexoFs = pluginRequire('hexo-fs');

async function main() {
  const project = path.resolve(__dirname, '..');
  const temporaryRoot = path.resolve(os.tmpdir());
  const directory = await fs.mkdtemp(path.join(temporaryRoot, 'hexo-core-check-'));
  let hexo;
  try {
    await fs.symlink(path.join(project, 'node_modules'), path.join(directory, 'node_modules'), 'junction');
    await fs.copyFile(path.join(project, 'package.json'), path.join(directory, 'package.json'));
    await fs.mkdir(path.join(directory, 'source', '_posts'), {recursive:true});
    await fs.mkdir(path.join(directory, 'themes', 'fixture', 'layout'), {recursive:true});
    await fs.writeFile(path.join(directory, '_config.yml'), 'title: Test\nurl: https://example.com\npermalink: /:abbrlink/\ntheme: fixture\npost_asset_folder: true\nhide_posts:\n  enable: true\n  noindex: true\n');
    await fs.writeFile(path.join(directory, 'themes', 'fixture', '_config.yml'), '{}\n');
    const layout = '<html><head><title>Fixture</title></head><body><% if (page.posts) { page.posts.each(function(post){ %><a href="<%= post.path %>"><%= post.title %></a><% }); } else { %><%- page.content %><% } %></body></html>';
    for (const name of ['post','index','archive','tag','category','page']) await fs.writeFile(path.join(directory,'themes','fixture','layout',name+'.ejs'),layout);
    const posts = {
      'pinned.md': '---\ntitle: PINNED_CHECK\ndate: 2020-01-01\nabbrlink: pinned-check\ntop: 100\n---\nPinned body\n',
      'normal.md': '---\ntitle: NORMAL_CHECK\ndate: 2025-01-01\nabbrlink: normal-check\n---\nNormal body\n',
      'hidden.md': '---\ntitle: HIDDEN_CHECK\ndate: 2026-01-01\nabbrlink: hidden-check\nhidden: true\ntags: hidden-only-tag\n---\nHidden body\n',
      'automatic.md': '---\ntitle: AUTOMATIC_CHECK\ndate: 2024-01-01\n---\nAutomatic body\n'
    };
    for(const [name,body] of Object.entries(posts)) await fs.writeFile(path.join(directory,'source','_posts',name),body);
    hexo = new Hexo(directory, {silent:true});
    await hexo.init();
    await hexo.call('generate');
    const read = file => fs.readFile(path.join(directory,'public',file),'utf8');
    const index = await read('index.html');
    assert(index.indexOf('PINNED_CHECK') < index.indexOf('NORMAL_CHECK'));
    assert(!index.includes('HIDDEN_CHECK'));
    const hidden = await read('hidden-check/index.html');
    assert(hidden.includes('Hidden body'));
    assert(hidden.includes('noindex'));
    for(const file of ['atom.xml','sitemap.xml','content.json','archives/index.html']) assert(!(await read(file)).includes('HIDDEN_CHECK') && !(await read(file)).includes('/hidden-check/'),file);
    const written = await fs.readFile(path.join(directory,'source','_posts','automatic.md'),'utf8');
    assert(/abbrlink:\s*\S+/.test(written));
    assert(written.includes('AUTOMATIC_CHECK') && written.includes('Automatic body'));
    const watchFile = path.join(directory, 'watch-check.txt');
    await fs.writeFile(watchFile, 'before');
    const watcher = await hexoFs.watch(watchFile);
    try {
      const changed = new Promise((resolve, reject) => {
        const timer = setTimeout(() => reject(new Error('Watcher timed out')), 5000);
        watcher.once('change', () => { clearTimeout(timer); resolve(); });
      });
      await fs.writeFile(watchFile, 'after');
      await changed;
    } finally { await watcher.close(); }
    const automatic = hexo.model('Post').findOne({title:'AUTOMATIC_CHECK'});
    assert(automatic && automatic.abbrlink);
    assert(hexo.route.list().includes(automatic.path.replace(/^\//,"").replace(/\/$/,"/index.html"))); 
    assert(hexo.route.list().includes('pinned-check/index.html'));
    console.log('Core checks passed: pinned order, hidden/noindex, feed/sitemap/search exclusions and stable/generated short links.');
  } finally {
    if(hexo) await hexo.exit();
    // Remove the junction first so cleanup cannot enter the real dependency tree.
    await fs.unlink(path.join(directory,'node_modules')).catch(error => { if(error.code !== 'ENOENT') throw error; });
    const resolved=path.resolve(directory);
    assert.equal(path.dirname(resolved),temporaryRoot);
    assert(path.basename(resolved).startsWith('hexo-core-check-'));
    await fs.rm(resolved,{recursive:true,force:true});
  }
}
main().catch(error => { console.error(error); process.exitCode=1; });
