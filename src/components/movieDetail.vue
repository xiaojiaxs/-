<template>
	<div class="movie-detail">
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
					<div class="poster-img">
						<img :src="detailMovie.img|wh128x180" alt="" />
						<img class="play-img" src="../assets/img/play.png" alt="" />
					</div>
					<div class="movie-content">
						<div class="movie-title">{{detailMovie.nm}}</div>
						<div class="movie-name">{{detailMovie.enm}}</div>
						<div class="movie-score">
							<div class="movie-score-rating">
								<img src="../assets/img/star-full-new.png" alt="" />
								<img src="../assets/img/star-full-new.png" alt="" />
								<img src="../assets/img/star-full-new.png" alt="" />
								<img src="../assets/img/star-full-new.png" alt="" />
								<img src="../assets/img/star-empty-new.png" alt="" />
								<span>{{detailMovie.sc}}</span>
							</div>
							<div class="movie-score-number">({{detailMovie.vnum}}万人评分)</div>
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
				</div>
			</div>
			<div class="box-all">
				<!--电影简介-->
				<div class="introduction">
					<div class="buy-tickets-button">
						<button>特惠购票</button>
					</div>
					<div class="introduction-content">
						<div class="introduction-content-text" :class="{active:showDetail==1}">
							{{detailMovie.dra}}
						</div>
						<div class="introduction-content-button">
							<span @click="dealShow" :class="{active:showDetail==1}"></span>
						</div>
					</div>
				</div>
				<!--观影小贴士-->
				<div class="tips-area">
					<div class="tips-title">观影小贴士</div>
					<div class="tips-content">
						<img src="../assets/img/tips.png" alt="" />
						<span>请在70分钟跟随主角一起戴上3D眼镜</span>
					</div>
				</div>
				<!--演员区域-->
				<div class="star-area">
					<div class="star-scroll">
						<ul>
							<li>
								<router-link to="/starDetail">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</router-link>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<span>张艾嘉</span>
									<span>白猫妈妈 / 红发女人</span>
								</a>
							</li>
						</ul>

					</div>
					<div class="star-all">
						<a href="javascript:;">
							<span>全体演职人员</span>
							<span></span>
						</a>
					</div>
				</div>
				<!--媒体库-->
				<div class="media-area">
					<div class="media-title">媒体库</div>
					<div class="media-scroll">
						<ul>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
								</a>
							</li>
							<li v-for="(item,index) in detailMovie.photos" :key="index">
								<a href="javascript:;">
									<img :src="item|wh128x180" alt="" />
								</a>
							</li>

						</ul>

					</div>
					<div class="link-group">
						<a class="link-group-video" href="javascript:;">
							<span>视频</span>
							<span>10</span>
							<span></span>
						</a>
						<a class="link-group-photo" href="javascript:;">
							<span>剧照</span>
							<span>177</span>
							<span></span>
						</a>
					</div>
				</div>
				<!--正版周边-->
				<div class="perimeter-area">
					<div class="perimeter-title">
						<a href="javascript:;">
							<span>正版周边</span>
							<span>全部</span>
							<span></span>
						</a>
					</div>
					<div class="perimeter-scroll">
						<ul>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<div class="perimeter-name">猫眼3D眼镜夹片</div>
									<div class="perimeter-price">
										<span>29.9元</span>
										<span>零售价69元</span>
									</div>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<div class="perimeter-name">猫眼3D眼镜夹片</div>
									<div class="perimeter-price">
										<span>29.9元</span>
										<span>零售价69元</span>
									</div>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<div class="perimeter-name">猫眼3D眼镜夹片</div>
									<div class="perimeter-price">
										<span>29.9元</span>
										<span>零售价69元</span>
									</div>
								</a>
							</li>
							<li>
								<a href="javascript:;">
									<img src="../assets/img/playing.jpg" alt="" />
									<div class="perimeter-name">猫眼3D眼镜夹片</div>
									<div class="perimeter-price">
										<span>29.9元</span>
										<span>零售价69元</span>
									</div>
								</a>
							</li>
						</ul>

					</div>
				</div>
				<!--资讯-->
				<div class="information-area">
					<div class="information-title">资讯</div>
					<div class="information-content">
						<a href="javascript:;">
							<img src="../assets/img/playing.jpg" alt="" />
							<div class="information-info">
								厉害了中国电影！年度票房首破600亿，国产片完胜进口片！
							</div>
							<div class="information-right">
								<span></span>
							</div>
						</a>
					</div>

				</div>
				<!--排行-->
				<div class="ranking-area">
					<a href="javascript:;">
						<div class="ranking-content">
							<div class="ranking-item">
								<div class="ranking-number">9</div>
								<div class="ranking-title">昨日票房排行</div>
							</div>
							<div class="ranking-item">
								<div class="ranking-number no-ranking">暂无</div>
								<div class="ranking-title">首周票房(万)</div>
							</div>
							<div class="ranking-item">
								<div class="ranking-number">22,816</div>
								<div class="ranking-title">累计票房(万)</div>
							</div>
						</div>
						<div class="ranking-right">
							<span></span>
						</div>
					</a>
				</div>
				<!--评论-->
				<div class="comment-area">
					<div class="comment-title">讨论</div>
					<div class="comment-list">
						<div class="comment-name">精选</div>
						<ul>
							<li v-for="(item,index) in hotComments" :key="index">
								<div class="comment-list-left">
									<img :src="item.avatarUrl" alt="" />
								</div>
								<div class="comment-list-right">
									<div class="comment-list-header">
										<span>{{item.nick}}</span>
										<img src="../assets/img/dengji.png" alt="" />
										<div class="comment-list-score">
											给这部电影打了{{item.score}}分
										</div>
									</div>
									<div class="comment-list-content">
										<a href="javascript:;">
											{{item.content}}
										</a>
									</div>
									<div class="comment-list-bottom">
										<span>17小时前</span>
										<div class="pull-right">
											<div class="goods">
												<img src="../assets/img/goods.png" alt="" />
												<span>{{item.upCount}}</span>
											</div>
											<div class="discuss">
												<img src="../assets/img/discuss.png" alt="" />
												<span>{{item.replyCount}}</span>
											</div>
										</div>
									</div>
								</div>
							</li>
						</ul>
					</div>
					<div class="comment-all">查看全部{{total}}条评论></div>
				</div>
				<!--相关电影-->
				<div class="related-area">
					<div class="related-title">相关电影</div>
					<div class="related-content">
						<div class="related-scroll">
							<ul>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
								<li>
									<a href="javascript:;">
										<img src="../assets/img/playing.jpg" alt="" />
										<div class="related-content-title">江湖儿女</div>
									</a>
								</li>
							</ul>

						</div>
					</div>
				</div>
				<!--footer区域-->
				<div class="footer">
					<a href="javascript:;">
						<div class="down-load">下载猫眼电影，查看更多电影信息</div>
					</a>
					<div class="copyright">
						© 猫眼电影 客服电话:
						<span>1010-5335</span>
					</div>
					<div class="icp">
						京ICP备16022489号-1&nbsp;京公网安备11010502030881号
					</div>
					<div class="company">
						北京猫眼文化传媒有限公司
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
				detailMovie: {},
				hotComments: [],
				total: '',
				showDetail: 0,
				preloading: true,
				showContent: false
			}
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
				}),
				//评论数据
				this.request.getCommentsList({
					movieId: id
				}, (data) => {
					//console.log(data)
					this.hotComments = data.data.hotComments
					this.total = data.paging.total
					this.preloading = false
					this.showContent = true

				})

		},
		methods: {
			//电影简介
			dealShow() {
				if(this.showDetail == 1) {
					this.showDetail = 0
				} else {
					this.showDetail = 1
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*电影信息*/
	
	.movie-info {
		height: 188px;
		position: relative;
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
		display: flex;
	}
	
	.poster-img {
		border: solid 1px #f0f2f3;
		position: relative;
	}
	
	.poster-img img {
		width: 110px;
		height: 148px;
		box-sizing: border-box;
	}
	
	.poster-img .play-img {
		position: absolute;
		right: 3px;
		bottom: 5px;
		width: 28px;
		height: 28px;
	}
	
	.movie-content {
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
		margin: 5px 0;
		font-size: 18px;
	}
	
	.movie-name {
		margin-bottom: 8px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-score {
		margin-bottom: 6px;
	}
	
	.movie-score-rating {
		display: inline-block;
		line-height: 1;
	}
	
	.movie-score-rating img {
		width: 16px;
		height: 16px;
	}
	
	.movie-score-rating span {
		margin-left: 3px;
		font-size: 16px;
		color: #ffc600;
	}
	
	.movie-score-number {
		color: #fff;
		opacity: .7;
		font-size: 10px;
		margin-top: 2px;
		margin-bottom: 4px;
	}
	
	.movie-type {
		margin-bottom: 8px;
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
		margin-bottom: 8px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.movie-date {
		margin-bottom: 8px;
		font-size: 12px;
		color: #fff;
		opacity: .8;
	}
	
	.box-all {
		background: #eaeaea;
	}
	/*电影简介*/
	
	.introduction {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		padding: 10px;
		padding-bottom: 0;
		background: #fff;
	}
	
	.buy-tickets-button {
		margin-bottom: 10px;
	}
	
	.buy-tickets-button button {
		font-size: 16px;
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
		background: #e54847;
		color: #fff;
		border: 0;
		outline: none;
	}
	
	
	.introduction-content-text {
		font-size: 16px;
		line-height: 22px;
		height: 68px;
		overflow: hidden;
	}
	
	.introduction-content-text.active {
		height: 100%;
	}
	
	.introduction-content-button {
		text-align: center;
	}
	
	.introduction-content-button span {
		display: inline-block;
		width: 18px;
		height: 18px;
		background: url(../assets/img/down.png);
		background-size: 18px 18px;
	}
	
	.introduction-content-button span.active {
		background: url(../assets/img/up.png);
		background-size: 18px 18px;
	}
	/*观影小贴士*/
	
	.tips-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.tips-title {
		margin: 0;
		font-weight: 400;
		color: #666;
		font-size: 16px;
		padding-left: 10px;
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.tips-content {
		height: 40px;
		padding: 0 10px;
	}
	
	.tips-content img {
		width: 26px;
		height: 26px;
		float: left;
		margin-top: 7px
	}
	
	.tips-content span {
		display: inline-block;
		line-height: 40px;
		white-space: nowrap;
		margin-left: 5px;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #555;
	}
	/*演员区域*/
	
	.star-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.star-scroll {
		padding: 10px;
	}
	
	.star-area ul {
		width: 100%;
		display: flex;
		box-sizing: border-box;
		overflow-x: scroll;
		white-space: nowrap;
	}
	
	.star-area ul li {
		margin-right: 10px;
	}
	
	.star-area ul li a {
		display: block;
	}
	
	.star-area ul li a img {
		width: 60px;
		height: 90px;
		margin-bottom: 5px;
	}
	
	.star-area ul li a span {
		display: block;
		font-size: 12px;
		width: 60px;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		text-align: center;
	}
	
	.star-area ul li a span:nth-of-type(1) {
		color: #000;
	}
	
	.star-area ul li a span:nth-of-type(2) {
		color: #999;
	}
	
	.star-all {
		position: relative;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		padding-left: 15px;
		padding-right: 15px;
		border-top: 1px solid #e5e5e5;
	}
	
	.star-all a {
		display: block;
		color: #666;
	}
	
	.star-all a span:nth-of-type(1) {
		text-align: left;
		font-weight: lighter;
	}
	
	.star-all a span:nth-of-type(2) {
		position: absolute;
		right: 15px;
		top: 18px;
		display: inline-block;
		content: "";
		width: 8px;
		height: 8px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	/*媒体库*/
	
	.media-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.media-title {
		font-weight: bold;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		padding: 0 10px
	}
	
	.media-scroll {
		padding: 10px;
	}
	
	.media-area ul {
		display: flex;
		box-sizing: border-box;
		overflow-x: scroll;
		white-space: nowrap;
		margin-bottom: 3px;
	}
	
	.media-area ul li {
		margin-right: 10px;
		width: 90px;
		height: 70px;
	}
	
	.media-area ul li a {
		display: block;
	}
	
	.media-area ul li a img {
		width: 90px;
		height: 70px;
	}
	
	.media-area ul li:nth-of-type(1) {
		width: 125px;
		height: 70px;
	}
	
	.media-area ul li:nth-of-type(1) a img {
		width: 125px;
		height: 70px;
	}
	
	
	.link-group-video {
		display: inline-block;
		width: 135px;
		height: 40px;
		padding-left: 10px;
		box-sizing: border-box;
		line-height: 40px;
		position: relative;
		margin-right: 10px;
	}
	
	.link-group-photo {
		display: inline-block;
		width: calc(100% - 150px);
		height: 40px;
		line-height: 40px;
		position: relative;
	}
	
	.link-group a span:nth-of-type(1) {
		text-align: left;
		font-weight: lighter;
	}
	
	.link-group a span:nth-of-type(2) {
		text-align: right;
		font-weight: lighter;
		position: absolute;
		right: 30px;
	}
	
	.link-group a span:nth-of-type(3) {
		position: absolute;
		right: 15px;
		top: 18px;
		display: inline-block;
		content: "";
		width: 8px;
		height: 8px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	/*正版周边*/
	
	.perimeter-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.perimeter-title {
		position: relative;
		height: 40px;
		line-height: 40px;
		font-size: 14px;
		padding-left: 15px;
		padding-right: 15px;
	}
	
	.perimeter-title a {
		display: block;
	}
	
	.perimeter-title a span:nth-of-type(1) {
		text-align: left;
		font-weight: lighter;
	}
	
	.perimeter-title a span:nth-of-type(2) {
		font-weight: lighter;
		position: absolute;
		right: 30px;
	}
	
	.perimeter-title a span:nth-of-type(3) {
		position: absolute;
		right: 15px;
		top: 18px;
		display: inline-block;
		content: "";
		width: 8px;
		height: 8px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	
	.perimeter-scroll {
		padding: 10px;
	}
	
	.perimeter-area ul {
		display: flex;
		box-sizing: border-box;
		overflow-x: scroll;
		white-space: nowrap;
	}
	
	.perimeter-area ul li {
		width: 128px;
		height: 200px;
		margin-right: 10px;
	}
	
	.perimeter-area ul li a {
		display: block;
	}
	
	.perimeter-area ul li a img {
		width: 128px;
		height: 128px;
	}
	
	.perimeter-name {
		height: 40px;
		line-height: 40px;
		width: 128px;
		text-align: center;
		font-size: 15px;
		color: #666;
		font-weight: 700;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.perimeter-price {
		text-align: center;
		font-size: 10px;
	}
	
	.perimeter-price span:nth-of-type(1) {
		color: #e54847;
	}
	/*资讯*/
	
	.information-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.information-title {
		padding-left: 10px;
		height: 40px;
		font-size: 16px;
		line-height: 40px;
	}
	
	.information-content {
		padding: 0 10px 10px 10px;
	}
	
	.information-content a {
		display: block;
		display: flex;
	}
	
	.information-content a img {
		width: 100px;
		height: 70px;
	}
	
	.information-info {
		margin: 10px;
		font-size: 17px;
		line-height: 25px;
		flex: 1;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		width: calc(100% - 130px);
	}
	
	.information-right {
		position: relative;
		width: 10px;
		height: 70px;
	}
	
	.information-right span {
		position: absolute;
		right: 3px;
		top: 31px;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	/*排行*/
	
	.ranking-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
		padding: 10px;
	}
	
	.ranking-area a {
		display: flex;
	}
	
	.ranking-content {
		display: flex;
		justify-content: space-around;
		width: 96%;
	}
	
	.ranking-number {
		text-align: center;
		height: 40px;
		line-height: 40px;
		font-size: 22px;
		color: #e54847;
		font-weight: 400;
	}
	
	.ranking-title {
		text-align: center;
		line-height: 20px;
		font-size: 12px;
		color: #999;
	}
	
	.no-ranking {
		color: #999;
		font-weight: lighter;
		font-size: 18px;
	}
	
	.ranking-right {
		width: 4%;
		position: relative;
	}
	
	.ranking-right span {
		position: absolute;
		right: 3px;
		top: 26px;
		display: inline-block;
		width: 8px;
		height: 8px;
		border-left: 1px solid #ccc;
		border-top: 1px solid #ccc;
		transform: rotate(135deg);
	}
	/*评论*/
	
	.comment-area {
		border-top: 1px solid #e5e5e5;
		border-bottom: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.comment-title {
		font-weight: bold;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.comment-list {
		padding-left: 10px;
	}
	
	.comment-name {
		font-weight: bold;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
	}
	
	.comment-list ul li {
		border-bottom: solid #e5e5e5 1px;
		padding: 7px 10px 7px 0;
		overflow: hidden;
	}
	
	.comment-list ul li:last-child {
		border-bottom: 0;
	}
	
	.comment-list-left {
		float: left;
		width: 35px;
	}
	
	.comment-list-left img {
		width: 35px;
		height: 35px;
	}
	
	.comment-list-right {
		float: right;
		width: calc(100% - 45px);
	}
	
	
	.comment-list-header span {
		color: #333;
		font-size: 14px;
	}
	
	.comment-list-header img {
		width: 37px;
		height: 17px;
		vertical-align: middle;
		margin-left: 5px;
	}
	
	.comment-list-score {
		color: #999;
		font-size: 12px;
		line-height: 16px;
	}
	
	.comment-list-content {
		padding: 6px 0;
	}
	
	.comment-list-content a {
		color: #333;
		font-size: 15px;
		line-height: 20px;
		display: block;
	}
	
	.comment-list-bottom {
		margin-top: 8px;
		margin-bottom: 8px;
		overflow: hidden;
	}
	
	.comment-list-bottom>span {
		float: left;
	}
	
	.pull-right {
		float: right;
		display: flex;
	}
	
	.goods,
	.discuss {
		color: #999;
		margin-left: 10px;
		font-size: 12px;
		border: 1px solid #CCCCCC;
		border-radius: 20px;
		padding: 3px 8px;
	}
	
	.goods img {
		width: 12px;
		height: 12px;
	}
	
	.discuss img {
		vertical-align: middle;
		width: 12px;
		height: 12px;
	}
	
	.goods span,
	.discuss span {
		font-size: 12px;
	}
	
	.comment-all {
		height: 40px;
		line-height: 40px;
		text-align: center;
		font-size: 14px;
		color: #f63;
		border-top: 1px solid #e5e5e5;
	}
	/*相关电影*/
	
	.related-area {
		border-top: 1px solid #e5e5e5;
		margin: 10px 0;
		background: #fff;
	}
	
	.related-title {
		font-weight: bold;
		font-size: 15px;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		border-bottom: 1px solid #e5e5e5;
	}
	
	.related-scroll {
		padding: 10px;
	}
	
	.related-content ul {
		display: flex;
		box-sizing: border-box;
		overflow-x: scroll;
		white-space: nowrap;
	}
	
	.related-content ul li {
		width: 70px;
		margin-right: 10px;
	}
	
	.related-content ul li a {
		display: block;
	}
	
	.related-content ul li a img {
		width: 70px;
		height: 90px;
	}
	
	.related-content-title {
		width: 70px;
		font-size: 12px;
		text-align: center;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	/*footer区域*/
	
	.footer {
		padding-bottom: 10px;
	}
	
	.down-load {
		margin: 0 10px;
		font-size: 16px;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 4px;
		background: #e54847;
		color: #fff;
	}
	
	.copyright {
		text-align: center;
		color: #000;
		margin: 10px 0;
	}
	
	.copyright span {
		color: #df3434;
		text-decoration: underline;
	}
	
	.icp {
		text-align: center;
		font-size: 10px;
		color: #9e9e9e;
		margin: 15px 0;
	}
	
	.company {
		text-align: center;
		font-size: 12px;
		color: #9e9e9e;
		margin: 10px 0 5px 0;
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