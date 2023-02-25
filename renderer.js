let filePathsGlobal = []

const textCharactersSearch = document.getElementById('text-characters-search')
const textCharactersReplace = document.getElementById('text-characters-replace')
const buttonFilesRename = document.getElementById('button-files-rename')

const preview = () => {
  const fileNames = filePathsGlobal.map((filePath, index) => {
    const fileNumber = index + 1
    const filePathArray = filePath.split('\\')
    const fileNameIndex = filePathArray.length - 1
    const fileName = filePathArray[fileNameIndex]
    const charactersSearch = textCharactersSearch.value
    const charactersReplace = textCharactersReplace.value
    const fileNameNew = fileName.replace(charactersSearch, charactersReplace)
    return `<tr><td>${fileNumber}</td><td>${fileName}</td><td>${fileNameNew}</td></tr>`
  })
  const fileNamesHtml = fileNames.join('')
  document.getElementById('files-list').innerHTML = fileNamesHtml
}

document.querySelectorAll('input').forEach(element => {
  element.addEventListener('input', async () => {
    if (!filePathsGlobal || !filePathsGlobal.length) {
      return
    }
    preview()
  })
})

document.getElementById('button-files-select').addEventListener('click', async () => {
  const filePaths = await window.electronAPI.filesSelect()
  if (!filePaths || !filePaths.length) {
    return
  }
  filePathsGlobal = filePaths
  preview()
})

buttonFilesRename.addEventListener('click', async () => {
  if (!filePathsGlobal || !filePathsGlobal.length) {
    return
  }
  buttonFilesRename.disable = true
  const filePaths = filePathsGlobal.map((filePath) => {
    const filePathArray = filePath.split('\\')
    const fileNameIndex = filePathArray.length - 1
    const fileName = filePathArray[fileNameIndex]
    const charactersSearch = textCharactersSearch.value
    const charactersReplace = textCharactersReplace.value
    const fileNameNew = fileName.replace(charactersSearch, charactersReplace)
    const filePathNew = filePathArray.fill(fileNameNew, fileNameIndex).join('\\')
    return [filePath, filePathNew]
  })
  const result = await window.electronAPI.filesRename(filePaths)
  console.log(result);
  buttonFilesRename.disable = false
})
