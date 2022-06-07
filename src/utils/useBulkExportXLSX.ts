import useSaveFile from '@/utils/useSaveFile'
import * as xlsx from 'xlsx'
export default (GetItem: () => Promise<any>) => {
    GetItem().then((data) => {
        let workbook = {
            SheetNames: ['sheet1'],
            Sheets: {
            }
        } as { SheetNames: string[], Sheets: { [key: string]: any } };
        workbook.Sheets['sheet1'] = xlsx.utils.json_to_sheet(data as CodeFormState[], {});
        let wopts: xlsx.WritingOptions = {
            bookType: 'xlsx' || 'xls', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'buffer' // 二进制格式
        }
        var wbout = xlsx.write(workbook, wopts);
        const file = useSaveFile(
            {
                DialogTitle: '保存文件',
                FiltersName: 'XLSX',
                FiltersExtensions: ['xlsx', 'xls'],
            },
            wbout
        )
    })
}