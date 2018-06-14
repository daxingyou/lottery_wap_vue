<template>
  <div style='height:100%'>
    <dailog-q :gametoken="gametoken" :type_code="activeClassifyId" :game_code=171 :money="money_s" :round="round" :lotteryM="objects" v-if="showDailogQ" v-on:listenToChildEvent="showMsgFromChild"></dailog-q>
    <lotteryHeader :title="title" :game_code=171></lotteryHeader>

    <!-- <div class="game_main"> -->
    <div style='position:absolute;top:0;bottom:2.45rem;    overflow: auto; -webkit-overflow-scrolling: touch;width:100%'>
      <lotteryArea class="game_35" :lotteryObj="body" :fenpan="!!fengpan" :endtime="endtime" :fentime="fentime" v-if="isOk" gameType="35"></lotteryArea>

      <div class="lottery_nav_bar" :style='de==true||loadpage==true?"display:none":"display:block"'>
        <ul>
          <button class="trapezoid color1" v-for="(item,i) in xyftClassify" :class="{active8: activeClassifyId === item.type_code}" @click="changeTab(item,i)">
            <span>{{item.name}}</span>
          </button>
        </ul>
      </div>

      <section :style='de==true||loadpage==true?"display:none":"display:block"' :class='setSectionClass' ref="seller">
        <ul>
          <li v-for="(item,j) in currentGame">
            <span class="colortitle">{{item.name}}</span>
            <ul>
              <li v-for="(ite,i) in item.list" :class="setBtnClass(i)">
                <button class="color4" :class="{active3:ite.isCheck}" @click="isCheck(j,i,ite,item.name)" :disabled="fengpan||round=='loading'">
                  <span>{{ite.name}}</span>
                  <span class="odd">{{(fengpan||round=='loading')?"封盘":ite.odds}}</span>
                </button>
              </li>
            </ul>
          </li>
        </ul>
      </section>
      <Loadpage v-if='loadpage'></Loadpage>
      <luzhu gameCode="171" />

    </div>
    <section class="bet_bar" ref="bet_bar">

      <div>
        <!-- <i class=" iconfont_reset"></i>-->
        <span class="qin" @click="qingkong">重置</span>
      </div>
      <div style='position:relative'>
        <span style="color:#FFFFFF;" v-if="xshuzi>0">{{xshuzi}}</span>
        <span style="background:`url(${getPublicImg('/images/small_m.png')}) no-repeat`;background-size:100% 100%;" v-else="xshuzi=0">{{xshuzi}}</span>
        <div style='position:relative;height:1.4rem'><input style='position:absolute;left:0;padding-left:1.5rem;line-height:1.4rem;' type="number" pattern="\d*" v-model="money_s" placeholder="输入金额" @input="changes_m()" @focus='fours()' @blur='blur()' min="1" />
          <img @click='cleanmoney' v-show="money_s!=null" style="width: 0.8rem;height: 0.8rem;float: right;margin-top: 0.32rem;margin-right: 0.3rem;" :src="$getPublicImg('/images/tzgb.png')" alt="" />
        </div>
      </div>
      <div>
        <button class="gdcolor" :class="{color1:isBlue}" type="button" @click="subMit">确认下注</button>
      </div>
    </section>
    <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:rgba(0,0,0,0.5);opacity:.8;width:100%;height:100%;z-index:6">
      <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
        <mu-circular-progress style="" :size="40" />
      </div>
    </div>
    <div class="fp" v-if="fengpan">
      <!-- <span>封盘</span> -->
    </div>
    <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>

  </div>
</template>
<script>
import { mapGetters, mutations, mapActions } from "vuex";
// import footGuide from '../../components/footer/footGuide'
import lotteryHeader from "../../components/header/lotteryHeader";
import lotteryArea from "../../components/lottery-area";
import dailogQ from "../../components/dailogQ.vue";
import dailogS from "../../components/dailogQ.vue";
import Loadpage from "../../components/Loadpage.vue";
import { xyftClassify } from "@/config/classify.config";
import { parseOddsList, getGamesCache, setGamesCache } from "@/utils";
import api from "@/api";
import promptbox from "../../components/promptbox";
import luzhu from "../../components/luzhu";
export default {
  data() {
    return {
      currentGame: [],
      activeClassifyId: 0,
      xyftClassify,
      roundCha: null,
      xshuzi: 0,

      fentime: 30,
      type_code: 0,
      title: "幸运飞艇",
      promptboxtext: "",
      isBlue: false,

      body: {},

      de: false,
      loading: false,
      // hotmsgs: {},

      isOk: false,
      endtime: null,
      isOpen: true,
      lotteryList: {},
      numberList: [],
      dialog: false,
      codeMessage: "",

      setTime: null,
      fengpan: false,
      object: {},
      objects: [],
      money_s: null,
      round: 0,

      dadiao: "lmp",
      panelShow: false,
      regulation_control: false,
      loadpage: false,
      loadpagebol: false,
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      gametoken: "",
      game_code: 171,
      showDailogQ: false,
      timerOut: null,
      timerInterval: null
    };
  },

  methods: {
    ...mapActions(["GET_LOTTERY_RESULT", "GET_LOTTERY_ODDS"]),
    updateResult(flag = false) {
      this.GET_LOTTERY_RESULT({ gameCode: this.game_code, update: true }).then(
        res => {
          if(!res[0].next){return}; let needRefresh = res[0].next.round - res[0].last.round !== 1;
          if (needRefresh) {
            this.timerOut = setTimeout(() => {
              this.updateResult(true);
            }, 2000);
          }
          this.isOk = true;
          let timeStamp = res[0].next.timestamp;
          this.body = res[0];
          if (!flag) {
            // 避免从接口拿到不准确的开奖时间
            this.endtime = res[0].next.endTime - timeStamp;
          }
          this.fengpan = !!res[0].next.isClose;
          this.round = res[0].next.round;
        }
      );
    },
    cleanmoney() {
      this.money_s = null;
    },
    fours() {
      this.onoff = false;
      if (navigator.userAgent.indexOf("UCBrowser") > -1) {
        setTimeout(() => {
          document.body.scrollTop = document.body.scrollHeight;
        }, 600);
      }
    },
    blur() {
      this.onoff = true;
    },
    showMsgFromChild(data) {
      if (data === true) {
        this.qingkong();
        this.showDailogQ = false;
      }
    },
    changes_m() {
      this.money_s = this.money_s.replace(/[^0-9]/g, "");
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false;
      }
    },
    isEmptyObject(e) {
      for (let t in e) return !1;
      return !0;
    },
    qingkong() {
      this.isBlue = false;
      this.money_s = null;
      this.xshuzi = 0;
      for (let item in this.object) {
        this.object[item].isCheck = false;
      }
      this.object = {};
    },
    subMit() {
      this.objects = [];
      for (let i in this.object) {
        this.objects.push(this.object[i]);
      }
      if (this.objects == 0) {
        this.panelShow = true;
        this.promptboxtext = "请选择投注号码";
        setTimeout(this.isSHowff, 1500);
        return;
      } else if (this.money_s == null || this.money_s < 1) {
        this.panelShow = true;
        this.promptboxtext = "请输入正确金额";
        setTimeout(this.isSHowff, 1500);
        return;
      }
      this.showDailogQ = true;
    },
    isCheck(j, i, item, groupName) {
      let n = `l${j}${i}`;
      item.isCheck = !item.isCheck;
      item.groupName = groupName;
      if (item.isCheck === true) {
        this.object[n] = item;
      } else {
        delete this.object[n];
      }
      if (!this.isEmptyObject(this.object) && this.money_s > 0) {
        this.isBlue = true;
      } else {
        this.isBlue = false;
      }
      let s = 0;
      for (let i in this.object) {
        s++;
      }
      this.xshuzi = s;
    },
    // 获取赔率
    fetchGames(params) {
      this.de = true;
      setTimeout(() => {
        if (!this.loadpagebol) {
          this.de = false;
          this.loadpage = true;
          return;
        }
      }, 10000);
      this.GET_LOTTERY_ODDS({
        game_code: params.game_code,
        type_code: params.type_code
      }).then(res => {
        this.de = false;
        this.loadpagebol = true;
        if (params.type_code === 0 && res.length === 11) {
          this.currentGame = res.splice(0, 1);
        }
        this.currentGame = res;
      });
    },
    isSHowff() {
      this.panelShow = false;
    },
    setBtnClass(index) {
      if (this.activeClassifyId === 1) {
        if (index > 11) {
          return "is-small";
        }
      }
      return "";
    },
    changeTab(item, i) {
      // console.log(item.type_code)
      if (item.type_code !== this.activeClassifyId) {
        console.log(this.activeClassifyId);
        this.activeClassifyId = item.type_code;
        this.fetchGames({
          oid: this.$store.state.userData.sessionId,
          game_code: item.game_code,
          type_code: item.type_code
        });
      }
      this.xshuzi = 0;
      this.object = {};
    }
  },
  computed: {
    // 获取子导航
    setClassify() {
      return global_getBjpkClassify();
    },
    setSectionClass() {
      if (this.activeClassifyId === 1) {
        return "gyh bet";
      }
      return "bet";
    }
  },
  //初始化
  created() {
    // 开奖结果
    this.updateResult();
    // 赔率数据
    this.fetchGames({
      game_code: this.game_code,
      type_code: 0
    });
  },
  mounted() {
    this.timerInterval = setInterval(() => {
      if (this.endtime === 0) {
        // 开始拿开奖结果
        this.updateResult();
      } else {
        if (this.endtime <= 30) {
          // 投注区封盘
          this.fengpan = true;
        }
        this.endtime--;
      }
    }, 1000);
  },
  destroyed() {
    clearTimeout(this.timerOut);
    clearInterval(this.timerInterval);
  },
  components: {
    lotteryArea,
    lotteryHeader,
    dailogQ,
    dailogS,
    Loadpage,
    promptbox,
    luzhu
  }
};
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
button {
  outline: none;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
/* .fade-leave-active in <2.1.8 */
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fp {
  width: 100%;
  height: 40/20rem;
  position: fixed;
  bottom: 0;
  background: rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  color: white;
  font-size: 30/20rem;
  text-shadow: -2px 1px 1px rgba(0, 0, 0, 0.6);
  align-items: center;
  letter-spacing: 15/20rem;
  box-sizing: border-box;
  z-index: 1000;
}

.mu-appbar {
  position: fixed;
  top: 0;
  left: 0;
  background: #146cdc;
  color: #fff;
  height: 44px;
}

.jtcaizg {
  background: #fff;
  clear: both;
  height: auto;
  overflow: hidden;
  padding: 10px;
  margin-top: 44px;
}

.indexkjdt {
  height: auto;
  clear: both;
}
.indexkjdt h3 {
  font-size: 14px;
  height: 29px;
  line-height: 25px;
  margin: 0;
}
.indexkjdt img {
  width: 100%;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
}
.spaninri a {
  float: right;
  color: #fff;
  padding: 0 10px;
  margin-right: 10px;
  font-size: 12px;
  height: 21px;
  line-height: 21px;
  font-weight: 500;
  background: #f00;
  -webkit-border-radius: 18px;
  -moz-border-radius: 18px;
  border-radius: 18px;
}
.indexkjdt p span {
  color: #f00;
}
.indexkjdc {
  display: flex;
  height: 27/20rem;
}
.font_s {
  width: 42/20rem;
}
.indexkjdc .title {
  height: 29/20rem;
}
.indexkjdc i {
  float: right;
}
.indexkjdc i a {
  padding: 2px 6px;
  color: #fff;
  background: #36aafb;
  font-size: 12px;
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  border-radius: 3px;
}
.pcznavc {
  clear: both;
  background: white;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e67074;
  padding: 5/20rem;
}
.pcznavc a {
  padding: 0 11px;
  font-size: 12px;
  background: #fff;
  color: #333;
  -webkit-border-radius: 15px;
  -moz-border-radius: 15px;
  border-radius: 15px;
  border: 1px solid #36aafb;
}
.pcznavc .a {
  background: #36aafb;
  color: #fff;
}
.pcznavc i {
  border-right: 1px solid #e67074;
}
.form {
  display: block;
  margin-top: 0;
}
.font_b {
  width: 52/20rem;
  display: inline-block;
}
.pptitle {
  clear: both;
  font-size: 16px;
  font-weight: 600;
}
.title_b {
  width: 51/20rem;
  display: inline-block;
  color: rgb(54, 170, 251);
}

.form {
  > ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
    background: #fff;
    padding-bottom: 110/20rem;
    text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.4);

    > h3 {
      width: 100%;
      padding: 5/20rem;
      margin-top: 5/20rem;
      margin-bottom: 5/20rem;
      color: #d1506d;
      background: -webkit-linear-gradient(
        right,
        rgba(255, 255, 255, 1) 0%,
        #ffe8e8 100%
      );
      /* Chrome10-25,Safari5.1-6 */
    }
    > li {
      width: 50%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      margin-bottom: 3/20rem;
      input {
        width: 40%;
      }
      > span:nth-of-type(1) {
        width: 22/20rem;
      }
    }
    span {
      font-size: 16/20rem;
      display: inline-block;
    }
  }
}

.odds_class {
  color: #c35f62;
}
.bet_bar {
  width: 100%;
  z-index: 999;
  // position: fixed;
  bottom: 52px;
  display: flex;
  justify-content: space-around;
  height: 55/20rem;
  padding: 9/20rem;
  background: -webkit-linear-gradient(
    top,
    #e67074 0%,
    #e67074 24%,
    #e67074 44%,
    #e67074 100%
  );
  /* Chrome10-25,Safari5.1-6 */
  font-size: 16/20rem;
  input {
    outline: 0;
    background: rgba(255, 255, 255, 0.9);
    border: 0;
    margin-right: 10/20rem;
    line-height: 1.25rem;
    padding: 0;
  }
  button {
    border: 0;
    /* border-radius: 2px;*/
  }
  button:nth-of-type(1) {
    color: white;
    background: #2f64d4;
    margin-right: 7/20rem;
  }
  button:nth-of-type(2) {
    color: white;
    background: #78c401;
  }
  .disable {
    background: #376cd4;
  }
  > div:nth-of-type(3) {
    position: relative;
    font-size: 15/20rem;
    > span {
      font-size: 12/20rem;
      position: absolute;
      top: -11/20rem;
      left: -7/20rem;
      color: #fff;
      width: 20/20rem;
      height: 20/20rem;
      border-radius: 10/20rem;
      background: red;
      box-shadow: 0 2/20rem 1/20rem rgba(0, 0, 0, 0.5);
    }
  }
}
.header_bar {
  z-index: 990;
  background: #146cdc;
  color: #fff;
  font-size: 16/20rem;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5/20rem;
  height: 38/20rem;
  box-shadow: 0 0.06rem 0.6rem rgba(0, 0, 0, 0.3);
  .header_title {
    display: flex;
    align-items: center;
  }
  .back {
    padding: 4/20rem;
  }
}
.jtc_titl {
  display: flex;
  flex-direction: row;
  align-items: center;
  > div:nth-of-type(1) {
    width: 15%;
  }
  > div:nth-of-type(2) {
    > div:nth-of-type(2) {
      font-size: 12/20rem;
    }
  }
  .font_b {
    width: 30/20rem;
  }
  .font_a {
    display: inline-block;
    width: 55/20rem;
  }
}
.indexkjdc {
  margin-top: 5/20rem;
}
.bet {
  /*    margin-bottom: 39/20rem;*/
  background: #dde5ec;
  > ul {
    width: 100%;
    > li {
      width: 20%;
      display: inline-block;
      flex-direction: column;
      align-items: center;
      background: #f6f6f6;
      text-align: center;
      > span {
        display: block;
        background: #666666;
        width: 100%;
        height: 1.5rem;
        line-height: 1.5rem;
        font-size: 12/20rem;
        text-align: center;
        //   border: 1px solid #fff;
        //   background: -webkit-radial-gradient(#555, #2a2926);
        color: #cccccc;
      }
      > ul {
        button {
          outline: 0;
          border: 1/20rem solid #eaeaea; // display: flex;
 // justify-content: space-around;
          // flex-direction: column;
          width: 2.85rem;
          height: 41/20rem;
          padding: 0;
          align-items: center;
          margin-top: 4/20rem;
          position: relative;
          background: #fff;
          border-radius: 3/20rem;
          > span:nth-of-type(2) {
            color: #5084e2;
            font-size: 12/20rem;
            font-family: Arial !important;
            display: block;
            width: 100%;
            height: 40%;
            line-height: 0.9rem;
            //   background:linear-gradient(#eef1f5, #fff);
            //   background: -webkit-linear-gradient(#eef1f5, #fff)
            background: #f2f2f2;
          }
          > span:nth-of-type(1) {
            line-height: 1.5;
            height: 60%;
            display: block;
            font-size: 32/40rem;
            // margin-top:10/20rem;
          }
        }
        > li:nth-last-of-type(1) {
          margin-bottom: 9/20rem;
        }
        .active {
          border: 1/20rem solid #156bda;
          span:nth-of-type(2) {
            background: #3261d8;
            color: #fff;
          }
        }
      }
    }
  }
}
.bet_bar {
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  height: 39/20rem;
  background: white;
  align-items: center;
  padding: 0;
  box-shadow: 0 0.06rem 1rem rgba(0, 0, 0, 0.5);
  > div {
    width: 33.33%;
    text-align: center;
    input {
      width: 86/20rem;
      padding: 0;
      margin: 0; /*height: 30/20rem;
          line-height: 25/20rem;
          border-radius: 3/20rem;
          border: 1/20rem solid #f0f0f0;
          box-shadow: 0 0 5/20rem #eeeeee inset;*/
      /*text-align: center;*/
    }
  }
  > div:nth-of-type(1) {
    width: 130/46.875rem;
    background-color: #eeeeee;
    height: 66/46.875rem;
    line-height: 66/46.875rem;
    border-radius: 10%;
    border: 1px solid #eaeaea;
    box-sizing: border-box;
    text-align: center;
    margin-left: 2%;
  }
  > div:nth-of-type(2) {
    width: 382/46.875rem;
    /* line-height:1rem;*/
    border: 1px solid #dedede;
    border-radius: 5/20rem;
    > span {
      left: 0.2rem;
      top: 0.2rem;
      z-index: 5;
      position: absolute;
      color: #ffffff;
      width: 45/46.875rem;
      height: 45/46.875rem;
      line-height: 1.15rem;
      margin-right: 0.2rem;
      display: inline-block;
      background: url("@{public_img}/images/moneybao.png") no-repeat;
      background-size: 100% 100%;
      font-size: 0.5rem;
    }
    // background-color: red;
    input {
      width: 80%;
      padding: 0rem;
      margin: 0;
    }
  }
  > div:nth-of-type(3) {
    width: 180/46.875rem;
  }
  button {
    display: block;
    width: 100%;
    height: 39/20rem;
    border: 0;
    background: #177bdd;
    padding: 0 !important;
    color: white;
  }
}
.lottery_nav_bar {
  width: 320/20rem;
  z-index: 1;
  ul {
    height: 30/20rem;
    color: white;
    box-sizing: border-box;
    font-size: 0;
    button {
      font-size: 14/20rem;
      width: 25%;
      text-align: center;
      padding: 0;
      z-index: 0;
      background: #1366dc;
      border: 0;
      outline: 0;
      color: white;
      padding: 8/20rem 0;
    }
    .active {
      background: #1f97f6;
    }
  }
}
.gyh {
  > ul {
    > li {
      width: 100%;
      > ul {
        width: 100%;
        > li {
          width: 3.5rem;
          margin: 2/20rem 4/20rem;
          display: inline-block;
          button {
            width: 100%;
            margin-top: 0;
          }
          &.is-small {
            width: 2.75rem;
          }
        }
      }
    }
  }
}
.iconfont_reset {
  width: 1rem;
  height: 1rem;
  display: inline-block;
  vertical-align: middle;
  margin-right: 0.3rem;
  margin-top: -2px;
  background: url("@{public_img}/images/resx.png") no-repeat;
  background-size: 100% 100%;
}
.qin {
  /*margin-left:-8px;*/
}
.lajiton-active {
  color: #36aafb;
}
.regulation {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(7, 17, 27, 0.8);
  z-index: 999;
  top: 0;
  color: white;
  font-size: 12/20rem;
  overflow-y: scroll;
  > div {
    display: flex;
    flex-direction: column;
    width: 100%;
    > div {
      padding-left: 15/20rem;
      padding-right: 15/20rem;
      margin-top: 5/20rem;
      margin-bottom: 5/20rem;
    }
  }
  h5 {
    font-size: 14/20rem;
  }
  .header_regu {
    display: flex;
    justify-content: space-between;
    margin-top: 20/20rem;
    padding-left: 0;
    h5 {
      margin: 0;
    }
    > div:nth-of-type(1) {
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(29/20rem, -9/20rem);
    }
    > div:nth-last-of-type(1) {
      border-bottom: 1/20rem solid white;
      width: 80/20rem;
      transform: translate(-29/20rem, -9/20rem);
    }
  }
  .icon {
    position: absolute;
    right: 4/20rem;
    top: 0;
    font-size: 26/20rem;
  }
}
.game_main {
  height: 568/20rem;
  overflow: scroll;
}
</style>
