<template>
	<div class="login">
		<navbar title="猫眼电影" type="detail"></navbar>
		<div class="detail-content">
			<!--登录方式选项卡-->
			<div class="login-type">
				<div @click="dealClick(1)" class="login-type-item" :class="{'active':index==1}">美团账号登录</div>
				<div @click="dealClick(2)" class="login-type-item" :class="{'active':index==2}">手机验证登录</div>
			</div>
			<div class="login-content">
				<!--账号登录-->
				<div class="account-login" v-if="index==1">
					<div class="account-input">
						<div class="username">
							<input v-model="accountMobile" @click="dealChangeBackground(1)" :class="{'active':background==1}" type="text" placeholder="账户名/手机号/Email" />
						</div>
						<div class="password">
							<input v-model="accountPassword" @click="dealChangeBackground(2)" :class="{'active':background==2}" type="password" placeholder="请输入您的密码" />
						</div>
					</div>
					<div class="login-button">
						<button v-if="accountLoginSuccess" @click="dealPasswordLogin()">登录</button>
						<button class="login-success" v-if="!accountLoginSuccess">登录中...</button>
					</div>
				</div>
				<!--手机登录-->
				<div class="mobil-login" v-if="index==2">
					<div class="account-input">
						<div class="username">
							<input v-if="sendCode==1" v-model="mobilePhone" class="phone" @click="dealChangeBackground(3)" :class="{'active':background==3}" type="text" placeholder="请输入手机号" />
							<input v-if="sendCode==2" v-model="mobilePhone" class="phone phone-code" @click="dealChangeBackground(3)" :class="{'active':background==3}" type="text" placeholder="请输入手机号" />
							<button v-if="sendCode==1" @click="dealGetLoginCode()" :disabled="sendCodeDisabled" class="get-code">发送验证码</button>
							<span v-if="sendCode==2" class="code-count">{{count}}秒</span>
						</div>
						<div class="password">
							<input :disabled="inputCodeDisabled" v-model="mobileCode" class="short-message" @click="dealChangeBackground(4)" :class="{'active':background==4}" type="text" placeholder="请输入短信验证码" />
						</div>
					</div>
					<div class="login-button">
						<button @click="dealCodeLogin()" v-if="mobileLoginSuccess" :disabled="sendCodeDisabled" class="mobil-login-button">登录</button>
						<button class="login-success" v-if="!mobileLoginSuccess">登录中...</button>
					</div>

				</div>
				<div class="subline">
					<ul>
						<li @click="$router.push('/reg')">立即注册</li>
						<li @click="$router.push('/resetreq')">找回密码</li>
					</ul>
				</div>
				<div class="footer">
					© 猫眼电影 客服电话：
					<a href="tel:4006705335" class="phone-number">400-670-5335</a>
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
				index: 1,
				background: 0,
				sendCode: 1,
				count: '',
				timer: null,

				accountMobile: '',
				accountPassword: '',

				mobilePhone: '',
				mobileCode: '',

				sendCodeDisabled: true,
				inputCodeDisabled: true,

				accountLoginSuccess: true,
				mobileLoginSuccess: true
			}
		},
		watch: {
			//监听手机号格式
			mobilePhone() {
				if(checkMobile(this.mobilePhone)) {
					this.sendCodeDisabled = false;
				} else {
					this.sendCodeDisabled = true;
				}
			}
		},
		methods: {
			//登录方式选项卡
			dealClick(index) {
				this.index = index
			},
			//input背景色
			dealChangeBackground(background) {
				this.background = background
			},
			//登录1：账号密码登录
			dealPasswordLogin() {
				//检测手机号码
				if(!checkMobile(this.accountMobile)) {
					layer.open({
						content: "手机号码必须为11位",
						btn: "我知道了"
					});

					return;
				}

				//检测密码
				if(!checkPassword(this.accountPassword, 6, 20)) {
					layer.open({
						content: "密码必须为6-20位",
						btn: "我知道了"
					});

					return;
				}

				//console.log("开始登录");

				this.request.postUserPasswordLogin({
						mobile: this.accountMobile,
						password: this.accountPassword
					},
					data => {
						if(data.status == 0) {

							layer.open({
								content: "登录失败(" + data.message + ")",
								btn: "我知道了"
							});

							return;
						}

						//保存localStorage
						//跳转界面
						this.loginSuccess(data.data);
					}
				);
			},
			//登录方式2：手机验证码登录
			//获取验证码
			dealGetLoginCode() {

				this.request.postMobileLoginCode({
					mobile: this.mobilePhone
				}, data => {
					if(data.status == 0) {
						layer.open({
							content: "验证码发送失败(" + data.message + ")",
							btn: "我知道了"
						});

						return;
					}

					this.inputCodeDisabled = false;

					layer.open({
						content: "验证码发送成功(" + data.data.code + ")",
						btn: "我知道了"
					});

					//发送短信验证码倒计时
					var timeCount = 60;
					if(!this.timer) {
						this.count = timeCount;
						this.sendCode = 2
						this.timer = setInterval(() => {
							if(this.count > 0 && this.count <= timeCount) {
								this.count--;
							} else {
								this.sendCode = 1
								clearInterval(this.timer);
								this.timer = null;
							}
						}, 1000)
					}
				});
			},
			//手机验证码真正登录
			dealCodeLogin() {
				if(!checkCode(this.mobileCode)) {
					layer.open({
						content: "验证码必须为4位数字",
						btn: "我知道了"
					});
					return;
				}

				this.request.postUserMobileLoginUrl({
						mobile: this.mobilePhone,
						code: this.mobileCode
					},
					data => {
						if(data.status == 0) {
							layer.open({
								content: "短信验证码登录失败(" + data.message + ")",
								btn: "我知道了"
							});

							return;
						}

						//保存localStorage
						//跳转界面
						this.loginSuccess(data.data);
					}
				);
			},

			//登录成功处理
			loginSuccess(user) {
				
				//保存用户的登录信息
				localStorage.Maoyan_isLogin = "1";
				localStorage.Maoyan_user = JSON.stringify(user);

				//设置store.js中登录状态
				this.$store.commit("setIsLogin", true);

				this.accountLoginSuccess = false
				this.mobileLoginSuccess = false

				//跳转到mine页面
				//登录一般把 push变成replace
				this.$router.replace("/mine");

			},
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.login {
		background: #f8f8f8;
	}
	/*登录方式选项卡*/
	
	.login-type {
		height: 38px;
		line-height: 38px;
		width: 100%;
		background: #fff;
	}
	
	.login-type-item {
		float: left;
		width: 50%;
		text-align: center;
		border-bottom: 4px solid #d6d6d6;
	}
	
	.login-type-item.active {
		color: #df2d2d;
		border-color: #df2d2d;
	}
	
	.login-content {
		margin-top: 4px;
	}
	/*账号登录*/
	
	.account-login {
		width: 100%;
		background: #fff;
	}
	
	.account-input {
		padding-left: 10px;
		border-bottom: 1px solid #d6d6d6;
		box-sizing: border-box;
		background: #fff;
	}
	
	.account-login input {
		border: 0;
		outline: none;
		width: 100%;
		height: 29px;
		font-size: 14px;
		text-indent: 3px;
		border-radius: 3px;
	}
	
	input.active {
		background: #ececec;
	}
	
	.username {
		border-bottom: 1px solid #d6d6d6;
	}
	
	.username,
	.password {
		padding: 7px 10px 7px 0;
	}
	
	.login-button {
		margin: 10px;
	}
	
	.login-button button {
		width: 100%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		border-radius: 5px;
		color: #fff;
		border: 0;
		background-color: #df2d2d;
		font-size: 16px;
		outline: none;
	}
	
	.login-button button.login-success {
		background-color: #dcdcdc;
		color: #999;
	}
	/*手机登录*/
	
	.mobil-login {}
	
	.phone {
		border: 0;
		outline: none;
		width: calc(100% - 120px);
		height: 28px;
		text-indent: 3px;
		border-radius: 3px;
		color: #333;
	}
	
	.phone.phone-code {
		border: 0;
		outline: none;
		width: calc(100% - 70px);
		height: 28px;
		text-indent: 3px;
		border-radius: 3px;
		color: #333;
	}
	
	.get-code {
		color: #df2d2d;
		background-color: #fff;
		border: 1px solid #df2d2d;
		outline: none;
		height: 30px;
		width: 100px;
		line-height: 30px;
		text-align: center;
		padding: 0;
		margin-left: 10px;
		border-radius: 3px;
	}
	
	.get-code:disabled {
		background-color: #dcdcdc;
		color: #999;
		border: 0;
		outline: none;
		height: 30px;
		width: 100px;
		line-height: 30px;
		text-align: center;
		padding: 0;
		margin-left: 10px;
		border-radius: 3px;
	}
	
	.code-count {
		width: 60px;
		height: 30px;
		line-height: 30px;
		text-align: center;
		margin-left: 10px;
		border-radius: 3px;
		background-color: #dcdcdc;
		color: #999;
		display: block;
		float: right;
	}
	
	.short-message {
		border: 0;
		outline: none;
		width: 100%;
		height: 28px;
		text-indent: 3px;
		border-radius: 3px;
		background-color: #fff;
	}
	
	.short-message:disabled {
		border: 0;
		outline: none;
		width: 100%;
		height: 28px;
		text-indent: 3px;
		border-radius: 3px;
		background-color: rgb(235, 235, 228)
	}
	
	.login-button button.mobil-login-button:disabled {
		background: #dcdcdc;
		color: #999;
	}
	/*注册,找回密码区域*/
	
	.subline {
		margin: 10px;
		overflow: hidden;
	}
	
	.subline ul li:nth-of-type(1) {
		float: left;
		color: #df2d2d;
	}
	
	.subline ul li:nth-of-type(2) {
		float: right;
		color: #df2d2d;
	}
	/*尾部*/
	
	.footer {
		margin: 0 10px;
		color: #333;
		text-align: center;
	}
	
	.footer .phone-number {
		color: #df2d2d;
	}
</style>