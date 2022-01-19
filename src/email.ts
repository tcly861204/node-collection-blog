import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
const pass = fs.readFileSync(path.resolve(__dirname, '..', 'pass.txt'))
console.log(pass.toString())
let transporter = nodemailer.createTransport({
  service: 'QQ', // 发给QQ邮箱
  auth: { // 权限认证
    user: '356671808@qq.com',
    pass: pass.toString()
  }
})
const sendMail = function(options: string) {
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
<section style="width: 750px; margin: 0 auto; border: 2px solid #ccc; border-radius: 6px;">
  <h2 style="font-size: 18px; text-align: center;">每日必看</h2>
  <ul style="list-style-type: none;">\n${options}\n</ul>
</section>
  ` // 邮寄的内容
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (!err) {
      console.log('邮件已经发生完成')
    }
  })
}
export default sendMail
