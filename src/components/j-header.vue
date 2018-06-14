<template>
  <!--公共头部-->
  <div class="i-header">
    <header class="tohop_head container color1">
      <div class="text-center">
        <a @click="gotoIndex" href="javascript:;" >
          <img :src="$getPublicImg('/images/backing_out.png')"/>
        </a>
        <span v-text="title"></span>
      </div>
    </header>
  </div>
</template>
<script>
  export default {
    props: [
      'title' //接收一个标题
    ],
    methods: {
      gotoIndex(){
        this.$router.push({
          path:'/index'
        })
      }
    }
  }
</script>

<style lang='less' rel="stylesheet/less">
@import '../assets/less/variable.less';
  header {
    background-color: #196fde;
    height: 2rem;
    text-align: center;
    font-size: 18px;
    .text-center {
      height: 100%;
      color: #fff;
      span:last-child {
         line-height: 47px;
      }
      .arrows {
        margin-top: 14px;
        vertical-align: middle;
      }
    }
    .text-center a img{
      width:0.5rem;
      height:0.8rem;
      position:absolute;
      top: 0.6rem;
      left:0.6rem;
    }
  }
</style>
