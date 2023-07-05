import './index.css'

document.addEventListener('DOMContentLoaded', function () {
  window.electronAPI.sayHello('Hello backend!')
  window.electronAPI.listenHello((event, args) => {
    console.log(args)
  })
})
