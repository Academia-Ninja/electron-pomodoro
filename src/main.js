import { app, BrowserWindow, Menu } from 'electron'
import path from 'path'

import './backend'

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  if (process.platform === 'win32') {
    app.setAppUserModelId(app.name)
  }

  Menu.setApplicationMenu(null)

  const mainWindow = new BrowserWindow({
    width: 300,
    height: 320,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow.webContents.send('init')
  })

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
  }
}

const closeWindow = () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
}

const activateWindow = () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}

app.on('ready', createWindow)
app.on('window-all-closed', closeWindow)
app.on('activate', activateWindow)
