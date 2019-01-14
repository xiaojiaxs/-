import Vue from 'vue'
import Router from 'vue-router'

import movie from '@/components/movie'
import cinema from '@/components/cinema'
import mine from '@/components/mine'

import login from '@/components/login'
import reg from '@/components/reg'
import resetreq from '@/components/resetreq'

import cinemaMovie from '@/components/cinemaMovie'
import movieDetail from '@/components/movieDetail'
import cinemaDetail from '@/components/cinemaDetail'

import order from '@/components/order'
import starDetail from '@/components/starDetail'

import cityList from '@/components/cityList'
import search from '@/components/search'

import storeOrder from '@/components/storeOrder'
import movieOrder from '@/components/movieOrder'
import webMovie from '@/components/webMovie'
import coupon from '@/components/coupon'
import discountCard from '@/components/discountCard'

import seatingPlan from '@/components/seatingPlan'
import paymentOrder from '@/components/paymentOrder'

import map from '@/components/map'

import store from "@/store/store";

Vue.use(Router)

var router = new Router({
	routes: [{
		path: '/',
		name: '/',
		redirect: '/movie'
	}, {
		path: '/movie',
		name: 'movie',
		component: movie
	}, {
		path: '/cinema',
		name: 'cinema',
		component: cinema
	}, {
		path: '/mine',
		name: 'mine',
		component: mine
	}, {
		path: '/login',
		name: 'login',
		component: login
	}, {
		path: '/cinemaMovie/:id/:name',
		name: 'cinemaMovie',
		component: cinemaMovie
	}, {
		path: '/movieDetail/:id/:name',
		name: 'movieDetail',
		component: movieDetail
	}, {
		path: '/cinemaDetail/:id/:name',
		name: 'cinemaDetail',
		component: cinemaDetail
	}, {
		path: '/order',
		name: 'order',
		component: order
	}, {
		path: '/starDetail',
		name: 'starDetail',
		component: starDetail
	}, {
		path: '/cityList',
		name: 'cityList',
		component: cityList
	}, {
		path: '/search',
		name: 'search',
		component: search
	}, {
		path: '/reg',
		name: 'reg',
		component: reg
	}, {
		path: '/storeOrder',
		name: 'storeOrder',
		component: storeOrder
	}, {
		path: '/movieOrder',
		name: 'movieOrder',
		component: movieOrder
	}, {
		path: '/webMovie',
		name: 'webMovie',
		component: webMovie
	}, {
		path: '/coupon',
		name: 'coupon',
		component: coupon
	}, {
		path: '/discountCard',
		name: 'discountCard',
		component: discountCard
	}, {
		path: '/resetreq',
		name: 'resetreq',
		component: resetreq
	}, {
		path: '/paymentOrder/:id',
		name: 'paymentOrder',
		component: paymentOrder
	}, {
		path: '/seatingPlan',
		name: 'seatingPlan',
		component: seatingPlan
	}, {
		path: '/map/:lat/:lng',
		name: 'map',
		component: map
	}]
})

router.beforeEach((to, from, next) => {
	var pageList = ["/mine"];
	var isCheckPermission = pageList.indexOf(to.path) != -1;

	// ...
	//console.log("to.path = " + to.path);
	if(isCheckPermission && store.getters.getIsLogin == false) {
		console.log("禁止打开mine");

		layer.open({
			content: "您还没有登录,点击后跳转到登录页",
			btn: ["是"],
			yes: function(index) {
				router.push("/login");
				layer.close(index);
			}
		});
	} else {
		next();
	}
});

router.afterEach((to, from) => {
	// ...
});

export default router;