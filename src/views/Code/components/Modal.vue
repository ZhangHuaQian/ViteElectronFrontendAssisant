<template>
  <a-modal
    v-model:visible="visible"
    width="80vw"
    :title="props.modalTitle"
    :destroyOnClose="true"
    @cancel="handleCancel"
    @ok="handleOk"
  >
    <QForm />
  </a-modal>
</template>

<script lang="ts" setup>
import { visible, handleOk, handleCancel } from './Modal'
import QForm from './Form.vue'
import { withDefaults, defineProps } from 'vue'
interface Props {
  modalTitle?: string
}

const props = withDefaults(defineProps<Props>(), {
  modalTitle: '记录问题',
})
</script>

<style lang="scss" scoped></style>
