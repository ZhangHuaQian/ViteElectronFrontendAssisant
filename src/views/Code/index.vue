<template>
  <div class="Code">
    <div class="nav">
      <a-tooltip title="记录代码" color="#BEBEBE" placement="bottom" @click="onAdd">
        <div class="AddButton">
          <PlusSquareOutlined :style="{ fontSize: '30px' }" />
        </div>
      </a-tooltip>
      <a-tooltip title="批量记录" color="#BEBEBE" placement="bottom" @click="hangleBulkImport">
        <div class="AddButton">
          <upload-outlined :style="{ fontSize: '30px' }" />
        </div>
      </a-tooltip>
      <a-tooltip title="批量导出" color="#BEBEBE" placement="bottom" @click="handleBulkExport">
        <div class="AddButton">
          <download-outlined :style="{ fontSize: '30px' }" />
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
import { PlusSquareOutlined, UploadOutlined, DownloadOutlined } from '@ant-design/icons-vue'
import QModal from './components/Modal.vue'
import {
  dataSource,
  getData,
  onDelete,
  columns,
  onEdit,
  onAdd,
  hangleBulkImport,
  handleBulkExport,
} from './index'
import { onMounted } from 'vue'

onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
