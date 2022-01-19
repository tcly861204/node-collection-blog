import render from "./render"
import fs from 'fs'
import path from 'path'
import sendMail from "./email"
import cloudTencent from './cloudTencent'

console.log(process.env);

(async() => {
  const data = await cloudTencent()
  try {
    const html = render((data as Array<string>).join('\n'))
    sendMail((data as Array<string>).join('\n'))
    fs.writeFileSync(
      path.resolve(__dirname, '../dist/index.html'),
      html,
      'utf8'
    )
  } catch (error) {
    console.log(error)
  }
})()
