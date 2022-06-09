import { Dialog } from 'electron'
interface OpenDialogArg {
  DialogTitle: string
  FiltersName: string
  FiltersExtensions: string[]
}
export default (dialog: Dialog, { DialogTitle, FiltersName, FiltersExtensions }: OpenDialogArg) => {
  return new Promise((resolve, reject) => {
    dialog
      .showOpenDialog({
        title: DialogTitle,
        //过滤文件后缀
        filters: [
          {
            name: FiltersName,
            extensions: FiltersExtensions,
          },
        ],
        //打开按钮
        buttonLabel: '打开文件',
      })
      .then((result) => {
        resolve(result)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
