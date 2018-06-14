<template>
	<div style="margin-top: 0.3rem;">
		<div class="loadpage">
			<div>
				<img src="../../wap/images/Loadpage.png" alt="" />
			</div>
			<p>网路出现故障,<a @click='onload'>请刷新</a></p>
		</div>
	</div>
</template>

<script>
	export default{
		methods:{
			onload(){
				window.location.reload();
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less" scoped>
 .loadpage{
 	width: 100%;
 	height: 18rem;
 	position: relative;
 	div{
 		width: 400/46.875rem;
 		position: absolute;
 		left: 50%;
 		top:3rem;
 		margin-left: -200/46.875rem;
 		img{
 			width: 100%;
 		}
 	}
 	p{	position: absolute;
 		top: 8.7rem;
 		width: 100%;
 		text-align: center;
 		font-size: 30/46.875rem;
 		color: #666;
 		a{
 			color: #146CDC;
 		}
 	}
 	
 }
		
</style>