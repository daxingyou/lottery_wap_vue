<template>
  <!--公共底部组件-->
  <div>
    <!--底部-->
    <div class="pf footr_box">
      <section @click='gotoAddress("/index")'>
        <span><img :src="$route.path.indexOf('index') !== -1 ? '../../../wap/images/first.png':'../../../wap/images/first.png'" ></span>
        <span :class="{activeCol:$route.path.indexOf('index') !== -1 ? true : false}">
          <img :src="$getPublicImg('/images/main.png')"  alt="">
        </span>
      </section>
      <section @click='gotoAddress("/game_55")'>
        <span><img :src="$route.path.indexOf('shop') !== -1 ? '../../../wap/images/game.png': '../../../wap/images/game.png'"></span>
        <span :class='{activeCol:$route.path.indexOf("shop") !== -1 ? true : false}'>
          <img :src="$getPublicImg('/images/games.png')" alt="" >
        </span>
      </section>
      <section @click='gotoAddress("/order:0")'>
        <span><img :src="$route.path.indexOf('order') !== -1 ? '../../../wap/images/money.png': '../../../wap/images/money.png'"></span>
        <span :class='{activeCol:$route.path.indexOf("order") !== -1 ? true : false}'>
         <img :src="$getPublicImg('/images/mone.png')" alt="" >
        </span>
      </section>
      <section @click='gotoAddress("/my")'>
        <span><img :src="$route.path.indexOf('my') !== -1 ? '../../../wap/images/mine.png': '../../../wap/images/mine.png'"></span>
        <span :class='{activeCol:$route.path.indexOf("my") !== -1 ? true : false}'>
          <img :src="$getPublicImg('/images/my.png')" alt="" >
        </span>
      </section>
    </div>
  </div>
</template>


<script>

  export default {
    methods: {
      gotoAddress(path) {
        this.$router.push(path)
      }
    }
  }

</script>

<style lang='less' rel='stylesheet/less' scoped>
@import '../../assets/less/variable.less';
  /*底部样式*/

  .footr_box {
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    text-align: center;
    background: #fff;
    z-index: 100;
    display: flex;
    box-shadow: 0 0.06rem 0.5rem rgba(0, 0, 0, .2);
    section {
      flex: 1;
      flex-direction: column;
      display: flex;
      height:50/20rem;
      align-items: center;
      text-align: center;
      padding-top: 1px;
      >span:first-child {
        display: block;
        width: 26/20rem;
        margin-top:3/20rem;
      }

      img {
        width: 100%;
      }
    }

    section:nth-of-type(2){
      > span:nth-child(2){
        >img{
          margin-top:-2px;
          width: 42/20rem;
        }
      }
    }

    section:nth-of-type(3){
      > span:nth-child(2){
        >img{
          margin-top:-2px;
          width: 42/20rem;
        }
      }
    }

    section{
      > span:nth-child(2){
        >img{
          margin-top:-4px;
          width: 22/20rem;
        }
      }
    }
  }
</style>



