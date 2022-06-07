import useOpenFileForBuffer from '@/utils/useOpenFileForBuffer'
import * as xlsx from 'xlsx'
export default (addCallBack: (describe: string, solution: string) => Promise<any>, finallyCallBack: () => void) => {
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
        const addData = xlsx.utils.sheet_to_json(result.Sheets[result.SheetNames[0]]) as CodeFormState[] || [];
        addData.forEach(item => {
            addCallBack(item?.describe, item?.solution)
        })
    }).catch((e) => {
        console.log(e)
    }).finally(() => {
        finallyCallBack()
    })
}