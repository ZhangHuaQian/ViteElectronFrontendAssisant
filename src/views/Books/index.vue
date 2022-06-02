<template>
  <a-spin tip="Loading..." size="large" :spinning="spinning">
    <div class="box">
      <div class="item" v-for="item in GridItem" :key="item.id">
        <a :href="'https://weekly.zoo.team/detail/' + item.count" target="_block">
          <div class="images">
            <QImage :src="'https://weekly.zoo.team/static/images/' + item.count + '.png'"></QImage>
          </div>
          <div class="title">
            {{ item.title }}
          </div>
        </a>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts" setup>
import { Init, GridItem, spinning } from './index'
import { onMounted } from 'vue'
import QImage from './components/Images.vue'

onMounted(() => {
  Init()
})
</script>

<style lang="scss" scoped>
.box {
  background: #f4f4f4;
  width: 100%;
  height: 77vh;
  overflow-y: scroll;
  // padding: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 15px;
  .item {
    background: #ffffff;
    width: 250px;
    height: 250px;
    margin: 7px;
    box-shadow: 10px 10px 5px rgba(100, 100, 100, 0.5);
    border-radius: 5px;
    a {
      display: grid;
      grid-template-rows: 8fr 1fr;
      .title {
        font-family: Pacifico, cursive;
        color: #666;
        font-size: 1rem;
      }
      .images {
        display: grid;
        justify-content: center;
        align-content: center;
      }
    }
  }
  .item:hover {
    transform: translateY(-5px);
  }
}

.box::-webkit-scrollbar {
  width: 4px;
}
.box::-webkit-scrollbar-track {
  background-color: #ccc;
}
.box::-webkit-scrollbar-thumb {
  background-color: #fff;
}
</style>
