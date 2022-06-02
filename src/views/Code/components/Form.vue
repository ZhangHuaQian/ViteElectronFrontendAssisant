<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol" :rules="rules">
    <a-form-item label="代码描述" v-bind="validateInfos.describe">
      <a-input v-model:value="formState.describe" />
    </a-form-item>
    <a-form-item label="代码片段" v-bind="validateInfos.solution">
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
