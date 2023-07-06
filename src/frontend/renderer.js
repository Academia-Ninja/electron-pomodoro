import './index.css'

window.addEventListener('load', () => {
  window.electronAPI.sayHello('Hello backend!')
  window.electronAPI.listenHello((event, args) => {
    console.log(args)
  })
})
