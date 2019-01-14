import api from './api'
import axios from 'axios'

//axios本版本不支持jsonp 自己拓展一个
axios.jsonp = (url) => {
	if(!url) {
		console.error('Axios.JSONP 至少需要一个url参数!')
		return;
	}
	return new Promise((resolve, reject) => {
		window.jsonCallBack = (result) => {
			resolve(result)
		}
		var JSONP = document.createElement("script");
		JSONP.type = "text/javascript";
		JSONP.src = `${url}&callback=jsonCallBack`;
		document.getElementsByTagName("head")[0].appendChild(JSONP);
		setTimeout(() => {
			document.getElementsByTagName("head")[0].removeChild(JSONP)
		}, 500)
	})
}

const request = {

	//传入经纬度,返回当前城市
	getCurrentCity(lan, lon, success, failure) {
		//http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=40.1445387,116.28328359999999&output=json&pois=0

		var url = `http://api.map.baidu.com/geocoder/v2/?ak=C93b5178d7a8ebdb830b9b557abce78b&callback=renderReverse&location=${lan},${lon}&output=json&pois=0`

		axios.jsonp(url).then((res) => {

			var result = res.result
			var cityName = result.addressComponent.city

			success(cityName)

		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})

	},

	//下载正在上映数据
	getMovieOnInfoList(option, success, failure) {

		var url = api.movieOnInfoListUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载最受期待数据
	getMostExpected(option, success, failure) {

		var url = api.mostExpectedUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载即将上映数据
	getComingList(option, success, failure) {

		var url = api.comingListUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载城市选择数据
	getCityList(option, success, failure) {

		var url = api.cityListUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载搜索数据
	getSearchList(option, success, failure) {

		var url = api.searchUrl
		//console.log(url)

		axios.get(url, {
			params: option
		}).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},

	//下载影院列表数据
	getCinemaList(option, success, failure) {

		var url = api.cinemaListUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},

	//过滤影院列表
	getFilterCinemas(option, success, failure) {

		var url = api.filterCinemasUrl

		axios.get(url).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载电影详情
	getMovieDetail(option, success, failure) {

		var url = api.movieDetailUrl

		axios.get(url, {
			params: option
		}).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载影院电影列表
	getCinemaMovieList(option, success, failure) {

		var url = api.movieUrl

		axios.get(url, {
			params: option
		}).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载评论列表
	getCommentsList(option, success, failure) {

		var url = api.commentsUrl

		axios.get(url, {
			params: option
		}).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},
	//下载影院详情
	getCinemaDetail(option, success, failure) {

		var url = api.cinemaDetailUrl

		axios.get(url, {
			params: option
		}).then((res) => {
			var rd = res.data
			if(success) {
				success(rd)
			}
		}).catch((error) => {
			if(failure) {
				failure(error);
			}
		})
	},

	//注册发送验证码

	postSignup(option, success, failure) {
		var url = api.signupUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//注册检测验证码
	postSignupCheck(option, success, failure) {
		var url = api.signupCheckUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//注册设置密码
	postSignupSetPassword(option, success, failure) {
		var url = api.signupSetPasswordUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//密码登录
	postUserPasswordLogin(option, success, failure) {
		var url = api.userPasswordLoginUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//手机验证码登录获取验证码
	postMobileLoginCode(option, success, failure) {
		var url = api.mobileLoginCodeUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//手机验证码真正登录
	postUserMobileLoginUrl(option, success, failure) {
		var url = api.userMobileLoginUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//退出登录
	postUserLogoutUrl(option, success, failure) {
		var url = api.userLogoutUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//选择座位
	postSeatingPlan(option, success, failure) {
		var url = api.seatingPlanUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},
	//创建订单
	postCreateOrder(option, success, failure) {
		var url = api.createOrderUrl;

		var formData = new FormData();
		for(var k in option) {
			formData.append(k, option[k]);
		}

		axios.post(url, formData).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//订单信息
	getOrderInfo(option, success, failure) {
		var url = api.orderInfoUrl;

		axios.get(url, {
				params: option
		}).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	},

	//我的订单列表
	getMyOrderList(option, success, failure) {
		var url = api.myOrderListUrl;

		axios.get(url, {
				params: option
		}).then(res => {
			var rd = res.data;
			if(success) {
				success(rd);
			}
		}).catch(error => {
			if(failure) {
				failure(error);
			}
		});
	}
}

export default request;