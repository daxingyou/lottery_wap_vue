<template>
  <div class="container" id="contain">
    <div class="title"  v-if="!isAndroidWebview">
      <i @click="goBack()"></i> 首存大赠送
    </div>
    <div id="nowyear" :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
		<div class="intermediately"></div>
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

<style lang='less' rel="stylesheet/less"  scoped>
@import '../../assets/less/variable.less';
  .container {
    padding: 0;
    width: 750/46.875rem;
  }

  .title {
    width: 100%;
    height: 90/46.875rem;
    background: #146cdc;
    display: inline-block;
    line-height: 90/46.875rem;
    text-align: center;
    font-size: 36/46.875rem;
    color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1;
  }

  .title i {
    display: inline-block;
    width: 45/46.875rem;
    height: 45/46.875rem;
    background: url('@{public_img}/images/backing_out.png') no-repeat center center;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  #nowyear{
		width: 100;
		height: 2116/46.875rem;
		background: url(/wap/images/lv/sjsc.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
		>.intermediately{
			position: absolute;
			left: 82%;
			margin-left: -750/46.875/2rem;
			width: 5rem;
            top:11.5rem;
			height:1.5rem;
		}
	}
</style>
