import { reactive, UnwrapRef, ref } from 'vue'
import { Form } from 'ant-design-vue'
const EditRef = ref()
const useForm = Form.useForm
// interface FormState {
//     projectName: string;
//     projectAddress: string;
//     gitDepot: string;
//     key: number;
// }
// interface EditForm {
//   projectName: string;
//   projectAddress: string;
//   gitDepot: string;
//   key: number;
// }
const editableData: UnwrapRef<ProgramEditForm> = reactive({
  projectName: '',
  projectAddress: '',
  gitDepot: '',
  key: 0,
})
const formState: UnwrapRef<ProgramFormState> = reactive({
  projectName: '',
  projectAddress: '',
  gitDepot: '',
  key: 0,
})
const rules = {
  projectName: [{ required: true, message: '请输入项目名称', trigger: 'blur' }],
  projectAddress: [{ required: true, message: '请输入项目地址', trigger: 'blur' }],
  gitDepot: [{ required: true, message: '请输入git仓库地址', trigger: 'blur' }],
}
const setFormState = (value: ProgramFormState) => {
  formState.gitDepot = value.gitDepot
  formState.projectAddress = value.projectAddress
  formState.projectName = value.projectName
  formState.key = value.key
}

const { validateInfos, resetFields, validate } = useForm(formState, rules)
export {
  formState,
  resetFields,
  validate,
  validateInfos,
  setFormState,
  editableData,
  EditRef,
  rules,
}
