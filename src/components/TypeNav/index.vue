<template>
	<div class="type-nav">
		<div class="container">
			<div @mouseleave="leaveIndex">
				<h2 class="all">全部商品分类</h2>
				<div class="sort">
					<div class="all-sort-list2">
						<div
							class="item"
							v-for="(c1, index1) in categoryList"
							:key="c1.categoryId"
							:class="{ cur: currentIndex === index1 }"
						>
							<h3 @mouseenter="changeIndex(index1)">
								<a href="javascript:void;">{{ c1.categoryName }}</a>
							</h3>
							<!-- 二三级分类 -->
							<div class="item-list clearfix" :style="{display: currentIndex===index1?'block':'none'}">
								<div class="subitem" v-for="(c2, index2) in c1.categoryChild" :key="c2.categoryId">
									<dl class="fore">
										<dt>
											<a href="javascript:void;">{{ c2.categoryName }}</a>
										</dt>
										<dd>
											<em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
												<a href="javascript:void;">{{ c3.categoryName }}</a>
											</em>
										</dd>
									</dl>
								</div>
							</div>
						</div>
					</div>
				</div>
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

// 存储用户鼠标移上的一级分类index
let currentIndex = ref(-1)

// 组件挂载完毕，发送请求
onMounted(() => {
	const store = useStore()
	store.dispatch('categoryList')
})

const store = useStore()
const categoryList = computed<Array<any>>(() => store.state.home.categoryList)

// 鼠标进入一级菜单修改index
// function changeIndex(index: number): void {
// 	// 拿到一级菜单的索引值
// 	// 用户操作很快的情况下，不会触发所有的一级菜单事件
// 	// 由于用户行为过快，导致浏览器反应不过来，回调函数中有大量事件
// 	currentIndex.value = index
// }

// 节流版changeIndex
const changeIndex = throttle1((index: number) => {
	currentIndex.value = index
	console.log('节流')
}, 50)

//鼠标移出改变index
function leaveIndex(): void {
	currentIndex.value = -1
}

</script>

<style lang="less" scoped>
@import url("./index.less");
</style>