import { readFile } from 'fs'
import { ref } from 'vue'
import { visible } from './drawer'
import { message } from 'ant-design-vue'
import useLocalStore from '../../../utils/useLocalStore';

const NpmScrips = ref<Scrips[]>([])

const showDrawer = (ActionData: ProgramFormState) => {
  readFile(ActionData.projectAddress + '/package.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      message.error('无package.json文件')
      return
    }
    const readData = JSON.parse(data)
    const scriptsKey = Object.keys(readData.scripts);


    NpmScrips.value = scriptsKey.map(_ => {
      const { get } = useLocalStore(`${ActionData.projectName}-${_}`);
      const p = get()?.pid
      return {
        key: _,
        Path: ActionData.projectAddress,
        Name: ActionData.projectName,
        pid: p ? p : 0
      }
    })
    visible.value = true
  })
}

const setNpmScripsPID = (key: string, pid: number) => {
  NpmScrips.value.map(item => {
    if (item.key === key) {
      item.pid = pid
    }
  })
}

export { showDrawer, NpmScrips, setNpmScripsPID }
