const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
request({
  url: 'https://cloud.tencent.com/developer/column/78599/tag-0',
  method: 'GET'
}, (err, res, body) => {
  if (err) {
    return
  }
  const $ = cheerio.load(body, {
    decodeEntities: false
  })
  const group = $('body').find('.com-article-list').find('.com-article-panel')
  const data = []
  group.each(function(i, item) {
    const title = $(this).find('.com-article-panel-title').html()
    data.push(title.replace(/(?<=(href="))/, 'https://cloud.tencent.com'))
  })
  createHtml(data.join('\n'))
})

const createHtml = function (data) {
  const _html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>博客文档</title>
</head>
<body>\n${data}\n</body>
</html>
  `
  fs.writeFileSync(
    path.resolve(__dirname, 'dist/index.html'),
    _html,
    'utf8'
  )
}
