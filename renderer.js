let filePathsGlobal = []

const preview = () => {
  const fileNames = filePathsGlobal.map((filePath, index) => {
    const fileNumber = index + 1
    const filePathArray = filePath.split('\\')
    const fileName = filePathArray[filePathArray.length - 1]
    const charactersSearch = document.getElementById('text-characters-search').value
    const charactersReplace = document.getElementById('text-characters-replace').value
    const fileNameNew = fileName.replace(charactersSearch, charactersReplace)
    return `<tr><td>${fileNumber}</td><td>${fileName}</td><td>${fileNameNew}</td></tr>`
  })
  const fileNamesHtml = fileNames.join('')
  document.getElementById('files-list').innerHTML = fileNamesHtml
}

document.getElementById('button-files-select').addEventListener('click', async () => {
  const filePaths = await window.electronAPI.filesSelect()
  if (!filePaths || !filePaths.length) {
    return
  }
  filePathsGlobal = filePaths
  preview()
})

document.querySelectorAll('input').forEach(element => {
  element.addEventListener('input', async () => {
    if (!filePathsGlobal || !filePathsGlobal.length) {
      return
    }
    preview()
  })
})
