import fs from 'fs'
import path from 'path'
import render from "./render"
import sendMail from "./email"
import cloudTencent from './cloudTencent'
import cnode from './cnode'
import cloudTencent94491 from './cloudTencent-94491'
import cloudTencentVue from './cloudTencent-vue'
(async() => {
  const cloudTencentData = await cloudTencent()
  const cnodeData = await cnode()
  const cloudTencent94491Data = await cloudTencent94491()
  const cloudTencentVueData = await cloudTencentVue()
  const Style = `
    font-size: 20px; background: #ff0000; color: #fff; padding: 2px 6px; border-radius: 3px; margin: 0;
  `
  const data = [
    `<li style="list-style-type: none; margin: 0 0 15px 0;">
      <span style="${Style}">腾讯云</span>
    </li>`,
    ...(cloudTencentData as Array<string>),
    `<li style="list-style-type: none; margin: 0 0 15px 0;">
      <span style="${Style}">Vue中文社区</span>
    </li>`,
    ...(cloudTencentVueData as Array<string>),
    `<li style="list-style-type: none; margin: 0 0 15px 0;">
      <span style="${Style}">南山种子外卖跑手的专栏</span>
    </li>`,
    ...(cloudTencent94491Data as Array<string>),
    `<li style="list-style-type: none; margin: 0 0 15px 0;">
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
