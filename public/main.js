window.onload = function () {
  const progress = document.body.querySelector('.progress')
  const screenHeight = window.innerHeight
  const screenWidth = window.innerWidth
  const bodyHeight = document.body.offsetHeight - screenHeight
  window.addEventListener('scroll', function (e) {
    // @ts-ignore
    progress.style.width = Math.floor((e.currentTarget.scrollY / bodyHeight) * screenWidth) + 'px'
  }, false)
}