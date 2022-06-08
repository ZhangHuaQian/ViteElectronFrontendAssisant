import { GetItem, DeleteItem, GetKeyToItem, AddItem } from '@/utils/CodedataStrore'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
// import { resetFields, validate } from './components/Form'
import { showModal, setModalTitle, setModalType } from './components/Modal'
import { EditForm } from './components/Form'

import useBulkImportXLSX from '@/utils/useBulkImportXLSX'
import useBulkExportXLSX from '@/utils/useBulkExportXLSX'
const data: CodeFormState[] = []

const dataSource = ref(data)

const onEdit = (key: number) => {
  GetKeyToItem(key).then((_) => {
    EditForm(_ as CodeFormState)
    setModalTitle('修改问题')
    setModalType('EDIT')
    showModal()
  })
}
const onAdd = () => {
  setModalTitle('记录问题')
  setModalType('ADD')
  showModal()
}
const hangleBulkImport = () => {
  useBulkImportXLSX(AddItem, getData).then(res => {
    message.success(res)
  }).catch(e => {
    message.error(e?.message)
  })
}

const handleBulkExport = async () => {
  useBulkExportXLSX(GetItem).then(res => {
    message.success(res)
  }).catch(e => {
    message.error(e?.message)
  })

}

const getData = () => {
  GetItem().then((res) => {
    dataSource.value = res as CodeFormState[];
    message.success('获取成功')
  }).catch((_: Event) => {
    console.log(_)
  })
}

const onDelete = (key: number) => {
  DeleteItem(key).then(() => {
    getData()
  }).catch((_: Event) => {
    console.log(_)
  })
}

const columns = [
  {
    title: '代码简述',
    dataIndex: 'describe',
    width: '25%',
    slots: { customRender: 'describe' }
  },
  {
    title: '代码片段',
    dataIndex: 'solution',
    width: '40%',
    slots: { customRender: 'solution' }
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slots: { customRender: 'operation' }
  }
]

export { getData, onDelete, dataSource, columns, onEdit, onAdd, hangleBulkImport, handleBulkExport }
