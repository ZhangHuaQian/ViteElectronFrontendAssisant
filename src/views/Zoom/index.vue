<template>
  <a-spin tip="Loading..." size="large" :spinning="spinning">
    <div class="Zoom">
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

</style>
