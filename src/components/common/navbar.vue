<template>
	<div class='navbar'>

		<div class="nav-left">
			<a class='back-button' v-if="in_type=='detail'" href="javascript:history.back()"></a>
		</div>
		<div class="nav-title">
			{{title}}
		</div>
		<div class="nav-right">

		</div>

	</div>
</template>

<script>
	export default {
		name: 'navbar',
		props: ['title','type'],
		data() {
			return {
				in_type:'list',
			}
		},
		created() {
			if(this.type != undefined){
				this.in_type = this.type
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.navbar {
		width: 100%;
		height: 50px;
		color: #fff;
		background: #e54847;
		border-bottom: 1px solid #e54847;
		position: fixed;
		left: 0;
		top: 0;
		text-align: center;
		line-height: 50px;
		display: flex;
		justify-content: space-around;
		z-index: 100;
	}
	
	.nav-left {
		flex-basis: 60px;
	}
	
	.nav-title {
		flex-grow: 1;
		font-size: 18px;
    	font-weight: 400;
	}
	
	.nav-right {
		flex-basis: 60px;
	}
	.nav-left .back-button{
		display: block;
		width: 25px;
		height: 25px;
		background: url('../../assets/img/back.png');
		background-size: 100% 100%;

		margin: 12.5px auto;
	}
</style>