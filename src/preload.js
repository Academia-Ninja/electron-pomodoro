import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  countdownFinished: () => ipcRenderer.send('countdownFinished')
})
