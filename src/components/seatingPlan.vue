<template>
	<div>
		<navbar :title="seatData.seat?seatData.cinema.cinemaName:'选择座位'" type="detail"></navbar>
		<!--预加载-->
		<div class="preloading" v-if="preloading">
			<img src="../assets/img/loading.gif" alt="" />
			<span>正在加载...</span>
		</div>
		<div class="detail-content" v-if="showContent">
			<!--电影信息-->
			<div class="movie-info" v-if="seatData.seat">
				<div class="movie-title">{{seatData.movie.movieName}}</div>
				<div class="movie-content">
					{{seatData.show.showDate}}&nbsp;{{seatData.show.showTime}}&nbsp;&nbsp;{{seatData.show.lang}}{{seatData.show.dim}}
				</div>
			</div>
			<!--座位区域-->
			<div class="seat-area">

				<div class="select-block">
					<div class="seat-block-wrap" v-if="seatData.seat">
						<div class="seats-block">
							<!-- hall-name -->
							<!-- row-nav -->
							<!-- m-line -->
							<!-- s-line -->
							<!-- 普通区 -->
							<div class="seats-wrap" style="width: 1518px;">
								<!-- 双层for循环 -->
								<!--每一行-->
								<div v-for="(rowItem,rowIndex) in seatData.seat.sections[0].seats" :key="rowIndex">
									<!-- 每一列 -->
									<div v-for="(columnItem,columnIndex) in rowItem.columns" :key="columnIndex" class="wrap" :class="{active:columnItem.active}" :data-status="{'E':-1,'N':0,'LK':1}[columnItem.st]" @click="dealSelectSeat(columnItem,rowIndex,columnIndex,0)">
										<div class="seat">
											<div class="name">
												<div>{{rowItem.rowId}}排</div>
												<div>{{columnItem.columnId}}座</div>
											</div>
										</div>
									</div>
								</div>
							</div>
							<!-- s-line -->
							<!-- 贵宾区 -->
							<div></div>
						</div>
					</div>
				</div>

			</div>
			<!--买票信息-->
			<div class="buy-ticket-area">
				<!--座位分类-->
				<div class="cinema-info">
					<div class="seat-type-info">
						<div class="text-middle">
							<span class="select"></span>
							<span>可选</span>
						</div>
						<div class="text-middle">
							<span class="selected"></span>
							<span>已选</span>
						</div>
						<div class="text-middle">
							<span class="sold"></span>
							<span>已售</span>
						</div>
						<div class="text-middle">
							<span class="love"></span>
							<span>情侣座</span>
						</div>
					</div>
				</div>
				<!--推荐座位-->
				<div class="recommend-seat" v-if="selectSeatList.length==0">
					<div class="recommend-title">推荐座位</div>
					<div class="recommend-list">
						<div @click="dealSelectRecommend(1)" class="recommend-item">1人</div>
						<div @click="dealSelectRecommend(2)" class="recommend-item">2人</div>
						<div @click="dealSelectRecommend(3)" class="recommend-item">3人</div>
						<div @click="dealSelectRecommend(4)" class="recommend-item">4人</div>
						<div @click="dealSelectRecommend(5)" class="recommend-item">5人</div>
					</div>
				</div>
				<!--已选座位-->
				<div class="selected-seat" v-if="selectSeatList.length>0">
					<div class="selected-seat-title">已选座位</div>
					<div class="selected-seat-list">
						<div class="selected-seat-item" v-for="(item,index) in selectSeatList" :key="index" @click="dealCancleSeat(item,0)">
							<div class="selected-seat-info">{{item.rowId}}排{{item.columnId}}座</div>
							<div class="price-info">¥{{item.price}}</div>
							<span class="close"></span>
						</div>
					</div>
				</div>
				<!--选座按钮-->
				<div class="confirm-button">
					<button @click="dealBuyTicket" :data-show="selectSeatList.length==0?'recommend':'submit'">
						{{selectSeatList.length>0?'¥'+totalPrice+' 确认选座':'请先选座'}}
					</button>
				</div>

			</div>

		</div>

	</div>
</template>
<script>
	export default {
		data() {
			return {
				seatData: {},
				preloading: true,
				showContent: false
			};
		},
		created() {
			this.request.postSeatingPlan({
				seqNo: 1212
			}, data => {
				//console.log(data)
				this.seatData = data.seatData;
				this.preloading = false
				this.showContent = true
			});

		},
		methods: {
			//创建订单
			dealBuyTicket() {
				if(this.selectSeatList.length > 0) {
					var user = JSON.parse(localStorage.Maoyan_user);

					var sectionIndex = 0;

					var dict = {
						seqNo: this.seatData.show.seqNo,
						sectionId: this.seatData.seat.sections[sectionIndex].sectionId,
						sectionName: this.seatData.seat.sections[sectionIndex].sectionName,
						seats: JSON.stringify(this.selectSeatList),
						userPhone: user.mobile,

						//自己
						cinema: JSON.stringify(this.seatData.cinema),
						movie: JSON.stringify(this.seatData.movie),
						hall: JSON.stringify(this.seatData.hall),
						show: JSON.stringify(this.seatData.show),
						userId: user.id,
						token: user.token
					};
					this.request.postCreateOrder(dict, data => {
						if(data.status == 0) {
							//console.log("创建失败");

							layer.open({
								content: "订单创建失败",
								btn: "我知道了"
							});
						} else {
							//console.log("创建成功");

							var orderId = data.data.orderId;
							this.$router.push("/paymentOrder/" + orderId);
						}
					});
				} else {
					layer.open({
						content: "请先选择座位",
						btn: "我知道了"
					});
				}
			},
			//推荐座位选座
			dealSelectRecommend(count) {
				var sectionIndex = 0;

				var map = {
					1: "bestOne",
					2: "bestTwo",
					3: "bestThree",
					4: "bestFour",
					5: "bestFive"
				};

				var dict = this.seatData.seat.bestRecommendation[map[count]];

				/*
				switch (count) {
				  case 1:
				    dict = this.seatData.seat.bestRecommendation.bestOne;
				    break;
				  case 2:
				    dict = this.seatData.seat.bestRecommendation.bestTwo;
				    break;
				  case 3:
				    dict = this.seatData.seat.bestRecommendation.bestThree;
				    break;
				  case 4:
				    dict = this.seatData.seat.bestRecommendation.bestFour;
				    break;
				  case 5:
				    dict = this.seatData.seat.bestRecommendation.bestFive;
				    break;

				  default:
				    break;
				}
				*/

				//console.log(dict);

				for(var recommendIndex in dict.seats) {
					//每个推荐的座位
					var recommendItem = dict.seats[recommendIndex];

					//把每个座位在  所有的行列里找
					//每一行
					for(var rowIndex in this.seatData.seat.sections[0].seats) {
						var rowItem = this.seatData.seat.sections[0].seats[rowIndex];
						//每一列
						for(var columnIndex in rowItem.columns) {
							var columnItem = rowItem.columns[columnIndex];

							if(
								recommendItem.rowId == rowItem.rowId &&
								recommendItem.columnId == columnItem.columnId
							) {
								//console.log("找到");
								this.$set(
									this.seatData.seat.sections[sectionIndex].seats[rowIndex]
									.columns[columnIndex],
									"active",
									true
								);
							}
						}
					}
				}
			},
			//删除所选的座位
			dealCancleSeat(item, sectionIndex) {
				this.$set(
					this.seatData.seat.sections[sectionIndex].seats[item.rowIndex].columns[
						item.columnIndex
					],
					"active",
					false
				);
			},
			dealSelectSeat(columnItem, rowIndex, columnIndex, sectionIndex) {
				//console.log(columnItem);
				//console.log(rowIndex);
				//console.log(columnIndex);

				if(columnItem.st == "N") {
					/*
					if (
					  this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
					    columnIndex
					  ].active == undefined
					) {
					  this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
					    columnIndex
					  ].active = false;
					}
					this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
					  columnIndex
					].active = !this.seatData.seat.sections[sectionIndex].seats[rowIndex]
					  .columns[columnIndex].active;

					this.$forceUpdate();*/

					var isActive = this.seatData.seat.sections[sectionIndex].seats[rowIndex]
						.columns[columnIndex].active;
					if(isActive == undefined) {
						isActive = false;
					}

					if(isActive == false) {
						if(this.selectSeatList.length >= 6) {
							layer.open({
								content: "最多选择6个座位",
								btn: "我知道了"
							});
							return;
						} else {
							this.$set(
								this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
									columnIndex
								],
								"active",
								true
							);
						}
					} else {
						this.$set(
							this.seatData.seat.sections[sectionIndex].seats[rowIndex].columns[
								columnIndex
							],
							"active",
							false
						);
					}

					//this.$forceUpdate();
				}
			}
		},
		computed: {
			totalPrice() {
				var sum = 0;
				for(var index in this.selectSeatList) {
					var item = this.selectSeatList[index];
					sum += parseFloat(item.price);
				}
				sum = sum.toFixed(1);
				return sum;
			},
			selectSeatList() {
				//console.log("selectSeatList");

				var price = 0;
				if(this.seatData.price) {
					if(this.seatData.price.seatsPrice["1"]) {
						price = this.seatData.price.seatsPrice["1"].totalPrice;
					}
				}

				var list = [];

				//计算所有被选择的座位
				if(this.seatData.seat) {
					//每一行

					for(var rowIndex in this.seatData.seat.sections[0].seats) {
						//每一列
						var rowItem = this.seatData.seat.sections[0].seats[rowIndex];
						for(var columnIndex in rowItem.columns) {
							var columnItem = rowItem.columns[columnIndex];
							if(columnItem.active == true) {
								//console.log("选择了");

								columnItem.rowId = rowItem.rowId;
								columnItem.price = price;
								columnItem.rowIndex = rowIndex;
								columnItem.columnIndex = columnIndex;
								list.push(columnItem);
							}
						}
					}
				}

				return list;
			}
		}
	};
</script>
<style scoped>
	/*电影信息*/
	
	.movie-info {
		padding: 15px;
	}
	
	.movie-title {
		line-height: 24px;
		font-size: 16px;
		font-weight: 700;
		color: #333;
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	
	.movie-content {
		width: 100%;
		text-overflow: ellipsis;
		overflow: hidden;
		white-space: nowrap;
	}
	/*座位区域*/
	
	.seat-area {
		background-color: #f2f1f6;
		overflow: hidden;
		box-sizing: border-box;
		position: relative;
		margin-top: 0!important;
		height: 222px;
		overflow: scroll;
	}
	.select-block{
		height: 222px;
	}
	
	.seat-block-wrap {
		visibility: visible;
	}
	
	.seats-block {
		position: relative;
		z-index: 1;
	}

	.wrap {
		display: inline-block;
		padding: 6px 3px;
	}
	
	.seat {
		width: 40px;
		height: 36px;
		font-size: 10px;
		padding: 3px 6px;
		box-sizing: border-box;
		line-height: 1.2;
		text-align: center;
		background-size: contain;
		color: #fff;
		position: relative;
	}
	
	.select-block .seats-wrap .wrap .seat>.name {
		display: none;
		position: absolute;
		line-height: 1;
		width: 100%;
		left: 0;
		top: 50%;
		transform: translateY(-50%);
	}
	
	.select-block .seats-wrap .wrap[data-status="0"] .seat {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAWlBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP8/P3p6u3Y2d7z8/XLzdT4+PnS1NrP0dfw8PLQ0dhOVyJQAAAAEnRSTlMA8r5NhGoRCOLVs3njyiAcsnjlsKc3AAABFElEQVRYw+3Yy3KDMAyFYewA4ZJLqyPbAdL3f80mbWY8LaYTZDad6N/zDdZOKn5VV12DZzNtV9XFX+17g5WZfr/snVrAu4GebnAeaE9L3vmAMdDKwojDeeG9R3im1bHHMf3qd4xMgnhEn/Jqg0CiAkydACt4EuZRJcA3OCno0CXABoMUHNAkQIDEAf8L3FmDW1ngV8bu7l4JIB98VN7+DxfHdE8Ixk/ZXbArLBxRPvidgy0MeDuQYQqAtgMJUFBBBRVUUEEFFVRQQQUVfCVwClIvTEnwOkHYx3UGZhdBA97OY5i4L2+Rg40bfV5xo483By+nPB6VP64iLB9dvIrELFzO6GbFYcpGl6iEuHKuxWGuKDW6T1dge519C3laAAAAAElFTkSuQmCC);
	}
	
	.select-block .seats-wrap .wrap[data-status="0"].love .seat {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAhFBMVEUAAADKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNPKzNP////KzNP/v8/7+/zo6ez/xtT/9vj/1uDY2d7/zNn/wtHz8/X/7/P/2+T/0t78/P3/4un/3+f4+Pnq6+7/6O7S1NrP0dfw8PLQ0diylW+SAAAAE3RSTlMAvvVN8YTjeR4RCNWzymtqT0yytIS7BgAAAbVJREFUWMPt2G1vgjAUhmFExHedO0+Rd1BR0f3//zeUsCZAFzlliUu4P/nFK/UQaVqj1ny7sk28mLlcbefGby2mFjpmTRdqb7YEgsuZXu58CYDlTOnZyGPqWJzDVoiLNYIjde4YYN3+q6fIC48h5pi2eXMLMbGKYbU96w0CYhZg0wJ+4sIFL1i1gDbOXPAMuwU0QexgtoDQAfGn4HhkokgLfGaOdg9vAkAbrJoYxg7YO/SICcqvOntgbIywJ9IHy/YYGRac/kAHlgFQfyABA1gv8V3h+gk989LQDVNPB8xEWUpFqSg78cGTqPKJfFF14oJeJH66XuXnyGOCmZC5rpBlTDAUikIm6KpAlwkKVdG7rPCgAn0meFWBCROkUPWQuWCiWCAbpLRu8f/L6ufikw54bIgH3ResX18fB1TPMetjC7hGFRcl/ewpXlh6odfbJpVFxfJOfe563uHgvec2OoADOIAD+A/AW8z14lsreL+B2de9BvYXIE+jfeTAlOdlveR5efw80WsnT/TyziHgU4G8cyj6qG5FHPbSqluRsSGTw+SNrpEcJnN0zSZgN2lqcpidao7uG3v6l8qmi9dyAAAAAElFTkSuQmCC);
	}
	
	.select-block .seats-wrap .wrap.active .seat {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAUVBMVEUAAAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjAAjjABKsgAjjABHsAA5ogBAqQAslgAokQBErQA6owCuT/9rAAAAEnRSTlMA8r5NhOPRs3keEQj3vWtqT0wAlaAzAAABGUlEQVRYw+3Yu3KDMBCFYS3iZsB2oiMkwfs/aBKl0EyyZMzKqbx/QUHxzXC6xfxoug/dggejfrhP5q/mkXAyGudj79IDcd/cw217BPrLodchBXeykNAdiHOP6N3pfETPf/WI5J0gnzBy3kQITlQATQx4Q3TCIm4MOGCXgjsGBuywScENHQMucOKwMCBqQPwraK+EXAWYo6v98lrkqsFca8w7sPr8tgbMT78C1jRYnasHv1vRGIJ/HuhBBnD1YDGgoIIKKqigggoqqKCCCir4SmAKUi8kFgwJwlJgwMoKSPDP8zyo3Mt1lXvZ5ou+unLRl38OUU7F8s/hM9sQcl4+XY4aa0plTNl0v8tjyqdjaiGuNWxvDeFU3HQfazZ7bQoGO5kAAAAASUVORK5CYII=);
	}
	
	.select-block .seats-wrap .wrap.active .seat>.name {
		display: block;
	}
	
	.select-block .seats-wrap .wrap.active.love .seat {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAVFBMVEUAAAD3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z3V4z/jLP3V4z/iLD8daP9f6n5ZJb+ha34X5L4XJCR3rPOAAAAE3RSTlMAvvRN8ITjs3keEQj51cprak9OY3X2yAAAARlJREFUWMPt2MtugzAQhWEbzCVckrRzfAHe/z2bUFWWiqnCmK4y/4LlJ3F2Y/Wr7t7UA16sGJt7p/6qbw0OZtp+37uMQHATvdzkAjBedr0as6eD+Rn1jthfESwdzgZc03/dYrbEyM5oU15n4ImVh+kS4A2BmAXcEmADxwUdmgRYY+KCE+oEOIDYYUiAyAHxr2CpCzzKAtcKXT69CkA2+FOlVAk4S89ywPVrHVAqDUeUD37noJWBPQ+0MAqg80ACBBRQQAEFFFBAAQUUUEAB3wlcPNfzSxL0C5gtfgNmF0EDe55nUcR7+YwcdLzo84oXfXxzCHwqxDeHRx+6wJrlT7dW6E8Vi2PyptsUx+RNl6gCu2qrxTEPlJruCxQdkHeLrlCUAAAAAElFTkSuQmCC);
	}
	
	.select-block .seats-wrap .wrap[data-status="1"] .seat {
		background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABICAMAAABWSoJpAAAAVFBMVEUAAACzMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSezMSf0QzazMSfZOy/vQjXkPjLENSu1MSfxQjXrQDS9NCm5MyjljUErAAAAEXRSTlMA8r5NhdGzeR4RCPfi42tqTDUQPiwAAAEbSURBVFjD7djLboMwEIVhm2u4JOkcX2Lg/d+zgkayWkwVxumq8y9YfhJnN1Y/6u7NOODFdN3cO/VbfatxMt32x96lBryZAr1YmIwH6suhd8Xs6GRuxvVA7Gt4S6cLHnX6r1vMlhjZGW3K6zQcsXLQXQK8wRMzj1sCbGC4oEGTAEdMXHDCmAAHBC4YMCRAgNgBfwqWhcZaDrili3L1KgD54LNKqQ88jKW1HHD7WvNAqQoYonzwK4NCadj3gRZaAZQPRgMCCiiggAIKKKCAAgoooID/CVwc13NLEnQLmC1uB2YXQQ37Ps9Cx3s5r3gvl9tFn1286OObg+dTHs+qb68ilj9dfBWJFTA50+2KY/KmS1SBXbXX4pgnSk33CZj5ZtQDyuLIAAAAAElFTkSuQmCC);
	}
	/*买票信息*/
	/*座位分类*/
	
	.cinema-info {
		background-color: #f0f0f0;
		opacity: .8;
		font-size: 12px;
	}
	
	.seat-type-info {
		text-align: center;
		padding: 10px 8px;
	}
	
	.text-middle {
		text-align: center;
		display: inline-block;
		margin-left: 5px;
	}
	
	.text-middle span:nth-of-type(1) {
		display: inline-block;
		width: 17px;
		height: 15px;
		background-repeat: no-repeat;
		background-size: 100%;
		margin-right: 3px;
		vertical-align: middle;
	}
	
	.text-middle span.select {
		background-image: url(../assets/img/seat-fff.png);
	}
	
	.text-middle span.selected {
		background-image: url(../assets/img/seat-green.png);
	}
	
	.text-middle span.sold {
		background-image: url(../assets/img/seat-red.png);
	}
	
	.text-middle span.love {
		background-image: url(../assets/img/seat-ql.png);
	}
	/*推荐座位*/
	
	.recommend-seat {
		padding: 10px 10px 7px;
		overflow: hidden;
	}
	
	.recommend-title {
		float: left;
		font-size: 13px;
		color: #333;
		height: 30px;
		line-height: 30px;
	}
	
	.recommend-list {
		float: left;
		overflow: hidden;
		width: calc(100% - 52px);
	}
	
	.recommend-item {
		line-height: 30px;
		border: 1px solid #d7d7d7;
		border-radius: 2px;
		font-size: 11px;
		text-align: center;
		width: calc(100% / 5 - 10px);
		height: 30px;
		margin-left: 8px;
		float: left;
	}
	/*已选座位*/
	
	.selected-seat {
		padding: 0 10px;
	}
	
	.selected-seat-title {
		padding-top: 5px;
		height: 20px;
		color: #333;
		font-size: 11px;
	}
	
	.selected-seat-list {
		overflow: hidden;
	}
	
	.selected-seat-item {
		position: relative;
		float: left;
		background-image: url(../assets/img/wrapper.png);
		margin: 5px 2px;
		width: 82px;
		height: 37px;
		background-size: 82px 37px;
		text-align: center;
	}
	
	.selected-seat-info {
		padding-top: 3px;
		font-size: 12px;
		color: #333;
	}
	
	.price-info {
		font-size: 11px;
		color: #fa5939;
		line-height: 15px;
	}
	
	.close {
		position: absolute;
		top: 15px;
		right: 5px;
		background-image: url(../assets/img/coupon.png);
		background-size: 7px 7px;
		width: 7px;
		height: 7px;
		display: inline-block;
	}
	/*选座按钮*/
	
	.confirm-button {
		padding: 10px;
		height: 45px;
	}
	
	.confirm-button button[data-show="recommend"] {
		width: 100%;
		background-color: #ffddb2;
		line-height: 45px;
		font-size: 18px;
		font-weight: 700;
		text-align: center;
		color: #fff;
		border-radius: 4px;
		border: 0;
		outline: none;
	}
	
	.confirm-button button[data-show="submit"] {
		width: 100%;
		background-color: #f90;
		line-height: 45px;
		font-size: 18px;
		font-weight: 700;
		text-align: center;
		color: #fff;
		border-radius: 4px;
		border: 0;
		outline: none;
	}
	/*预加载*/
	
	.preloading {
		text-align: center;
		line-height: 50px;
		font-size: 16px;
		padding-top: 50px;
	}
	
	.preloading img {
		width: 30px;
		height: 30px;
		vertical-align: middle;
	}
</style>