import { ipcMain } from 'electron'
import { notify } from './notification'

ipcMain.on('countdownFinished', (event) => {
  event.reply('countdownFinished')
  notify('Sessão finalizada!', 'Vá beber uma água, relaxe...').show()
})
