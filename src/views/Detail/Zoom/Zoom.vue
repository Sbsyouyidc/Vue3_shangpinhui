<template>
  <div class="spec-preview">
    <img :src="imgObj.imgUrl" />
    <div class="event" @mousemove="handler"></div>
    <div class="big">
      <img :src="imgObj.imgUrl" ref="big"/>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script lang="ts" setup>
import { computed, getCurrentInstance, onMounted, ref } from 'vue';
import { SkuImage } from '@/store/detail/types';

const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter

let currentIndex = ref(0)

const props = defineProps<{
  skuImageList: Array<SkuImage>
}>()

const imgObj = computed(() => {
  return props.skuImageList[currentIndex.value] || {}
})

const mask = ref<HTMLElement>()
const big = ref<HTMLElement>()

onMounted(() => {
  emitter.on('currentIndex', (index: number) => {
    currentIndex.value = index
  })
})

function handler(event: MouseEvent) {
  let left = event.offsetX - mask.value!.offsetWidth/2;
  let top = event.offsetY - mask.value!.offsetHeight/2;
  //约束范围
  if (left <= 0) left = 0;
  if (left >= mask.value!.offsetWidth) left = mask.value!.offsetWidth;
  if (top <= 0) top = 0;
  if (top >= mask.value!.offsetHeight) top = mask.value!.offsetHeight;
  //修改元素的left|top属性值
  mask.value!.style.left = left+'px';
  mask.value!.style.top = top +'px';
  big.value!.style.left = - 2 * left+'px';
  big.value!.style.top = -2 * top +'px';
}

</script>

<style lang="less" scoped>
.spec-preview {
  position: relative;
  width: 400px;
  height: 400px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
  }

  .event {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 998;
  }

  .mask {
    width: 50%;
    height: 50%;
    background-color: rgba(107, 212, 231, 0.3);
    position: absolute;
    left: 0;
    top: 0;
    display: none;
  }

  .big {
    width: 100%;
    height: 100%;
    position: absolute;
    top: -1px;
    left: 100%;
    border: 1px solid #aaa;
    overflow: hidden;
    z-index: 998;
    display: none;
    background: white;

    img {
      width: 200%;
      max-width: 200%;
      height: 200%;
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .event:hover ~ .mask,
  .event:hover ~ .big {
    display: block;
  }
}
</style>