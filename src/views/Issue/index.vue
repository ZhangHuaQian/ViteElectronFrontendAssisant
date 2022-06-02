<template>
  <div class="issue">
    <div class="nav">
      <a-tooltip title="记录问题" color="#BEBEBE" placement="rightBottom" @click="onAdd">
        <div class="AddButton">
          <PlusSquareOutlined :style="{ fontSize: '30px' }" />
        </div>
      </a-tooltip>
    </div>
    <div class="context">
      <a-table :columns="columns" :data-source="dataSource" bordered>
        <template #solution="{ text }">
          <div v-html="text"></div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span>
              <a @click="onEdit(record.key)">Edit</a>
            </span>
            <span v-if="dataSource.length">
              <a-popconfirm title="Sure to delete?" @confirm="onDelete(record.key)">
                <a>Delete</a>
              </a-popconfirm>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
  <QModal :modalTitle="modalTitle" :modalType="modalType" />
</template>

<script lang="ts" setup>
import { modalTitle, modalType } from './components/Modal'
import { PlusSquareOutlined } from '@ant-design/icons-vue'
import QModal from './components/Modal.vue'
import { dataSource, getData, onDelete, columns, onEdit, onAdd } from './index'
import { onMounted } from 'vue'

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped>
.issue {
  // display: grid;
  // grid-template-rows: 80px 83vh;
  display: flex;
  flex-direction: column;
  .nav {
    display: grid;
    height: 50px;
    justify-content: start;
    align-content: center;
    // padding-left: 20px;
    // background: #a4aca7;
  }
  .context {
    background: #f4f4f4;
    display: grid;
    height: 77vh;
    overflow-y: scroll;
    padding-top: 15px;
    padding-left: 15px;
    padding-right: 15px;
    .editable-row-operations {
      display: inline;
      a {
        margin-right: 8px;
      }
    }
  }
}
.context::-webkit-scrollbar {
  width: 4px;
}
.context::-webkit-scrollbar-track {
  background-color: #ccc;
}
.context::-webkit-scrollbar-thumb {
  background-color: #fff;
}
</style>
