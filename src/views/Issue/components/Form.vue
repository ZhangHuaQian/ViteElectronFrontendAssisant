<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    <a-form-item label="问题描述" v-bind="validateInfos.issue">
      <a-input v-model:value="formState.issue" />
    </a-form-item>
    <a-form-item label="解决方案" v-bind="validateInfos.solution">
      <QWangEditor v-model="formState.solution" :uploadImgShowBase64="true" :showLinkImg="false" />
    </a-form-item>
  </a-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { formState, rules, validateInfos } from './Form'
import QWangEditor from '@/components/wangeditor/edit.vue'

const labelCol = reactive({ span: 4 })
const wrapperCol = reactive({ span: 14 })
</script>

<style scoped lang="scss"></style>
