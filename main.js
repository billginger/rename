const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

const handleFilesSelect = async () => {
  const options = {
    properties: ['openFile', 'multiSelections']
  }
  const { canceled, filePaths } = await dialog.showOpenDialog(options)
  if (canceled) {
    return
  } else {
    return filePaths
  }
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('files:select', handleFilesSelect)
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
