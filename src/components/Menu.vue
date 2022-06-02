<template>
  <a-menu id="menu" v-model:selectedKeys="selectedKeys" mode="inline" @click="handleClick">
    <template v-for="item in MenuItem" :key="item.to">
      <a-menu-item>
        <template #icon>
          <component :is="item.icon" />
        </template>
        <span>{{ item.name }}</span>
      </a-menu-item>
    </template>
  </a-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { MenuItem } from './Menu'
import { useRouter, useRoute } from 'vue-router'
const router = useRouter()
const route = useRoute()
const selectedKeys = ref<string[]>([route.path || '/Program'])
const handleClick = (e: any) => {
  router.push(e.key)
}
</script>

<style lang="scss"></style>
