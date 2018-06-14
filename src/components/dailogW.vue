<template>
  <div class="">

    <div class="is-active-lm" v-if="!panelShow">

      <div class="modal-content-lm" v-show="loading">
        <div class="title">投注明细</div>
        <div class="type_name">
          {{groupName}}
        </div>
        <div class="bet_name">
          {{xuanxiang}}
        </div>
        <div class="total">
          <div>
            <span>组数</span>
            <span class="color_money" style="color: #0a44e1;">{{lengthss}}组</span>
          </div>
          <div>
            <span>总计</span>
            <span class="color_money" style="color: #0a44e1;">{{zonghe}}元</span>
          </div>
        </div>
        <footer class="color1">
          <span @click="xiazhu">确认</span>
          <span @click="hideDailog">取消</span>
        </footer>
      </div>
    </div>
    <div class="loading" v-show="!loading && !panelShow">
      <div class="loader-inner line-spin-fade-loader">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <promptbox @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
import promptbox from "../components/promptbox";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      xuanxiang: "",
      lengthss: 1,
      lotteryS: [],
      lengths: 0,
      zonghe: 0,
      odd: {
        number: ""
      },
      title: "",
      loading: true,
      panelShow: false,
      groupName: "",
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      promptsystem: ""
    };
  },
  props: {
    lotteryM: {
      type: Array
    },
    money: {
      type: String
    },
    round: {
      type: String
    },
    game_code: {
      type: Number
    },
    type_code: {
      type: Number
    },
    indeT: {
      type: Number
    },
    gametoken: {
      type: String
    }
  },
  created() {
    this.lotteryS = this.lotteryM;
    for (let i = 0; i < this.lotteryS.length; i++) {
      let s = `${this.lotteryS[i].name},`;
      let z = this.lotteryS[i].key;
      let q = z.substr(3);
      let w = `${q},`;
      this.xuanxiang = this.xuanxiang + s;
      this.odd.number = this.odd.number + w;
      this.groupName = this.lotteryS[i].groupName;
      this.lengths++;
    }
    this.xuanxiang = this.xuanxiang.substr(0, this.xuanxiang.length - 1);
    this.odd.number = this.odd.number.substr(0, this.odd.number.length - 1);
    if (this.type_code >= 27) {
      this.lengthss = this.kadun(this.lotteryS.length, this.indeT);
      this.zonghe = this.lengthss * this.money;
    } else {
      this.lengthss = 1;
      this.zonghe = this.money * 1;
    }
  },
  methods: {
    ...mapActions(["ZODIAC_BETTING"]),
    sendParent() {
      this.$emit("listenToChildEvent", true);
    },
    kadun(m, s) {
      function factorial(n) {
        return n <= 1 ? 1 : n * factorial(n - 1);
      }
      return factorial(m) / factorial(m - s) / factorial(s);
    },
    xiazhu() {
      this.sendParent();
      this.loading = false;
      let { game_code, round, type_code, typecode } = this;
      this.ZODIAC_BETTING({
        game_code,
        round,
        type_code,
        typecode,
        betmoney: this.money,
        number: this.odd.number
      }).then(res => {
        this.sendParent()
      });
    },
    hideDailog() {
      this.$store.dispatch("hideDailogW");
    }
  },
  components: {
    promptbox
  }
};
</script>
<style lang='less' rel="stylesheet/less">
@import url(../icon/iconfont.css);
@import "../assets/less/variable.less";
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.icon-ok {
  display: none;
}

.is-active-lm {
  position: fixed;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content-lm {
  font-family: "黑体";
  width: 530/45rem;

  border-radius: 20/45rem;

  background: #fff;

  text-align: center;
  font-size: 32/45rem;
  .title {
    height: 72/45rem;
    line-height: 72/45rem;
    font-size: 34/45rem;
    font-weight: bold;
    border-bottom: 1/20rem solid #f1f1f1;
  }
  ul {
    max-height: 50vh;
    overflow: auto;
  }
  ul li {
    padding-left: 20/45rem;
    padding-right: 20/45rem;
    text-align: left;
    width: 100%;
    display: flex;
    position: relative;
    height: 72/45rem;
    line-height: 72/45rem;
    border-top: 2px solid #f1f1f1;
    div {
      border-left: 2px solid #f1f1f1;
      display: flex;
      text-align: left;
      span {
        font-family: arial;
      }
      span:nth-child(2) {
        width: 65/45rem;
        float: right;
        margin-right: 20/45rem;
      }
      .monry {
        padding: 0;
        width: 100%;
        text-align: center;
      }
      span:nth-child(1) {
        float: left;
        letter-spacing: 1px;
        /*padding-left: 20/45rem;*/
      }
    }
    div:nth-of-type(1) {
      width: 70%;
    }
    div:nth-of-type(2) {
      width: 30%;
    }
    i {
      position: absolute;
      top: 19/45rem;
      right: 10/45rem;
      width: 30/45rem;
      height: 30/45rem;
      border-radius: 10/45rem;
      background: url("@{public_img}/images/ll.png") no-repeat;
      background-size: 100% 100%;
    }
    div:nth-child(1) {
      border: none;
    }
  }
  .total {
    border-top: 2px solid #f1f1f1;
    height: 76/45rem;
    line-height: 76/45rem;
    display: flex;
    div {
      width: 50%;
      word-spacing: 7/45rem;
      span {
        width: 30%;
      }
      span:nth-child(2) {
        font-family: arial;
      }
    }
  }
  footer {
    height: 70/45rem;
    background: #1366dc;
    display: flex;
    border-radius: 0 0 10/45rem 20/45rem;
    span {
      line-height: 70/45rem;
      color: #fff;
      width: 265/45rem;
      box-sizing: border-box;
    }
    span:nth-child(1) {
      border-right: 2px solid #fff;
    }
    span:nth-child(2) {
    }
  }

  .type_name {
    border-bottom: 1/20rem solid #f1f1f1;
    height: 31/20rem;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16/20rem;
  }

  .bet_name {
    padding: 4/20rem;
    color: black;
    font-size: 16/20rem;
    word-wrap: break-word;
  }
}

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  color: white !important;
  padding-top: 40%;

  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }

    100% {
      opacity: 1;
    }
  }

  .line-spin-fade-loader {
    text-align: center;
    position: relative;
    width: 100/20rem;
    height: 100/20rem;
    transform: translateX(50px) translateY(50px);
    margin-left: auto;
    margin-right: auto;
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(5) {
    top: -20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  }

  .line-spin-fade-loader > div {
    background-color: #fff;
    border-radius: 2px;
    margin: 2px;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
    position: absolute;
    width: 5/20rem;
    height: 15/20rem;
  }
}
</style>
