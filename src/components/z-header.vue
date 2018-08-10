<template>
  <!--公共头部-->
    <div class="i-header">
        <header class="tohop_head container color1">
        <div class="text-center">
            <a @click="goback" href="javascript:;" >
            <img :src="$getPublicImg('/images/backing_out.png')" />
            </a>
            <div style="display:inline-block" @click="hideDailog" >
                <span v-text="title"></span>
                <i class="small_la"></i>
            </div>
        </div>
        </header>
        <div v-show="isShow" style="display:block;width:100%;" class="header-is-active" @click="hideDailog">
            <div class="header-modal-content">
                <ul>
                    <li v-if="item == title" @click='gotoAddress(index)' v-for="(item,index) in listGame" style="color:red">{{item}}</li>
                     <li v-else  @click='gotoAddress(index)'>{{item}}</li>
                </ul>
                <i class="up"></i>
            </div>
        </div>
    </div>
</template>
<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data(){
        return{
            is_gd_ali: is_gd_ali(),
            isShow:false,
            item:"",
            listGame:{
                'myHistroy':"彩票记录",
                'realHistory':"真人记录",
                'dzHistory':"电子记录",
                'qpHistory':"棋牌记录",
                'sportHistory':"体育记录",
                'fishHistory':"捕鱼记录",
            },
        }
    },
    props: [
      'today',
      'title' //接收一个标题
    ],
    methods: {
      openChessOrNot() {
        // 棋牌的ID为6，检查sort字段里面是否有该ID
        const hasChess = JSON.parse(sessionStorage.gamesort).sort.indexOf('6') > -1
        if (hasChess) {
          this.listGame['qpHistory'] = '棋牌记录'
        }
      },
      goback() {
        this.$store.dispatch('goBack') // 发送后退的状态
        // 后退
        this.$router.go(-1)
      },
       hideDailog(i){
            this.mask = false;
            this.isOpen = false;
            this.isShow = !this.isShow;
            if(this.$refs.headZindex){
                this.$refs.headZindex.style.zIndex = '100'
            }
        },
        gotoAddress(path){
          console.log(path)
            this.$router.push(path)
        }
    },
    created(){

      const fish = JSON.parse(sessionStorage.gamesort).sort.indexOf('5') > -1
      const real = JSON.parse(sessionStorage.gamesort).sort.indexOf('1') > -1
      const sport = JSON.parse(sessionStorage.gamesort).sort.indexOf('4') > -1
      const mg = JSON.parse(sessionStorage.gamesort).sort.indexOf('7') > -1
      const hasChess = JSON.parse(sessionStorage.gamesort).sort.indexOf('6') > -1
      // 推荐位是否存在
      const tfish = JSON.parse(sessionStorage.gamesort).tj_sort.indexOf('5') > -1
      const treal = JSON.parse(sessionStorage.gamesort).tj_sort.indexOf('1') > -1
      const tsport = JSON.parse(sessionStorage.gamesort).tj_sort.indexOf('4') > -1
      const tmg = JSON.parse(sessionStorage.gamesort).tj_sort.indexOf('7') > -1
      const thasChess = JSON.parse(sessionStorage.gamesort).tj_sort.indexOf('6') > -1
      this.openChessOrNot()// 是否要开启棋牌的下注记录
      if(fish == false && tfish == false){
        delete this.listGame.fishHistory;
      }
      if(real == false && treal == false){
        delete this.listGame.realHistory;
      }
      if(sport == false && tsport == false){
        delete this.listGame.sportHistory;
      }
      if(mg == false && tmg == false){
        delete this.listGame.dzHistory;
      }
      if(hasChess == false && thasChess == false){
        delete this.listGame.qpHistory;
      }
      // if(this.is_gd_ali == 'yile'){
      //   this.listGame.dzHistory = '电子记录';
      // }
      // if(this.is_gd_ali == 'fulicai' || this.is_gd_ali == 'ali' || this.is_gd_ali == 'gd'){
      //   // delete this.listGame.sportHistory;
      //   delete this.listGame.realHistory;
      //   delete this.listGame.dzHistory;
      //   delete this.listGame.fishHistory;
      // }
      // if(this.is_gd_ali == 'fulicai'){
      //    delete this.listGame.sportHistory;
      // }
      // if(this.is_gd_ali == 'letian'){
      //    delete this.listGame.dzHistory;
      // }
      if (typeof(location.href.split('?')[1]) != 'undefined')
        { 
            let pa = location.href.split('?')[1].split('=')[1];
        }
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
@import '../assets/less/variable.less';
  header {
    background-color: #196fde;
    height: 2rem;
    text-align: center;
    font-size: 18px;
    position: fixed;
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
    .text-center a{
        display:inline-block;
        height: 30px;
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
  .header-is-active {
    position: fixed;
    background: rgba(0, 0, 0, 0.3);
    z-index: 9999;
    margin: 0 auto;
    display: block;
    height: 100%;
  }
  .header-modal-content {
    display:block;
    background: #fff;
    text-align: center;
    position: relative;
    width: 100%;
    margin-top: 2rem;
    // margin: 30/20rem auto;
    z-index: 101;
    > ul {
      text-align: center;
      display: inline-block;
      width:100%;
      li{
        float:left;
        text-align: center;
        width: 25%;
        font-size: 14/20rem;
        border-bottom: 1px solid #999;
        height:1.7rem !important;
        line-height: 1.7rem !important;
        >a{
            display:inline-block;
            position: relative;
            top: .3rem;
            border-right: 1px solid #eee;
            color:#000;
            width:100%;
        }
      }
    }
    > ul:nth-last-of-type(1) {
      border: 0;
    }

  }
</style>
