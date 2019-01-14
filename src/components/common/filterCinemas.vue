<template>
	<div @click="sendShowIndex">

		<!--影院選擇-->
		<div class="cinema-choice">
			<div @click="dealShowBox(1)" :class="{active:isShowBox==1}" class="cinema-choice-item">
				{{showDistrictName}}<span :class="{active:isShowBox==1}"></span>
			</div>|
			<div @click="dealShowBox(2)" :class="{active:isShowBox==2}" class="cinema-choice-item">
				<!--品牌-->
				{{selectBrandId==-1?'品牌':selectBrandName}}
				<span :class="{active:isShowBox==2}"></span>
			</div>|
			<div @click="dealShowBox(3)" :class="{active:isShowBox==3}" class="cinema-choice-item">
				特色<span :class="{active:isShowBox==3}"></span>
			</div>
		</div>
		<!--全城-->
		<div class="all-city-box" v-if="isShowBox==1">
			<div class="all-city-content">
				<div class="all-city-button">
					<div @click="dealCityButton(1)" :class="{'active':buttonIndex==1}" class="button">商区</div>
					<div @click="dealCityButton(2)" :class="{'active':buttonIndex==2}" class="button">地铁站</div>
				</div>
				<div class="all-city-wrapper">
					<div v-if="buttonIndex==1" class="wrapper">
						<div class="wrapper-button">
							<ul v-if="filterCinemas.district">
								<li v-for="(item,index) in filterCinemas.district.subItems" 
									:class="{active:selectDistrictId == item.id}"
								 	@click="dealSelectDistrict(item,index)">
									{{item.name}}({{item.count}})
								</li>
							</ul>
						</div>
						<div class="wrapper-content">
							<ul>
								<li v-for="(item,index) in filterCinemas.district.subItems[selectDistrictIndex].subItems" 
									:class="{active:selectAreaId == item.id}"
								 	@click="dealSelectArea(item,index)">
									<span v-show="selectAreaId == item.id"></span>
									<span>{{item.name}}</span>
									<span>{{item.count}}</span>
								</li>
							</ul>
						</div>
					</div>
					<div v-if="buttonIndex==2" class="wrapper">
						<div class="wrapper-button">
							<ul v-if="filterCinemas.subway">
								<li v-for="(item,index) in filterCinemas.subway.subItems" 
									:class="{active:selectLineId == item.id}" 
									@click="dealSelectLine(item,index)">
									{{item.name}}({{item.count}})
								</li>
							</ul>
						</div>
						<div class="wrapper-content">
							<ul>
								<li v-for="(item,index) in filterCinemas.subway.subItems[selectLineIndex].subItems" 
									:class="{active:selectStationId == item.id}"
								 	@click="dealSelectStation(item,index)">
									<span v-show="selectStationId == item.id"></span>
									<span>{{item.name}}</span>
									<span>{{item.count}}</span>
								</li>
							</ul>
						</div>
					</div>

				</div>
			</div>
		</div>
		<!--品牌-->
		<div class="brind-box" v-if="isShowBox==2">
			<div class="brind-content" v-if="filterCinemas.brand != undefined">
				<div class="brind-item" 
					v-for="(item,index) in filterCinemas.brand.subItems" 
					@click="dealSelectBrand(item.id,item.name)" 
					:class="{active:item.id == selectBrandId}">
					<span v-show="item.id == selectBrandId"></span>
					<span>{{item.name}}</span>
					<span>{{item.count}}</span>
				</div>
			</div>
		</div>
		<!--特色-->
		<div class="feature-box" v-if="isShowBox==3">
			<div class="feature-wrapper">
				<div class="feature-scroll">
					<div class="feature-content">
						<div class="feature-title">特色功能</div>
						<div class="feature-list" v-if="filterCinemas.service != undefined">
							
							<div class="feature-item" 
								v-for="(item,index) in filterCinemas.service.subItems"
								:class="{active:item.id==tempSelectServiceId}" 
								@click="tempSelectServiceId = item.id">
								{{item.name}}
							</div>
							
						</div>
					</div>
					<div class="feature-content">
						<div class="feature-title">特殊厅</div>
						<div class="feature-list" v-if="filterCinemas.hallType != undefined">
							<div class="feature-item" v-for="(item,index) in filterCinemas.hallType.subItems"
								:class="{active:item.id==tempSelectHallTypeId}"
							 	@click="tempSelectHallTypeId = item.id">
								{{item.name}}
							</div>
						</div>
					</div>
				</div>
				<div class="feature-button">
					<span @click="dealReset()" class="cancel-btn">重置</span>
					<span @click="dealConfim()" class="cancel-btn confirm-btn">确定</span>
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
				filterCinemas:{},//影院过滤数据

				isShowBox: 0, //0不显示 	1=全城	2=品牌	3=特色

				buttonIndex: 1,//区域类型  商圈=1,地铁=2

				showDistrictName: "全城",//默认全城
				
				selectDistrictId: -1,//选择...区id，默认-1=全部
				selectDistrictName: "全部",//显示...区名字
				selectDistrictIndex: 0,//选择...区序号

				selectAreaId: -1,//选择详细地区id，默认-1=全部
				selectAreaName: "全部",//显示详细地区名字

				selectLineId: -1,//选择地铁线id，默认-1=全部
				selectLineName: "全部",//显示地铁线名字
				selectLineIndex: 0,//选择地铁线序号

				selectStationId: -1,//选择地铁线车站id，默认-1=全部
				selectStationName: "全部",//显示地铁车站名字

				selectBrandId: -1,//选择的品牌id
				selectBrandName: "",//选择的品牌name

				tempSelectServiceId: -1,//临时选择特色功能id
				tempSelectHallTypeId: -1,//临时选择特殊厅id

				selectServiceId: -1,//确认选择特色功能id
				selecthallTypeId: -1,//确认选择特色id

				
			}
		},
		created() {
			//影院过滤数据
			this.request.getFilterCinemas({}, (data) => {
				//console.log(data)
				this.filterCinemas = data
			})

			
		},
		methods: {
			//全城/品牌/特色 选择
			dealShowBox(index) {
				if(this.isShowBox == index) {
					this.isShowBox = 0
					
				} else {
					this.isShowBox = index
					
				}
			},
			//全城
			//商圈/地铁选择
			dealCityButton(index) {
				this.buttonIndex = index
			},
			
			//选择...区
			dealSelectDistrict(item, index) {
				this.selectDistrictId = item.id
				this.selectDistrictIndex = index
				this.selectDistrictName = item.name
			},
			//选择详细地区
			dealSelectArea(item, index) {
				this.selectAreaId = item.id
				this.isShowBox = 0
				
				this.selectAreaName = item.name

				
				if (item.id == -1) {
					this.showDistrictName = this.selectDistrictName//显示全部
				} else {
					this.showDistrictName = item.name//显示详细地区
				}
			},
			//选择地铁线
			dealSelectLine(item, index) {
				this.selectLineId = item.id
				this.selectLineIndex = index
				this.selectLineName = item.name
			},
			//选择地铁车站
			dealSelectStation(item, index) {
				this.selectStationId = item.id
				this.isShowBox = 0
				
				this.selectStationName = item.name
				
				if (item.id == -1) {
					this.showDistrictName = this.selectLineName//显示全部
				} else {
					this.showDistrictName = item.name//显示地铁车站
				}
			},
			
			//品牌
			//选择品牌
			dealSelectBrand(id, name) {
				this.selectBrandId = id
				this.selectBrandName = name

				this.isShowBox = 0
				
			},
			//特色
			
			//确认
			dealConfim() {
				this.selectServiceId = this.tempSelectServiceId
				this.selecthallTypeId = this.tempSelectHallTypeId
				this.isShowBox = 0
				
			},
			//重置
			dealReset() {
				this.selectServiceId = -1
				this.selecthallTypeId = -1
				this.tempSelectServiceId = -1
				this.tempSelectHallTypeId = -1
			},
			
			sendShowIndex(){
				this.$emit('showIndex', this.isShowBox)
			},
		},
		watch: {
			//监听特色
			isShowBox() {
				if (this.isShowBox == 3) {
					this.tempSelectServiceId = this.selectServiceId
					this.tempSelectHallTypeId = this.selecthallTypeId
				}
			}
		},
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	
	/*影院選擇*/
	
	.cinema-choice {
		width: 100%;
		height: 40px;
		line-height: 40px;
		z-index: 10;
		background-color: #fff;
		display: flex;
		justify-content: space-around;
		position: relative;
		padding:0 15px;
		box-sizing: border-box;
	}
	
	.cinema-choice-item {
		flex: 1;
		text-align: center;
		line-height: 40px;
		position: relative;
		white-space: nowrap;
		overflow: hidden;
		font-size: 13px;
		text-overflow: ellipsis;
	}
	
	.cinema-choice-item.active {
		color: #ef4238;
	}
	
	.cinema-choice-item span {
		display: inline-block;
		position: absolute;
		top: 18px;
		width: 0;
		height: 0;
		margin-left: 4px;
		border: 4px solid transparent;
		border-top-color: #b0b0b0;
	}
	
	.cinema-choice-item span.active {
		border: 4px solid transparent;
		border-bottom-color: #ef4238;
		top: 14px;
	}
	/*全城*/
	
	.all-city-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 4;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.all-city-content {
		position: absolute;
		top: 134px;
		left: 0;
		background: #fff;
		width: 100%;
		height: 300px;
		z-index: 5;
	}
	
	.all-city-button {
		width: 100%;
		height: 44px;
		display: flex;
	}
	
	.all-city-button .button {
		font-size: 15px;
		color: #777;
		width: 50%;
		height: 100%;
		line-height: 44px;
		text-align: center;
	}
	
	.all-city-button .button.active {
		color: #f03d37;
		border-bottom: 2px solid #f03d37;
		box-sizing: border-box;
	}
	
	.all-city-wrapper {
		background: #f5f5f5;
	}
	
	.all-city-wrapper .wrapper {
		height: 280px;
	}
	
	.wrapper-button {
		background: #fff;
		width: 35%;
		height: 100%;
		float: left;
		overflow: scroll;
	}
	
	.wrapper-button ul {}
	
	.wrapper-button ul li {
		height: 44px;
		line-height: 44px;
		font-size: 14px;
		text-align: center;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	.wrapper-button ul li.active{
		color: #f03d37;
    background: #f5f5f5;
	}
	
	.wrapper-content {
		width: 65%;
		height: 100%;
		float: right;
		overflow: scroll;
		background: #f5f5f5;
	}
	
	.wrapper-content ul {}
	
	.wrapper-content ul li {
		position: relative;
		height: 45px;
		line-height: 45px;
		padding: 0 0 0 25px;
		font-size: 15px;
		color: #777;
	}
	.wrapper-content ul li.active{
		color: #ef4238;
	}
	.wrapper-content ul li span:nth-of-type(1) {
		position: absolute;
		display: inline-block;
		left: 8px;
		top: 19px;
		width: 11.5px;
		height: 8px;
		background-image: url(../../assets/img/true.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.wrapper-content ul li span:nth-of-type(2) {
		display: inline-block;
		float: left;
		width: 80%;
		font-size: 14px;
		
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
	}
	
	.wrapper-content ul li span:nth-of-type(3) {
		display: inline-block;
		float: right;
		width: 20px;
		margin-right: 10px;
		
		font-size: 12px;
		text-align: right;
	}
	/*品牌*/
	
	.brind-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 4;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.brind-content {
		position: absolute;
		top: 134px;
		left: 0;
		background: #fff;
		width: 100%;
		height: 320px;
		overflow-y: scroll;
		z-index: 5;
	}
	
	.brind-item {
		width: 100%;
		line-height: 44px;
		height: 44px;
		padding-left: 25px;
		padding-right: 20px;
		box-sizing: border-box;
		border-bottom: 1px solid #e5e5e5;
		position: relative;
	}
	
	.brind-item.active{
		    color: #ef4238;
	}
	.brind-item span:nth-of-type(1) {
		position: absolute;
		display: inline-block;
		left: 8px;
		top: 18px;
		width: 11.5px;
		height: 8px;
		background-image: url(../../assets/img/true.png);
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	
	.brind-item span:nth-of-type(2) {
		display: inline-block;
		float: left;
		
		font-size: 15px;
	}
	
	.brind-item span:nth-of-type(3) {
		display: inline-block;
		float: right;
		
		font-size: 12px;
	}
	/*特色*/
	
	.feature-box {
		position: fixed;
		width: 100%;
		left: 0;
		top: 0px;
		bottom: 0px;
		z-index: 4;
		background-color: rgba(0, 0, 0, 0.5);
	}
	
	.feature-wrapper {
		position: absolute;
		top: 134px;
		left: 0;
		background: #fff;
		width: 100%;
		z-index: 5;
	}
	
	.feature-scroll {
		min-height: 150px;
		max-height: 250px;
		overflow: scroll;
	}
	
	.feature-content {
		overflow: hidden;
	}
	
	.feature-title {
		margin-left: 12px;
		margin-top: 11px;
		font-size: 15px;
		color: #777;
	}
	
	.feature-list {
		margin: 0 12px 12px;
		font-size: 15px;
	}
	
	.feature-item {
		float: left;
		width: 21.3%;
		height: 30px;
		padding: 3px 0;
		margin-right: 3%;
		margin-top: 10px;
		line-height: 30px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: center;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 14px;
	}
	.feature-item.active{
		    background: #fcf0f0;
    color: #f03d37;
    border: 1px solid #f03d37;
	}
	
	.feature-button {
		height: 60px;
		width: 100%;
		border-top: 1px solid #e5e5e5;
		margin-top: 10px;
		background: #fafafa;
	}
	
	.cancel-btn {
		display: inline-block;
		height: 34px;
		width: 21.3%;
		margin: 13px 11px;
		border: 1px solid #e5e5e5;
		border-radius: 6px;
		text-align: center;
		line-height: 34px;
		font-size: 14px;
	}
	
	.cancel-btn.confirm-btn {
		float: right;
		background: #f03d37;
		border: 1px solid #f03d37;
		color: #fff;
	}
	
</style>