import { reactive, UnwrapRef, ref } from 'vue'
import { Form } from 'ant-design-vue'
const formRef = ref()
const formState: UnwrapRef<TechnicalArticlesFormState> = reactive({
  articleName: '',
  articleAddress: ''
})
const rules = {
  articleName: [
    { required: true, message: '请输入文章名称', trigger: 'blur' }
  ],
  articleAddress: [
    { required: true, message: '请输入文章地址', trigger: 'blur' }
  ]
}
const { resetFields, validate, validateInfos } = Form.useForm(formState, rules)
export { formState, rules, formRef, resetFields, validate, validateInfos }
