const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  filesSelect: () => ipcRenderer.invoke('files:select'),
  filesRename: (filePaths) => ipcRenderer.invoke('files:rename', filePaths)
})
