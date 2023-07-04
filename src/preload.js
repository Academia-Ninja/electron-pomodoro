import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld('electronAPI', {
  sayHello: (text) => ipcRenderer.send('sayHello', text),
  listenHello: (callback) => ipcRenderer.on('sayHello', callback)
})
