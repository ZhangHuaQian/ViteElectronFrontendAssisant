import { reactive, ref, UnwrapRef, toRaw } from 'vue'
import { cloneDeep } from 'lodash-es'
import { GetItem, DeleteItem, UpdateItem } from '@/utils/dataStrore'

const data:DataItem[] = []

const dataSource = ref(data)
const editableData: UnwrapRef<Record<string, DataItem>> = reactive({})

const edit = (key: number) => {
  editableData[key] = cloneDeep(dataSource.value.filter(item => key === item.key)[0])
}
const save = (key: number) => {
  Object.assign(dataSource.value.filter(item => key === item.key)[0], editableData[key])
  UpdateItem(key, toRaw(editableData[key]))
  delete editableData[key]
}
const getData = () => {
  GetItem().then(res => {
    dataSource.value = res as DataItem[]
  }).catch(_ => {
    console.log(_)
  })
}
const cancel = (key: number) => {
  delete editableData[key]
}
const onDelete = (key: number) => {
  console.log(key)
  DeleteItem(key).then(_ => {
    // console.log(_)
    getData()
  }).catch(_ => {
    console.log(_)
  })
}
const columns = [
  {
    title: '文章名称',
    dataIndex: 'articleName',
    width: '25%',
    slots: { customRender: 'articleName' }
  },
  {
    title: '文章URL',
    dataIndex: 'articleAddress',
    width: '40%',
    slots: { customRender: 'articleAddress' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

export { dataSource, editableData, edit, save, cancel, columns, onDelete, getData }
