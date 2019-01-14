<template>
	<div class="mine">
		<navbar title="我的"></navbar>
		<div class="list-content">
			<div class="header">
				<img src="../assets/img/header.png" alt="" />
			</div>
			<div class="container">
				<div class="my-order">
					<div class="my-order-title">我的订单</div>
					<div class="my-order-list">
						<div class="my-order-item movie">
							<router-link to="/movieOrder">
								<p>电影</p>
							</router-link>
						</div>
						<div class="my-order-item store">
							<router-link to="/storeOrder">
								<p>商城</p>
							</router-link>
						</div>
					</div>
				</div>
				<div class="group">
					<ul>
						<li>
							<router-link to="/webMovie">
								<span>在线观影</span>
								<span></span>
							</router-link>
						</li>
						<li>
							<router-link to="/coupon">
								<span>优惠券</span>
								<span></span>
							</router-link>
						</li>
						<li>
							<router-link to="/discountCard">
								<span>折扣卡</span>
								<span></span>
							</router-link>
						</li>
						<li>
							<a href="javascript:;">
								<span @click="dealLogout()">退出应用</span>
							</a>
						</li>
					</ul>
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

			}
		},
		methods: {
			//真正退出
			realLogout() {
				//服务器退出
				var user = JSON.parse(localStorage.Maoyan_user);
				this.request.postUserLogoutUrl({
						userId: user.id,
						token: user.token
					},
					data => {
						if(data.status == 0) {
//							layer.open({
//								content: "token销毁失败(message=" + data.message + ")",
//								btn: "我知道了"
//							});
							console.log(1)
						}
					}
				);

				//本地退出，清除localStorage
				localStorage.removeItem("Maoyan_isLogin");
				localStorage.removeItem("Maoyan_user");
				
				//设置store.js中的登录状态
				this.$store.commit("setIsLogin", false);

				//退出到登录界面
				this.$router.replace("/login");
			},
			
			//点击退出应用
			dealLogout() {
				var self = this;
				layer.open({
					content: "您真的要退出吗?",
					btn: ["是", "否"],
					yes: function(index) {
						self.realLogout();
						layer.close(index);
					}
				});
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.mine {
		background: #f8f8f8;
	}
	
	.header {
		background-color: #f03d37;
		background-image: url(../assets/img/header-bc.png);
		background-repeat: no-repeat;
		background-position: 50%;
		background-size: 100% 150px;
		height: 150px;
		overflow: hidden;
		text-align: center;
	}
	
	.header img {
		display: inline-block;
		margin-top: 30px;
		width: 60px;
		height: 60px;
		border-radius: 60px;
		border: 3px solid #fff;
	}
	
	.container {
		-webkit-box-flex: 1;
		flex: 1;
	}
	
	.my-order {
		margin-top: 10px;
		background: #fff;
		padding: 0 15px;
		text-align: center;
	}
	
	.my-order-title {
		margin: 13px 0 0;
		font-size: 15px;
		line-height: 21px;
		height: 21px;
		color: #333;
		z-index: 9;
		display: inline-block;
		width: 80px;
		background-color: #fff;
	}
	
	.my-order-list {
		display: flex;
		justify-content: space-around;
	}
	
	.my-order-item {
		float: left;
		height: 97px;
		background-repeat: no-repeat;
		background-position: top;
		background-size: 42px auto;
		margin-top: 18px;
		width: 50%;
	}
	
	.my-order-item a {
		display: block;
		height: 90px;
	}
	
	.my-order-item.movie {
		background-image: url(../assets/img/mymovie.png);
	}
	
	.my-order-item.store {
		background-image: url(../assets/img/mystore.png);
	}
	
	.my-order-item p {
		text-align: center;
		font-size: 15px;
		line-height: 21px;
		height: 21px;
		margin: 0;
		color: #333;
		position: relative;
		top: 53px;
	}
	
	.group {
		margin-top: 10px;
		background: #fff;
	}
	
	.group ul li {
		position: relative;
		height: 44px;
		line-height: 44px;
		font-size: 15px;
		margin-left: 15px;
		padding-right: 15px;
		border-bottom: 1px solid #eaeaea;
	}
	
	.group ul li:last-child {
		border: 0;
	}
	
	.group ul li a {
		display: block;
		color: #333;
	}
	
	.group ul li a span:nth-of-type(1) {
		text-align: left;
	}
	
	.group ul li a span:nth-of-type(2) {
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
</style>