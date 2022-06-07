<template>
  <router-view></router-view>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import QMenu from '@/components/Menu.vue'
import { ipcRenderer } from 'electron'
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  ipcRenderer.send('contextmenu')
})
defineComponent({
  components: {
    QMenu,
  },
})
</script>

<style lang="scss">
@import url(./App.module.scss);

</style>
