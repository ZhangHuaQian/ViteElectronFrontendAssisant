const electron = window.require('electron')
const { ipcRenderer } = electron
export function handleMinimize (): void {
  ipcRenderer.send('minimize')
}
export function handleClose (): void {
  ipcRenderer.send('close')
}
