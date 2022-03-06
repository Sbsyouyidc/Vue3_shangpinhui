<template>
  <div class="detail">
    <!-- 商品分类导航 -->
    <typeNav />

    <!-- 主要内容区域 -->
    <section class="con">
      <!-- 导航路径区域 -->
      <div class="conPoin">
        <span v-show="categoryView.category1Name">
          {{categoryView.category1Name}}
        </span>
        <span v-show="categoryView.category2Name">
          {{categoryView.category2Name}}
        </span>
        <span v-show="categoryView.category3Name">
          {{categoryView.category3Name}}
        </span>
      </div>
      <!-- 主要内容区域 -->
      <div class="mainCon">
        <!-- 左侧放大镜区域 -->
        <div class="previewWrap">
          <!--放大镜效果-->
          <Zoom :skuImageList="getSkuInfo" />
          <!-- 小图列表 -->
          <ImageList :skuImageList="getSkuInfo"/>
        </div>
        <!-- 右侧选择区域布局 -->
        <div class="InfoWrap">
          <div class="goodsDetail">
            <h3 class="InfoName">{{ skuInfo.skuName }}</h3>
            <p class="news">{{ skuInfo.skuDesc }}</p>
            <div class="priceArea">
              <div class="priceArea1">
                <div class="title">
                  价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格
                </div>
                <div class="price">
                  <i>¥</i>
                  <em>{{ skuInfo.price }}</em>
                  <span>降价通知</span>
                </div>
                <div class="remark">
                  <i>累计评价</i>
                  <em>65545</em>
                </div>
              </div>
              <div class="priceArea2">
                <div class="title">
                  <i>促&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;销</i>
                </div>
                <div class="fixWidth">
                  <i class="red-bg">加价购</i>
                  <em class="t-gray"
                    >满999.00另加20.00元，或满1999.00另加30.00元，或满2999.00另加40.00元，即可在购物车换购热销商品
                  </em>
                </div>
              </div>
            </div>
            <div class="support">
              <div class="supportArea">
                <div class="title">
                  支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持
                </div>
                <div class="fixWidth">
                  以旧换新，闲置手机回收 4G套餐超值抢 礼品购
                </div>
              </div>
              <div class="supportArea">
                <div class="title">配 送 至</div>
                <div class="fixWidth">广东省 深圳市 宝安区</div>
              </div>
            </div>
          </div>

          <div class="choose">
            <div class="chooseArea">
              <div class="choosed"></div>
              <dl
                v-for="(spuSaleAttr, index) in spuSaleAttrList"
                :key="spuSaleAttr.id"
              >
                <dt class="title">{{ spuSaleAttr.saleAttrName }}</dt>
                <dd
                  changepirce="0"
                  :class="{ active: spuSaleAttrValue.isChecked == 1 }"
                  v-for="(spuSaleAttrValue,index) in spuSaleAttr.spuSaleAttrValueList"
                  :key="spuSaleAttrValue.id"
                  @click="changeActive(spuSaleAttrValue, spuSaleAttr.spuSaleAttrValueList)"
                >
                  {{ spuSaleAttrValue.saleAttrValueName }}
                </dd>
              </dl>
            </div>
            <div class="cartWrap">
              <div class="controls">
                <input autocomplete="off" class="itxt" v-model="skuNum" @change="changeSkuNum"/>
                <a href="javascript:" class="plus" @click="skuNum++">+</a>
                <a href="javascript:" class="mins" @click="skuNum>1?skuNum--:1">-</a>
              </div>
              <div class="add">
                <!-- 以前咱们的路由跳转：从A路由跳转到B路由，这里在加入购物车，进行路由跳转之前，发请求
                    把你购买的产品的信息通过请求的形式通知服务器，服务器进行相应的存储
                  -->
                <a @click="addToCart">加入购物车</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 内容详情页 -->
    <section class="product-detail">
      <aside class="aside">
        <div class="tabWraped">
          <h4 class="active">相关分类</h4>
          <h4>推荐品牌</h4>
        </div>
        <div class="tabContent">
          <div class="tab-pane active">
            <ul class="partList">
              <li>手机</li>
              <li>手机壳</li>
              <li>内存卡</li>
              <li>Iphone配件</li>
              <li>贴膜</li>
              <li>手机耳机</li>
              <li>移动电源</li>
              <li>平板电脑</li>
            </ul>
            <ul class="goodsList">
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <img src="./images/part01.png" /> -->
                  </div>
                  <div class="attr">Apple苹果iPhone 6s (A1699)</div>
                  <div class="price">
                    <em>¥</em>
                    <i>6088.00</i>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <img src="./images/part02.png" /> -->
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <img src="./images/part03.png" /> -->
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <img src="./images/part02.png" /> -->
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
              <li>
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <img src="./images/part03.png" /> -->
                  </div>
                  <div class="attr">
                    <em>Apple苹果iPhone 6s (A1699)</em>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>6088.00</i>
                    </strong>
                  </div>
                  <div class="operate">
                    <a href="javascript:void(0);">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div class="tab-pane">
            <p>推荐品牌</p>
          </div>
        </div>
      </aside>
      <div class="detail">
        <div class="fitting">
          <h4 class="kt">选择搭配</h4>
          <div class="good-suits">
            <div class="master">
              <!-- <img src="./images/l-m01.png" /> -->
              <p>￥5299</p>
              <i>+</i>
            </div>
            <ul class="suits">
              <li class="suitsItem">
                <!-- <img src="./images/dp01.png" /> -->
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="39" />
                  <span>39</span>
                </label>
              </li>
              <li class="suitsItem">
                <!-- <img src="./images/dp02.png" /> -->
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="50" />
                  <span>50</span>
                </label>
              </li>
              <li class="suitsItem">
                <!-- <img src="./images/dp03.png" /> -->
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="59" />
                  <span>59</span>
                </label>
              </li>
              <li class="suitsItem">
                <!-- <img src="./images/dp04.png" /> -->
                <p>Feless费勒斯VR</p>
                <label>
                  <input type="checkbox" value="99" />
                  <span>99</span>
                </label>
              </li>
            </ul>
            <div class="result">
              <div class="num">已选购0件商品</div>
              <div class="price-tit">
                套餐价
              </div>
              <div class="price">￥5299</div>
              <button class="addshopcar">加入购物车</button>
            </div>
          </div>
        </div>
        <div class="intro">
          <ul class="tab-wraped">
            <li class="active">
              <a href="###">
                商品介绍
              </a>
            </li>
            <li>
              <a href="###">
                规格与包装
              </a>
            </li>
            <li>
              <a href="###">
                售后保障
              </a>
            </li>
            <li>
              <a href="###">
                商品评价
              </a>
            </li>
            <li>
              <a href="###">
                手机社区
              </a>
            </li>
          </ul>
          <div class="tab-content">
            <div id="one" class="tab-pane active">
              <ul class="goods-intro">
                <li>分辨率：1920*1080(FHD)</li>
                <li>后置摄像头：1200万像素</li>
                <li>前置摄像头：500万像素</li>
                <li>核 数：其他</li>
                <li>频 率：以官网信息为准</li>
                <li>品牌： Apple</li>
                <li>商品名称：APPLEiPhone 6s Plus</li>
                <li>商品编号：1861098</li>
                <li>商品毛重：0.51kg</li>
                <li>商品产地：中国大陆</li>
                <li>热点：指纹识别，Apple Pay，金属机身，拍照神器</li>
                <li>系统：苹果（IOS）</li>
                <li>像素：1000-1600万</li>
                <li>机身内存：64GB</li>
              </ul>
              <div class="intro-detail">
                <!-- <img src="./images/intro01.png" />
                <img src="./images/intro02.png" />
                <img src="./images/intro03.png" /> -->
              </div>
            </div>
            <div id="two" class="tab-pane">
              <p>规格与包装</p>
            </div>
            <div id="three" class="tab-pane">
              <p>售后保障</p>
            </div>
            <div id="four" class="tab-pane">
              <p>商品评价</p>
            </div>
            <div id="five" class="tab-pane">
              <p>手机社区</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { mapGetters, useStore } from "vuex";
import ImageList from "./ImageList/ImageList.vue";
import Zoom from "./Zoom/Zoom.vue";
import { CategoryView, SkuInfo, SpuSaleAttrValue } from '../../store/detail/types';

const store = useStore()
const route = useRoute()
const router = useRouter()

let skuNum = ref(1)

onMounted(() => {
  store.dispatch('getGoodDetail', route.params.skuId)
})

// const categoryView = computed<CategoryView>(
//   mapGetters(['categoryView']).categoryView.bind({$store: store})
// )
// const storeState = computed(
//   mapGetters(['skuInfo']).skuInfo.bind({$store: store})
// )

const categoryView = computed<CategoryView>(() => store.getters.categoryView)

const skuInfo = computed<SkuInfo>(() => store.getters.skuInfo)

const getSkuInfo = computed(() => skuInfo.value.skuImageList || [] )

const spuSaleAttrList = computed(() => store.getters.spuSaleAttrList)

function changeActive(a: SpuSaleAttrValue, b: Array<SpuSaleAttrValue>) {
  // 修改售卖属性值, 取消高亮
  b.forEach(item => {
    item.isChecked = '0'
  })
  a.isChecked = '1'
}

function changeSkuNum(evt: Event) {
  let value = evt.target!['value'] * 1
  if (isNaN(value) || value < 1) {
    skuNum.value = 1
  } else {
    skuNum.value = Math.floor(value)
  }
}

// 添加至购物车方法
async function addToCart() {
  // 派发一个action，也向服务器发送请求，判断加入购物车是成功了还是失败了，进行相应操作，返回值是一个Promise对象
  try {
    await store.dispatch('addOrUpdateCart', {skuId: route.params.skuId, skuNum: skuNum.value})
    // 成功后进行性路由的跳转
    router.push({name: 'AddCartSuccess', query: {skuNum: skuNum.value}})
  } catch (error) {

  } 
}

</script>

<style lang="less">
@import url('./index.less');
</style>