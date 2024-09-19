function generateTimestampUrl() {
  // 获取当前时间戳（秒级）
  var timestamp = Math.floor(Date.now() / 1000);
  
  // 将时间戳转换为36进制
  var url = timestamp.toString(36);
  
  // 确保生成的字符串至少有6位，不足6位的前面补充 '0'
  while (url.length < 6) {
    url = '0' + url;
  }
  
  return url;
}

module.exports = generateTimestampUrl;