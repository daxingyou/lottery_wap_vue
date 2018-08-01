<template>
  <div>
    <div class="title color1">
		  <i @click="goBack()"></i>
		  <span>捕鱼游戏</span>
		</div>
    <div style="height:45px;"></div>
    <div class="fish_box" :style="{height:$window.innerHeight-45+'px'}">
        <div class="fish_top">
          <div>
            <div>
              捕鱼余额:
              <span style="color:#507BD9">
                {{fishBalance}}
              </span>
            </div>
            <div>
              彩票余额:
              <span style="color:#507BD9">

              </span>
            </div>
          </div>

          <div style="padding:10px;justify-content:space-around">
            <div class="fish_btn fish_transfer" @click="edzhag">
              额度转换
            </div>
            <div class="fish_btn fish_bet">
              下注记录
            </div>
            <div class="fish_btn fish_transaction">
              交易记录
            </div>
          </div>
        </div>

        <div class="fish_play">
          <div class="start-to-play">
            <img src="../../../wap/images/zhenWan1.png"/>
          </div>
          <div class="try-to-play">
            <img :src="`../../../wap/images/isWan.png`"/>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      isEdzh:false,
      fishBalance:''
    }
  },
  created(){
    this.getFishBalance()
  },
  methods:{
     getFishBalance() {
      let oid_info = sessionStorage.getItem("im_token");
      let params = {};
      params.oid = oid_info;
      //获取捕鱼游戏额度
      this.$http.post("/aginfo/getAgInfo", JSON.stringify(params)).then(res => {
        if (res.status === 200) {
          if (res.data.msg === 2006) {
            this.fishBalance = res.data.balance.fishBalance.toFixed(2)||'0.00';
            sessionStorage.setItem("im_money", res.data.balance.userBalance);
          }
        }
      });
    },
    edzhag(){
      this.isEdzh=true
    }
  }
};
</script>

<style  lang='less' scoped>
@import "../../assets/less/variable.less";
@zoom: 46.875rem;
.title {
  width: 100%;
  height: 90/46.875rem;
  background: #196fde;
  line-height: 90/46.875rem;
  text-align: center;
  z-index: 4;
  /*position: fixed;*/
  left: 0;
  top: 0;
  > i {
    display: block;
    width: 0.7rem;
    height: 0.9rem;
    background: url("@{public_img}/images/backing_out.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  > span {
    color: #ffffff;
    font-size: 0.8rem;
  }
}
.fish_box{
  background-image: url('../../../wap/images/fish/fish_bg.jpg');
  background-size: cover;
  background-position: center center;
  position: relative;
}

.fish_top{
  background-color:rgba(255,255,255,.8);
  font-size: 15px;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 108px;
}

.fish_top>div:first-child{
  line-height: 45px;
  border-bottom: 1px solid #ddd;
  padding: 0 15px;
}

.fish_top>div{
  display: flex;
  justify-content: space-between;
}

.fish_play{
  position: absolute;
  bottom:40px;
  width: 100%;
  display: flex;
  justify-content: space-around
}

.fish_play img{
  width: 100%;
}

.start-to-play{
  width: 180px
}

.try-to-play{
  width: 115px;
}

.fish_btn{
  width: 30%;
  height: 42px;
  border-radius:5px;
  color: white;
  text-align: center;
  line-height: 42px;
}

.fish_transfer{
  background-color: #2e65d4;
}

.fish_bet{
  background-color: #e74d62;
}

.fish_transaction{
  background-color: #e8a14c;
}

</style>
