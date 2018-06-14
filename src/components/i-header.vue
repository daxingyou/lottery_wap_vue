<template>
  <!--公共头部-->
  <div class="i-header">
    <header class="tohop_head container color1" style="position:fixed">
      <div class="text-center">
        <a @click="goback" href="javascript:;" >
          <img :src="$getPublicImg('/images/backing_out.png')"/>
        </a>
        <span v-text="title"></span>
      </div>
    </header>
    <div style="height:2rem"></div>
  </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    props: [
      'today',
      'title' //接收一个标题
    ],
    methods: {
      goback() {
        this.$router.go(-1)
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
    width:100%;
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
      left:1rem;
    }
  }
  .small_la{
    width: 0.6rem;
    display: inline-block;
    height: 0.4rem;
    background: url('@{public_img}/images/small_la.png') no-repeat;
    background-size: 100% 100%;
  }
  .tohop_head{
    z-index: 10;
  }
</style>
