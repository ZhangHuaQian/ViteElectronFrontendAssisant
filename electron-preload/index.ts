import { ipcRenderer } from 'electron'

ipcRenderer.on('message', (_event, text) => {
  console.log(text)
})
