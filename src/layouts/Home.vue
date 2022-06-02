<template>
  <div class="container">
    <a-layout>
      <a-layout-sider v-model:collapsed="collapsed" :trigger="null" collapsible>
        <div class="logo" />
        <QMenu />
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
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
          &copy; 2021 光屁屁.All Rights Reserved.
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
.container .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.container .trigger:hover {
  color: #1890ff;
}

.container .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.3);
  margin: 16px;
}

.site-layout .site-layout-background {
  background: #fff;
}
.container {
  width: 100vw;
  height: 100vh;
  .ant-layout-has-sider {
    height: 100vh;
  }
  .ant-layout-sider {
    background: white;
  }
  .ant-layout-footer {
    padding: 0;
  }
}
</style>
