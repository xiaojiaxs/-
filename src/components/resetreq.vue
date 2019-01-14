<template>
	<div class="reg">
		<navbar title="猫眼电影" type="detail"></navbar>
		<div class="detail-content">
			<!--Step1==输入手机号-->
			<div class="mobile-box" v-if="step==1">
				<div class="password">
					<div class="password-one">
						<input type="text" placeholder="手机/邮箱/用户名" />
					</div>
					<div class="password-two">
						<input type="text" placeholder="请输入右图验证码" />
						<img src="../assets/img/test.png" alt="" />
						<a href="javascript:;">换一张</a>
					</div>
				</div>
				<div class="btn-wrapper">
					<button type="submit" @click="step=2">下一步</button>
				</div>
				<div class="to-tel">
					<a href="tel:10107888">手机号无法接收短信？</a>
				</div>
				<div class="footer">
					© 猫眼电影 客服电话：
					<a href="tel:4006705335" class="phone-number">400-670-5335</a>
				</div>
			</div>
			<!--Step2==选择验证方式-->
			<div class="short-message" v-if="step==2">
				<!--头部-->
				<div class="header">
					<ul>
						<li class="active">选择验证方式</li>
						<li><span>></span>安全验证</li>
						<li><span>></span>找回登录密码</li>
					</ul>
				</div>
				<div class="test-type">
					<span>短信</span>
					<span @click="step=3">立即验证</span>
				</div>
				<div class="footer">
					© 猫眼电影 客服电话：
					<a href="tel:4006705335" class="phone-number">400-670-5335</a>
				</div>
			</div>
			<!--Step3==安全验证-->
			<div class="short-message" v-if="step==3">
				<!--头部-->
				<div class="header">
					<ul>
						<li class="active">选择验证方式</li>
						<li class="active"><span>></span>安全验证</li>
						<li><span>></span>找回登录密码</li>
					</ul>
				</div>
				<div class="safe-test">
					<div class="test-mobile">
						<input type="text" placeholder="请输入右图验证码" />
						<a href="javascript:;">发送验证码</a>
					</div>
					<div class="test-code">
						<input type="text" placeholder="请输入手机短信中的验证码" />
					</div>
				</div>
				<div class="btn-wrapper test-button">
					<button type="submit" @click="step=4">验证</button>
				</div>
				<div class="footer">
					© 猫眼电影 客服电话：
					<a href="tel:4006705335" class="phone-number">400-670-5335</a>
				</div>
			</div>
			<!--Step4==设置密码-->
			<div class="mobile-box" v-if="step==4">
				<div class="password">
					<div class="password-input password-input-one">
						<input type="text" placeholder="设置账户密码" />
					</div>
					<div class="password-input">
						<input type="text" placeholder="再次确认密码(密码长度在8-32个字符之间)" />
					</div>
				</div>
				<div class="btn-wrapper">
					<button type="submit" @click="$router.push('/login')">重置登录密码</button>
				</div>
				<div class="ex-tips">
					备注：密码长度8位及以上，需包含（数字、大写字母、小写字母、特殊字符）其中2种及以上组合
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
				step:1
			}
		},
		created() {

		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.reg {
		background: #f8f8f8;
	}
	
	.password {
		border-bottom: 1px solid #d6d6d6;
		background: #fff;
		padding-left: 10px;
		box-sizing: border-box;
	}
	
	.password input,
	.password-input input {
		border: 0;
		outline: none;
		width: 100%;
		height: 29px;
		font-size: 14px;
		text-indent: 3px;
		border-radius: 3px;
		/*background: #ececec;*/
	}
	
	.password-one,
	.password-input-one {
		border-bottom: 1px solid #d6d6d6;
		padding: 7px 10px 7px 0;
	}
	
	.password-two {
		padding: 7px 10px 7px 0;
	}
	
	.password-input {
		padding: 7px 10px 7px 0;
	}
	
	.password-two input {
		width: calc(100% - 160px);
	}
	
	.password-two img {
		width: 75px;
		height: 35px;
		margin-right: 10px;
		vertical-align: middle;
	}
	
	.password-two a {
		display: inline-block;
		border: 1px solid #df2d2d;
		text-align: center;
		color: #df2d2d;
		padding: 0 10px;
		border-radius: 3px;
		height: 30px;
		line-height: 30px;
	}
	
	.btn-wrapper {
		margin: 10px;
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
	
	.to-tel {
		text-align: center;
		margin-top: 15px;
		margin-bottom: 15px;
	}
	
	.to-tel a {
		color: #df2d2d;
	}
	
	.footer {
		margin: 0 10px;
		color: #333;
		text-align: center;
	}
	
	.footer .phone-number {
		color: #df2d2d;
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
		width: 321px;
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
	
	.test-type {
		border-top: 1px solid #d6d6d6;
		border-bottom: 1px solid #d6d6d6;
		margin: 10px 0;
		background-color: #fff;
		overflow: hidden;
		padding: 5px 10px;
		box-sizing: border-box;
	}
	
	.test-type span:nth-of-type(1) {
		float: left;
		display: inline-block;
		height: 30px;
		line-height: 30px;
		color: #333;
	}
	
	.test-type span:nth-of-type(2) {
		float: right;
		display: inline-block;
		border: 1px solid #df2d2d;
		width: 88px;
		color: #df2d2d;
		height: 30px;
		line-height: 30px;
		border-radius: 3px;
		text-align: center;
	}
	
	.safe-test {
		border-top: 1px solid #d6d6d6;
		border-bottom: 1px solid #d6d6d6;
		background: #fff;
		padding-left: 10px;
		box-sizing: border-box;
		margin: 10px 0;
	}
	
	.safe-test input {
		border: 0;
		outline: none;
		width: 100%;
		height: 29px;
		font-size: 14px;
		text-indent: 3px;
		border-radius: 3px;
		/*background: #ececec;*/
	}
	
	.test-mobile {
		border-bottom: 1px solid #d6d6d6;
		padding: 7px 10px 7px 0;
	}
	
	.test-code {
		padding: 7px 10px 7px 0;
	}
	
	.test-mobile input {
		width: calc(100% - 120px);
	}
	
	.test-mobile a {
		margin-left: 10px;
		width: 100px;
		display: inline-block;
		border: 1px solid #df2d2d;
		text-align: center;
		color: #df2d2d;
		border-radius: 3px;
		height: 30px;
		line-height: 30px;
	}
	
	.btn-wrapper.test-button button {
		background-color: #96e6da;
	}
	
	.ex-tips {
		margin: 15px 10px;
		box-sizing: border-box;
		color: #999;
		font-size: 12px;
	}
</style>