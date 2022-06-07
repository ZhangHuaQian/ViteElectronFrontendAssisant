import { ipcRenderer } from 'electron';
import fs from 'fs';
interface OpenDialogArg {
    DialogTitle: string,
    FiltersName: string,
    FiltersExtensions: string[]
}


export default (arg: OpenDialogArg, data: Buffer): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        await ipcRenderer.send('savaFile', arg);
        await ipcRenderer.on('savaFileCallBack', async (e, result) => {
            if (!result.canceled) {
                fs.writeFile(result.filePath, data, {}, (err) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve('保存成功')
                    }
                })
            } else {
                reject(new Error('已保存选择文件'))
            }
        })

    })


}