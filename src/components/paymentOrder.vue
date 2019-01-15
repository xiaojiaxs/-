<template>
	<div class="order">
		<navbar title="支付订单" type="detail"></navbar>
		<!--预加载-->
		<div class="preloading" v-if="preloading">
			<img src="../assets/img/loading.gif" alt="" />
			<span>正在加载...</span>
		</div>
		<div class="detail-content" v-if="!preloading">
			<!--支付剩余时间-->
			<div class="count-down">
				支付剩余时间:
				<span class="cd-time">{{minute}}:{{second}}</span>
			</div>
			<!--电影信息-->
			<div class="movie-info">
				<div class="movie-title">
					<div class="movie-title-text">
						{{orderData.movie?orderData.movie.movieName:''}}
					</div>
					<div class="movie-title-logo"></div>
				</div>
				<div class="movie-date">
					{{orderData.show?orderData.show.showDate:''}} {{orderData.show?orderData.show.showTime:''}} ({{orderData.show?orderData.show.lang:''}} {{orderData.show?orderData.show.dim:''}})
				</div>
				<div class="movie-local">
					{{orderData.cinema?orderData.cinema.cinemaName:''}}
				</div>
				<div class="movie-seats">
					{{orderData.hall?orderData.hall.hallName:''}} {{orderData.seats?orderData.sectionName:''}}&nbsp;
					<span v-for="(item,index) in orderData.seats" :key="index">{{item.rowId}}排{{item.columnId}}座&nbsp;&nbsp;</span>
				</div>
			</div>

			<!--支付信息-->
			<div class="pay-info">
				<div class="box-flex" @click="ShowCouponBox=true">
					<span>活动与抵用券</span>
					<i></i>
					<span>无可用</span>
				</div>
				<div class="box-flex">
					<span>手机号码</span>
					<span>{{orderData.userPhone?orderData.userPhone:''}}</span>
				</div>
				<div class="box-flex">
					<span>小计</span>
					<span>
					<b>￥</b><em>{{orderData.sellMoney?orderData.sellMoney:''}}</em>
				</span>
				</div>
			</div>
			<!--会员卡-->
			<div class="discount-area">
				<div class="icon-column"><b class="icon vip"></b></div>
				<div class="discount-info">
					<div class="discount-info-top">金逸院线会员卡<span>(40元/半年)</span></div>
					<div class="discount-info-bottom">
						开卡本单<span>立减7.5元</span>,查看详情
					</div>
				</div>
				<div class="arrow"></div>
			</div>
			<!--套餐区域-->
			<div class="food-area">
				<div class="food-title-area">
					<div class="food-title-left">
						观影标配
					</div>
					<div class="food-title-right">
						<span>客官，爆米花跟电影最配噢~</span>
						<img src="../assets/img/food.png" alt="" />
					</div>
				</div>
				<div class="food-list">
					<ul>
						<li>
							<div class="foot-img">
								<img src="../assets/img/playing.jpg" alt="" />
							</div>
							<div class="foot-content">
								<div class="food-name">
									<span class="personNum">单人</span> 32oz爆米花1桶+300ml牛乳茶1杯
								</div>
								<div class="food-recommend">
									<img src="../assets/img/recommendicon.png" alt="" />
									<span>观影用户推荐</span>
								</div>
								<div class="food-pay">
									<div class="price">
										<span>￥</span>
										<span>23.4</span>
										<del>￥45</del>
									</div>
									<div class="count">
										<span class="minus"><img src="../assets/img/minus.png" alt="" /></span>
										<span class="num">0</span>
										<span class="add"><img src="../assets/img/add.png" alt="" /></span>
									</div>
								</div>
							</div>

						</li>
						<li>
							<div class="foot-img">
								<img src="../assets/img/playing.jpg" alt="" />
							</div>
							<div class="foot-content">
								<div class="food-name">
									<span class="personNum">单人</span> 32oz爆米花1桶+300ml牛乳茶1杯
								</div>
								<div class="food-recommend">
									<img src="../assets/img/recommendicon.png" alt="" />
									<span>观影用户推荐</span>
								</div>
								<div class="food-pay">
									<div class="price">
										<span>￥</span>
										<span>23.4</span>
										<del>￥45</del>
									</div>
									<div class="count">
										<span class="minus"><img src="../assets/img/minus.png" alt="" /></span>
										<span class="num">0</span>
										<span class="add"><img src="../assets/img/add.png" alt="" /></span>
									</div>
								</div>
							</div>

						</li>
						<li>
							<div class="foot-img">
								<img src="../assets/img/playing.jpg" alt="" />
							</div>
							<div class="foot-content">
								<div class="food-name">
									<span class="personNum">单人</span> 32oz爆米花1桶+300ml牛乳茶1杯
								</div>
								<div class="food-recommend">
									<img src="../assets/img/recommendicon.png" alt="" />
									<span>观影用户推荐</span>
								</div>
								<div class="food-pay">
									<div class="price">
										<span>￥</span>
										<span>23.4</span>
										<del>￥45</del>
									</div>
									<div class="count">
										<span class="minus"><img src="../assets/img/minus.png" alt="" /></span>
										<span class="num">0</span>
										<span class="add"><img src="../assets/img/add.png" alt="" /></span>
									</div>
								</div>
							</div>

						</li>
					</ul>
				</div>
				<div class="all-food">
					查看全部8个套餐
				</div>
				<div class="food-discount" @click="ShowVoucherBox=true">
					<div class="box-flex ">
						<span>抵用券</span>
						<i></i>
						<span>无可用</span>

					</div>
				</div>
			</div>
			<!--尾部-->
			<div class="footer-area">
				<div class="accounts">
					<div class="accounts-left">
						<span>不支持退票、改签</span>
						<span :class="{active:ShowEndorseBox==true}" @click="ShowEndorseBox=!ShowEndorseBox"></span>
					</div>
					<div class="accounts-right">
						<span>应付:</span>
						<span>￥</span>
						<span>{{orderData.sellMoney?orderData.sellMoney:''}}</span>
						<span :class="{active:ShowPriceDetailBox==true}" @click="ShowPriceDetailBox=!ShowPriceDetailBox"></span>
					</div>
				</div>
				<form id="order" action="http://api.chinashouzhi.com/zhtest/alipay-web/pagepay/pagepay.php" method="post" target="_blank">
					<input type="hidden" name="WIDout_trade_no" :value="Date.now()">
					<input type="hidden" name="WIDsubject" value="猫眼电影票">
					<input type="hidden" name="WIDtotal_amount" :value="this.orderData.sellMoney?this.orderData.sellMoney:''">
					<input type="hidden" name="WIDbody" :value="this.orderData.seats?('电影票'+this.orderData.seats.length+'张'):''">
				</form>
				<div class="accounts-button">
					<button @click="dealPayOrder">确认支付</button>
					
				</div>
			</div>

			<!--活动与优惠券-->
			<div class="coupon-box" v-if="ShowCouponBox">
				<div class="coupon-content">
					<div class="coupon-title">
						活动与抵用券
						<span @click="ShowCouponBox=false"></span>
					</div>
					<div class="coupon">
						<div class="add-coupon">添加优惠券</div>
						<div class="coupon-text">
							暂无可用的活动和优惠券
						</div>
					</div>
				</div>
			</div>
			<!--抵用券-->
			<div class="coupon-box" v-if="ShowVoucherBox">
				<div class="coupon-content">
					<div class="coupon-title">
						抵用券
						<span @click="ShowVoucherBox=false"></span>
					</div>
					<div class="coupon">
						<div class="coupon-text">
							暂无可用的抵用券
						</div>
					</div>
				</div>
			</div>
			<!--退票，改签-->
			<div class="endorse-box" v-if="ShowEndorseBox">
				<div class="endorse-wrapper">
					<div class="coupon-title">
						退改签须知
						<span @click="ShowEndorseBox=false"></span>
					</div>
					<div class="endorse-content">
						<ul>
							<li>
								<div class="endorse-left">退票</div>
								<div class="endorse-right">
									<div>不支持退票</div>
									<div>不可退款</div>
								</div>
							</li>
							<li>
								<div class="endorse-left">改签</div>
								<div class="endorse-right">
									<div>不支持改签</div>
									<div>不可改签</div>
									<div>使用观影卡或享受票减小吃特惠时，不可改签</div>
								</div>
							</li>
							<li>
								<div class="endorse-left last"></div>
								<div class="endorse-right">
									<div>特别提醒</div>
									<div>
										点击查看
										<a href="https://m.maoyan.com/order/agreement">《退改签规定协议》</a>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<!--价格明细-->
			<div class="price-detail-box" v-if="ShowPriceDetailBox">
				<div class="price-detail-wrapper">
					<div class="coupon-title">
						价格明细
						<span @click="ShowPriceDetailBox=false"></span>
					</div>
					<div class="price-detail-content">
						<ul>
							<li>
								<div class="price-type">电影票</div>
								<div class="price-item">
									<div class="price-item-left">
										票价
									</div>
									<div class="price-item-right">
										<span>含服务费4.5元/张</span> {{orderData.seats?orderData.seats[0].price:''}}元× {{orderData.seats?orderData.seats.length:''}}
									</div>
								</div>
							</li>
						</ul>
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
				minutes: 15,
				seconds: 0,

				ShowCouponBox: false,
				ShowVoucherBox: false,
				ShowEndorseBox: false,
				ShowPriceDetailBox: false,

				preloading:true,
			
				orderData: {}

			}
		},
		mounted() {
			this.add()
		},
		created() {

			var orderId = this.$route.params.id;

			var user = JSON.parse(localStorage.Maoyan_user);

			var dict = {
				userId: user.id,
				token: user.token,
				orderId: orderId
			};

			this.request.getOrderInfo(dict, data => {
				this.orderData = data.data;
				this.preloading=false
				layer.open({
					content: "座位预定成功，请仔细核对场次信息，并在右上角倒计时结束前完成支付，购买后无法退换",
					btn: "我知道了"
				});
			});
		},
		methods: {
			dealPayOrder() {
				var orderForm = document.getElementById("order");
				order.submit();
				
			},
			num: function(n) {
				return n < 10 ? '0' + n : '' + n
			},
			add: function() {
				let time = setInterval(() => {
					if(this.seconds === 0 && this.minutes !== 0) {
						this.seconds = 59
						this.minutes -= 1
					} else if(this.minutes === 0 && this.seconds === 0) {
						this.seconds = 0
						clearInterval(time)
					} else {
						this.seconds -= 1
					}
				}, 1000)
			}
		},
		computed: {
			second: function() {
				return this.num(this.seconds)
			},
			minute: function() {
				return this.num(this.minutes)
			}
		},
		watch: {
			second: {
				handler(newVal) {
					this.num(newVal)
					if(this.minutes == 0 && this.seconds == 0) {
						layer.open({
							content: "支付订单超时,请重新购买",
							btn: "我知道了"
						});

						setTimeout(() => {
							this.$router.go(-1)
						}, 3000)
					}
				}
			},
			minute: {
				handler(newVal) {
					this.num(newVal)
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.order {
		background: #f0efed;
	}
	
	.detail-content {
		padding-bottom: 109px;
	}
	/*支付剩余时间*/
	
	.count-down {
		color: #f90;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		background: #fef3d9;
		background-size: 17px 17px;
		text-align: center;
		line-height: 38px;
		box-sizing: border-box;
		height: 38px;
		font-size: 13px;
	}
	/*电影信息*/
	
	.movie-info {
		background-color: #fff;
		padding: 15px;
		line-height: 1;
		color: #333;
		font-size: 13px;
	}
	
	.movie-title {
		align-items: center;
		display: flex;
	}
	
	.movie-title-text {
		font-size: 16px;
		line-height: 23px;
		float: left;
		width: calc(100% - 81px);
	}
	
	.movie-title-logo {
		float: right;
		flex: 0 0 auto;
		height: 14px;
		width: 81px;
		background-size: cover;
		background-image: url(../assets/img/logo.png);
	}
	
	.movie-date {
		font-size: 14px;
		line-height: 20px;
		margin-top: 7px;
		color: #f34d41;
	}
	
	.movie-local {
		font-size: 14px;
		line-height: 20px;
		margin-top: 4px;
	}
	
	.movie-seats {
		font-size: 14px;
		line-height: 20px;
		margin-top: 4px;
	}
	/*支付信息*/
	
	.pay-info {
		background-color: #fff;
		padding: 0 15px;
	}
	
	.box-flex {
		line-height: 45px;
		font-size: 15px;
		color: #666;
		overflow: hidden;
		border-top: 1px solid #eaeaea;
	}
	
	.box-flex span:nth-of-type(1) {
		float: left;
	}
	
	.box-flex span:nth-of-type(2) {
		float: right;
		color: #333;
		font-size: 13px;
	}
	
	.box-flex i {
		float: right;
		width: 8px;
		height: 8px;
		border: 1px solid #ccc;
		transform: rotate(-45deg);
		border-left: none;
		border-top: none;
		display: block;
		margin: 18px 5px 0 5px;
	}
	
	.box-flex span b {
		font-size: 13px;
		color: #ef4238;
		font-weight: normal;
	}
	
	.box-flex span em {
		color: #ef4238;
		font-size: 18px;
		font-style: normal;
	}
	/*会员卡*/
	
	.discount-area {
		background-color: #fff;
		padding: 0 15px;
		margin-top: 10px;
		overflow: hidden;
		height: 66px;
		display: flex;
		align-items: center;
	}
	
	.icon-column {
		padding-right: 10px;
		float: left;
	}
	
	.icon-column b {
		position: relative;
		display: inline-block;
		width: 26px;
		height: 22px;
		border: 1px solid #faaf00;
		border-radius: 3px;
		background: #ffecc6;
	}
	
	.icon-column b:before {
		content: "";
		border-top: 1px solid #faaf00;
		border-radius: 0 0 3px 3px;
		position: absolute;
		background: #fff;
		width: 100%;
		height: 70%;
		bottom: 0;
	}
	
	.icon-column b:after {
		content: "VIP";
		color: #faaf00;
		position: absolute;
		top: 20%;
		width: 100%;
		text-align: center;
		font-weight: 700;
		-webkit-transform: scale(.7);
		transform: scale(.7);
	}
	
	.discount-info {
		color: #999;
		font-size: 13px;
		float: left;
		width: calc(100% - 44px);
	}
	
	.discount-info-top {
		font-weight: 400;
		color: #333;
	}
	
	.discount-info-top span {
		color: #999;
	}
	
	.discount-info-bottom {
		color: #999;
		font-size: 13px;
	}
	
	.discount-info-bottom span {
		color: #f90;
	}
	
	.arrow {
		float: right;
		border: 1px solid #ccc;
		transform: rotate(-45deg);
		border-left: none;
		border-top: none;
		width: 8px;
		height: 8px;
	}
	/*套餐区域*/
	
	.food-area {
		padding: 0 15px;
		font-size: 15px;
		background-color: #fff;
		margin-top: 10px;
	}
	
	.food-title-area {
		height: 44px;
		line-height: 44px;
	}
	
	.food-title-left {
		float: left;
	}
	
	.food-title-right {
		float: right;
	}
	
	.food-title-right span {
		font-size: 12px;
		color: #999;
	}
	
	.food-title-right img {
		height: 20px;
		width: 18px;
		margin-left: 4px;
		vertical-align: middle;
	}
	
	.food-list {
		width: 100%;
	}
	
	.food-list ul {
		width: 100%;
	}
	
	.food-list ul li {
		padding: 15px 0;
		overflow: hidden;
		width: 100%;
		border-top: 1px solid #eaeaea;
	}
	
	.foot-img {
		float: left;
		margin-right: 15px;
		width: 95px;
		height: 95px;
	}
	
	.foot-img img {
		width: 95px;
		height: 95px;
	}
	
	.foot-content {
		float: right;
		width: calc(100% - 110px);
	}
	
	.food-name {
		height: 40px;
		line-height: 20px;
		margin-bottom: 4px;
		overflow: hidden;
		-webkit-line-clamp: 2;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		color: #333;
	}
	
	.food-name span {
		background: #f90;
		color: #fff;
		font-size: 10px;
		line-height: 12px;
		height: 12px;
		padding: 1px 4px;
		border-radius: 2px;
		position: relative;
		top: -1px;
	}
	
	.food-recommend {
		display: inline-block;
		font-size: 10px;
		color: #f90;
		background: #fff7ea;
		line-height: 18px;
		padding: 0 5px;
	}
	
	.food-recommend img {
		width: 10px;
		height: 10px;
		margin-right: 5px;
		vertical-align: middle;
	}
	
	.food-recommend span {
		line-height: 18px;
	}
	
	.food-pay {
		overflow: hidden;
		margin-top: 10px;
	}
	
	.price {
		float: left;
		height: 25px;
		line-height: 25px;
	}
	
	.price span:nth-of-type(1) {
		color: #f03d37;
		font-size: 13px;
	}
	
	.price span:nth-of-type(2) {
		color: #f03d37;
		font-size: 17px;
	}
	
	.price del {
		color: #999;
		font-size: 12px;
	}
	
	.count {
		float: right;
	}
	
	.count img {
		width: 25px;
		height: 25px;
		vertical-align: middle;
	}
	
	.count span:nth-of-type(2) {
		height: 14px;
		height: 25px;
		line-height: 25px;
		width: 32px;
		display: inline-block;
		text-align: center;
	}
	
	
	.all-food {
		line-height: 45px;
		font-size: 13px;
		color: #ef4238;
		text-align: center;
		border-top: 1px solid #eaeaea;
	}
	
	.food-discount {
		background: #fff;
	}
	/*尾部*/
	
	.footer-area {
		padding: 10px 15px;
		background-color: #fff;
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 2;
		box-sizing: border-box;
	}
	
	.accounts {
		margin-bottom: 10px;
		overflow: hidden;
		line-height: 20px;
	}
	
	.accounts-left {
		float: left;
	}
	
	.accounts-left span:nth-of-type(1) {
		color: #999;
	}
	
	.accounts-left span:nth-of-type(2) {
		width: 8px;
		height: 8px;
		display: inline-block;
		border: 1px solid #ccc;
		border-left: none;
		border-top: none;
		transform: rotate(-135deg);
		margin-left: 4px;
		vertical-align: middle;
	}
	
	.accounts-left span.active {
		transform: rotate(45deg);
		margin-bottom: 4px;
	}
	
	.accounts-right {
		float: right;
	}
	
	.accounts-right span:nth-of-type(1) {
		font-weight: 400;
		color: #333;
		font-size: 14px;
	}
	
	.accounts-right span:nth-of-type(2) {
		font-size: 13px;
		color: #ef4238;
		margin: 0 -3px;
	}
	
	.accounts-right span:nth-of-type(3) {
		font-size: 21px;
		color: #ef4238;
	}
	
	.accounts-right span:nth-of-type(4) {
		border: 1px solid #ccc;
		border-left: none;
		border-top: none;
		transform: rotate(-135deg);
		width: 8px;
		height: 8px;
		display: inline-block;
		margin: 0 5px;
	}
	
	.accounts-right span.active {
		transform: rotate(45deg);
		margin-bottom: 4px;
	}
	
	
	.accounts-button button {
		line-height: 45px;
		width: 100%;
		background-color: #ff9e05;
		border-radius: 4px;
		text-align: center;
		color: #fff;
		font-size: 16px;
		border: 0;
		outline: none;
	}
	
	.accounts-button button.active {
		background: #ccc;
	}
	/*活动与抵用券*/
	
	.coupon-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 4;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.coupon-content {
		position: absolute;
		bottom: 0;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 5;
	}
	
	.coupon-title {
		color: #333;
		line-height: 45px;
		font-size: 15px;
		padding: 0 15px;
		background-color: #fff;
		text-align: center;
		position: relative;
	}
	
	.coupon-title span {
		display: inline-block;
		width: 90px;
		height: 45px;
		background: url(../assets/img/coupon.png) 100% no-repeat;
		background-size: 13px 13px;
		position: absolute;
		right: 15px;
		top: 50%;
		transform: translateY(-50%);
		cursor: pointer;
	}
	
	.coupon {
		background-color: #f4f4f4;
		padding: 0 15px;
		overflow-y: auto;
		height: 300px;
		position: relative;
	}
	
	.add-coupon {
		position: absolute;
		right: 15px;
		top: 20px;
		color: #f03d37;
	}
	
	.coupon-text {
		text-align: center;
		line-height: 300px;
	}
	/*退票，改签*/
	
	.endorse-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.endorse-wrapper {
		position: absolute;
		bottom: 99px;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 5;
	}
	
	.endorse-content {
		height: 199px;
		padding: 0 15px;
		overflow-y: auto;
	}
	
	
	.endorse-content ul li {
		border-bottom: 1px solid #eaeaea;
		padding: 13px 15px 13px 0px;
		font-size: 12px;
		overflow: hidden;
		box-sizing: border-box;
	}
	
	.endorse-left {
		float: left;
		background: #ccc;
		width: 27px;
		height: 15px;
		line-height: 15px;
		text-align: center;
		border-radius: 2px;
		font-size: 10px;
		color: #fff;
		margin-right: 10px;
		margin-top: 4px;
	}
	
	.endorse-left.last {
		background: #fff;
	}
	
	.endorse-right {
		float: left;
	}
	
	.endorse-right div:nth-of-type(1) {
		font-size: 14px;
		color: #333;
	}
	
	.endorse-right div:nth-of-type(2) {
		color: #777;
	}
	
	.endorse-right div:nth-of-type(3) {
		color: #777;
	}
	
	.endorse-right div a {
		display: inline;
		text-decoration: underline;
		color: #3b9fe6;
	}
	/*价格明细*/
	
	.price-detail-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 1;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.price-detail-wrapper {
		position: absolute;
		bottom: 99px;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 5;
	}
	
	.price-detail-content {
		height: 199px;
		padding: 0 0 0 15px;
		overflow-y: auto;
		border-top: 1px solid #eaeaea;
		border-bottom: 1px solid #eaeaea;
	}
	
	
	.price-detail-content ul li {
		padding: 5px 15px 13px 0;
		font-size: 13px;
		line-height: 18px;
	}
	
	.price-type {
		line-height: 30px;
		font-size: 14px;
		color: #333;
	}
	
	.price-item {
		overflow: hidden;
	}
	
	.price-item-left {
		float: left;
		color: #777;
	}
	
	.price-item-right {
		float: right;
		color: #777;
	}
	
	.price-item-right span {
		color: #999;
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