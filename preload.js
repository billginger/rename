const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  filesSelect: () => ipcRenderer.invoke('files:select')
})
