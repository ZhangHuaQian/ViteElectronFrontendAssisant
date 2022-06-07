import { ipcRenderer } from 'electron';
import fs from 'fs';
interface OpenDialogArg {
    DialogTitle: string,
    FiltersName: string,
    FiltersExtensions: string[]
}


export default (arg: OpenDialogArg):Promise<Buffer>=> {
    return new Promise(async (resolve, reject) => {
        await ipcRenderer.send('openFile', arg);
        await ipcRenderer.on('openFileCallBack', async (e, result) => {
            if (!result.canceled) {
                fs.readFile(result.filePaths[0], {}, (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            } else {
                reject(new Error('已取消选择文件'))
            }
        })

    })


}