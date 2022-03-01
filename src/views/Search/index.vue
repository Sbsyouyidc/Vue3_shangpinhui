<template>
  <div>
    <TypeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{searchParams.categoryName}}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{searchParams.keyword}}
              <i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{searchParams.trademark.split(':')[1]}}
              <i @click="removeTrademark">×</i>
            </li>
            <!-- 对商品属性进行展示 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{attrValue.split(':')[1]}}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrs-info="attrsInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li class="active">
                  <a href="#">综合</a>
                </li>
                <li>
                  <a href="#">销量</a>
                </li>
                <li>
                  <a href="#">新品</a>
                </li>
                <li>
                  <a href="#">评价</a>
                </li>
                <li>
                  <a href="#">价格⬆</a>
                </li>
                <li>
                  <a href="#">价格⬇</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good) in goodsList" :key="good.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <a href="item.html" target="_blank">
                      <img :src="good.defaultImg" />
                    </a>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="good.title">{{good.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="fr page">
            <div class="sui-pagination clearfix">
              <ul>
                <li class="prev disabled">
                  <a href="#">«上一页</a>
                </li>
                <li class="active">
                  <a href="#">1</a>
                </li>
                <li>
                  <a href="#">2</a>
                </li>
                <li>
                  <a href="#">3</a>
                </li>
                <li>
                  <a href="#">4</a>
                </li>
                <li>
                  <a href="#">5</a>
                </li>
                <li class="dotted"><span>...</span></li>
                <li class="next">
                  <a href="#">下一页»</a>
                </li>
              </ul>
              <div><span>共10页&nbsp;</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { mapGetters, useStore } from 'vuex';
import SearchSelector from './SearchSelector/index.vue'
import { 
  computed, 
  getCurrentInstance, 
  onBeforeMount, 
  onMounted, 
  reactive, 
  watch,
} from 'vue';
import {listParams} from '@/store/search/types'
import { useRoute, useRouter } from 'vue-router';

interface Good {defaultImg: string, hotScore: number, price: number, title: string, id: number}
interface Trademark {tmId: number, tmName: string}
interface Attrs {attrId: number, attrName: string, attrValueList: string[]}

let searchParams = reactive<listParams>({
  // 一级分类id
  category1Id: "",
  // 二级分类id
  category2Id: "",
  // 三级分类id
  category3Id: "",
  // 分类名称
  categoryName: "",
  // 关键字
  keyword: "",
  // 平台售卖属性操作带的参数
  props: [],
  // 品牌
  trademark: "",
  // 排序
  order: "",
  // 分页器，代表当前页码
  pageNo: 1,
  // 每一页的商品数量
  pageSize: 10 
})

const store = useStore()
const route = useRoute()
const router = useRouter()
// 创建mitt实例
// type Event = {
//   clearInput: string
// }
const emitter = getCurrentInstance()?.appContext.config.globalProperties.emitter

// 当组件挂在完毕之前执行一次请求
onBeforeMount(() => {
  // 对发送的请求参数进行整理
  Object.assign(searchParams, route.query, route.params)
})

onMounted(() => {
  // 在发送请求之前带给服务器参数，searchParams参数发生变化时带给服务器
  getData()
})

const goodsList = computed<Good[]>(
  mapGetters(['goodsList']).goodsList.bind({$store: store})
)

// 向服务器发送请求获取search模块数据（根据不同参数返回不同的数据进行展示）
function getData(): void {
  // 将searchPramas传递给mutation
  store.dispatch('getSearchList', searchParams)
}

function resetParams(): void {
  // 把带给服务器的参数置空了，还需要向服务器发送请求
  // 带给服务器参数可有可无的：如果属性值为空还是会把相应的字段带给服务器
  // 但是你把相应的字段变为undefined，当前这个字段不会带给服务器
  searchParams.category1Id = undefined
  searchParams.category2Id = undefined
  searchParams.category3Id = undefined
}

// 移除肺类的名称，之后再次发送请求
function removeCategoryName(): void {
  searchParams.categoryName = undefined
  resetParams()
  getData()
  // 需要对路由进行修改，自己跳转自己的路由
  router.push({name: 'Search', params: route.params})
}

// 删除关键字的函数
function removeKeyword(): void {
  searchParams.keyword = undefined
  getData()
  // 需要清除header中搜索框中的关键字
  emitter.emit('clearInput')
  // 进行路由的跳转
  if (route.query) {
    router.push({name: 'Search', query: route.query})
  }
}

// 删除品牌面包屑
function removeTrademark(): void {
  searchParams.trademark = undefined
  getData()
}

// 自定义事件,拿到子组件传过来的trademark{id， name}
function trademarkInfo(trademark: Trademark) {
  searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
  getData()
}

// 获取子组件attrs数据的自定义事件
function attrsInfo(attrs: Attrs, attrValue: string) {
  // 数据处理, 并且去重
  let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`
  if (searchParams.props?.indexOf(props) === -1) searchParams.props?.push(props)
  // 再次发送请求
  getData()
}

// 删除商品属性面包屑
function removeAttr(index: number) {
  // 再次整理参数
  searchParams.props?.splice(index, 1)
  getData()
}

// 使用watch监听属性变化来发送请求
watch(route, (newValue, oldValue) => {
  // 再次对数据进行整理并发送请求
  Object.assign(searchParams, route.query, route.params)
  getData()
  // 每次请求完毕后将参数置空
  resetParams()
})

</script>

<style lang="less" scoped>
@import url('./index.less');
</style>