import { GetItem, DeleteItem, GetKeyToItem, AddItem } from '@/utils/IssuedataStrore'
import { message } from 'ant-design-vue'
import { ref } from 'vue'
// import { resetFields, validate } from './components/Form'
import { showModal, setModalTitle, setModalType } from './components/Modal'
import { EditForm } from './components/Form'
import useBulkImportXLSX from '@/utils/useBulkImportXLSX'
import useBulkExportXLSX from '@/utils/useBulkExportXLSX'
const data: IssueFormState[] = []

const dataSource = ref(data)

const onEdit = (key: number) => {
  GetKeyToItem(key).then((_) => {
    EditForm(_ as IssueFormState)
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
  useBulkImportXLSX(AddItem, getData)
    .then((res) => {
      message.success(res)
    })
    .catch((e) => {
      message.error(e?.message)
    })
}

const handleBulkExport = async () => {
  useBulkExportXLSX(GetItem)
    .then((res) => {
      message.success(res)
    })
    .catch((e) => {
      message.error(e?.message)
    })
}
const getData = () => {
  GetItem()
    .then((res) => {
      dataSource.value = res as IssueFormState[]
      message.success('获取成功')
    })
    .catch((_) => {
      console.log(_)
    })
}

const onDelete = (key: number) => {
  DeleteItem(key)
    .then((_) => {
      console.log(_)
      getData()
    })
    .catch((_) => {
      console.log(_)
    })
}

const columns = [
  {
    title: '问题简述',
    dataIndex: 'issue',
    width: '25%',
    slots: { customRender: 'issue' },
  },
  {
    title: '解决方案',
    dataIndex: 'solution',
    width: '40%',
    slots: { customRender: 'solution' },
  },
  {
    title: 'operation',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
  },
]

export { getData, onDelete, dataSource, columns, onEdit, onAdd, hangleBulkImport, handleBulkExport }
