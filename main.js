const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('files:select', () => {
    dialog.showOpenDialog({
      properties: ['openFile', 'multiSelections']
    }).then(result => {
      console.log(result.canceled)
      console.log(result.filePaths)
    }).catch(err => {
      console.log(err)
    })
  })

  // 打开开发工具
  win.webContents.openDevTools()
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
