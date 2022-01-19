import request, { RequestCallback } from 'request'
import cheerio from 'cheerio'
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
        const group = $('body').find('.com-article-list').find('.com-article-panel')
        const data: Array<string> = []
        group.each(function(i) {
          let title = $(this).find('.com-article-panel-title').html()
          title = title!.replace(/(?<=(href="))/, 'https://cloud.tencent.com')
          data.push(`\t<li style="list-style-type: none;">${title}</li>`)
        })
        reslove(data)
      }
    }
    return request.get(uri, callback)
  })
}

export default cloudTencent