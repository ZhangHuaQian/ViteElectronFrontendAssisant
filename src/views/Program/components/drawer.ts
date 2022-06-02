import { ref } from 'vue'
// import { exec, ChildProcess } from 'child_process'
import { ipcRenderer } from 'electron'
const visible = ref<boolean>(false)
let consoleData = ref<string[]>([])
// let workerProcess:ChildProcess

const afterVisibleChange = (bool: boolean) => {
  console.log('visible', bool)
}

const handleClick = (script:Scrips) => {
  ipcRenderer.send('NpmRunning', script.key, script.Path)
}

const handleClose = () => {
  ipcRenderer.send('NpmKill')
  // console.log('close')
  // const res:boolean = workerProcess.kill('SIGTERM')
  // console.log(workerProcess.pid, res)
}

const drawerClose = () => {
  consoleData = ref<string[]>([])
}

ipcRenderer.on('NpmRunningResult', (e, mess) => {
  consoleData.value.push(mess)
})
export { visible, afterVisibleChange, handleClick, handleClose, consoleData, drawerClose }
