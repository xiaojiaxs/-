<template>

	<div class="city-list">
		<!--定位城市-->
		<div class="item-box">
			<div id="position" class="item-title">定位城市</div>
			<div class="item-list">
				<div class="item-city">
					<span v-if="locationState==1">
						正在定位...
					</span>
					<span v-if="locationState==2" @click="dealSelectCity($event)" :data-nm="locationCity.nm" :data-id="locationCity.id">
						{{locationCity.nm}}
					</span>
					<span v-if="locationState==3">
						定位失败，请点击重试
					</span>
				</div>
			</div>
		</div>
		<!--最近访问城市-->
		<div class="item-box" v-if="isShowHistoryCity">
			<div id="history" class="item-title">最近访问城市</div>
			<div class="item-list">
				<div class="item-city" @click="dealSelectCity($event)" v-for="(item,index) in historyCity" :key="index" :data-nm="item.nm" :data-id="item.id">
					{{item.nm}}
				</div>
			</div>
		</div>
		<!--热门城市-->
		<div class="item-box">
			<div id="hot" class="item-title">热门城市</div>
			<div class="item-list">
				<div class="item-city" @click="dealSelectCity($event)" v-for="(item,index) in hot" :key="index" :data-nm="item.nm" :data-id="item.id">
					{{item.nm}}
				</div>
			</div>
		</div>
		<!--城市列表-->
		<div class="city-group">
			<!--预加载-->
			<div class="preloading" v-if="preloading">
				<img src="../assets/img/loading.gif" alt="" />
				<span>正在加载...</span>
			</div>
			<!--分组-->
			<div class="group-item" v-for="(item,index) in group" :key="index" v-if="item.list.length>0">
				<div :id="item.big" class="item-title group-title">{{item.big}}</div>
				<ul>
					<li @click="dealSelectCity($event)" v-for="(city,index) in item.list" :key="index" :data-nm="city.nm" :data-id="city.id">
						{{city.nm}}
					</li>
				</ul>
			</div>
		</div>
		<!--侧边栏-->
		<div class="sidebar">
			<div @click="dealClickIndex($event)" class="text" data-id="position">定位</div>
			<div @click="dealClickIndex($event)" class="text" data-id="history">最近</div>
			<div @click="dealClickIndex($event)" class="text" data-id="hot">热门</div>
			<div @click="dealClickIndex($event)" class="letter" v-for="(item,index) in group" :key="index" v-if="item.list.length>0" :data-id="item.big">
				{{item.big}}
			</div>
		</div>
	</div>

</template>

<script>
	export default {
		name: 't',
		data() {
			return {
				list: [],
				hot: [],
				group: [],
				historyCity: [],

				locationState: 1, //定位状态
				locationCity: {}, //定位城市

				isShowHistoryCity: false,
				preloading:true
			}
		},

		created() {
			//下载城市数据
			this.request.getCityList({}, (data) => {
				//console.log(data)
				this.hot = data.hot
				var list = data.cts;
				this.list = data.cts

				//分组
				var group = []
				//添加A-Z 26个小分组
				for(var i = 0; i < 26; i++) {
					//传入字符的ascii码,返回这个字符
					var groupTitle = String.fromCharCode(65 + i).toString()
					//console.log(groupTitle)
					var dict = {
						"big": groupTitle,
						"list": []
					}
					group.push(dict)
					//console.log("a")
				}
				//console.log(group)

				//处理每个城市
				for(var i = 0; i < list.length; i++) {

					var city = list[i]
					//console.log(city.nm)
					//console.log(city.py)
					//console.log(city.py.charAt(0))
					//console.log(city.py.charAt(0).charCodeAt())
					var index = city.py.charAt(0).charCodeAt() - 97
					//console.log(index)

					group[index].list.push(city)

				}
				//console.log(group)
				this.group = group
				this.preloading=false

				//城市数据下载成功后调用this.startLocation()
				this.startLocation()
			})

			//下载历史城市数据
			if(localStorage.historyCity != undefined) {
				this.isShowHistoryCity = true
			}

			var historyCity = JSON.parse(localStorage.historyCity);
			this.historyCity = historyCity

		},
		mounted() {

		},
		methods: {
			//点击滚动
			dealClickIndex(event) {
				var id = event.target.dataset.id
				//console.log("id = " + id)

				//根据id的值, 得到对应的分组的标题标签
				var tag = document.getElementById(id)
				//console.log("top=" + tag.offsetTop)

				var container = document.querySelector(".city-list")
				container.scrollTop = tag.offsetTop
			},
			//城市选择
			dealSelectCity(event) {
				var id = event.target.dataset.id
				var nm = event.target.dataset.nm
				//console.log(id)
				//console.log(nm)
				var city = {
					id: id,
					nm: nm
				}

				//存储热门城市
				var historyCity = []
				if(localStorage.historyCity == undefined) {
					localStorage.historyCity = JSON.stringify(historyCity)
				}
				var history = JSON.parse(localStorage.historyCity);
				//去除重复城市
				for(var i = 0; i < history.length; i++) {
					if(city.id == history[i].id) {
						history.splice(i, 1)
					}
				}
				//判断最多存储3个城市
				if(history.length >= 3) {
					history.pop()
				}

				history.unshift(city)
				localStorage.historyCity = JSON.stringify(history)

				//设置选择的城市
				this.$store.commit("setSelectCity", city)

				//存储到localStore
				var saveData = {
					expire_data: Date.now().toString(),
					data: city
				}
				localStorage.Maoyan_cityConfirm = JSON.stringify(saveData)

				//返回进入之前的界面
				this.$router.go(-1)

			},

			//开始定位
			startLocation() {
				if(navigator.geolocation) {
					console.log("开始定位")
					navigator.geolocation.getCurrentPosition((position) => {
						var lan = position.coords.latitude
						var lon = position.coords.longitude
						console.log("lan = " + lan)
						console.log("lon = " + lon)

						//lan = 40.1445387
						//lon = 116.28328359999999

						this.request.getCurrentCity(lan, lon, (cityName) => {
							console.log("cityName=" + cityName)

							var lastChar = cityName.charAt(cityName.length - 1)
							console.log(lastChar)
							if(lastChar == "市") {
								cityName = cityName.substr(0, cityName.length - 1);
								console.log("cityName=" + cityName)
							}
							//根据城市名找id

							for(var city of this.list) {
								if(city.nm == cityName) {
									this.locationState = 2
									this.locationCity = city
									console.log("isLocation = true")
								}
							}
						}, (error) => {
							console.log("定位失败 error=" + error)

							this.locationState = 3
						})
					});
				} else {
					console.log("环境不支持定位")

					this.locationState = 3
				}
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.city-list {
		background-color: #f5f5f5;
		top: 0;
		bottom: 0;
		height: 100%;
		width: 100%;
		position: absolute;
		overflow-y: auto;
	}
	
	.item-title {
		padding-left: 15px;
		line-height: 30px;
		font-size: 14px;
		color: #333;
		background-color: #ebebeb;
	}
	
	.item-list {
		overflow: hidden;
		padding: 5px 0;
	}
	
	.item-city {
		float: left;
		background: #fff;
		width: 26%;
		height: 33px;
		margin-left: 4%;
		margin-top: 5px;
		margin-bottom: 5px;
		border: 1px solid #e6e6e6;
		border-radius: 3px;
		line-height: 33px;
		text-align: center;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: #333;
	}
	
	.item-title.group-title {
		padding-left: 25px;
	}
	
	.group-item ul {
		padding-right: 30px;
		font-size: 14px;
		color: #333;
	}
	
	.group-item ul li {
		height: 44px;
		line-height: 44px;
		margin-left: 15px;
		border-bottom: 1px solid #c8c7cc;
	}
	
	.group-item ul li:last-child {
		border-bottom: 0;
	}
	/*侧边栏*/
	
	.sidebar {
		position: fixed;
		top: 75px;
		right: 0;
		width: 35px;
		z-index: 10;
		text-align: center;
		font-size: 12px;
	}
	
	.text {
		text-align: center;
		font-size: 12px;
		color: #333;
	}
	
	.letter {
		width: 15px;
		margin-left: 15px;
	}
	/*预加载*/
	
	.preloading {
		text-align: center;
		line-height: 40px;
		font-size: 16px;
	}
	
	.preloading img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
</style>