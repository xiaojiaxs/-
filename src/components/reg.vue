<template>
	<div class="reg">
		<navbar title="猫眼电影" type="detail"></navbar>
		<div class="detail-content">
			<!--头部-->
			<div class="header">
				<ul>
					<li @click="step>0?step=1:''" :class="{active:step>0}">输入手机号</li>
					<li @click="step>1?step=2:''" :class="{active:step>1}"><span>></span>输入验证码</li>
					<li @click="step>2?step=3:''" :class="{active:step>2}"><span>></span>设置密码</li>
				</ul>
			</div>
			<!--Step1==输入手机号-->
			<div class="mobile-box" v-if="step==1">
				<div class="mobile">
					<input type="text" v-model="mobile" placeholder="请输入您的手机号" />
				</div>

				<div class="btn-wrapper">
					<input @click="isRead=!isRead" :checked="isRead" type="checkbox" />
					<span>我已阅读并同意</span>
					<a href="//i.meituan.com/about/terms">《美团网用户协议》</a>
				</div>

				<div class="btn-wrapper">
					<button type="submit" @click="dealGetCode()" :disabled="mobileDisabled">获取验证码</button>
				</div>
			</div>
			<!--Step2==输入验证码-->
			<div class="code-box" v-if="step==2">
				<div class="mobile">
					<input type="text" v-model="code" placeholder="请输入短信中的验证码" />
				</div>

				<div class="btn-wrapper">
					<button type="submit" @click="dealSendCode()">提交验证码</button>
				</div>
				<div class="subline">
					<ul>
						<li @click="step=1">注册</li>
						<li @click="$router.push('/resetreq')">找回密码</li>
					</ul>
				</div>
			</div>
			<!--Step3==设置密码-->
			<div class="password-box" v-if="step==3">
				<div class="password">
					<div class="password-one">
						<input @click="dealChangeBackground(1)" :class="{'active':background==1}" type="text" v-model="password" placeholder="请输入您的密码" />
					</div>
					<div class="password-two">
						<input @click="dealChangeBackground(2)" :class="{'active':background==2}" type="text" v-model="repassword" placeholder="请重复您输入的密码" />
					</div>
				</div>

				<div class="btn-wrapper">
					<button type="submit" @click="dealSetPassword">设置密码</button>
				</div>
				<div class="subline">
					<ul>
						<li @click="step=1">注册</li>
						<li @click="$router.push('/resetreq')">找回密码</li>
					</ul>
				</div>
			</div>
			<!--尾部-->
			<div class="footer">
				© 猫眼电影 客服电话：
				<a href="tel:4006705335" class="phone-number">400-670-5335</a>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'HelloWorld',
		data() {
			return {
				step: 1, //1=输入手机号，2=输入验证码，3=设置密码

				mobile: '',
				code: '',
				password: '',
				repassword: '',

				mobileDisabled: true,
				isRead: false,
				
				background: 0
			}
		},
		created() {

		},
		methods: {
			//step1:获取手机验证码
			dealGetCode() {
				//检测是否同意用户协议
				if(!this.isRead) {
					layer.open({
						content: "请先阅读用户协议",
						btn: "我知道了"
					});
					return;
				}

				//获取验证码
				this.request.postSignup({
					mobile: this.mobile
				}, data => {
					if(data.status == "1") {

						var code = data.data.code;
						layer.open({
							content: "验证码已经发送,请在手机上查看(" + code + ")",
							btn: "我知道了"
						});

						this.step = 2;
					} else {
						layer.open({
							content: "验证码发送失败(" + data.message + ")",
							btn: "我知道了"
						});
					}
				});
			},

			//step2:检测验证码是否正确
			dealSendCode() {

				if(!checkCode(this.code)) {
					layer.open({
						content: "验证码必须为4位数字",
						btn: "我知道了"
					});
					return;
				}

				//发送请求给服务器, 检测验证码是否成功
				this.request.postSignupCheck({
						mobile: this.mobile,
						code: this.code
					},
					data => {
						if(data.status == 1) {
							//跳转
							this.step = 3;
						} else {
							layer.open({
								content: "验证码错误",
								btn: "我知道了"
							});
						}
					}
				);
			},

			//step3：设置密码
			dealSetPassword() {
				var self = this;

				//检测
				if(!checkPassword(this.password, 6, 20)) {
					layer.open({
						content: "密码必须为6-20位",
						btn: "我知道了"
					});

					return;
				}

				if(!checkPassword(this.repassword, 6, 20)) {
					layer.open({
						content: "重复密码必须为6-20位",
						btn: "我知道了"
					});

					return;
				}

				if(this.password != this.repassword) {
					layer.open({
						content: "两次密码不一致",
						btn: "我知道了"
					});

					return;
				}

				this.request.postSignupSetPassword({
						mobile: this.mobile,
						code: this.code,
						password: this.password
					},
					data => {
						if(data.status == 1) {
							layer.open({
								content: "注册成功, 是否跳转到登录界面",
								btn: ["是", "否"],
								yes: function(index) {
									self.$router.push("/login");
									layer.close(index);
								}
							});
						} else {
							layer.open({
								content: "注册失败(" + data.message + ")",
								btn: "我知道了"
							});
						}
					}
				);
			},
			
			//input背景色
			dealChangeBackground(background) {
				this.background = background
			}
		},
		watch: {
			//监听手机号格式
			mobile() {
				if(checkMobile(this.mobile)) {
					this.mobileDisabled = false;
				} else {
					this.mobileDisabled = true;
				}
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.reg {
		background: #f8f8f8;
	}
	/*头部*/
	
	.header {
		border-bottom: 1px solid #d6d6d6;
		color: #333;
		background: #fff;
	}
	
	.header ul {
		display: flex;
		text-align: center;
		width: 293px;
		margin: 0 auto;
	}
	
	.header ul li {
		height: 40px;
		line-height: 40px;
		margin: 0 10px;
	}
	
	.header ul li span {
		margin-right: 10px;
		color: #aaa;
	}
	
	.header ul li.active {
		color: #df2d2d;
	}
	
	.mobile {
		border-top: 1px solid #d6d6d6;
		border-bottom: 1px solid #d6d6d6;
		margin-top: 10px;
		padding: 7px 10px;
		box-sizing: border-box;
		background: #fff;
	}
	
	.mobile input {
		border: 0;
		outline: none;
		width: 100%;
		height: 29px;
		font-size: 14px;
		text-indent: 3px;
		border-radius: 3px;
		background: #ececec;
	}
	
	.btn-wrapper {
		margin: 10px;
	}
	
	.btn-wrapper input {
		width: 22px;
		height: 22px;
		display: inline-block;
		border: 1px solid #d6d6d6;
		text-align: center;
		vertical-align: middle;
		line-height: 22px;
		outline: 0;
		background: #fff;
	}
	
	.btn-wrapper input:checked {
		background-color: #df2d2d;
		border: 0;
		color: #fff;
	}
	
	.btn-wrapper span {
		color: #333;
	}
	
	.btn-wrapper a {
		color: #df2d2d;
	}
	
	.btn-wrapper button {
		background-color: #df2d2d;
		color: #fff;
		border: 0;
		outline: none;
		height: 40px;
		line-height: 40px;
		text-align: center;
		width: 100%;
		font-size: 16px;
		border-radius: 3px;
	}
	
	.btn-wrapper button:disabled {
		background-color: #dcdcdc;
		color: #999;
		border: 0;
		outline: none;
		height: 40px;
		line-height: 40px;
		text-align: center;
		width: 100%;
		font-size: 16px;
		border-radius: 3px;
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
	/*设置密码*/
	
	.password {
		border-top: 1px solid #d6d6d6;
		border-bottom: 1px solid #d6d6d6;
		margin-top: 10px;
		background: #fff;
		padding-left: 10px;
		box-sizing: border-box;
	}
	
	.password input {
		border: 0;
		outline: none;
		width: 100%;
		height: 29px;
		font-size: 14px;
		text-indent: 3px;
		border-radius: 3px;
		/*background: #ececec;*/
	}
	.password input.active{
		background: #ececec;
	}
	
	.password-one {
		border-bottom: 1px solid #d6d6d6;
	}
	
	.password-one,
	.password-two {
		padding: 7px 10px 7px 0;
	}
</style>