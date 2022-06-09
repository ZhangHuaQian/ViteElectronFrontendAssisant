import useSaveFile from '@/utils/useSaveFile'
import { ipcRenderer } from 'electron';
import * as xlsx from 'xlsx'
export default function<T>(GetItem: () => Promise<any>){
    const useWorkBookOut=(data:T[])=>{
        let workbook = {
            SheetNames: ['sheet1'],
            Sheets: {
            }
        } as { SheetNames: string[], Sheets: { [key: string]: any } };
        workbook.Sheets['sheet1'] = xlsx.utils.json_to_sheet(data, {});
        let wopts: xlsx.WritingOptions = {
            bookType: 'xlsx' || 'xls', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'buffer' // 二进制格式
        }
        const wbout = xlsx.write(workbook, wopts);

        return wbout
    }
    return new Promise<string>((resolve, reject)=>{
        GetItem().then((data:T[]) => {
            let wbout = useWorkBookOut(data);
            const file = useSaveFile(
                {
                    DialogTitle: '保存文件',
                    FiltersName: 'XLSX',
                    FiltersExtensions: ['xlsx', 'xls'],
                },
                wbout
            )
            wbout = []
            file.then(res=>resolve(res)).catch(e=>reject(e)).finally(()=>{
                ipcRenderer.removeAllListeners('savaFileCallBack')
            })
        })
    })
    
}