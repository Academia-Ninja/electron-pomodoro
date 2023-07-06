import { ipcMain } from 'electron'
import { notify } from './notification'

ipcMain.on('sayHello', (event, args) => {
  console.log(args)

  const message = 'Hello frontend'

  event.reply('sayHello', message)
  notify('sayHello', message).show()
})
