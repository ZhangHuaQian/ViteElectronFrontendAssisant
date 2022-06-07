import Axios from 'axios'
import { ref, nextTick } from 'vue'
type Spinning = boolean
let GridItem = ref<BookItem[]>([])
let spinning: Spinning = false
const Init = () => {
  spinning = true
  Axios.get('https://weekly.zoo.team/').then((res) => {
    return res.data.split('<script>')[1].split('</script>')[0].split('=')[1]
  }).then((res) => {
    return JSON.parse(res)
  }).then((res) => {
    GridItem.value = res.homeStore.cardList.reverse()
    spinning = false
  }).catch((e) => { console.log(e) })
}

export { Init, GridItem, spinning }
