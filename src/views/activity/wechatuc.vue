<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if="!isAndroidWebview">
      <i @click="goBack()"></i>微信扫码，转发有礼
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
     <img src="../../../wap/images/uc/wechaatuc.jpg" alt="" />
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity2',
    mounted(){
    },
    data(){
      return {
        isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
        isIosWebview: isIosWebview,
        is_gd_ali: is_gd_ali(),
        titletxt:''
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    },
   
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
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
  }

  .title i {
    display: inline-block;
    width: 40/46.875rem;
	  height: 40/46.875rem;
    background: url('@{public_img}/images/backing_out.png') no-repeat center center;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  .content img{
  	width: 100%;
  	height: 100%;
  }

  p {
    font-size: 14/46.875rem;;
  }
</style>
