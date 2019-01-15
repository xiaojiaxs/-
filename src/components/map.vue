<template>
	<div>
		<navbar title="猫眼电影" type="detail"></navbar>
		<div class="detail-content">
			<!--地图-->
			<div id="allmap" :style="mapStyle"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				mapStyle: {
					width: '100%',
					height: this.mapHeight + 'px'
				},
				lat:'',
				lng:''
			}
		},
		props: {
			mapHeight: {
				type: Number,
				default: 445
			},
			//经度
			longitude: {
				type: Number,
				default: 116.46074
			},
			latitude: {
				type: Number,
				default: 39.89549
			}
		},
		mounted() {
			this.ready()
		},
		created(){
			this.lat = this.$route.params.lat
			this.lng = this.$route.params.lng
		},
		methods: {
			ready: function() {
				var map = new BMap.Map("allmap");
				var point = new BMap.Point(this.longitude, this.latitude);
				var marker = new BMap.Marker(point);
				map.addOverlay(marker);
				map.centerAndZoom(point, 15);
				map.enableScrollWheelZoom(true);

			}	
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	#allmap {
		width: 100%;
		height: 100%;
	}
</style>