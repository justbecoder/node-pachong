/**
 * 使用Node.js做爬虫实战
 * author: justbecoder <justbecoder@aliyun.com>
 */

// 引入需要的工具包
const sp = require('superagent');
const cheerio = require('cheerio');

// 定义请求的URL地址
const BASE_URL = 'http://www.23us.so';

// 1. 发送请求，获取HTML字符串
(async () => {
  let html = await sp.get(BASE_URL);
  console.log(html.text);
  
  // 2. 将字符串导入，使用cheerio获取元素
  let $ = cheerio.load(html.text);
  
  // 3. 获取指定的元素
  let books = []
  $('#s_dd dd').each(function () {
    let info = {
      link: $(this).find('a').eq(0).attr('href'),
      name: $(this).find('a').eq(1).text(),
      image: $(this).find('img').attr('src')
    }
    books.push(info)
  })
  console.log(books)
})()