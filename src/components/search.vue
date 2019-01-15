<template>
	<div class="mine">
		<navbar title="搜索" type="detail"></navbar>
		<div class="detail-content">
			<div class="search-wrapper">
				<!--搜索框-->
				<div class="search-header">
					<div class="input-wrapper">
						<img class="search-icon" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/search.png" alt="">
						<input @blur="dealBlur" @input="dealInput()" @change="dealChange" v-model="kw" class="search-input" type="text" placeholder="搜电影、搜影院">
						<img @click="dealDelkw" class="del-input" v-if="isDelInput" src="//s0.meituan.net/bs/?f=my-canary:/deploy/images/close.png" alt="">
					</div>
					<a class="cancel" href="javascript:history.back()">取消</a>
					<!--<div @click="$router.push('/movie')" class="cancel">取消</div>-->
				</div>
				<!--历史纪录-->
				<div v-if="isShowHistory" class="search-history" style="">
					<div v-for="(item,index) in movie" :key="index" class="history-item" :data-index="index">
						<span class="history-icon"></span>
						<span @click="dealHistorySearch(index)" class="word one-line">{{item}}</span>
						<div @click="dealDelItem(index)" class="del-word"></div>
					</div>
				</div>
				<!--搜索结果-->
				<div v-if="isShowResult" class="search-result">
					<div class="result-wrapper">
						<!--电影-->
						<div class="result">
							<h3>电影/电视剧/综艺</h3>
							<div class="list">
								<div @click="$router.push('/movieDetail/'+item.id+'/'+item.nm)" class="movie cell" v-for="(item,index) in movieList" :key="index">
									<img class="poster" :src="item.img|wh128x180" alt="">
									<div class="info">
										<div class="name-score">
											<p class="name">
												<span class="one-line">{{item.nm}}</span>
												<span class="version v3d"></span>
											</p>
											<span v-if="item.showst==2" class="score">
									            <span class="num">{{item.sc}}</span>
									                          分
											</span>
											<span v-if="item.showst==1" class="score">
									            <span class="num">{{item.wish}}</span>想看
											</span>
										</div>
										<div class="detail-section">
											<div class="detail-items">
												<p class="ename one-line">{{item.enm}}</p>
												<p class="catogary">{{item.cat}}</p>
												<p class="release">{{item.rt}}</p>
											</div>
											<div v-if="item.showst==1" class="btn toggle-wish-btn" data-wishst="0" data-movieid="664273">想看</div>
											<div v-if="item.showst==2" class="buy"></div>
											<div v-if="item.showst==3" class="buy-btn sale" data-id="345036">购票</div>
											<div v-if="item.showst==4" class="buy-btn presale" data-id="1133207">预售</div>
										</div>
									</div>
								</div>
							</div>
							<div class="more-result" data-target="movies" :data-total="moviesTotal">查看全部{{moviesTotal}}部影视剧</div>
						</div>
						<!--影院-->
						<div class="result">
							<h3>影院</h3>
							<div class="list">
								<div @click="$router.push('/cinemaDetail/'+item.id+'/'+item.nm)" class="cinema cell" data-id="2611" v-for="(item,index) in cinemaList" :key="index">
									<div class="info">
										<p class="name-price">
											<span class="name one-line">{{item.nm}}</span>
											<span class="sell-price"> 
							              		<span class="price">{{item.sellPrice}}</span>
							              		 元起
											</span>
										</p>
										<p class="address one-line">{{item.addr}}</p>
										<p class="feature-tags">
											<span>座</span>
											<span v-if="item.allowRefund==1">改签</span>
											<span v-if="item.snack==1" class="featrue">小吃</span>
											<span class="featrue">折扣卡</span>
										</p>
									</div>
									<div class="distance">{{item.distance}}</div>
								</div>
							</div>
							<div class="more-result" data-target="cinemas" :data-total="cinemaTotal">查看全部{{cinemaTotal}}家电影院</div>
						</div>
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
				isDelInput: false,
				movie: [],
				kw: "",

				movieList: [],
				moviesTotal: "",
				cinemaList: [],
				cinemaTotal: "",

				isShowResult: false,
				isShowHistory: true
			}
		},
		created() {

			this.loadHistory()
		},
		methods: {
			//删除历史纪录
			dealDelItem(index) {
				//console.log("index="+index)
				this.movie.splice(index, 1)

				var history = JSON.parse(localStorage.search);
				history.movie = this.movie
				localStorage.search = JSON.stringify(history)
			},

			//获取搜索数据
			dealInput() {

				var kw = this.kw;
				if(kw.length == "") {
					this.isDelInput = false
				} else {
					this.isDelInput = true
				}

				this.request.getSearchList({kw:this.kw}, (data) => {
					//console.log(data.movies.list)
					
					if(data.movies.list.length > 0) {
						this.isShowHistory = false
						this.isShowResult = true
					}

					this.movieList = data.movies.list
					this.moviesTotal = data.movies.total
					this.cinemaList = data.cinemas.list
					this.cinemaTotal = data.cinemas.total
				})
			},

			//存储历史纪录
			dealBlur() {

				var kw = this.kw;
				if(kw == "") {
					return
				}
				var search = {
					movie: [],
					cinema: []
				}

				if(localStorage.search == undefined) {
					localStorage.search = JSON.stringify(search)
				}

				var history = JSON.parse(localStorage.search);
				var movie = history.movie

				//去除重复
				for(var i = 0; i < movie.length; i++) {

					if(kw == movie[i]) {
						movie.splice(i, 1)
					}
				}

				//最多3个
				if(movie.length >= 3) {
					movie.pop()
				}

				movie.unshift(kw)
				localStorage.search = JSON.stringify(history)
			},
			loadHistory() {

				if(localStorage.search != undefined) {
					var history = JSON.parse(localStorage.search);
					var movie = history.movie

					var cinema = history.cinema
					console.log()
					this.movie = movie

				}

			},

			//清除搜索关键字
			dealDelkw() {
				this.kw = ""
			},

			//改变搜索关键字
			dealChange() {

				this.movieList = []
				this.moviesTotal = ""
				this.cinemaList = []
				this.cinemaTotal = ""

				this.dealInput()
			},

			//点击历史纪录搜索
			dealHistorySearch(index) {
				var history = JSON.parse(localStorage.search);
				var movie = history.movie
				var kw = movie[index]

				this.kw = kw
				this.dealInput()

			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.search-wrapper {
		background-color: #f5f5f5;
	}
	/*搜索框*/
	
	.search-header {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		padding: 8px 0 8px 10px;
		background-color: #f5f5f5;
		border-bottom: 1px solid #e5e5e5;
		z-index: 1;
	}
	
	.search-header .input-wrapper {
		padding: 0 10px;
		border: 1px solid #e6e6e6;
		border-radius: 5px;
		background-color: #fff;
		-webkit-box-flex: 1;
		flex-grow: 1;
		position: relative;
	}
	
	.search-header .search-icon {
		width: 15px;
		height: 15px;
		margin-right: 6px;
		float: left;
		position: relative;
		top: 6px;
	}
	
	.search-header .search-input {
		-webkit-box-flex: 1;
		flex: 1;
		border: none;
		font-size: 13px;
		color: #333;
		line-height: 20px;
		padding: 4px 0;
		width: calc(100% - 40px);
		outline: none;
	}
	
	.search-header .del-input {
		width: 15px;
		height: 15px;
		float: right;
		top: 6px;
		position: absolute;
	}
	
	.search-header .cancel {
		height: 30px;
		line-height: 30px;
		padding: 0 10px;
		font-size: 16px;
		color: #f03d37;
	}
	/*历史纪录*/
	
	.search-history {
		background-color: #fff;
	}
	
	.search-history .history-item {
		margin-left: 15px;
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		border-bottom: 1px solid #e5e5e5;
		line-height: 44px;
		-webkit-box-align: center;
		align-items: center;
	}
	
	.search-history .history-item .history-icon {
		width: 15px;
		height: 15px;
		margin-right: 10px;
		background: url(../assets/img/history-icon.png);
		background-size: contain;
		display: inline-block;
		-webkit-box-flex: 0;
		flex: 0 0 auto;
	}
	
	.search-history .history-item .word {
		color: #333;
		font-size: 15px;
		-webkit-box-flex: 1;
		flex: 1 1 auto;
		display: inline-block;
	}
	
	.one-line {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.search-history .history-item .del-word {
		background-image: url(../assets/img/history-del.png);
		background-repeat: no-repeat;
		background-position: 15px;
		background-size: 10px;
		-webkit-align-self: center;
		align-self: center;
		padding: 17px 15px;
		width: 10px;
		height: 10px;
		-webkit-box-flex: 0;
		flex: 0 0 auto;
	}
	/*搜索結果*/
	
	.result-wrapper {
		height: 100%;
		overflow: auto;
	}
	
	.result {
		margin-bottom: 10px;
		background-color: #fff;
	}
	
	.result h3 {
		font-size: 15px;
		color: #999;
		padding: 9px 15px;
		font-weight: 400;
		margin: 0;
	}
	
	.result .list {
		padding-left: 15px;
		border-top: 1px solid #e6e6e6;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.result .movie {
		padding: 12px 0;
		min-height: 90px;
	}
	
	.result .cell:last-child {
		border-bottom: none;
	}
	
	.result .cell,
	.result .list {
		border-bottom: 1px solid #e6e6e6;
	}
	
	.result .movie .poster {
		background-color: #eee;
		width: 64px;
		height: 90px;
		float: left;
		margin-right: 10px;
	}
	
	.result .movie .info {
		margin-right: 15px;
		margin-top: 1px;
	}
	
	.result .movie .name-score {
		font-size: 16px;
		color: #222;
		display: -webkit-box;
		display: flex;
		-webkit-box-pack: justify;
		justify-content: space-between;
		margin-bottom: 2px;
	}
	
	.result .movie .name-score .name {
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-flex: 1;
		flex-grow: 1;
		max-height: 24px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	h3,
	p {
		margin: 0;
	}
	
	.result .movie .name-score .name .one-line {
		display: inline-block;
		font-weight: 700;
		font-size: 17px;
	}
	
	.one-line {
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	
	.result .movie .name-score .score,
	.result .movie .name-score .wish {
		color: #fa0;
		font-size: 10px;
		flex-shrink: 0;
		padding-left: 5px;
	}
	
	.result .movie .name-score .num {
		font-size: 16px;
	}
	
	.hot-search,
	.result .movie .detail-section,
	.search-header,
	.search-header .del-input {
		position: relative;
	}
	
	.result .movie .detail-section .detail-items {
		-webkit-box-flex: 1;
		flex-grow: 1;
		overflow: hidden;
		padding-right: 10px;
		margin-right: 48px;
		min-height: 27px;
	}
	
	.result .movie .detail-section .catogary,
	.result .movie .detail-section .ename,
	.result .movie .detail-section .release {
		font-size: 13px;
		color: #666;
		margin-top: 2px;
	}
	
	.result .movie .detail-section .sale {
		background-color: #ef4238;
	}
	
	.result .movie .detail-section .presale {
		background-color: #3c9fe6;
	}
	
	.result .movie .detail-section .btn,
	.result .movie .detail-section .buy-btn {
		color: #fff;
		border-radius: 4px;
		font-size: 12px;
		-webkit-align-self: flex-end;
		align-self: flex-end;
		flex-shrink: 0;
		width: 48px;
		text-align: center;
		height: 27px;
		line-height: 27px;
		right: 0;
		position: absolute;
		top: 0;
		bottom: 0;
		margin: auto;
	}
	
	.result .movie .detail-section .toggle-wish-btn[data-wishst="0"] {
		background-color: #faaf00;
		border: none;
		color: #fff;
	}
	
	.result .more-result {
		color: #ef4238;
	}
	
	.result .more-result,
	.result .no-related-result {
		text-align: center;
		line-height: 44px;
		height: 44px;
		font-size: 15px;
	}
	
	.result .cinema {
		display: -webkit-box;
		display: flex;
		-webkit-box-align: center;
		align-items: center;
		-webkit-box-pack: justify;
		justify-content: space-between;
		padding: 15px 15px 15px 0;
	}
	
	.result .cinema .info {
		-webkit-box-flex: 1;
		flex: 1;
		overflow: hidden;
	}
	
	.result .cell,
	.result .list {
		border-bottom: 1px solid #e6e6e6;
	}
	
	.result .cinema .name-price {
		font-size: 16px;
		color: #000;
		margin-bottom: 6px;
		display: -webkit-box;
		display: flex;
	}
	
	.result .cinema .sell-price {
		font-size: 11px;
		color: #999;
		white-space: nowrap;
		margin-left: 10px;
	}
	
	.result .cinema .price {
		font-size: 17px;
		color: #ef4238;
	}
	
	.result .cinema .address {
		font-size: 13px;
		color: #999;
	}
	
	.result .cinema .feature-tags {
		margin-top: 7px;
	}
	
	.result .cinema .feature-tags span {
		border: 1px solid #589daf;
		color: #589daf;
		position: relative;
		display: inline-block;
		padding: 0 3px;
		height: 15px;
		line-height: 15px;
		border-radius: 2px;
		font-size: .6rem;
	}
	
	.result .cinema .feature-tags span.featrue {
		color: #f90;
		border-color: #f90;
	}
	
	.result .cinema .distance {
		font-size: 13px;
		color: #999;
	}
</style>