import { message } from 'ant-design-vue'
import { resetFields, validate, validateInfos, formState } from './Form'
import { toRaw } from 'vue'
import { UpdateItem } from '@/utils/ProgramdataStrore'
import { visible } from './Modal'
import { getData } from '../index'

const EditItem = () => {
  validate().then(() => {
    UpdateItem(toRaw(formState).key, toRaw(formState)).then(() => {
      message.success('修改成功')
      visible.value = false
      getData()
      resetFields()
    }).catch(() => {
      message.error('修改失败')
    })
  })
}

export { validateInfos, EditItem, resetFields }
