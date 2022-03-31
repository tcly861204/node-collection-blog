import fs from 'fs'
import path from 'path'
import render from "./render"
import sendMail from "./email"
(async() => {
  const root = path.resolve(__dirname, 'collection')
  const files = fs.readdirSync(root)
  const data: String[] = []
  const Style = `
    font-size: 16px;
    color: #424242;
    padding: 2px 6px;
    border-radius: 3px;
    margin: 0;
  `
  await Promise.all(files.map(item => require(path.resolve(root, item)).default())).then(result => {
    result.forEach(item => {
      data.push(`
      <section style="padding: 15px; background: #f1f1f1;">
        <dl style="background: #fff;">
          <dt style="list-style-type: none; margin: 0 0 12px 0;">
            <span style="${Style}">${item.name}</span>
          </dt>
          ${(item.data as Array<string>).join('')}
        </dl>
      </section>
      `)
    })
  })
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
