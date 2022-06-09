import { GetItem, DeleteItem } from '@/utils/ProgramdataStrore'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
const data: ProgramEditForm[] = []
const dataSource = ref(data)
const spinning = ref<boolean>(false)
const delayTime = ref<number>(2000)
const handleDelece = (key: number) => {
  DeleteItem(key)
    .then(() => {
      message.success('删除成功')
      getData()
    })
    .catch(() => {
      message.error('删除失败')
    })
}

const getData = () => {
  spinning.value = true
  GetItem()
    .then((_) => {
      dataSource.value = _ as ProgramEditForm[]
    })
    .catch((e) => {
      console.log(e, '8')
    })
    .finally(() => {
      spinning.value = false
    })
}

export { handleDelece, getData, dataSource, spinning, delayTime }
