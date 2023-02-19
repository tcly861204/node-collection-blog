import request, { RequestCallback } from 'request'
import * as cheerio from 'cheerio'
const uri = 'https://cloud.tencent.com/developer/column/78599/tag-0'
const cloudTencent = function () {
  return new Promise((reslove, reject) => {
    const callback: RequestCallback = function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        const $ = cheerio.load(body, {
          decodeEntities: false
        })
        const group = $('body').find('.cdc-article-panel__list').find('.cdc-article-panel')
        const data: Array<string> = []
        group.each(function(index) {
          let title = $(this).find('.cdc-article-panel__title').html()
          const url = $(this).find('.cdc-article-panel__link').attr('href')
          title = `<a style="
            color: #999;
            font-weight: normal;
            text-decoration: none;
            font-size: 13px;"
            href="https://cloud.tencent.com${url}" target="_blank">
            ${title}
          </a>
          `
          data.push(`\t<dd style="list-style-type: none; margin: 0 0 10px 0; padding: 0;">
            <span style="color: #999; font-size: 13px;">${index+1}. </span>
            ${title}
          </dd>`)
        })
        reslove({
          name: '腾讯云',
          data
        })
      }
    }
    return request.get(uri, callback)
  })
}

export default cloudTencent