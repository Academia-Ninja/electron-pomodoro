import { app, BrowserWindow, Menu } from 'electron'
import { join } from 'path'

import './backend'

if (require('electron-squirrel-startup')) {
  app.quit()
}

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 300,
    height: 400,
    resizable: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js')
    }
  })

  Menu.setApplicationMenu(null)

  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    mainWindow.loadFile(join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`))
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
