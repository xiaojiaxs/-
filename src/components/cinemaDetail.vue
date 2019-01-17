<template>
	<div class="cinema-detail">
		<navbar :title="detail.cinemaData?detail.cinemaData.nm:'猫眼电影'" type="detail"></navbar>
		<!--预加载-->
		<div class="preloading" v-if="preloading">
			<img src="../assets/img/loading.gif" alt="" />
			<span>正在加载...</span>
		</div>
		<div class="detail-content" v-if="showContent">
			<!--影院信息-->
			<div class="cinema-wrap">
				<!--影院地址-->
				<div class="cinema-info">
					<div class="cinema-info-title">
						{{detail.cinemaData?detail.cinemaData.nm:''}}
					</div>
					<div class="cinema-info-location">
						{{detail.cinemaData?detail.cinemaData.addr:''}}
					</div>
					<div class="cinema-info-map">
						<img @click="$router.push('/map/'+detail.cinemaData.lat+'/'+detail.cinemaData.lng)" src="../assets/img/map.png" alt="" />
					</div>
				</div>
				<div class="cinema-swiper">
					<!--轮播图-->
					<div class="swiper-container">
						<div class="post-bg">
							<img :src="postBackgroundImage | wh128x180" alt="">
						</div>
						<div class="post-bg-filter"></div>
						<div class="swiper-wrapper">
							<div v-for="(item,index) in movies" :key="index" class="swiper-slide" @click="dealPostBackgroundImage(index)">
								<img :src="item.img|wh128x180">
							</div>
						</div>
					</div>
					<!--电影信息-->
					<div @click="$router.push('/movieDetail/'+movies[activeMovieIndex].id+'/'+movies[activeMovieIndex].nm)" class="cinema-movie-info" v-if="movies.length>0">
						<div class="movie-info-title">
							<span>{{movies[activeMovieIndex].nm}}</span>
							<span>{{movies[activeMovieIndex].sc}}</span>
							<span>分</span>
						</div>
						<div class="movie-info-desc">
							{{movies[activeMovieIndex].desc}}
						</div>
					</div>
				</div>
			</div>
			<!--时间选择-->
			<div class="date-area" v-if="movies.length>0">
				<div class="date-item" v-for="(item,index) in movies[activeMovieIndex].shows" :key="index" :class="{active:selectDayIndex==index}" @click="selectDayIndex=index">
					{{item.dateShow}}
				</div>
			</div>
			<!--seat区域-->
			<div class="seat-area">
				<div class="vip-tips">
					<a href="javascript:;">
						<div class="label">折扣卡</div>
						<div class="label-text">购票享低价，首单2张立减2元</div>
						<div class="process">
							33元开卡<span></span>
						</div>
					</a>
				</div>
				<div class="seat-inner-area">
					<div class="seat-list">
						<ul v-if="movies.length>0">
							<li v-for="(item,index) in movies[activeMovieIndex].shows[selectDayIndex].plist" :key="index" @click="dealBuyTicket(item,index)">
								<a href="javascript:;">
									<div class="seat-time">
										<div class="seat-time-begin">{{item.tm}}</div>
										<div class="seat-time-end">19:33&nbsp;散场</div>
									</div>
									<div class="seat-info">
										<div class="seat-info-language">{{item.lang}}&nbsp;{{item.tp}}</div>
										<div class="seat-info-hall">{{item.th}}</div>
									</div>
									<div class="seat-price">
										<div class="price-type">
											<div class="sell-price">
												￥
												<span v-if="item.vipPrice">{{item.vipPrice}}</span>
											</div>
											<div v-if="item.vipPrice" class="vip-price">
												<span>{{item.vipPriceName}}</span>
												<span>￥{{item.vipPrice}}</span>
											</div>
										</div>
										<div class="extra-desc">{{item.extraDesc}}</div>
									</div>
									<div class="seat-buy">
										<div class="buy-button">购票</div>
									</div>
								</a>
							</li>
						</ul>
					</div>
					<div class="seat-inner-wrap" v-if="movies.length>0">
						<div class="no-seat" v-if="movies[activeMovieIndex].shows[selectDayIndex].plist.length<=0">
							<div class="icon">
								<img src="../assets/img/no-seat.png" alt="" />
							</div>
							<div class="text">影片未上映</div>
							<!--<div class="next-date-button">
								点击查看01月10日场次
							</div>-->
						</div>

					</div>
				</div>

			</div>
			<!--团购套餐-->
			<div class="set-meal-area">
				<div class="set-meal-title">影院超值套餐</div>
				<div class="set-meal-list">
					<ul v-if="dealList.length>0">
						<li v-for="(item,index) in dealList" :key="index">
							<router-link to="/order">
								<img :src="item.imageUrl|wh128x180">
								<span class="hot-tag" v-if="item.cardTag">{{item.cardTag}}</span>
								<div class="seat-meal-item-info">
									<div class="seat-meal-item-title">
										<span>{{item.titleTag}}</span> {{item.title}}
									</div>
									<div class="sell-number">{{item.curNumberDesc}}</div>
									<div class="seat-meal-item-price">
										<span>￥</span>
										<span>{{item.price}}</span>
									</div>
									<div class="seat-meal-item-buy">去购买</div>
								</div>
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'cinemaDetail',
		data() {
			return {
				select: 0,
				postBackgroundImage:'',
				detail: {},
				movies: [],
				dealList: [],
				activeMovieIndex: 0, //轮播图序号
				selectDayIndex: 0, //默认时间序号
				preloading: true,
				showContent: false
			}
		},
		created() {

			var id = this.$route.params.id //接受cinema传过来的id

			var self = this
			//影院详情数据
			this.request.getCinemaDetail({
				cinemaId: id
			}, (data) => {
				//console.log(data)
				this.detail = data
				this.movies = data.showData.movies
				this.dealList = data.dealList.divideDealList[0].dealList
				//console.log(this.dealList)
				// 加载初始背景
				this.postBackgroundImage = data.showData.movies[0].img

				this.preloading = false
				this.showContent = true

				//轮播图初始化
				this.$nextTick(function() {

					var swiper = new Swiper('.swiper-container', {
						slidesPerView: 'auto',
						centeredSlides: true,
						spaceBetween: 0,
						slideToClickedSlide: true,
						on: {
							slideChange: function() {
								//console.log(this.activeIndex)
								self.activeMovieIndex = this.activeIndex
								//日期序号归0
								self.selectDayIndex = 0
							},
						},
					});

				})
			})
		},
		methods: {
			//判断是否登录，登陆了进入选座页面，没有进入登录界面
			dealBuyTicket(item,index) {
				var self = this
				if(!this.$store.getters.getIsLogin) {

					layer.open({
						content: "您还没有登录,需要登录吗？",
						btn: ["是", "否"],
						yes: function(index) {
							self.$router.push("/login")
							layer.close(index);
						}
					})
					return
					
				}
				this.$router.push('/seatingPlan');
				
			},
			dealPostBackgroundImage(index){
				this.postBackgroundImage = this.movies[index].img
				//console.log(this.postBackgroundImage)
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.cinema-detail {
		background: #eaeaea;
	}
	/*影院信息*/
	
	.cinema-wrap {
		background: #fff;
	}
	
	.cinema-info {
		position: relative;
		padding: 15px 100px 15px 15px;
	}
	
	.cinema-info-title {
		font-size: 17px;
		line-height: 24px;
		font-weight: 700;
		color: #333;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.cinema-info-location {
		margin-top: 2px;
		font-size: 13px;
		line-height: 18.5px;
		color: #999;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.cinema-info-map {
		position: absolute;
		right: 0;
		top: 50%;
		width: 70px;
		height: 31px;
		transform: translateY(-50%);
		border-left: 1px solid #d8d8d8;
		text-align: center;
	}
	
	.cinema-info-map img {
		display: inline-block;
		width: 19px;
		height: 22px;
		margin-top: 5px;
	}
	/*轮播图*/
	
	.swiper-container {
		padding: 20px 15px 20px 5px;
		transform: translateZ(0);
		position: relative;
	}
	.post-bg {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: -1;
		overflow: hidden;
		-webkit-filter: blur(30px);
		filter: blur(30px);
		background-position-y: 40%;
	}
	.post-bg img{
		width: 100%;
		height: 100%;
	}
	
	.post-bg-filter {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background-color: #40454d;
		opacity: .55;
	}
	
	
	.swiper-slide {
		margin-left: 10px;
		width: 65px;
		height: 95px;
	}
	
	.swiper-slide:first-child {
		margin-left: 10px;
	}
	
	.swiper-slide img {
		width: 65px;
		height: 95px;
		transform: scale(1);
	}
	
	.swiper-slide.swiper-slide-active {
		transform: scale(1.15, 1.15);
		border: 2px solid #fff;
	}
	/*电影信息*/
	
	.cinema-movie-info {
		padding: 11px 15px;
		text-align: center;
	}
	
	.movie-info-title {
		height: 24px;
		line-height: 24px;
		font-size: 17px;
		color: #333;
		font-weight: 700;
	}
	
	
	.movie-info-title span:nth-of-type(2) {
		color: #ffb400;
		font-size: 16px;
	}
	
	.movie-info-title span:nth-of-type(3) {
		font-size: 10px;
		color: #ffb400;
	}
	
	.movie-info-desc {
		margin-top: 2px;
		height: 18.5px;
		line-height: 18.5px;
		font-size: 13px;
		color: #999;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	/*时间选择*/
	
	.date-area {
		width: 100%;
		overflow: hidden;
		border-top: 1px solid #eee;
		background: #fff;
	}
	
	.date-item {
		height: 45px;
		line-height: 45px;
		float: left;
		padding: 0 5px;
		text-align: center;
		font-size: 14px;
		color: #666;
		margin: 0 10px;
	}
	
	.date-item.active {
		color: #f03d37;
		border-bottom: 2px solid #f03d37;
	}
	/*seat区域*/
	
	
	.vip-tips {
		background-color: #fff5ea;
		padding: 0 15px;
		height: 42px;
		line-height: 42px;
	}
	
	.vip-tips a {
		display: block;
		height: 42px;
	}
	
	.label {
		display: block;
		background-color: #ff941a;
		border-radius: 2px;
		font-size: 10px;
		line-height: 15px;
		height: 15px;
		width: 34px;
		text-align: center;
		color: #fff;
		margin-top: 13px;
		margin-right: 10px;
		float: left;
	}
	
	.label-text {
		color: #fa9600;
		font-size: 12px;
		float: left;
	}
	
	.process {
		flex: 0 0 auto;
		line-height: 42px;
		color: #999;
		font-size: 12px;
		float: right;
	}
	
	.process span {
		display: inline-block;
		width: 7px;
		height: 7px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	
	
	.seat-list {
		background: #fff;
	}
	
	
	.seat-list ul li {
		padding: 17px 12.5px;
	}
	
	.seat-list ul li a {
		display: block;
		display: flex;
	}
	
	
	.seat-time-begin {
		font-size: 20px;
		color: #333;
		line-height: 1;
		white-space: nowrap;
	}
	
	.seat-time-end {
		margin-top: 10px;
		color: #999;
		font-size: 11px;
		line-height: 1;
		white-space: nowrap;
	}
	
	.seat-info {
		margin-left: 17px;
		flex: 1;
		overflow-x: hidden;
	}
	
	.seat-info-language {
		margin-top: 2px;
		line-height: 18px;
		font-size: 13px;
		color: #333;
		white-space: normal;
	}
	
	.seat-info-hall {
		margin-top: 7px;
		font-size: 11px;
		color: #999;
		white-space: normal;
	}
	
	.seat-price {
		flex: 0 1 auto;
		width: 130px;
		margin-left: 5px;
	}
	
	.price-type {
		display: flex;
	}
	
	.sell-price {
		display: inline-block;
		line-height: 1;
		color: #f03d37;
		margin-top: 1px;
		font-size: 11px;
	}
	
	.sell-price span {
		font-size: 19px;
	}
	
	.vip-price {
		margin-top: 2px;
		display: inline-block;
		line-height: 15px;
		height: 15px;
		transform: scale(.8);
		transform-origin: left;
		margin-right: -16px;
		border: 1px solid #ff9000;
		border-radius: 2px;
		font-size: 10px;
	}
	
	.vip-price span:nth-of-type(1) {
		display: inline-block;
		color: #fff;
		background-color: #f90;
	}
	
	.vip-price span:nth-of-type(2) {
		color: #f90;
		background-color: #fff;
		display: inline-block;
	}
	
	.extra-desc {
		margin-top: 5px;
		display: block;
		font-size: 11px;
		color: #999;
	}
	
	.seat-buy {
		width: 45px;
		margin-left: 2px;
		position: relative;
	}
	
	.buy-button {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		width: 100%;
		height: 27px;
		line-height: 28px;
		font-size: 12px;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		text-align: center;
	}
	/*没有座位*/
	
	.no-seat {
		text-align: center;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height: 230px;
		background-color: #f0f0f0;
	}
	
	.no-seat .icon {
		width: 77.5px;
	}
	
	.no-seat .icon img {
		width: 100%;
	}
	
	.no-seat .text {
		margin-top: 12px;
		line-height: 1;
		font-size: 16px;
		color: #acacac;
	}
	
	.no-seat .next-date-button {
		margin: 20px auto 0;
		border-radius: 5px;
		width: 170px;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		color: #f03d37;
		border: 1px solid rgba(0, 0, 0, .15);
		background-color: #fff;
		text-align: center;
	}
	/*团购套餐*/
	
	.set-meal-area {
		margin-top: 10px;
		background: #fff;
	}
	
	.set-meal-title {
		line-height: 45px;
		height: 45px;
		font-size: 15px;
		color: #666;
		padding: 0 15px;
	}
	
	.set-meal-list {
		margin-left: 15px;
	}
	
	
	.set-meal-list ul li {
		position: relative;
		width: 100%;
		padding: 13px 0;
		overflow: hidden;
	}
	
	.set-meal-list ul li a {
		display: block;
	}
	
	.set-meal-list ul li a img {
		display: block;
		width: 92px;
		height: 92px;
		float: left;
	}
	
	.hot-tag {
		position: absolute;
		left: 0;
		top: 13px;
		display: inline-block;
		height: 18px;
		line-height: 18px;
		background-color: #fa5939;
		font-size: 12px;
		padding: 0 5px;
		color: #fff;
		border-bottom-right-radius: 2px;
	}
	
	.seat-meal-item-info {
		position: relative;
		margin: 0 15px 0 102px;
		height: 92px;
		overflow: hidden;
	}
	
	.seat-meal-item-title {
		font-size: 14px;
		line-height: 18px;
		color: #333;
		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	
	.seat-meal-item-title span {
		display: inline-block;
		vertical-align: top;
		margin-top: 1px;
		margin-right: 7px;
		padding: 0 4px;
		font-size: 10px;
		line-height: 15px;
		height: 15px;
		background: #f90;
		border-radius: 2px;
		color: #fff;
	}
	
	.sell-number {
		display: inline-block;
		position: absolute;
		bottom: 34px;
		right: 0;
		line-height: 16px;
		height: 16px;
		font-size: 12px;
		color: #999;
	}
	
	.seat-meal-item-price {
		position: absolute;
		bottom: 0;
		left: 0;
		color: #f03d37;
		display: inline-block;
	}
	
	.seat-meal-item-price span:nth-of-type(1) {
		font-size: 14px;
	}
	
	.seat-meal-item-price span:nth-of-type(2) {
		font-size: 17px;
	}
	
	.seat-meal-item-buy {
		position: absolute;
		right: 0;
		bottom: 0;
		display: inline-block;
		padding: 0 8px;
		height: 27px;
		line-height: 27px;
		font-size: 12px;
		border-radius: 3px;
		color: #fff;
		background-color: #f03d37;
	}
	/*预加载*/
	
	.preloading {
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		padding-top: 50px;
		background: #fff;
	}
	
	.preloading img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
</style>