import nodemailer from 'nodemailer'

let transporter = nodemailer.createTransport({
  service: 'QQ', // 发给QQ邮箱
  auth: { // 权限认证
    user: '356671808@qq.com',
    pass: process.env.QQ_PASS
  }
})

const sendMail = function(options: string) {
  let mailOptions = {
    from: `"cobill"<356671808@qq.com>`, // 发邮件的账号
    to: '356671808@qq.com', // 收邮件的账号
    subject: '每日前端必看', // 标题
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0">
  <meta content="yes" name="apple-mobile-web-app-capable">  
  <meta content="black" name="apple-mobile-web-app-status-bar-style">  
  <meta content="telephone=no" name="format-detection">
</head>
<style>
  * {
    margin: 0;
    padding: 0;
    border: none;
  }
  a {
    text-decoration: none !important;
    font-size: 16px; 
    color: #999;
  }
</style>
<body>
  <section style="margin: 0; padding: 0;">
    <ul style="list-style-type: none; margin: 0; padding: 0;">\n${options}\n</ul>
  </section>
</body>
</html>
  ` // 邮寄的内容
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (!err) {
      console.log('邮件已经发生完成')
    }
  })
}
export default sendMail
