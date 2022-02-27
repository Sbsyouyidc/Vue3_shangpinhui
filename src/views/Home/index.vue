<template>
  <TypeNav/>
  <ListContainer/>
  <Recommend/>
  <Rank/>
  <Like/>
  <Floor v-for="(floor) in floorList" :key="floor.id" :list="floor"/>
  <Brand/>
</template>

<script lang="ts" setup>
import ListContainer from '@/views/Home/ListContainer/index.vue'
import Recommend from '@/views/Home/Recommend/index.vue'
import Rank from '@/views/Home/Rank/index.vue'
import Like from '@/views/Home/Like/index.vue'
import Floor from '@/views/Home/Floor/index.vue'
import Brand from '@/views/Home/Brand/index.vue'
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

onMounted(() => {
  store.dispatch('getFloorList')
})

const floorList = computed<Array<any>>(() => store.state.home.floorList)

</script>

<style lang="less" scoped>

</style>