<template>
	<div>
		<navbar title="影院"></navbar>
		<div class="list-content">
			<div class="topbar">
				<!--城市定位-->
				<div @click="$router.push('/cityList')" class="city-entry">
					<span class="city-name">{{$store.getters.getSelectCity.nm}}</span>
					<i class="city-entry-arrow"></i>
				</div>
				<!--搜索-->
				<div @click="$router.push('/search')" class="search-entry">
					<img src="../assets/img/search_cinema.png" alt="" />
					<span>搜影院</span>
				</div>
			</div>
			<div class="cinema-content">
				<div class="filter-cinema">
					<!--影院过滤组件-->
					<filterCinemas></filterCinemas>
				</div>
				<!--影院列表-->
				<div class="cinema-list">
					<!--预加载-->
					<div class="preloading" v-if="preloading">
						<img src="../assets/img/loading.gif" alt="" />
						<span>正在加载...</span>
					</div>
					<div class="cinema-list-item" v-for="(item,index) in cinemas" :key="index">
						<router-link :to="'/cinemaDetail/'+item.id+'/'+item.nm">
							<div class="cinema-title">
								<span>{{item.nm}}</span>
								<span>{{item.sellPrice}}</span>
								<span>元起</span>
							</div>
							<div class="cinema-location">
								<span>{{item.addr}}</span>
								<span>{{item.distance}}</span>
							</div>
							<div class="cinema-label-block">
								<div v-if="item.tag.allowRefund==1" class="hall-type">退</div>
								<div v-if="item.tag.endorse==1" class="hall-type">改签</div>
								<div v-if="item.tag.snack==1" class="snack">小吃</div>
								<div v-if="item.tag.vipTag!=undefined" class="snack">折扣卡</div>
								<div v-if="item.tag.hallType" class="hall-type">{{item.tag.hallType[0]}}</div>
							</div>
							<div v-if="item.promotion.cardPromotionTag!=undefined" class="cinema-discount-block">
								<div class="cinema-discount-block-img">
									<img src="../assets/img/card.png" alt="" />
								</div>
								<div class="cinema-discount-block-text">
									{{item.promotion.cardPromotionTag}}
								</div>
							</div>
						</router-link>
					</div>
				</div>
			</div>
		</div>
		<tabbar></tabbar>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				cinemas: [],
				preloading: true

			}
		},
		created() {
			//影院列表
			this.request.getCinemaList({}, (data) => {
				//console.log(data)
				this.cinemas = data.cinemas
				this.preloading = false
			})
		},
		methods: {

		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*顶部标签*/
	
	.topbar {
		border-bottom: 1px solid #e6e6e6;
		width: 100%;
		height: 44px;
		display: flex;
		justify-content: space-between;
		position: fixed;
		top: 51px;
		left: 0;
		background: #fff;
		z-index: 5;
		background: #f5f5f5;
	}
	
	.city-entry {
		line-height: 44px;
	}
	
	.city-name {
		font-size: 15px;
		color: #666;
		margin-left: 15px;
	}
	
	.city-entry-arrow {
		margin-right: 5px;
		width: 0;
		height: 0;
		border: 4px solid #b0b0b0;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		display: inline-block;
		margin-left: 4px;
		margin-top: 5px;
	}
	
	.search-entry {
		display: flex;
		-webkit-box-pack: center;
		justify-content: center;
		-webkit-box-align: center;
		align-items: center;
		height: 28px;
		font-size: 13px;
		color: #b2b2b2;
		margin-left: 18px;
		border: .5px solid #e6e6e6;
		border-radius: 5px;
		margin-right: 15px;
		-webkit-box-flex: 1;
		flex-grow: 1;
		margin-top: 8px;
		background: #fff;
	}
	
	.search-entry img {
		width: 14px;
		height: 14px;
		margin-left: 3px;
		margin-right: 4px;
		display: block;
	}
	/*影院过滤组件*/
	
	.filter-cinema {
		width: 100%;
		height: 40px;
		line-height: 40px;
		z-index: 4;
		background-color: #fff;
		position: fixed;
		top: 95px;
	}
	/*影院列表*/
	
	.cinema-list {
		padding-top: 85px;
	}
	
	.cinema-list-item {
		padding: 13px 15px;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.cinema-list-item a>div {
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.cinema-list-item a {
		display: block;
	}
	
	.cinema-title {
		height: 23px;
		line-height: 23px;
		font-size: 16px;
		color: #000;
	}
	
	.cinema-title span:nth-of-type(2) {
		font-size: 18px;
		color: #f03d37;
	}
	
	.cinema-title span:nth-of-type(3) {
		font-size: 11px;
		color: #f03d37;
	}
	
	.cinema-location {
		margin-top: 6px;
		font-size: 13px;
		color: #666;
		line-height: 1.5;
		display: flex;
	}
	
	.cinema-location span:nth-of-type(1) {
		width: calc(100% - 30px);
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.cinema-location span:nth-of-type(2) {
		margin-left: 5px;
	}
	
	.cinema-label-block {
		line-height: 17px;
		margin-top: 4px;
		margin-bottom: 4px;
		overflow: hidden;
		font-size: 0;
		flex-shrink: 0;
	}
	
	.cinema-label-block>div {
		display: inline-block;
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		font-size: .6rem;
		margin-left: 5px;
	}
	.cinema-label-block>div:first-child{
		margin:0;
	}
	
	.snack {
		color: #f90;
		border: 1px solid #f90;
	}
	
	.hall-type {
		color: #589daf;
		border: 1px solid #589daf;
		
	}
	
	.cinema-discount-block {
		color: #999;
		margin-bottom: 4px;
		display: flex;
		line-height: 1.5;
	}
	
	.cinema-discount-block-img {
		width: 15px;
		height: 14px;
	}
	
	.cinema-discount-block-img img {
		width: 100%;
	}
	
	.cinema-discount-block-text {
		font-size: 11px;
		margin-left: 5px;
	}
	/*预加载*/
	
	.preloading {
		text-align: center;
		line-height: 50px;
		font-size: 16px;
	}
	
	.preloading img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
</style>