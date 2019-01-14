<template>
  <div class='tabbar'>
  	
		<router-link to="/movie">
			<span class="movie movie-active" id="movie"></span>
			<span class="item-title">电影</span>
		</router-link>
		<router-link to="/cinema">
			<span class="cinema cinema-active" id="cinema"></span>
			<span class="item-title">影院</span>
		</router-link>

		<router-link :to="this.$store.getters.getIsLogin?'/mine':'/login'">
			<span class="mine mine-active" id="mine"></span>
			<span class="item-title">我的</span>
		</router-link>

  </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
     
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tabbar{
	width: 100%;
	height: 48px;
	background-color: #fff;
	border-top:1px solid #d8d8d8;
	
	position: fixed;
	left: 0;
	bottom: 0;
}
.tabbar a{
	display: block;
	width: 33.33%;
	height: 100%;
	float: left;	
	
	padding-top: 5px;
	text-align: center;
}
.item-title{
	font-size: 10px;
	text-align: center;
	display: block;
}
.router-link-active{
	color: #f03d37;
}
#movie,#cinema,#mine{
	display: block;
	width: 25px;
	height: 25px;
	background-size: 25px 25px;
	margin:0 auto;
}
.movie{
	background:url(../../assets/img/movie.png);
}
.cinema{
	background:url(../../assets/img/cinema.png);
}
.mine{
	background:url(../../assets/img/mine.png);
}
.router-link-active .movie{
	background:url(../../assets/img/movie_active.png);
}
.router-link-active .cinema{
	background:url(../../assets/img/cinema_active.png);
}
.router-link-active .mine{
	background:url(../../assets/img/mine_active.png);
}
</style>
