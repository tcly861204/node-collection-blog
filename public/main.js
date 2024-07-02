function toNum(num) {
  return num < 10 ? '0' + num : num
}

Date.prototype.format = function (fmt = 'YYYY-MM-DD hh:mm:ss') {
  const Y = this.getFullYear()
  const M = this.getMonth() + 1
  const D = this.getDate()
  const h = this.getHours()
  const m = this.getMinutes()
  const s = this.getSeconds()
  return fmt.replace(/([YMDhms]+)/g, ($1) => {
    switch ($1) {
      case 'YYYY':
        return Y
      case 'MM':
        return toNum(M)
      case 'DD':
        return toNum(D)
      case 'hh':
        return toNum(h)
      case 'mm':
        return toNum(m)
      case 'ss':
        return toNum(s)
    }
  })
}

window.onload = function () {
  const progress = document.body.querySelector('.progress')
  let screenHeight = window.innerHeight
  let screenWidth = window.innerWidth
  let bodyHeight = document.body.offsetHeight - screenHeight
  let timer = null
  const handleScroll = function (e) {
    progress.style.width = Math.floor((e.currentTarget.scrollY / bodyHeight) * screenWidth) + 'px'
  }
  window.addEventListener('resize', function (e) {
    screenHeight = window.innerHeight
    screenWidth = window.innerWidth
    bodyHeight = document.body.offsetHeight - screenHeight
    handleScroll(e)
  })
  window.addEventListener('scroll', function (e) {
    handleScroll(e)
  }, false)
  
  const dateNode = document.body.querySelector('#date')
  const renderDate = function () {
    dateNode.innerHTML = new Date().format()
  }
  renderDate()
  if (timer) clearInterval(timer)
  timer = setInterval(renderDate, 1000)
}