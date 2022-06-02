<template>
  <div class="TechnicalArticles">
    <div class="nav">
      <a-tooltip title="添加宝藏文章" color="#c6dfc8" placement="rightBottom" @click="showModal">
        <div class="AddButton">
          <PlusSquareOutlined :style="{ fontSize: '30px' }" />
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
import { PlusSquareOutlined, CheckOutlined, EditOutlined } from '@ant-design/icons-vue'
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

<style lang="scss" scoped>
.TechnicalArticles {
  display: grid;
  grid-template-rows: 50px auto;
  .nav {
    display: grid;
    height: 100%;
    justify-content: start;
    align-content: center;
    //   padding-left:20px;
    //   background: #a4aca7;
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
