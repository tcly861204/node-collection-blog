const request = require('request')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  service: 'QQ', // 发给QQ邮箱
  auth: { // 权限认证
    user: '356671808@qq.com',
    pass: 'waiyzqzpizodcabh'
  }
})

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
    let title = $(this).find('.com-article-panel-title').html()
    title = title.replace(/(?<=(href="))/, 'https://cloud.tencent.com')
    data.push(`<li style="list-style-type: none;">${title}</li>`)
  })
  createHtml(data.join(''))
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
  <style>
    a {
      text-decoration: none;
      color: #424242;
      font-size: 13px;
    }
    ul, li {
      list-style-type: none;
    }
  </style>
</head>
<body>
  <h2>每日必看</h2>
  <section>
    <ul>\n${data}\n</ul>
  </section>
</body>
</html>
  `
  let mailOptions = {
    from: `"cobill"<356671808@qq.com>`, // 发邮件的账号
    to: 'tcly861204@hotmail.com', // 收邮件的账号
    subject: '每日前端必看', // 标题
    html: `
    <style>
      * {
        margin: 0;
        padding: 0;
      }
      a {
        text-decoration: none;
        color: #424242;
        font-size: 13px;
      }
    </style>
    <section style="width: 800px; margin: 0 auto;">
      <h2 style="font-size: 16px; font-weight: normal;">每日必看</h2>
      <ul style="list-style-type: none;">\n${data}\n</ul>
    </section>
    ` // 邮寄的内容
  }
  transporter.sendMail(mailOptions, (err, info) => {
    if (!err) {
      console.log('邮件已经发生完成')
    }
  })
  fs.writeFileSync(
    path.resolve(__dirname, 'dist/index.html'),
    _html,
    'utf8'
  )
}
