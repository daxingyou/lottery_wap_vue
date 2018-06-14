<template>
  <div class="container" id="contain">
     <div class="title" v-if="isAndroidWebview">
      <i @click="goBack()"></i>
      <span>{{titiles}}</span>
    </div>
    <div class="content" ref="content" :style="{'margin-top':isAndroidWebview ?'1.92rem':'0rem'}">
     	<img :src="imgsrc" alt=""/>
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
        isAndroidWebview: location.href.indexOf('oid') > -1 ? false :  true      
      }
    },
    computed:{
      imgsrc(){
        return `../../../wap/images/agcai/0${this.$route.query.id}.jpg`
      },
      titiles(){
        let titile = {
          1:'诚招代理',
          2:'连赢加奖',
          3:'体育双返水',
          4:'下载注册APP送彩金',
          5:'盈利就分红',
          6:'首存大赠送',
          7:'支付宝赠送',
          8:'返水0.5%',
          9:'感恩回馈',
        };
        return titile[this.$route.query.id]
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
