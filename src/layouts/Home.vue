<template>
  <div class="Home">
    <a-layout>
      <a-layout-sider style="border-top: 1px solid #d0d0d0;border-bottom: 1px solid #d0d0d0;" v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" ></div>
        <QMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0;border-top: 1px solid #d0d0d0;border-left: 1px solid #d0d0d0;border-bottom: 1px solid #d0d0d0;">
          <menu-unfold-outlined
            v-if="collapsed"
            class="trigger"
            @click="() => (collapsed = !collapsed)"
          />
          <menu-fold-outlined v-else class="trigger" @click="() => (collapsed = !collapsed)" />
        </a-layout-header>
        <a-layout-content
          :style="{
            margin: '24px 16px',
            padding: '24px',
            background: '#fff',
            minHeight: '280px',
          }"
        >
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer style="text-align: center">
          &copy; 2021-2022 光屁屁.All Rights Reserved.
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>
<script lang="ts" setup>
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, ref } from 'vue'
import QMenu from '@/components/Menu.vue'
defineComponent({
  components: {
    UserOutlined,
    VideoCameraOutlined,
    UploadOutlined,
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    QMenu,
  },
})
let collapsed = ref<boolean>(false)
</script>
<style lang="scss">

</style>
