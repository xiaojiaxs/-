<template>
	<div class="order">
		<navbar title="确认订单" type="detail"></navbar>
		<div class="detail-content">
			<!--订单信息-->
			<div class="deal-info">
				<div class="deal-info-img">
					<img src="../assets/img/playing.jpg" alt="" />
				</div>
				<div class="deal-info-content">
					<div class="deal-info-title">
						<span class="hot-tag">单人</span> 果汁气泡水1瓶+46oz爆米花1桶
					</div>
					<div class="deal-info-validity">有效期：2018.09.27-2019.09.27</div>
					<div class="deal-info-time">可用时间：00:00-24:00</div>
					<div class="deal-info-price">
						48.8元<del>55元</del>
					</div>
				</div>
			</div>
			<!--套餐详情-->
			<div class="order-detail">
				<div class="order-detail-title">套餐详情</div>
				<div class="order-detail-list">
					<div class="order-detail-item">
						<span>气泡水</span>
						<span>1杯</span>
						<span>25元</span>
					</div>
					<div class="order-detail-item">
						<span>气泡水</span>
						<span>1杯</span>
						<span>25元</span>
					</div>
				</div>
			</div>
			<!--数量-->
			<div class="number-area">
				<div class="number-title">数量</div>
				<div class="add-reduce">
					<div @click="dealReduce" class="reduce">-</div>
					<input v-model="number" type="text" />
					<div @click="dealAdd" class="add">+</div>
				</div>
			</div>
			<!--提示信息-->
			<div class="tips-message">
				<div class="tips-message-title">提示信息</div>
				<div class="tips-message-content">使用时间：请在影城卖品部营业时间兑换。</div>
			</div>
			<!--手机号-->
			<div class="phone-area">
				<span>手机号</span>
				<input placeholder="请填写正确的手机号" type="text" />
				<span></span>
			</div>
			<!--结算区域-->
			<div class="account-area">
				<div class="account-top">
					<div class="account-top-left">
						<span></span>
						<span>随时退</span>
						<span></span>
						<span>过期退</span>
					</div>
					<div class="account-top-right">
						<span>小计</span>
						<span>￥</span>
						<span>195.90</span>
					</div>

				</div>
				<div class="account-button">确认支付</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				number: 1
			}
		},
		methods: {
			dealReduce() {
				this.number--
					if(this.number < 1) {
						this.number = 1
					}

			},
			dealAdd() {
				this.number++
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.order {
		background: #f0efed;
	}
	/*订单信息*/
	
	.deal-info {
		color: #999;
		background-color: #fff;
		padding: 15px 10px;
		overflow: hidden;
	}
	
	.deal-info-img {
		width: 92px;
		height: 92px;
		margin-right: 10px;
		float: left;
	}
	
	.deal-info-img img {
		width: 92px;
		height: 92px;
	}
	
	.deal-info-content {
		float: left;
		width: calc(100% - 102px);
	}
	
	.deal-info-content>div {
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.deal-info-title {
		font-size: 15px;
		line-height: 18px;
		color: #333;
	}
	
	.hot-tag {
		display: inline-block;
		vertical-align: middle;
		margin-right: 7px;
		padding: 0 4px;
		font-size: 10px;
		line-height: 18px;
		height: 18px;
		background: #f90;
		border-radius: 2px;
		color: #fff;
	}
	
	.deal-info-validity {
		color: #999;
		font-size: 15px;
		margin-top: 7px;
	}
	
	.deal-info-time {
		color: #999;
		font-size: 15px;
		margin-bottom: 7px;
	}
	
	.deal-info-price {
		color: #f03d37;
		font-size: 15px;
	}
	
	.deal-info-price del {
		color: #999;
		font-size: 13px;
		margin: 0 3px;
	}
	/*套餐详情*/
	
	.order-detail {
		margin: 10px 0;
		border-top: 1px solid #DDD8CE;
		border-bottom: 1px solid #DDD8CE;
		background: #fff;
		padding: 15px 10px;
	}
	
	.order-detail-title {
		font-weight: 700;
		margin-bottom: 15px;
		color: #000;
		font-size: 15px;
	}
	
	
	.order-detail-item {
		display: flex;
		height: 30px;
		line-height: 30px;
	}
	
	.order-detail-item span {
		display: block;
	}
	
	.order-detail-item span:nth-of-type(1) {
		flex: 1;
	}
	
	.order-detail-item span:nth-of-type(2) {
		text-align: right;
		width: 90px;
	}
	
	.order-detail-item span:nth-of-type(3) {
		text-align: right;
		width: 60px;
	}
	/*数量*/
	
	.number-area {
		margin: 10px 0;
		border-top: 1px solid #DDD8CE;
		border-bottom: 1px solid #DDD8CE;
		background: #fff;
		padding: 15px 10px;
		overflow: hidden;
		line-height: 30px;
	}
	
	.number-title {
		font-weight: 700;
		line-height: 30px;
		color: #000;
		font-size: 15px;
		float: left;
	}
	
	.add-reduce {
		overflow: hidden;
		float: right;
	}
	
	.reduce,
	.add {
		border: 1px solid #e54847;
		width: 30px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		color: #e54847;
		border-radius: 3px;
		float: left;
		font-size: 20px;
	}
	
	.add-reduce input {
		border-radius: 3px;
		border: 1px solid #DDD8CE;
		width: 60px;
		height: 30px;
		float: left;
		margin: 0 5px;
		outline: none;
		text-align: center;
	}
	/*提示信息*/
	
	.tips-message {
		margin: 10px 0;
		border-top: 1px solid #DDD8CE;
		border-bottom: 1px solid #DDD8CE;
		background: #fff;
	}
	
	.tips-message-title {
		font-weight: 700;
		line-height: 40px;
		color: #000;
		font-size: 15px;
		padding: 0 10px;
		border-bottom: 1px solid #DDD8CE;
	}
	
	.tips-message-content {
		line-height: 40px;
		color: #999;
		font-size: 14px;
		padding: 0 10px;
	}
	/*手机号*/
	
	.phone-area {
		margin: 10px 0;
		border-top: 1px solid #DDD8CE;
		border-bottom: 1px solid #DDD8CE;
		background: #fff;
		height: 40px;
		line-height: 40px;
		padding: 0 10px;
		font-weight: 400;
		color: #333;
		font-size: 15px;
	}
	
	
	.phone-area span:nth-of-type(2) {
		display: block;
		float: right;
		width: 20px;
		height: 20px;
		background-image: url(../assets/img/xiugai.png);
		background-size: 100%;
		margin-top: 10px;
	}
	
	.phone-area input {
		border: 0;
		outline: none;
		font-size: 15px;
		text-indent: 4px;
		height: 26px;
		background: #f0efed;
		border-radius: 5px;
		width: 65%;
	}
	/*结算*/
	
	.account-area {
		padding: 15px 10px;
		background: #fff;
	}
	
	.account-top {
		margin-bottom: 10px;
		overflow: hidden;
	}
	
	.account-top-left {
		float: left;
	}
	
	.account-top-right {
		float: right;
	}
	
	.account-top-left span:nth-of-type(1) {
		display: inline-block;
		width: 15px;
		height: 15px;
		background-image: url(../assets/img/submit.png);
		background-size: 100%;
		vertical-align: middle;
	}
	
	.account-top-left span:nth-of-type(2) {
		color: #6bbd00;
		font-weight: 400;
		margin-left: 3px;
		font-size: 15px;
	}
	
	.account-top-left span:nth-of-type(3) {
		display: inline-block;
		width: 15px;
		height: 15px;
		background-image: url(../assets/img/submit.png);
		background-size: 100%;
		margin-left: 20px;
		vertical-align: middle;
	}
	
	.account-top-left span:nth-of-type(4) {
		color: #6bbd00;
		font-weight: 400;
		margin-left: 3px;
		font-size: 15px;
	}
	
	.account-top-right span:nth-of-type(1) {
		font-weight: 700;
		color: #333;
	}
	
	.account-top-right span:nth-of-type(2) {
		color: #33C1AF;
	}
	
	.account-top-right span:nth-of-type(3) {
		color: #33C1AF;
		font-size: 22px;
	}
	
	.account-button {
		height: 45px;
		line-height: 45px;
		text-align: center;
		color: #fff;
		background-color: #f90;
		border-radius: 5px;
		font-size: 16px;
	}
</style>