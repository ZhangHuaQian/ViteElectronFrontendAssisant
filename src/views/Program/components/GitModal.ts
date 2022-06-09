import { ref, reactive } from 'vue'
import { execSync, ChildProcess } from 'child_process'
const visible = ref<boolean>(false)
let gitCommitMessage = ref<string>('')
let gitPush
let gitAdd
let gitCommit
let gitPull
let GitPushInfoData = reactive<ProgramFormState>({
  projectName: '',
  projectAddress: '',
  gitDepot: '',
  key: 0,
})
let gitOutConsole = ref<string[]>([])
const handleOk = (e: MouseEvent) => {
  console.log(e, gitCommitMessage)
  // visible.value = false
  gitAdd = execSync('git add .', {
    cwd: GitPushInfoData.projectAddress,
    shell: 'powershell',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 1024,
  })
  gitCommit = execSync('git commit -m ' + gitCommitMessage.value, {
    cwd: GitPushInfoData.projectAddress,
    shell: 'powershell',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 1024,
  })
  gitPull = execSync('git pull origin master', {
    cwd: GitPushInfoData.projectAddress,
    shell: 'powershell',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 1024,
  })
  gitPush = execSync('git push -u origin master', {
    cwd: GitPushInfoData.projectAddress,
    shell: 'powershell',
    encoding: 'utf8',
    maxBuffer: 1024 * 1024 * 1024,
  })

  console.log(gitAdd, '-1\n', gitCommit, '-2\n', gitPull, '-3\n', gitPush, '-4')
  gitOutConsole.value.push(gitAdd, gitCommit, gitPull, gitPush)
}

const showGitModal = (data: ProgramFormState) => {
  GitPushInfoData = data
  visible.value = true
}
const handleClose = () => {
  visible.value = false
  gitCommitMessage = ref<string>('')
  gitOutConsole = ref<string[]>([])
}

export {
  handleOk,
  showGitModal,
  visible,
  gitCommitMessage,
  GitPushInfoData,
  handleClose,
  gitOutConsole,
}
