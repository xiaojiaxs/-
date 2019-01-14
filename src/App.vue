<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
	}
	
	body {
		margin: 0;
		color: #777;
		font-size: 14px;
	}
	
	a {
		text-decoration: none;
		color: #696969;
	}
	
	.list-content {
		padding-top: 50px;
		padding-bottom: 48px;
		min-height: 403px;
	}
	
	.detail-content {
		padding-top: 50px;
		min-height: 445px;
	}
	
	ul,
	li {
		margin: 0;
		padding: 0;
		list-style: none;
	}
	
	::-webkit-scrollbar {
		display: none;
	}
</style>