import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('api', {
  // * To renderer
  onInit: (callback) => ipcRenderer.on('init', callback),
  // * To main
  countdownFinished: () => ipcRenderer.send('countdownFinished')
})
