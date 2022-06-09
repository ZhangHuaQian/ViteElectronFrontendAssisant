<template>
  <a-form :model="formState" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-item label="项目名称" v-bind="validateInfos.projectName">
      <a-input v-model:value="formState.projectName" />
    </a-form-item>
    <a-form-item label="项目地址" v-bind="validateInfos.projectAddress">
      <a-input v-model:value="formState.projectAddress" />
    </a-form-item>
    <a-form-item label="git仓库地址" v-bind="validateInfos.gitDepot">
      <a-input v-model:value="formState.gitDepot" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { formState, validateInfos } from './Form'

const labelCol = reactive({ span: 4 })
const wrapperCol = reactive({ span: 14 })
</script>

<style lang="scss" scoped></style>
