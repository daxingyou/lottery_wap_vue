<template>
  <div class="container" id="contain">
     <div class="title" v-if="!isAndroidWebview">
      <i @click="goBack()"></i>
      <span>开户有礼</span>
    </div>
    <div class="content" ref="content" :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
     	<img src="../../../wap/images/sd/fh.png" alt="" />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity1',
    mounted(){

    },
    data(){
      return {
        isAndroidWebview: location.href.indexOf('?') > -1 ? true : false
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.container {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .title{
    width: 100%;
    height: 90/46.875rem;
    background:#146cdc !important;
    line-height: 90/46.875rem;
    text-align: center;
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
  .content {
    width: 100%;
    margin-top:90/46.875rem;
    img{
    	width: 100%;
    }
    
  }
  

</style>
