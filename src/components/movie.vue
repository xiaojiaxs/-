<template>
	<div class="movie">
		
		<navbar title="猫眼电影"></navbar>
		
		<div class="list-content">
			<div class="topbar">
				<!--城市定位-->
				<div class="city-entry">
					<router-link to="cityList">
						<span class="city-name">{{$store.getters.getSelectCity.nm}}</span>
						<i class="city-entry-arrow"></i>
					</router-link>
				</div>
				<!--正在热映/即将上映-->
				<div class="switch-hot">
					<div @click="dealClick(1)" class="hot-item" :class="{'active':index==1}">正在热映</div>
					<div @click="dealClick(2)" class="hot-item" :class="{'active':index==2}">即将上映</div>
				</div>
				<!--搜索-->
				<div class="search-entry" @click="$router.push('/search')">
					<img src="../assets/img/search.png" alt="" />
				</div>
			</div>
			<div class="movie-list">
				<!--预加载-->
				<div class="preloading" v-if="preloading">
					<img src="../assets/img/loading.gif" alt="" />
					<span>正在加载...</span>
				</div>
				<!--正在热映-->
				<div class="playing-list" v-if="index==1">
					<!--电影列表-->
					<ul>

						<li v-for="(item,index) in list" :key="index">
							<router-link :to="'/cinemaMovie/'+item.id+'/'+item.nm">
								<div class="playing-left">
									<img :src="item.img|wh128x180" alt="" />
								</div>
								<div class="playing-center">
									<div class="title">{{item.nm}}</div>
									<!--购票-->
									<div v-if="item.showst==3" class="score">观众评<i>{{item.sc}}</i></div>
									<!--预售-->
									<div v-if="item.showst==4" class="score"><i>{{item.wish}}</i>人想看</div>
									<div class="star">主演：{{item.star}}</div>
									<div class="plan">{{item.showInfo}}</div>
								</div>
								<div class="playing-right">
									<!--购票-->
									<div v-if="item.showst==3" class="buy">购票</div>
									<!--预售-->
									<div v-if="item.showst==4" class="buy pre">预售</div>
								</div>

							</router-link>
						</li>

					</ul>
				</div>
				<!--即将上映-->
				<div class="soon-playing-list" v-if="index==2">
					<!--预加载-->
					<div class="preloading" v-if="loading">
						<img src="../assets/img/loading.gif" alt="" />
						<span>正在加载...</span>
					</div>
					<!--最受期待-->
					<div class="most-expect">
						<div class="most-expect-title" v-if="showTitle">近期最受期待</div>
						<div class="most-expected-list">
							<div @click="$router.push('/cinemaMovie/'+item.id+'/'+item.nm)" v-for="(item,index) in mostExpected" :key="index" class="expected-item">
								<div class="expected-item-img">
									<img :src="item.img|wh128x180" alt="" />
									<div class="expected-item-heart">
										<span></span>
									</div>
									<div class="expected-item-wish">
										{{item.wish}}人想看
									</div>
								</div>
								<div class="most-expected-movie-name">{{item.nm}}</div>
								<div class="most-expected-movie-date">{{item.rt}}</div>
							</div>

						</div>
					</div>
					<!--电影列表-->
					<div class="coming-list">
						<div class="coming-list-item">
							<!--<div class="group-date">
								12月31日 周一
							</div>-->
							<ul>
							
								<li @click="$router.push('/cinemaMovie/'+item.id+'/'+item.nm)" v-for="(item,index) in comingList" :key="index">
									<div class="playing-left">
										<img :src="item.img|wh128x180" alt="" />
									</div>
									<div class="playing-center">
										<div class="title">{{item.nm}}</div>
										<div class="wish"><i>{{item.wish}}</i>人想看</div>
										<div class="star">主演: {{item.star}}</div>
										<div class="plan">{{item.rt}}</div>
									</div>
									<div class="playing-right">
										<!--预售-->
										<div v-if="item.showst==4" class="buy pre">预售</div>
										<!--想看-->
										<div v-if="item.showst==1" class="buy wish">想看</div>
									</div>
								</li>

							</ul>
						</div>
					</div>
				</div>

			</div>
		</div>
		
		<tabbar></tabbar>
		
	</div>
</template>

<script>
	export default {
		name: 'movie',
		data() {
			return {
				index: 1,
				
				list: [],
				comingList: [],
				mostExpected: [],
				
				preloading:true,
				loading:true,
				showTitle:false
			}
		},
		created() {

			//下载正在上映数据
			this.request.getMovieOnInfoList({}, (data) => {
				//console.log(data)
				this.list = data.movieList
				this.preloading=false
			})
		},
		watch: {
			index() {
				if(this.index == 2) {
					//下载最受期待数据
					this.request.getComingList({}, (data) => {
						//console.log(data)
						this.comingList = data.coming
					})
					//下载即将上映数据
					this.request.getMostExpected({}, (data) => {
						//console.log(data)
						this.mostExpected = data.coming
						this.loading=false
						this.showTitle=true
					})
				}
			}
		},
		computed: {

		},
		methods: {
			//正在热映/即将上映  选项卡
			dealClick(index) {
				this.index = index
			}
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
		z-index: 2;
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
		margin-right: 2px;
		width: 0;
		height: 0;
		border: 4px solid #b0b0b0;
		border-left-color: transparent;
		border-right-color: transparent;
		border-bottom-color: transparent;
		display: inline-block;
		margin-left: 2px;
		margin-top: 5px;
	}
	
	.switch-hot {
		display: flex;
		justify-content: space-around;
		line-height: 44px;
		height: 45px;
	}
	
	.hot-item {
		font-size: 15px;
		color: #666;
		width: 80px;
		text-align: center;
		margin: 0 12px;
		font-weight: 700;
	}
	
	.hot-item.active {
		color: #ef4238;
		border-bottom: 2px solid #ef4238;
	}
	
	.search-entry img {
		width: 20px;
		height: 20px;
		margin: 12px 15px 0 0;
	}
	/*电影列表*/
	
	.movie-list {
		padding-top: 45px;
	}
	
	ul {
		padding: 10px 0;
	}
	
	li {
		padding: 10px 15px;
		box-sizing: border-box;
		overflow: hidden;
	}
	
	li a {
		display: block;
		width: 100%;
		overflow: hidden;
	}
	
	.playing-left {
		width: 64px;
		height: 90px;
		float: left;
	}
	
	.playing-left img {
		width: 64px;
		height: 90px;
	}
	
	.playing-center {
		float: left;
		margin-left: 10px;
		width: calc(100% - 64px - 47px - 15px);
	}
	
	.playing-center>div {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.playing-center .title {
		font-size: 17px;
		color: #333;
		font-weight: 700;
		margin-bottom: 7px;
		line-height: 24px;
	}
	
	.playing-center .score {
		font-size: 13px;
		color: #666;
	}
	
	.playing-center .score i {
		font-weight: 700;
		color: #faaf00;
		font-size: 15px;
		font-style: normal;
		margin: 0 5px;
	}
	
	.playing-center .star,
	.playing-center .plan {
		font-size: 13px;
		color: #666;
		line-height: 15px;
		margin-top: 6px;
	}
	
	.playing-right {
		float: right;
		width: 47px;
	}
	
	.playing-right .buy {
		width: 47px;
		height: 27px;
		line-height: 28px;
		text-align: center;
		box-sizing: border-box;
		background-color: #f03d37;
		color: #fff;
		border-radius: 4px;
		white-space: nowrap;
		font-size: 12px;
		cursor: pointer;
		margin-top: 32px;
	}
	
	.playing-right .buy.pre {
		background-color: #3c9fe6;
	}
	
	.playing-right .buy.wish {
		background-color: #faaf00;
	}
	/*最受期待*/
	
	.most-expect {
		width: 100%;
		padding: 12px 0 12px 15px;
		background-color: #fff;
		margin-bottom: 10px;
		box-sizing: border-box;
	}
	
	.most-expect-title {
		margin: 0 0 12px;
		font-size: 14px;
		color: #333;
	}
	
	.most-expected-list {
		overflow-x: scroll;
		white-space: nowrap;
		width: 100%;
	}
	
	.expected-item {
		display: inline-block;
		width: 85px;
		overflow: hidden;
		margin-right: 10px;
	}
	
	.expected-item-img {
		width: 85px;
		height: 115px;
		position: relative;
	}
	
	.expected-item-img img {
		width: 85px;
		height: 115px;
	}
	
	.expected-item-heart {
		width: 28px;
		line-height: 28px;
		background: rgba(61, 63, 71, .6);
		text-align: center;
		border-bottom-right-radius: 10px;
		position: absolute;
		top: 0;
		left: 0;
	}
	
	.expected-item-heart span {
		display: inline-block;
		width: 10px;
		height: 10px;
		background-size: 100%;
		background-repeat: no-repeat;
		background-image: url(../assets/img/heart.png)
	}
	
	.expected-item-wish {
		position: absolute;
		left: 4px;
		bottom: 2px;
		color: #faaf00;
		font-size: 11px;
		font-weight: 600;
	}
	
	.most-expected-movie-name {
		margin: 6px 0 3px 0;
		font-size: 13px;
		color: #222;
		font-weight: bold;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
		text-align: center;
	}
	
	.most-expected-movie-date {
		margin: 0;
		font-size: 12px;
		color: #999;
	}
	
	.coming-list {
		background: #fff;
	}
	
	.coming-list-item {}
	
	.group-date {
		padding: 12px 15px 0;
		margin: 0;
		font-size: 14px;
		color: #333;
	}
	
	.playing-center .wish {
		font-size: 13px;
		color: #666;
	}
	
	.playing-center .wish i {
		color: #faaf00;
		font-size: 15px;
		font-weight: 600;
		font-style: normal;
		margin-right: 3px;
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