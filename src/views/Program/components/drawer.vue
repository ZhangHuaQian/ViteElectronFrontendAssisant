<template>
    <a-drawer
        title="选择命令"
        placement="right"
        :destroyOnClose="true"
        :maskClosable="false"
        @close="drawerClose"
        width="640"
        v-model:visible="visible"
    >
        <template v-for="item in NpmScrips" :key="item.key">
            <div style="margin:5px">
                <a-button type="dashed" @click="handleClick(item)">
                    <template #icon>
                        <ToolOutlined />
                    </template>
                    {{ item.key }}
                </a-button>
                <a-button style="margin-left: 10px;" type="dashed" @click="handleClose">关闭进程</a-button>
            </div>
        </template>
        <div class="containers">
            <a-list item-layout="horizontal" :data-source="consoleData">
                <template #renderItem="{ item }">
                    <a-list-item>
                        <a-list-item-meta :description="item"></a-list-item-meta>
                    </a-list-item>
                </template>
            </a-list>
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
    ToolOutlined
  }
})

</script>

<style lang="scss" scoped>
.containers {
    margin-top: 20px;
    height: 760px;
    overflow-y: scroll;
}
.containers::-webkit-scrollbar {
    width: 4px;
}
.containers::-webkit-scrollbar-track {
    background-color: #fff;
}
.containers::-webkit-scrollbar-thumb {
    background-color: #ccc;
}
</style>
