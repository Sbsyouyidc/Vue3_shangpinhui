<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="leaveHidden" @mouseenter="enterShow">
				<h2 class="all">全部商品分类</h2>
				<transition name="sort">
					<div class="sort" v-show="isShow">
						<div class="all-sort-list2" @click="goSearch">
							<div
								class="item"
								v-for="(c1, index1) in categoryList"
								:key="c1.categoryId"
								:class="{ cur: currentIndex === index1 }"
							>
								<h3 @mouseenter="changeIndex(index1)">
									<a 
										href="javascript:;"
										:data-categoryName="c1.categoryName"
										:data-category1Id="c1.categoryId"
									>
										{{ c1.categoryName }}
									</a>
								</h3>
								<!-- 二三级分类 -->
								<div class="item-list clearfix" :style="{display: currentIndex===index1?'block':'none'}">
									<div class="subitem" v-for="(c2, index2) in c1.categoryChild" :key="c2.categoryId">
										<dl class="fore">
											<dt>
												<a
													href="javascript:;" 
													:data-categoryName="c2.categoryName"
													:data-category2Id="c2.categoryId"
												>
													{{c2.categoryName}}
												</a>
											</dt>
											<dd>
												<em v-for="(c3, index3) in c2.categoryChild" :key="c3.categoryId">
													<a 
														href="javascript:;" 
														:data-categoryName="c3.categoryName"
														:data-category3Id="c3.categoryId"
													>
														{{ c3.categoryName }}
													</a>
												</em>
											</dd>
										</dl>
									</div>
								</div>
							</div>
						</div>
					</div>
				</transition>
			</div>
			<nav class="nav">
				<a href="###">服装城</a>
				<a href="###">美妆馆</a>
				<a href="###">尚品汇超市</a>
				<a href="###">全球购</a>
				<a href="###">闪购</a>
				<a href="###">团购</a>
				<a href="###">有趣</a>
				<a href="###">秒杀</a>
			</nav>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex'
import {throttle1, throttle2} from '@/utils/throttle'
import { useRouter, useRoute } from 'vue-router';

// 存储用户鼠标移上的一级分类index
let currentIndex = ref(-1)
// 控制一级菜单的显示与隐藏
let isShow = ref(true)

const store = useStore()

// router
const router = useRouter()
const route = useRoute()

// vuex
const categoryList = computed<Array<any>>(() => store.state.home.categoryList)

// 组件挂载完毕，发送请求
onMounted(() => {
	// 组件在search页面重新挂载后改变显示和隐藏属性
	if (route.path !== '/home') {
		isShow.value = false
	}
})

// 鼠标进入一级菜单修改index
// function changeIndex(index: number): void {
// 	// 拿到一级菜单的索引值
// 	// 用户操作很快的情况下，不会触发所有的一级菜单事件
// 	// 由于用户行为过快，导致浏览器反应不过来，回调函数中有大量事件
// 	currentIndex.value = index
// }

// 节流版changeIndex
const changeIndex = throttle2((index: number) => {
	currentIndex.value = index
}, 30)

// 进入菜单显示
function enterShow(): void {
	isShow.value = true
}

// 离开菜单隐藏
function leaveHidden(): void {
	currentIndex.value = -1
	// 只有不在home页面才隐藏
	if (route.path !== '/home') {
		isShow.value = false
	}
}


// 路由跳转的函数
function goSearch(event: MouseEvent) {
	// 编程式导航 + 事件委派
	// 事件委派，是把全部的子节点的事件委派给父节点
	// 分别添加date-categoryName
	if (event !== null && event.target instanceof HTMLElement) {
		let element = event.target
		let {categoryname, category1id, category2id, category3id} = element.dataset
		if (categoryname) {
			// 整理路由跳转的参数
			let location = {name: 'Search'}
			let query = {categoryName: categoryname}
			if (category1id) {
				query['category1Id'] = category1id
			} else if (category2id) {
				query['category2Id'] = category2id
			} else if (category3id) {
				query['category3Id'] = category3id
			}
			location['query'] = query
			if (route.params) {
				location['params'] = route.params	
				// 路由跳转
				router.push(location)			
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import url("./index.less");
</style>