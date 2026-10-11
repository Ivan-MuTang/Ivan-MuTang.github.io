'use strict';

// Preserve Chinese emphasis while leaving Marked 15's strikethrough rules intact.
const { default: cjkFriendly } = require('marked-cjk-friendly');
const { emStrong } = cjkFriendly().tokenizer;
hexo.extend.filter.register('marked:tokenizer', function(tokenizer) {
  tokenizer.emStrong = emStrong;
});
