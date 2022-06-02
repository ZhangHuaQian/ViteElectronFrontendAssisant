<template>
    <a-modal v-model:visible="visible" title="备注信息" :destroyOnClose="true" @cancel="handleClose" @ok="handleOk" okText="提交" cancelText="退出">
        <a-input v-model:value="gitCommitMessage" placeholder="请输入备注信息" />

        <div>
            输出：
            <div v-for="item in gitOutConsole" :key="item" >{{ item }}</div>
        </div>
    </a-modal>
</template>

<script lang="ts" setup>
import { visible, handleOk, gitCommitMessage, handleClose, gitOutConsole } from './GitModal'
</script>
