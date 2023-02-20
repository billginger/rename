const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('files', {
  select: () => ipcRenderer.invoke('files:select')
})
