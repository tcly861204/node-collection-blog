import fs from 'fs'
import path from 'path'
import render from "./render"
import sendMail from "./email"
import cloudTencent from './cloudTencent'
import cnode from './cnode'
(async() => {
  const cloudTencentData = await cloudTencent()
  const cnodeData = await cnode()
  const Style = `
    font-size: 20px; background: #ff0000; color: #fff; padding: 2px 6px; border-radius: 3px; margin: 0;
  `
  const data = [
    `<li style="list-style-type: none; margin: 0 0 20px 0;">
      <span style="${Style}">腾讯云</span>
    </li>`,
    ...(cloudTencentData as Array<string>),
    `<li style="list-style-type: none; margin: 0 0 20px 0;">
      <span style="${Style}">cnode</span>
    </li>`,
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
