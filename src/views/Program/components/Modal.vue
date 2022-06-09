<template>
  <a-modal
    v-model:visible="visible"
    width="80vw"
    :title="title"
    @ok="handleOk"
    @Cancel="handleClose"
    :destroyOnClose="true"
  >
    <QForm />
  </a-modal>
</template>

<script lang="ts" setup>
import { visible, handleOk, title, handleClose } from './Modal'
import QForm from './Form.vue'
import { defineComponent } from 'vue'

defineComponent({
  QForm,
})
</script>

<style lang="scss" scoped></style>
