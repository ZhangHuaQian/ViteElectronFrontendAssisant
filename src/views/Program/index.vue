<template>
    <div class="Program">
        <div class="nav">
            <a-tooltip  title="添加项目" color="#BEBEBE" placement="rightBottom" @click="showModal">
                <div class="AddButton">
                    <PlusSquareOutlined :style="{fontSize: '30px'}" />
                </div>
            </a-tooltip>
        </div>
        <a-spin :spinning="spinning" :delay="delayTime">
            <div class="context">
            <template v-for="item in dataSource" :key="item.key">
                <div class="itemContext">
                <QCard :data="item" />
                </div>
            </template>
        </div>
        </a-spin>
    </div>
    <QModal />
    <QDrawer />
    <QGitModal />
</template>

<script lang="ts" setup>
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import { defineComponent, onMounted } from 'vue'
import { showModal } from './components/Modal'
import QModal from './components/Modal.vue'
import QCard from './components/Card.vue'
import QDrawer from './components/drawer.vue'
import QGitModal from './components/GitModal.vue'
import { getData, dataSource, spinning, delayTime } from './index'

defineComponent({
  PlusSquareOutlined,
  QModal,
  QCard,
  QDrawer,
  QGitModal
})

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.Program {
    display: grid;
    grid-template-rows: 50px auto;
  .nav {
      display: grid;
      height: 100%;
      justify-content: start;
      align-content: center;
  }
  .context {
      display: grid;
      height: 77vh;
      overflow-y: scroll;
      width: 100%;
      grid-template-columns: 1fr;
      background:#f4f4f4;
      justify-content: center;
      padding: 30px;
      column-gap: 20px;
      row-gap: 20px;
      .itemContext {
          display: grid;
          width: 100%;
          height: 331px;
          background-color: gray;
          box-shadow: 0 0 20px gray
      }
  }

.context::-webkit-scrollbar{width:4px}
.context::-webkit-scrollbar-track{background-color:#ccc;}
.context::-webkit-scrollbar-thumb{background-color:#fff;}
}

</style>
