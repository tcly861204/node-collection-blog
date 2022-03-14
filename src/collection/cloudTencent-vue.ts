import request, { RequestCallback } from 'request'
import cheerio from 'cheerio'
const uri = 'https://cloud.tencent.com/developer/column/91112'
const cloudTencent = function () {
  return new Promise((reslove, reject) => {
    const callback: RequestCallback = function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        const $ = cheerio.load(body, {
          decodeEntities: false
        })
        const group = $('body').find('.com-article-list').find('.com-article-panel')
        const data: Array<string> = []
        group.each(function(index) {
          let title = $(this).find('.com-article-panel-title').html()
          title = title!.replace(/(?<=(href="))/, 'https://cloud.tencent.com')
            .replace('hotrep=""', `
              style="
                color: #999;
                font-weight: normal;
                text-decoration: none;
                font-size: 16px;
              "
            `)
          data.push(`\t<li style="list-style-type: none; margin: 0 0 15px 0; padding: 0;">
            <span style="color: #999; font-size: 16px;">${index+1}. </span>
            ${title}
          </li>`)
        })
        reslove({
          name: 'Vue中文社区',
          data
        })
      }
    }
    return request.get(uri, callback)
  })
}

export default cloudTencent