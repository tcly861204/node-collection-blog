import fs from 'fs'
import path from 'path'
import render from "./render"
import sendMail from "./email"
import cloudTencent from './cloudTencent'
import cnode from './cnode'
(async() => {
  const cloudTencentData = await cloudTencent()
  const cnodeData = await cnode()
  const data = [
    '<li><h2>腾讯云</h2></li>',
    ...(cloudTencentData as Array<string>),
    '<li><h2>cnode</h2></li>',
    ...(cnodeData as Array<string>)
  ]
  try {
    const html = render(data.join('\n'))
    sendMail(data.join('\n'))
    fs.writeFileSync(
      path.resolve(__dirname, '../dist/index.html'),
      html,
      'utf8'
    )
  } catch (error) {
    console.log(error)
  }
})()
