<template>
  <div class="TechnicalArticles">
    <div class="nav">
      <a-tooltip title="添加宝藏文章" color="#c6dfc8" placement="rightBottom" @click="showModal">
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
        <template
          v-for="col in ['articleName', 'articleAddress']"
          #[col]="{ text, record }"
          :key="col"
        >
          <div>
            <a-input
              v-if="editableData[record.key]"
              v-model:value="editableData[record.key][col]"
              style="margin: -5px 0"
            />
            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <a @click="save(record.key)">Save</a>
              <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.key)">
                <a>Cancel</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="edit(record.key)">Edit</a>
            </span>
            <span v-if="dataSource.length">
              <a-popconfirm title="Sure to delete?" @confirm="onDelete(record.key)">
                <a>Delete</a>
              </a-popconfirm>
            </span>
            <span v-if="dataSource.length">
              <a :href="record.articleAddress" target="_block">view</a>
            </span>
          </div>
        </template>
      </a-table>
    </div>
  </div>
  <QModal />
</template>

<script lang="ts" setup>
import {
  PlusSquareOutlined,
  CheckOutlined,
  EditOutlined,
  UploadOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue'
import { defineComponent, onMounted } from 'vue'
import { showModal } from './components/Modal'
import QModal from './components/Modal.vue'
import { dataSource, editableData, edit, save, cancel, columns, onDelete, getData } from './index'

defineComponent({
  PlusSquareOutlined,
  QModal,
  CheckOutlined,
  EditOutlined,
})
onMounted(() => {
  getData()
})
</script>

<style lang="scss" scoped></style>
