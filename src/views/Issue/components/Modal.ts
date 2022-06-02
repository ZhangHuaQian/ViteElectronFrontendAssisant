import { ref } from 'vue'
import { getData } from '../index'
import { formState, resetFields, validate } from './Form'
import { AddItem, UpdateItem } from '@/utils/IssuedataStrore'
import { ValidateErrorEntity } from 'ant-design-vue/es/form/interface'
import { message } from 'ant-design-vue'
const visible = ref<boolean>(false)
const modalTitle = ref<string>('')
const modalType = ref<string>('')
const handleOk = (): void => {
  validate().then(() => {
    switch (modalType.value) {
      case 'ADD':
        AddItem(formState.value.issue, formState.value.solution).then(_ => {
          console.log(_)
          message.success('添加成功')
          resetFields()
          getData()
          visible.value = false
        }).catch(_ => {
          console.log(_)
          message.success('添加失败')
        })
        break

      case 'EDIT':
        UpdateItem(formState.value.key, formState.value).then(_ => {
          console.log(_)
          message.success('修改成功')
          resetFields()
          getData()
          visible.value = false
        }).catch(_ => {
          console.log(_)
          message.success('修改失败')
        })
        break
    }
  }).catch((error: ValidateErrorEntity<IssueFormState>) => {
    console.log('error', error)
  })
}

const handleCancel = () => {
  resetFields()
}
const showModal = (): void => {
  visible.value = true
}

const setModalTitle = (value: string) => {
  modalTitle.value = value
}

const setModalType = (value: string) => {
  modalType.value = value
}

export { visible, modalTitle, modalType, handleOk, showModal, setModalTitle, setModalType, handleCancel }
