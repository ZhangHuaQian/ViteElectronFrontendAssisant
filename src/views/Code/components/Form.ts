import { ref } from 'vue'
import { Form } from 'ant-design-vue'
const formRef = ref()
const formState = ref<CodeFormState>({
  describe: '',
  solution: '',
  key: 0
})
const EditForm = (value: CodeFormState) => {
  formState.value = value
}
const rules = {
  describe: [{ required: true, message: '请输入问题描述', trigger: 'blur' }],
  solution: [{ required: true, message: '请输入解决方案', trigger: 'blur' }]
}
const { resetFields, validate, validateInfos } = Form.useForm(formState, rules)
export { formState, rules, formRef, resetFields, validate, validateInfos, EditForm }
