<template>
	<div>
		<navbar title="Shan Qiao 乔杉" type="detail"></navbar>
		<div class="detail-content">
			<!--照片-->
			<div class="celebrity">
				<img src="../assets/img/star.jpg" alt="" />
				<div class="celebrity-info">
					<div class="chinese-name">
						<span>乔杉</span>
						<span>演员 | 配音演员</span>
					</div>
					<div class="english-name">
						Shan Qiao
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

			}
		},
		methods: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	/*照片*/
	
	.celebrity {
		width: 100%;
		height: 236px;
		position: relative;
	}
	
	.celebrity img {
		width: 100%;
	}
	
	.celebrity-info {
		position: absolute;
	}
	
	.chinese-name {}
	
	.english-name {}
</style>