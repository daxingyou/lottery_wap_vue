<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if='!isAndroidWebview'>
	  <i @click="goBack()"></i>
	  <span>红包雨</span>
	</div>
	<div id="nowyear"  :style="{'margin-top':isAndroidWebview ? '0':'1.92rem'}">
		<!-- <div class="intermediate_uc" @click='ljlq'></div> -->
	</div>
	<!-- <promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow"
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox> -->
  </div>
</template>
<script>
  export default {
    name: 'activity1',
    created(){
			if(this.$route.query.oid){
				this.isAndroidWebview = true
			}
    },
    data(){
      return {
				isAndroidWebview:false
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      },
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
@zoom:46.875rem;
.container {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .title{
    width: 100%;
    height: 90/46.875rem;
    background:#196fde;
    line-height: 90/46.875rem;
    text-align: center;
    z-index: 4;
    position: fixed;
    left: 0;
    top: 0;
    >i{
    	display: block;
	    width: 35/46.875rem;
	    height: 50/46.875rem;
	    background: url('@{public_img}/images/backing_out.png') no-repeat;
	    background-size:100% 100%;
	    position: absolute;
	    left: 0.5rem;
	    top: 0.4rem;
	    }
	   >span{
	   	color: #FFFFFF;
	   	font-size: 0.8rem;
	   }
	  }
	#nowyear{
		width: 100%;
		height: 1244/46.875rem;
		background: url(../../../wap/images/uc/hb.png) no-repeat;
		background-size: 100% 100%;
		position: relative;


		>.intermediate_uc{
			position: absolute;
			left: 50%;
			top: 21.5rem;
			height:1.2rem;
			width: 200/46.875rem;
			margin-left: -100/46.875rem;
		}
	}
</style>
