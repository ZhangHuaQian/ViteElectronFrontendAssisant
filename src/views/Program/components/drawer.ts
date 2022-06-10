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

/**
 *
 *
 * @param {string} key (标识)
 * @param {string} KEYName (npm方法名)
 */
const handleClose = (key: string, KEYName: string) => {
  const { get, del } = useLocalStore(key)
  ipcRenderer.send('NpmKill', get().pid)
  setNpmScripsPID(KEYName, 0)
  del()
  // 暴力去除 key
  delete consoleData.value[key]
}

const drawerClose = () => {
  consoleData = ref<Record<any, string[]>>({})
}

const filterText = (DATA:any)=>{
  const eChar = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M','q','w','e','r','t','y','u','i','o','p','a','s','d','f','g','h','j','k','l','z','x','c','v','b','n','m']
  const rightChar = [',','.',';',':',' ','\n','\\','>','@','0','1','2','3','4','5','6','7','8','9','[',']','{','}','(',')','*','%','-','`','/'].concat(eChar)
  const strArr = new TextDecoder("GBK").decode(DATA).split('')
  const result = strArr.filter(item=>{
      return rightChar.includes(item)
     })
  return result.join("")
              // .replaceAll('[39m','<br/>')
              .replaceAll('\n','<br/>')
              .replaceAll(/\[\d+m/g,'');
}

ipcRenderer.on('NpmRunningResult', (e, { PID, KEY, DATA, KEYName }) => {
  //第一次传输
  if (!consoleData.value[KEY]) {
    consoleData.value[KEY] = []
    const { set } = useLocalStore(KEY)
    set({ pid: PID })
    setNpmScripsPID(KEYName, PID)
  }
  const str = filterText(DATA)
  console.log(str)
  consoleData.value[KEY].push(str)
})
export { visible, afterVisibleChange, handleClick, handleClose, consoleData, drawerClose }
