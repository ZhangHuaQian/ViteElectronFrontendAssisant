import { readFile } from 'fs'
import { ref } from 'vue'
import { visible } from './drawer'
import { message } from 'ant-design-vue'

const NpmScrips = ref<Scrips[]>([])

const showDrawer = (ActionData: ProgramFormState) => {
  readFile(ActionData.projectAddress + '/package.json', 'utf8', (err, data) => {
    if (err) {
      console.log(err)
      message.error('无package.json文件')
      return
    }
    const readData = JSON.parse(data)
    const scriptsKey = Object.keys(readData.scripts)
    NpmScrips.value = scriptsKey.map(_ => {
      return {
        key: _,
        Path: ActionData.projectAddress
      }
    })
    visible.value = true
  })
}

export { showDrawer, NpmScrips }
