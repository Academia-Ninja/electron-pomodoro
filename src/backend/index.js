import { ipcMain } from 'electron'

ipcMain.on('sayHello', (event, args) => {
  console.log(args)
  event.reply('sayHello', 'Hello frontend')
})
