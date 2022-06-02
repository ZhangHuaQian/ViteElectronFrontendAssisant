<template>
  <div id="editor"></div>
</template>

<script setup lang="ts">
import { nextTick, withDefaults, defineProps, defineEmits, onBeforeUnmount } from 'vue'
import WangEditor from './wangEditor'
let EDITOR: WangEditor
interface Props {
  height?: number
  modelValue?: string
  uploadImgShowBase64?: boolean
  showLinkImg?: boolean
}

onBeforeUnmount(() => {
  EDITOR.clearEditor()
})

const props = withDefaults(defineProps<Props>(), {
  height: 300,
  uploadImgShowBase64: true,
  showLinkImg: false,
})

const emits = defineEmits(['update:modelValue'])
nextTick(() => {
  EDITOR = new WangEditor(
    '#editor',
    (newHtml: string) => {
      emits('update:modelValue', newHtml)
    },
    props
  )
  EDITOR.InitEditor(props.modelValue as string)
})
</script>

<style lang="scss" scoped></style>
