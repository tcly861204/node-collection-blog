import request, { RequestCallback } from 'request'
import * as cheerio from 'cheerio'
const uri = 'https://segmentfault.com/channel/frontend'
const segmentfault = function () {
  return new Promise((reslove, reject) => {
    const callback: RequestCallback = function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        const $ = cheerio.load(body, {
          decodeEntities: false
        })
        const group = $('body').find('.list-group').find('.list-group-item')
        const data: Array<string> = []
        group.each(function(i) {
          if (i > 0 && i < 20) {
            let titleNode = $(this).find('.title')
            const href = titleNode.attr('href')
            const title = `<a style="
              color: #999;
              font-weight: normal;
              text-decoration: none;
              font-size: 13px;"
              href="https://segmentfault.com${href}" target="_blank">
              ${titleNode.html()}
            </a>
            `
            data.push(`\t<dd style="list-style-type: none; margin: 0 0 10px 0; padding: 0;">
              <span style="color: #999; font-size: 13px;">${i+1}. </span>
              ${title}
            </dd>`)
          }
        })
        reslove({
          name: 'segmentfault',
          data
        })
      }
    }
    return request.get(uri, callback)
  })
}

export default segmentfault
