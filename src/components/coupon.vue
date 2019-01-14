<template>
	<div>
		<navbar title="我的优惠券" type="detail"></navbar>
		<div class="detail-content">
			<div class="body">
				<div class="coupon">
					<input type="text" placeholder="请输入优惠券密码">
					<a href="javascript:;">添加</a>
				</div>
				<div class="container">
					<noOrder v-show="!order"></noOrder>
					<div class="coupon-list">
						<div class="coupon-item out-time">
							<div class="coupon-left">
								<div class="left-wrapper">
									<div class="desc">
										<i>10</i>
										<span>元</span>
									</div>
									<div class="type">代金券</div>
								</div>
							</div>
							<div class="coupon-right">
								<div class="title ellipsis">10元团购券－圣诞节</div>
								<div class="limit-desc">购票时，请在“活动与抵用券”栏选择该券</div>
								<div class="range-status-container">
									<div class="range-status range-has-border">有效期 2017-12-24 至 2017-12-25</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() {
			return {
				order: true
			};
		}
	};
</script>
<style scoped>
	.coupon {
		padding: 15px 15px 0 20px;
		line-height: 20px;
	}
	
	.coupon input {
		padding: 5px 0 5px 5px;
		border-radius: 5px;
		border: 1px solid #ccc;
		width: 80%;
		height: 20px;
		color: #777;
		outline: none;
	}
	
	.coupon a {
		margin-left: 10px;
		color: #f03d37;
	}
	
	.coupon-item {
		background-size: 65px 65px;
		background-position: top 7px right 7px;
		background-repeat: no-repeat;
		background-color: #fff;
		border: 1px solid #d8d8d8;
		border-radius: 8px;
		margin: 15px 15px 0;
		display: flex;
		position: relative;
		overflow: hidden;
	}
	
	.coupon-item.out-time {
		background-image: url("../assets/img/5.png");
	}
	
	.coupon-left {
		background-color: #c3c3c3;
		flex: 0 0 auto;
		min-height: 125px;
		width: 108px;
		/* background-color: #ff9d00; */
		color: #fff;
	}
	
	.left-wrapper {
		position: absolute;
		top: 50%;
		margin-top: -33px;
		font-weight: 700;
		text-align: center;
		line-height: 1.2;
		width: 108px;
	}
	
	.left-wrapper .desc {
		font-size: 35px;
	}
	
	.left-wrapper .desc span {
		font-size: 18px;
	}
	
	.left-wrapper .type {
		display: inline-block;
		padding: 6px 12px 0;
		font-size: 14px;
		font-weight: 400;
		border-top: 1px solid rgba(0, 0, 0, 0.08);
	}
	
	.coupon-right {
		border-left: 1px dashed #c3c3c3;
	}
	
	.coupon-right .title {
		margin-top: 10px;
		padding: 0 16px;
		font-size: 16px;
		line-height: 24px;
		height: 24px;
		color: #333;
	}
	
	.coupon-right .limit-desc {
		margin-top: 6px;
		padding: 0 16px;
		font-size: 12px;
		line-height: 14px;
		color: #999;
		margin-bottom: 36px;
	}
	
	.coupon-right .range-status-container {
		position: relative;
		width: 100%;
		border-top: 1px solid #d8d8d8;
	}
	
	.coupon-right .range-status {
		position: relative;
		line-height: 22px;
		font-size: 12px;
		text-align: right;
		padding: 0 20px;
		white-space: pre-wrap;
		color: #777;
	}
	
	a {
		display: inline;
		text-decoration: none;
	}
</style>