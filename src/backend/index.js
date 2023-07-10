import { ipcMain } from 'electron'
import { notify } from './notification'

ipcMain.on('countdownFinished', (event) => {
  event.reply('countdownFinished')
  notify('Ciclo finalizado!', 'Vá beber uma água, relaxe...').show()
})
