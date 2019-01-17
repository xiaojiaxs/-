// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

//引入jquery
import $ from 'jquery'

//引入store
import store from '@/store/store'

//定义过滤器
Vue.filter('wh128x180', function(value) {
	if(!value) return ''
	value = value.toString()
	return value.replace("w.h", "128.180")
})

//挂载一个全局网络请求对象
//	this.request
import request from '@/request/request'
Vue.prototype.request = request

//图片懒加载
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
	//  error:'./src/assets/img/error.png',  
	//  loading:'./static/loading.gif',
	preLoad: 1.3,
	attempt: 3
})

//图片缩略
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//注册全局组件
import navbar from '@/components/common/navbar'
import tabbar from '@/components/common/tabbar'
import filterCinemas from '@/components/common/filterCinemas'
import noOrder from '@/components/common/noOrder'

const loadComponent = {
	install(Vue) {
		Vue.component("navbar", navbar)
		Vue.component("tabbar", tabbar)
		Vue.component("filterCinemas", filterCinemas)
		Vue.component("noOrder", noOrder)
	}
}
Vue.use(loadComponent)

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function(fmt) { //author: meizz 
	var o = {
		"M+": this.getMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if(/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for(var k in o)
		if(new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}

/* eslint-disable no-new */
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})