import useOpenFileForBuffer from '@/utils/useOpenFileForBuffer'
import * as xlsx from 'xlsx'
export default function <T>(addCallBack: (item: T) => Promise<any>, finallyCallBack: () => void) {
    return new Promise<string>((resolve, reject) => {
        const file = useOpenFileForBuffer(
            {
                DialogTitle: '读取文件',
                FiltersName: 'XLSX',
                FiltersExtensions: ['xlsx', 'xls'],
            },
        )
        file.then((res) => {
            const result = xlsx.read(res, {
                type: 'array',
            })
            const addData: T[] = xlsx.utils.sheet_to_json(result.Sheets[result.SheetNames[0]]);
            const errorArr: T[] = []
            addData.forEach((item, index) => {
                addCallBack(item).catch(e => { errorArr.push(item); reject(e) });
                if (addData.length === index + 1 && errorArr.length) {
                    console.log(errorArr)
                    resolve('存在未能导入成功的项')
                } else {
                    resolve('导入成功')
                }
            })

        }).catch((e) => {
            reject(e)
        }).finally(() => {
            finallyCallBack()
        })
    })
}