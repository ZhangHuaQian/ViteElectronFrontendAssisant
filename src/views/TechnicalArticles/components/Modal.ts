import { ref, toRaw } from 'vue'
import { formState, resetFields, validate } from './Form'
import { AddItem } from '@/utils/dataStrore'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'
import { getData } from '../index'
export const visible = ref<boolean>(false)
export const handleOk = (): void => {
  validate().then(() => {
    console.log('values', formState, toRaw(formState))
    AddItem({ articleAddress: toRaw(formState).articleAddress, articleName: toRaw(formState).articleName }).then(_ => {
      message.success('添加成功')
      resetFields()
      getData()
      visible.value = false
    }).catch(() => {
      message.success('添加失败')
    })
  }).catch((error: ValidateErrorEntity<TechnicalArticlesFormState>) => {
    console.log('error', error)
  })
}
export const showModal = (): void => {
  visible.value = true
}
