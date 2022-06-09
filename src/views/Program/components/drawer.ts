import { ref } from 'vue'
import { ipcRenderer } from 'electron'
import useLocalStore from '../../../utils/useLocalStore'
import { setNpmScripsPID } from './Card'
const visible = ref<boolean>(false)
let consoleData = ref<Record<any, string[]>>({})

const afterVisibleChange = (bool: boolean) => {
  console.log('visible', bool)
}
const handleClick = (script: Scrips) => {
  ipcRenderer.send('NpmRunning', script.key, script.Path, script.Name)
}

const handleClose = (key: string, KEYName: string) => {
  const { get, del } = useLocalStore(key)
  ipcRenderer.send('NpmKill', get().pid)
  setNpmScripsPID(KEYName, 0)
  del()
}

const drawerClose = () => {
  consoleData = ref<{ [key: string]: string[] }>({})
}

ipcRenderer.on('NpmRunningResult', (e, { PID, KEY, DATA, KEYName }) => {
  //第一次传输
  if (!consoleData.value[KEY]) {
    consoleData.value[KEY] = []
    const { set } = useLocalStore(KEY)
    set({ pid: PID })
    setNpmScripsPID(KEYName, PID)
  }
  consoleData.value[KEY].push(DATA)
})
export { visible, afterVisibleChange, handleClick, handleClose, consoleData, drawerClose }
