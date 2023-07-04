import './index.css'

document.addEventListener('load', function () {
  window.electronAPI.sayHello('Hello backend!')
  window.electronAPI.listenHello((event, args) => {
    console.log(args)
  })
})
