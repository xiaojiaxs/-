<template>
	<div class="movieOrder">
		<navbar title="我的电影订单" type="detail"></navbar>
		<!--预加载-->
		<div class="preloading" v-if="preloading">
			<img src="../assets/img/loading.gif" alt="" />
			<span>正在加载...</span>
		</div>
		<!--电影列表-->
		<div class="detail-content" v-if="!preloading">
			<noOrder v-if="orderList.length==0"></noOrder>
			<div class="order-list" v-if="orderList.length>0">
				<ul>
					<li v-for="(item,index) in orderList" :key="index">
						<div class="order-title">
							UME国际影城(华星店)
						</div>
						<div class="order-info">
							<div class="order-img">
								<img src="../assets/img/big.jpg" alt="" />
							</div>
							<div class="order-desc">
								<div class="movie-name">
									{{item.movie.movieName}}&nbsp;&nbsp;<span>{{item.seats.length}}张</span>
								</div>
								<div class="show-time">
									{{item.show.showDate}} {{item.show.showTime}}
								</div>
								<div class="position">
									{{item.hall.hallName}}
									<span v-for="(seatItem,seatIndex) in item.seats" :key="seatIndex">{{seatItem.rowId}}排 {{seatItem.columnId}}座</span>
								</div>
							</div>
						</div>
						<div class="order-more">
							<div class="price">
								总价：
								<span>{{item.sellMoney}}元</span>
							</div>
							<div class="status">支付完成</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				preloading:true,
				orderList: []
			};
		},
		created() {

			var user = JSON.parse(localStorage.Maoyan_user);

			var dict = {
				userId: user.id,
				token: user.token,
				userPhone: user.mobile
			};

			this.request.getMyOrderList(dict, data => {
				this.orderList = data.data;
				this.preloading=false
			});
		}
	};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.movieOrder {
		background: #f3f3f3;
	}
	
	
	.order-list ul li {
		background-color: #fff;
		margin-bottom: 10px;
		padding:0 15px;
	}
	
	.order-title {
		
		line-height: 38px;
		height: 38px;
		font-size: 13px;
		color: #666;
	}
	
	.order-info {
		padding: 12px 0;
		overflow: hidden;
		position: relative;
		
		border-bottom:1px solid #eaeaea;
	}
	
	.order-img {
		width: 57px;
		height: 80px;
		float: left;
	}
	
	.order-img img {
		width: 57px;
		height: 80px;
	}
	
	.order-desc {
		margin-left:10px;
		padding: 10px 0;
		float: left;
		width: calc(100% - 67px);
	}
	
	.order-desc>div {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.movie-name {
		font-size: 15px;
		color: #000;
		line-height: 21px;
		height: 21px;
	}
	
	.show-time,
	.position {
		font-size: 12px;
		color: #888;
		line-height: 18px;
		height: 18px;
	}
	
	
	
	.order-more {
		
		line-height: 42px;
		height: 42px;
		font-size: 13px;
		color: #888;
	}
	
	.price {
		float: left;
	}
	
	.status {
		float: right;
		color: #333;
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