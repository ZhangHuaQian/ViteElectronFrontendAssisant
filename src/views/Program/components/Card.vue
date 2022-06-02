<template>
    <a-card class="card" :title="props.data.projectName" style="width: 100%">
        <div class="cardContext">
            <a-form :label-col="labelCol" :wrapper-col="wrapperCol">
                <a-form-item label="项目名称">
                    <div>{{ props.data.projectName  }}</div>
                </a-form-item>
                <a-form-item label="项目地址">
                    <div>{{ props.data.projectAddress  }}</div>
                </a-form-item>
                <a-form-item label="git仓库地址">
                    <div>{{ props.data.gitDepot  }}  &nbsp;&nbsp;<a-tag color="cyan" style="cursor:pointer" @click="showGitModal(props.data)">提交代码</a-tag></div>
                </a-form-item>
                <a-form-item label="操作">
                    <a-button type="text" @click='handleEdit(props.data)'>编辑</a-button>
                    <a-button type="text" danger @click="handleDelece(props.data.key)">删除</a-button>
                </a-form-item>
            </a-form>
            <div class="ribbon">
                <div>
                    <a-button size="large" @click="showDrawer(props.data)">操作项目</a-button>&nbsp;&nbsp;&nbsp;
                    <!-- <a-button size="large" danger>关闭项目</a-button> -->
                </div>
                <!-- <div>
                    状态:&nbsp; <a-tag color="#87d068">运行中</a-tag> <a-tag color="orange">停止中</a-tag>
                </div>
                <div>
                    运行端口:&nbsp; <a-tag color="cyan">8080</a-tag>
                </div> -->
            </div>
        </div>
    </a-card>
</template>

<script lang="ts" setup>
import { reactive, defineProps } from 'vue'
import type { PropType } from 'vue'
import { showDrawer } from './Card'
import { handleEdit } from './Modal'
import { handleDelece } from '../index'
import { showGitModal } from './GitModal'
const labelCol = reactive({ span: 10 })
const wrapperCol = reactive({ span: 14 })

const props = defineProps({
  data: {
    type: Object as PropType<ProgramFormState>,
    default () {
      return {}
    }
  }
})

</script>

<style lang="scss" scoped>
.card {
    .cardContext {
        display: grid;
        grid-template-columns: 50% 50%;
        .ribbon {
            display: grid;
            grid-template-columns: 1fr;
            row-gap: 10px;
            .ribbon_com {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                background-color: red;
            }
        }
    }
}
</style>
