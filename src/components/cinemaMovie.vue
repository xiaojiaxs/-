<template>
	<div>
		<navbar :title="detailMovie.nm?detailMovie.nm:'猫眼电影'" type="detail"></navbar>

		<!--预加载-->
		<div class="preloading" v-if="preloading">
			<img src="../assets/img/loading.gif" alt="" />
			<span>正在加载...</span>
		</div>
		<div class="detail-content" v-if="showContent">
			<!--电影信息-->
			<div class="movie-info">
				<div class="movie-filter"></div>
				<div class="poster"></div>
				<div class="movie-detail-box">
					<router-link :to="'/movieDetail/'+detailMovie.id+'/'+detailMovie.nm">
						<div class="poster-img">
							<img :src="detailMovie.img|wh128x180" alt="" />
						</div>
						<div class="movie-content">
							<div class="movie-title">{{detailMovie.nm}}</div>
							<div class="movie-name">{{detailMovie.enm}}</div>
							<div class="movie-score">
								{{detailMovie.sc}}
								<span>({{detailMovie.vnum}}万人评)</span>
							</div>
							<div class="movie-type">
								<span>{{detailMovie.cat}}</span>
								<!--<div class="movie-type-img">
									<img src="../assets/img/type.png" alt="" />
								</div>-->
							</div>
							<div class="movie-src">{{detailMovie.src}}/{{detailMovie.dur}}分钟</div>
							<div class="movie-date">{{detailMovie.pubDesc}}</div>
						</div>
						<div class="movie-right">
							<img src="../assets/img/right.png" alt="" />
						</div>
					</router-link>
				</div>
			</div>
			<div class="filter-area">
				<!--时间选择-->
				<div class="show-days" :class="showFilter==true?'fixed':''">
					<div class="time-scroll">
						<ul class="time-line" id="time-line">
							<li v-for="(item,index) in showDays.dates" :key="index" @click="dealChosen(item,index)" :class="{'chosen':chosen==index}">
								{{item.date}}
							</li>
						</ul>
					</div>
				</div>
				<!--影院選擇-->
				<div class="filter-cinema" :class="showFilter==true?'fixed':''">
					<!--影院过滤组件-->
					<filterCinemas @showIndex="dealshowIndex"></filterCinemas>
				</div>
			</div>
			<!--影院列表-->
			<div class="cinema-list" :class="showFilter==true?'fixed':''">
				<div @click="$router.push('/cinemaDetail/'+item.id+'/'+item.nm)" class="cinema-list-item" v-for="(item,index) in cinemas" :key="index">
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
						<div v-if="item.tag.snack==1" class="snack">小吃</div>
						<div class="hall-type">IMAX厅</div>
					</div>
					<div v-if="item.promotion.cardPromotionTag!=undefined" class="cinema-discount-block">
						<div class="cinema-discount-block-img">
							<img src="../assets/img/card.png" alt="" />
						</div>
						<div class="cinema-discount-block-text">
							{{item.promotion.cardPromotionTag}}
						</div>
					</div>
					<div class="min-show-block">
						近期场次：{{item.showTimes}}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				chosen: 0,
				detailMovie: {},
				cinemas: [],
				showDays: {},
				preloading: true,
				showContent: false,
				
				showFilter:false

			}
		},
		mounted() {
			window.addEventListener('scroll', this.dealshowIndex)
		},
		created() {
			//接受movie传过来的id
			var id = this.$route.params.id

			//电影信息

			this.request.getMovieDetail({
				movieId: id
			}, (data) => {
				//console.log(data)
				this.detailMovie = data.detailMovie
			})

			//日期，影院列表

			var now = new Date(); //现在时间
			var day = now.Format("yyyy-MM-dd") //时间格式化
			//console.log(day)

			var cityId = this.$store.getters.getSelectCity.id //当前城市id
			this.request.getCinemaMovieList({
				movieId: id,
				day: day,
				cityId: cityId
			}, (data) => {
				//console.log(data)
				this.cinemas = data.cinemas
				this.showDays = data.showDays
				this.preloading = false
				this.showContent = true
			})
		},
		methods: {
			//时间选择
			dealChosen(item,index) {
				this.chosen = index
				
				var box = document.getElementById("time-line")

				this.$nextTick(() => {
					var selectItem = document.querySelector("#time-line li.chosen")
					var scroll =selectItem.offsetLeft - (box.clientWidth / 2 - selectItem.clientWidth / 2)
					box.scrollLeft = scroll
					//box.scrollLeft = selectItem.offsetLeft - box.clientWidth / 3
				})
			},
			//吸顶
			dealshowIndex(showIndex) {
				
				var scrollTop = document.documentElement.scrollTop

				if(showIndex > 0) {
					this.showFilter=true

				}else{
					if(scrollTop > 188) {
						this.showFilter=true
					} else {
						this.showFilter=false
					}
				}
			}

		},
		destroyed() {
			window.removeEventListener('scroll', this.dealshowIndex)
		},

	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*电影信息*/
	
	.movie-info {
		height: 188px;
		position: relative;
	}
	
	.movie-info.fixed {
		display: none;
	}
	
	.movie-filter {
		position: absolute;
		z-index: -1;
		width: 100%;
		height: 100%;
		background-color: #333;
	}
	
	.poster {
		width: 100%;
		height: 100%;
		z-index: -1;
		overflow: hidden;
		position: absolute;
		filter: blur(25px);
		background-size: cover;
		background-repeat: no-repeat;
		opacity: .55;
		background-image: url(../assets/img/playing.jpg)
	}
	
	.movie-detail-box {
		height: 150px;
		padding: 19px 30px 19px 15px;
	}
	
	.movie-detail-box a {
		display: flex;
	}
	
	.poster-img {}
	
	.poster-img img {
		width: 110px;
		height: 150px;
		box-sizing: border-box;
	}
	
	.movie-content {
		overflow-x: hidden;
		margin-left: 12.5px;
		line-height: 1;
		color: #fff;
		flex: 1;
	}
	
	.movie-content>div {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.movie-title {
		margin-top: 10px;
		font-size: 20px;
		font-weight: 700;
	}
	
	.movie-name {
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-score {
		margin-top: 12px;
		opacity: .8;
		font-weight: 700;
		font-size: 18px;
		color: #fc0;
	}
	
	.movie-score span {
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
	}
	
	.movie-type {
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-type span {
		vertical-align: top;
	}
	
	.movie-type-img {
		display: inline-block;
		width: 42px;
		opacity: .85;
	}
	
	.movie-type-img img {
		width: 16px;
	}
	
	.movie-src {
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-date {
		margin-top: 10px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-right {
		position: absolute;
		width: 10px;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.movie-right img {
		display: block;
	}
	
	.show-days.fixed {
		position: fixed;
		top: 50px;
		left: 0;
		z-index: 10;
	}
	
	.filter-cinema.fixed {
		position: fixed;
		top: 95px;
		left: 0;
	}
	/*时间选择*/
	
	.show-days {
		background-color: #fff;
		width: 100%;
	}
	
	.time-scroll {
		padding: 0 10px;
		width: 100%;
		box-sizing: border-box;
	}
	
	.time-line {
		width: 100%;
		white-space: nowrap;
		overflow-x: scroll;
		height: 45px;
	}
	
	.time-line li {
		display: inline-block;
		width: 115px;
		line-height: 43px;
		font-size: 14px;
		text-align: center;
		color: #666;
	}
	
	.time-line li.chosen {
		border-bottom: 2px solid #f03d37;
		color: #f03d37;
	}
	/*影院選擇*/
	/*影院过滤组件*/
	
	.filter-cinema {
		width: 100%;
		height: 40px;
		line-height: 40px;
		z-index: 4;
		background-color: #fff;
	}
	/*影院列表*/
	
	.cinema-list.fixed {
		margin-top: 85px;
	}
	
	.cinema-list-item {
		padding: 13px 15px;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.cinema-list-item>div {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.cinema-title {
		height: 23px;
		line-height: 23px;
		font-size: 16px;
		color: #000;
	}
	
	.cinema-title span:nth-of-type(1) {}
	
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
		height: 17px;
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
	}
	
	.snack {
		color: #f90;
		border: 1px solid #f90;
	}
	
	.hall-type {
		color: #589daf;
		border: 1px solid #589daf;
		margin-left: 5px;
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
	
	.min-show-block {
		font-size: 12px;
		color: #999;
		line-height: 1.5;
	}
	/*预加载*/
	
	.preloading {
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		padding-top: 50px;
	}
	
	.preloading img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
</style>