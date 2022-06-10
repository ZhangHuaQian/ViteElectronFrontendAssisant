<template>
  <a-drawer
    title="选择命令"
    placement="right"
    :destroyOnClose="true"
    :maskClosable="false"
    @close="drawerClose"
    width="900"
    v-model:visible="visible"
    class="programDrawer"
  >
    <template v-for="item in NpmScrips" :key="item.key">
      <div style="margin: 5px">
        <a-button type="dashed" @click="handleClick(item)">
          <template #icon>
            <ToolOutlined />
          </template>
          {{ item.key }}
        </a-button>
        <a-button
          style="margin-left: 10px"
          type="dashed"
          :disabled="!item.pid"
          @click="handleClose(`${item.Name}-${item.key}`, item.key)"
        >
          关闭进程
        </a-button>
        <a-button style="margin-left: 10px" type="dashed" :disabled="!item.pid">
          进程号:{{ item.pid }}
        </a-button>
      </div>
    </template>
    <nav>控制台输出</nav>
    <div class="ProgramDrawer">
      <template v-for="[key, value] in Object.entries(consoleData)" :key="key">
        <template v-for="item in value">
          <div v-html="item"></div>
        </template>
      </template>
    </div>
  </a-drawer>
</template>

<script lang="ts" setup>
import { visible, handleClick, handleClose, consoleData, drawerClose } from './drawer'
import { NpmScrips } from './Card'
import { defineComponent } from 'vue'
import { ToolOutlined } from '@ant-design/icons-vue'

defineComponent({
  components: {
    ToolOutlined,
  },
})
</script>

<style lang="scss" scoped></style>
