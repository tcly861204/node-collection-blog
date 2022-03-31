import nodemailer from 'nodemailer'
const transporter = nodemailer.createTransport({
  // 发给QQ邮箱
  service: 'QQ',
  // 权限认证
  auth: {
    user: '356671808@qq.com',
    // !! 这里读的github里面的环境变量，是我本人的信息，本地跑的话一定需要改这里
    pass: process.env.QQ_PASS
  }
})

const ACCOUNTS = [
  '356671808@qq.com',
  'tcly861204@hotmail.com'
]

const sendMail = function(options: string) {
  let mailOptions = {
    from: `"cobill"<356671808@qq.com>`, // 发邮件的账号
    to: ACCOUNTS.join(', '), // 收邮件的账号
    subject: '前端每日必看', // 邮件的标题
    html: `${options}`      // 邮寄的内容
  }
  transporter.sendMail(mailOptions, (err: any, info: any) => {
    if (!err) {
      console.log('邮件已经发送完成')
    }
  })
}
export default sendMail
