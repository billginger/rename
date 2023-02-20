document.getElementById('button-files-select').addEventListener('click', async () => {
  await window.files.select()
})
