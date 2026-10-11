'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const Hexo = require('hexo');

async function main() {
  const hexo = new Hexo(path.resolve(__dirname, '..'), { silent: true });
  await hexo.init();
  const text = [
    '# 如需其它尺寸，请电联，谢谢*！*',
    '',
    '先连接**电脑，**这时没有网络。',
    '',
    '并发送**“CCD”**获取。',
    '',
    '~~删除~~ 和 `**原样代码**`',
    '',
    '![图片](https://example.com/image.png)',
    '',
    '| 标题 | 数值 |',
    '| --- | --- |',
    '| 测试 | 123 |',
    '',
    '<img src="https://example.com/raw.png" width="100">'
  ].join('\n');
  // Render twice to catch extensions lost when the renderer resets its options.
  for (let i = 0; i < 2; i++) {
    const html = await hexo.render.render({ text, engine: 'md' });
    assert(html.includes('<em>！</em>'));
    assert(html.includes('<strong>电脑，</strong>'));
    assert(html.includes('<strong>“CCD”</strong>'));
    assert(html.includes('<del>删除</del>'));
    assert(html.includes('<code>**原样代码**</code>'));
    assert(html.includes('<table>'));
    assert(html.includes('https://example.com/image.png'));
    assert(html.includes('<img src="https://example.com/raw.png" width="100">'));
    assert(html.includes('id="如需其它尺寸，请电联，谢谢！"'));
  }
  console.log('Markdown compatibility checks passed (two consecutive renders).');
}
main().catch(error => { console.error(error); process.exitCode = 1; });
