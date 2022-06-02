import { ref, toRaw } from 'vue'
import { AddItem } from '@/utils/ProgramdataStrore'
import { resetFields, validate, formState, setFormState } from './Form'
import { message } from 'ant-design-vue'
import { EditItem, resetFields as EditResetFields } from './EditValidate'
import { getData } from '../index'
export const visible = ref<boolean>(false)
export const title = ref<string>('添加项目')
export let EditKey:number
export const handleOk = (e: MouseEvent): void => {
  console.log(e)
  // AddItem
  switch (title.value) {
    case '添加项目':
      validate().then(() => {
        AddItem(toRaw(formState).projectName, toRaw(formState).projectAddress, toRaw(formState).gitDepot).then(() => {
          message.success('添加成功')
          visible.value = false
          getData()
          resetFields()
        }).catch(() => {
          message.success('添加失败')
        })
      }).catch(err => {
        console.log(err, formState)
      })
      break
    case '编辑项目':
      EditItem()
      break
  }
}

export const handleClose = () => {
  resetFields()
  EditResetFields()
}

export const showModal = (): void => {
  visible.value = true
}
export const handleEdit = (value:ProgramEditForm) => {
  title.value = '编辑项目'
  EditKey = (value.key) as number
  visible.value = true
  setFormState(value)
}
