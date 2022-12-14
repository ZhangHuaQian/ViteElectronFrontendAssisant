import Axios from 'axios'
import { ref, nextTick } from 'vue'
type Spinning = boolean
let GridItem = ref<BookItem[]>([])
let spinning: Spinning = false
const Init = () => {
  spinning = true
  Axios.get('http://zoo.zhengcaiyun.cn/api/api/weeks/list/').then(res=>res.data.reverse()).then((res) => {
    GridItem.value = res
    spinning = false
  }).catch((e) => { console.log(e) })
}

export { Init, GridItem, spinning }
