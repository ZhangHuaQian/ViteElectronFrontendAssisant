<template>
  <a-form
    :model="formState"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
    :rules="rules"
  >
    <a-form-item label="文章名称" v-bind="validateInfos.articleName">
      <a-input v-model:value="formState.articleName" />
    </a-form-item>
    <a-form-item label="文章URL" v-bind="validateInfos.articleAddress">
      <a-input v-model:value="formState.articleAddress" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { formState, rules, validateInfos } from './Form'

const labelCol = reactive({ span: 4 })
const wrapperCol = reactive({ span: 14 })
</script>

<style lang="scss" scoped></style>
