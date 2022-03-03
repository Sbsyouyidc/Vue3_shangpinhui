<template>
  <div class="pagination">
    <button v-if="pageNo > 1" @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button v-if="startAndEnd.start > 1" :class="{active: pageNo==1}" @click="$emit('getPageNo', 1)">1</button>
    <button v-if="startAndEnd.start > 2">...</button>
    <template v-for="(page, index) in startAndEnd.end">
      <button 
        :key="index" 
        v-if="page>=startAndEnd.start" 
        :class="{active: pageNo===page}"
        @click="$emit('getPageNo', page)"
      >
        {{page}}
      </button>
    </template>
    <button v-if="startAndEnd.end < totalPage - 1">...</button>
    <button v-if="startAndEnd.end < totalPage" @click="$emit('getPageNo', totalPage)">{{totalPage}}</button>
    <button v-if="pageNo !== totalPage" @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px;">共 {{totalPage}} 页</button>
  </div>
</template>

<script lang="ts" setup>
import { 
  computed, 
  defineProps, 
  defineEmits
} from 'vue';

const props = defineProps<{
  pageNo: number,
  pageSize: number,
  total: number,
  continues: number
}>()

// 计算出总页数
let totalPage = computed(() => Math.ceil(props.total / props.pageSize))

// 计算出连续起始的页码和结束页码，连续的页码数至少是5
const startAndEnd = computed(() => {
  let start = 0, end = 0
  if (props.continues > totalPage.value) {
    start = 1
    end = totalPage.value
  } else {
    start = props.pageNo - Math.floor(props.continues / 2)
    end = props.pageNo + Math.floor(props.continues / 2)
    if (start < 1) {
      start = 1
      end = props.continues
    }
    if (end > totalPage.value) {
      end = totalPage.value
      start = totalPage.value - props.continues + 1
    }
  }
  return {start, end}
})

const emit = defineEmits<{
  (e: 'getPageNo', pageNo: number)
}>()

</script>

<style lang="less" scoped>

.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>
