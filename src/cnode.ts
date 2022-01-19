import request, { RequestCallback } from 'request'
import cheerio from 'cheerio'
const uri = 'https://cnodejs.org'
const cnode = function () {
  return new Promise((reslove, reject) => {
    const callback: RequestCallback = function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        const $ = cheerio.load(body, {
          decodeEntities: false
        })
        const group = $('body').find('#topic_list').find('.cell')
        const data: Array<string> = []
        group.each(function(i, item) {
          if (i > 4 && i < 20) {
            let title = $(this).find('.topic_title_wrapper').html()
            title = title!.replace(/(\<span.*\<\/span\>)/g, '').trim()
            title = title.replace(/(?<=(href="))/, 'https://cnodejs.org')
            data.push(`\t<li style="list-style-type: none;">${title}</li>`)
          }
        })
        reslove([])
      }
    }
    return request.get(uri, callback)
  })
}

export default cnode