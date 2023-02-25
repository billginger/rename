const { app, BrowserWindow, ipcMain, dialog } = require('electron')
const path = require('path')
const fs = require('fs')

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

const handleFilesRename = (event, filePaths) => {
  try {
    for (let filePath of filePaths) {
      fs.renameSync(filePath[0], filePath[1])
    }
  } catch (err) {
    return err
  }
  return 'success'
}

const createWindow = () => {
  const win = new BrowserWindow({
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  ipcMain.handle('files:select', handleFilesSelect)
  ipcMain.handle('files:rename', handleFilesRename)
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
