<template>
    <a-modal v-model:visible="visible" width="80vw" title="添加宝藏文章" @ok="handleOk">
      <QForm />
    </a-modal>
</template>

<script lang="ts" setup>
import { visible, handleOk } from './Modal'
import QForm from './Form.vue'
import { defineComponent } from 'vue'

defineComponent({
  QForm
})
</script>

<style lang="scss" scoped>

</style>
