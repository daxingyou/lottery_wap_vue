<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
    <z-header title="彩票记录"></z-header>
    <!-- <i-header title="彩票记录"></i-header> -->
    <div class="content">
      <div @click='quanbu' v-if='isWan!="游客"' :class="{active:isShow}">汇总</div>
      <div @click='weijie()' :class="{active:isShow1}">未结注单
        <i v-if="isWan!='游客'">{{numb1}}</i>
      </div>
      <div @click="yijie1()" :class="{active:isShow2}">{{daywen}}</div>
      <div @click="daywino" :class="{xfan:daywin}"></div>
    </div>
    <div class="centermiddle">
      <div class="list3" v-show='isShow4' @click='weijie(item.dateTime)' v-for='item in histroywj'>
        <div>
          <div>
            <span>{{item.dateTime}}</span>
            <span class="more"></span>
          </div>
          <div>
            <span>
              <i>投注单数</i>
              <i>{{item.allNum}}</i>
            </span>
            <span>
              <i style="margin-left: 0.4rem;">下注金额</i>
              <i>{{item.allMoney}}</i>
            </span>
          </div>
          <div>
            <span>
              <i>可赢金额</i>
              <i>{{item.allWinMoney}}</i>
            </span>
            <span>
              <i style="margin-left: 0.4rem;">预计退水：</i>
              <i>{{item.allCut}}</i>
            </span>
          </div>
          <div>
            <span>
              <i>总计：</i>
              <i style="color:red">未结</i>
            </span>
          </div>
        </div>
      </div>
      <div class="list3" v-for="(item,i) in histroy" v-show="isShow4" @click="yijie(item.dateTime)">
        <div>
          <div style="background-color:#666">
            <span>{{item.dateTime}}</span>
            <span class="more"></span>
          </div>
          <div>
            <span>
              <i>投注单数</i>
              <i>{{item.allNum}}</i>
            </span>
            <span>
              <i style="margin-left: 0.4rem;">下注金额</i>
              <i style="margin-left: 0.4rem;">{{item.allTotal}}</i>
            </span>
          </div>
          <div>
            <span>
              <i>可赢金额</i>
              <i>{{item.allWinMoney}}</i>
            </span>
            <span style="color:#ff8e00">
              <i style="margin-left: 0.4rem;">退水</i>
              <i style="margin-left: 0.4rem;">{{item.allCut}}</i>
            </span>
          </div>
          <div>
            <span>
              <i>总计：</i>
              <i style="color:#446fd4;">{{item.allWinMoney}}</i>
            </span>
          </div>
        </div>
      </div>
      <div v-if='kon' style='text-align:center;margin:3rem 0;font-size:0.8rem'>
        你好,今日暂时没有订单，请您投注后查看！
      </div>
      <div class="zhudan zhudan11" v-show='isShow3' v-for="groups in finished" ref="weijies">
        <div>
          <span>注单号：{{groups.no}}</span>
          <span class="">未结</span>
        </div>
        <ul>
          <li class="clearfix">
            <span>{{groups.game_name}}</span>
            <span>第{{groups.round}}期</span>
          </li>
          <li class="clearfix">
            <span>游戏玩法</span>
            <span>{{groups.detail}}</span>
          </li>
          <li class="clearfix">
            <span>下注时间</span>
            <span>{{groups.time}}</span>
          </li>
          <li class="clearfix">
            <span>下注金额</span>
            <span>{{groups.money.toFixed(2)}}</span>
          </li>
          <li class="gexian"></li>

          <li class="clearfix">
            <span>可赢金额</span>
            <span>{{groups.win_money.toFixed(2)}}</span>
          </li>
        </ul>
      </div>
      <div class="zhudan zhudan22" v-show='isShow5' v-for="groups in finished11.length ? finished11 :finished111" ref="yijies">
        <div>
          <span>注单号：{{groups.no}}</span>
          <span class="">已结</span>
        </div>
        <ul>
          <li class="clearfix">
            <span>{{groups.game_name}}</span>
            <span>第{{groups.round}}期</span>
          </li>
          <li class="clearfix">
            <span>游戏玩法</span>
            <span>{{groups.detail}}</span>
          </li>
          <li class="clearfix">
            <span>下注时间</span>
            <span>{{groups.time}}</span>
          </li>
          <li class="clearfix">
            <span>下注金额</span>
            <span>{{groups.money.toFixed(2)}}</span>
          </li>
          <li class="gexian"></li>
          <li class="clearfix">
            <span>输赢结果</span>
            <span style="color:#446fd4;">{{groups.win_money.toFixed(2)}}</span>
          </li>
          <li class="clearfix">
            <span>下注退水</span>
            <span>{{groups.retreat.toFixed(2)}}</span>
          </li>
        </ul>
      </div>
    </div>
    <!--底部选择页-->
    <div id="page">
      <div v-show='pageshow'>
        <ul>
          <li v-for='(item,index) in pagenmblength' @click="pagenumb(index+1)" ref='pagecolor'>第{{index+1}}页
            <img v-show="index+1==pagenum" :src="$getPublicImg('/images/goulszd.png')" /></li>
        </ul>
      </div>
      <div v-show='pagenmb' :style="{'box-shadow':boxshadow}">
        <a @click='lastpage' ref='lastcolor'>上一页</a>
        <a @click='pasgedayshow'>第{{pagenum}}页
          <i></i>
        </a>
        <a @click='nextpage'>下一页</a>
      </div>
    </div>
    <!--输赢结果-->
    <div class='wins' v-show='daywin' @click='daywin=false'>
      <div>
        <a v-for="(item,key) in activedy" @click="yijie('',item)" v-if="key!==daywen">{{key}}</a>

      </div>
    </div>
    <div class="fase" v-show='pageshow'>

    </div>
    <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>

<script>
import zHeader from "../../components/z-header";
// import iHeader from '../../components/i-header'
import promptbox from "../../components/promptbox";
export default {
  data() {
    return {
      activedy: {
        今日已结: 3,
        今日中奖: 1,
        今日未中: 2
      },
      daywin: false,
      moneyb: null,
      moneyf: null,
      histroywj: [],
      str: "",
      daywen: "今日已结",
      datas: ["未结", "已结"],
      boxshadow: "0 0.06rem 0.8rem rgba(0, 0, 0, 0.2)",
      isCheck: false,
      histroy: [],
      isShow: false,
      isShow1: false,
      isShow2: false,
      isShow3: false,
      isShow4: false,
      isShow5: false,
      finished: [],
      kon: false,
      finished11: [],
      finished111: [],
      numb: "",
      numb1: 0,
      panelShow: false,
      promptboxtext: "",
      isWan: "",
      yjts: "",
      zj: "",
      pageNumber: "20",
      pageshow: false,
      pagenum: "1",
      pagenmb: false,
      pagenmblength: "",
      pageday: "",
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false
    };
  },
  props: {
    zMoney: {
      type: Number
    }
  },
  methods: {
    pasgedayshow() {
      this.pageshow = !this.pageshow;
      if (this.pageshow) {
        this.boxshadow = "";
      } else {
        this.boxshadow = "0 0.06rem 0.8rem rgba(0, 0, 0, 0.2)";
      }
    },
    daywino() {
      this.daywin = true;
    },
    weijie(daydate) {
      if (sessionStorage.getItem("win") != "") {
        sessionStorage.setItem("win", "");
      }
      this.daywen = "今日已结";
      let prams = {};
      let oidinfo = sessionStorage.getItem("im_token");
      prams.oid = oidinfo;
      prams.type = 0;
      prams.page = 1;
      prams.number = this.pageNumber;
      let stringTime = daydate;
      let timestamp2 = Date.parse(new Date(stringTime));
      prams.time = timestamp2 / 1000;
      this.pageday = prams.time;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(prams)
        )
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            this.finished = res.data.res;
            this.numb1 = res.data.page.allnmb;
            if (Number(res.data.page.allnmb) > Number(this.pageNumber)) {
              this.pagenmb = true;
              this.pagenmblength = Math.ceil(
                res.data.page.allnmb / this.pageNumber
              );
            } else {
              this.pagenmb = false;
              this.pageshow = false;
            }
            if (this.finished.length >= 1) {
              this.kon = false;
            } else {
              this.kon = true;
            }
          }
        });
      this.isShow3 = true;
      this.isShow1 = true;
      this.isShow = false;
      this.isShow2 = false;
      this.isShow4 = false;
      this.isShow5 = false;
    },
    quanbu() {
      if (sessionStorage.getItem("win") != "") {
        sessionStorage.setItem("win", "");
      }
      this.daywen = "今日已结";
      this.pagenmb = false;
      this.pageshow = false;
      let params = {};
      params.oid = sessionStorage.getItem("im_token");
      this.$http
        .post(`${getUrl()}/getinfo/getSummaryBet`, JSON.stringify(params))
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            this.histroy = res.data.summary.hasClose;
            if (res.data.summary.unSettlement.length > 0) {
              this.histroywj = res.data.summary.unSettlement;
              this.moneyf = Number(
                res.data.summary.unSettlement[0].allWinMoney
              );
              this.moneyb = Number(res.data.summary.unSettlement[0].allMoney);
              this.numb = Number(res.data.summary.unSettlement[0].allNum);
              this.numb1 = Number(res.data.summary.unSettlement[0].allNum);
              this.yjts = Number(res.data.summary.unSettlement[0].allCut);
              this.str = res.data.summary.unSettlement[0].dateTime;
            }
            if (this.numb1 > 0 || this.histroy.length > 0) {
              this.kon = false;
            }
            if (this.numb1 < 1 && this.histroy.length < 1) {
              this.kon = true;
            }
          }
        });
      this.isShow3 = false;
      this.isShow1 = false;
      this.isShow = true;
      this.isShow4 = true;
      this.isShow2 = false;
      this.isShow5 = false;
    },
    yijie1(daydate, wintype) {
      if (sessionStorage.getItem("win") != "") {
        sessionStorage.setItem("win", "");
      }
      if (this.daywen == "今日已结") {
        wintype = 3;
      }
      if (this.daywen == "今日中奖") {
        wintype = 1;
      }
      if (this.daywen == "今日未中") {
        wintype = 2;
      }
      this.finished111 = [];
      let params = {};
      let oidinfo = sessionStorage.getItem("im_token");
      params.oid = oidinfo;
      params.type = 1;
      params.page = 1;
      params.number = this.pageNumber;
      let stringTime = daydate;
      let timestamp2 = Date.parse(new Date(stringTime));
      params.time = timestamp2 / 1000;
      if (wintype == "1") {
        params.win = 1;
        params.time = this.pageday;
        sessionStorage.setItem("win", 1);
      }
      if (wintype == "2") {
        params.win = -1;
        params.time = this.pageday;
        sessionStorage.setItem("win", -1);
      }
      if (wintype == "3") {
        params.time = this.pageday;
      }
      this.pageday = params.time;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(params)
        )
        .then(res => {
          this.daywin = false;
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          }
          this.finished11 = res.data.res;
          if (this.finished11.length >= 20) {
            setTimeout(() => {
              this.$refs.yijies[19].style = "margin-bottom:2rem;";
            }, 10);
          }
          if (Number(res.data.page.allnmb) > Number(this.pageNumber)) {
            this.pagenmb = true;
            this.pagenmblength = Math.ceil(
              res.data.page.allnmb / this.pageNumber
            );
          } else {
            this.pagenmb = false;
            this.pageshow = false;
          }
          if (this.finished11.length == 0) {
            this.kon = true;
          } else {
            this.kon = false;
          }
        });
      this.isShow = false;
      this.isShow2 = true;
      this.isShow4 = false;
      this.isShow1 = false;
      this.isShow3 = false;
      this.isShow5 = true;
    },
    yijie(daydate, wintype) {
      if (sessionStorage.getItem("win") != "") {
        sessionStorage.setItem("win", "");
      }
      this.finished111 = [];
      let params = {};
      let oidinfo = sessionStorage.getItem("im_token");
      params.oid = oidinfo;
      params.type = 1;
      params.page = 1;
      params.number = this.pageNumber;
      let stringTime = daydate;
      let timestamp2 = Date.parse(new Date(stringTime));
      params.time = timestamp2 / 1000;
      if (wintype == "1") {
        params.win = 1;
        params.time = this.pageday;
        sessionStorage.setItem("win", 1);
        this.daywen = "今日中奖";
      }
      if (wintype == "2") {
        params.win = -1;
        params.time = this.pageday;
        sessionStorage.setItem("win", -1);
        this.daywen = "今日未中";
      }
      if (wintype == "3") {
        this.daywen = "今日已结";
        params.time = this.pageday;
      }

      this.pageday = params.time;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(params)
        )
        .then(res => {
          this.daywin = false;
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          }
          this.finished11 = res.data.res;
          if (this.finished11.length > 19) {
            setTimeout(() => {
              this.$refs.yijies[19].style = "margin-bottom:2rem;";
            }, 10);
          }
          if (Number(res.data.page.allnmb) > Number(this.pageNumber)) {
            this.pagenmb = true;
            this.pagenmblength = Math.ceil(
              res.data.page.allnmb / this.pageNumber
            );
          } else {
            this.pagenmb = false;
            this.pageshow = false;
          }
          if (this.finished11.length == 0) {
            this.kon = true;
          } else {
            this.kon = false;
          }
        });
      this.isShow = false;
      this.isShow2 = true;
      this.isShow4 = false;
      this.isShow1 = false;
      this.isShow3 = false;
      this.isShow5 = true;
    },
    //获取当天时间戳
    newday() {
      let mydate = new Date();
      mydate.getFullYear();
      mydate.getMonth() + 1;
      mydate.getDate();
      return (
        mydate.getFullYear() +
        "-" +
        parseInt(mydate.getMonth() + 1) +
        "-" +
        mydate.getDate()
      );
    },
    //取某一页的注单
    pagenumb(index) {
      for (var i = 0; i < this.pagenmblength; i++) {
        this.$refs.pagecolor[i].style = "color:black;";
      }
      this.pagenum = index;
      this.$refs.pagecolor[index - 1].style = "color:#196fde;";
      let prams = {};
      let oidinfo = sessionStorage.getItem("im_token");
      prams.oid = oidinfo;
      if (this.isShow3) {
        prams.type = 0;
      }
      if (this.isShow5) {
        prams.type = 1;
      }
      if (sessionStorage.getItem("win") != "") {
        prams.win = sessionStorage.getItem("win");
      }
      prams.page = index;
      prams.number = this.pageNumber;
      prams.time = this.pageday;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(prams)
        )
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            if (this.isShow3) {
              this.finished = res.data.res;
            }
            if (this.isShow5) {
              this.finished11 = res.data.res;
            }
            this.pageshow = false;
          }
        });
    },
    //上一页
    lastpage() {
      this.pagenum--;
      for (var i = 0; i < this.pagenmblength; i++) {
        this.$refs.pagecolor[i].style = "color:black;";
      }
      if (this.pagenum < 1) {
        this.pagenum = 1;
      }
      if (sessionStorage.getItem("win") != "") {
        prams.win = sessionStorage.getItem("win");
      }
      this.$refs.pagecolor[this.pagenum - 1].style = "color:#196fde;";
      let prams = {};
      let oidinfo = sessionStorage.getItem("im_token");
      prams.oid = oidinfo;
      if (this.isShow3) {
        prams.type = 0;
      }
      if (this.isShow5) {
        prams.type = 1;
      }
      prams.page = this.pagenum;
      prams.number = this.pageNumber;
      prams.time = this.pageday;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(prams)
        )
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            if (this.isShow3) {
              this.finished = res.data.res;
            }
            if (this.isShow5) {
              this.finished11 = res.data.res;
            }
          }
        });
    },
    nextpage() {
      this.pagenum++;
      for (var i = 0; i < this.pagenmblength; i++) {
        this.$refs.pagecolor[i].style = "color:black;";
      }
      if (this.pagenum > this.pagenmblength) {
        this.pagenum = this.pagenmblength;
      }
      if (sessionStorage.getItem("win") != "") {
        prams.win = sessionStorage.getItem("win");
      }
      this.$refs.pagecolor[this.pagenum - 1].style = "color:#196fde;";
      let prams = {};
      let oidinfo = sessionStorage.getItem("im_token");
      prams.oid = oidinfo;
      if (this.isShow3) {
        prams.type = 0;
      }
      if (this.isShow5) {
        prams.type = 1;
      }
      prams.page = this.pagenum;
      prams.number = this.pageNumber;
      prams.time = this.pageday;
      this.$http
        .post(
          `${getUrl()}/getinfo/getMissedOrHasClosedBet`,
          JSON.stringify(prams)
        )
        .then(res => {
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else {
            if (this.isShow3) {
              this.finished = res.data.res;
            }
            if (this.isShow5) {
              this.finished11 = res.data.res;
            }
          }
        });
    }
  },
  created() {
    if (this.isQP) {
      this.Withdraw = "AG提现";
      this.Recharge = "AG充值";
      this.transactionRecord = "AG交易记录";
      let params = {};
      params.oid = sessionStorage.getItem("im_token");
      this.$http
        .post(`${getUrl()}/aginfo/getAgInfo`, JSON.stringify(params))
        .then(res => {
          this.successshow = false;
          if (res.data.msg == "4003") {
            this.$router.push({
              path: "/weihu"
            });
          }
          this.showCurtion = false;
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          } else if (res.data.msg == 2006) {
            if (res.data.balance.agBalance < 0) {
              that.title = "AG余额不足";
              that.panelShow = true;
              setTimeout(() => {
                this.panelShow = false;
                this.$router.push("/index");
              }, 1200);
            }
            this.gameUsermoney = Number(res.data.balance.agBalance).toFixed(2);
            this.resDate.money = Number(res.data.balance.agBalance).toFixed(2);
          } else if (res.data.msg == 7001) {
            this.erreocode = "7001";
            this.panelShow = true;
            this.promptsystem = res.data.info;
          } else {
            this.promptboxtext = "获取真人游戏额度失败";
            this.panelShow = true;
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push("/index");
            }, 1200);
          }
        });
    }
    this.newday();
    let d = new Date();
    this.str = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
    this.isShow3 = false;
    this.isShow1 = false;
    this.isShow = true;
    this.isShow4 = true;
    let params = {};
    params.oid = sessionStorage.getItem("im_token");
    this.isWan = sessionStorage.getItem("im_username");
    if (this.isWan != "游客") {
      this.quanbu();
    } else {
      this.isShow4 = false;
      this.isShow1 = true;
      this.isShow3 = true;
      let prams = {};
      let oidinfo = sessionStorage.getItem("im_token");
      prams.oid = oidinfo;
      this.$http
        .post(`${getUrl()}/getinfo/bet`, JSON.stringify(prams))
        .then(res => {
          console.log(res);
          if (res.data.msg == 4001) {
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: "/login"
              });
            }, 1000);
          }
          this.finished = res.data[0].res;
          if (this.finished.length == 0) {
            this.kon = true;
          } else {
            this.kon = false;
          }
        });
    }
  },
  components: {
    zHeader,
    // iHeader,
    promptbox
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
.z-header {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
}
.content {
  width: 100%;
  border-bottom: 1px solid #cccccc;
  height: 90/46.875rem;
  background: #fff;
  position: fixed;
  left: 0;
  top: 2rem;
  > div {
    float: left;
    line-height: 90/46.875rem;
    width: auto;
    text-align: center;
    font-size: 32/46.875rem;
    color: #7c7c7c;
    margin: 0 0.3rem;
  }
  > div:nth-child(2) {
    position: relative;
    > i {
      position: absolute;
      font-size: 24/46.875rem;
      width: 40/46.875rem;
      height: 40/46.875rem;
      line-height: 40/46.875rem;
      background: red;
      color: #fff;
      border-radius: 50%;
      right: -0.7rem;
      top: 0.05rem;
    }
  }
  > div:nth-child(4) {
    width: 0;
    height: 0;
    border-color: #7c7c7c #fff #fff #fff;
    border-style: solid solid solid solid;
    border-width: 0.3rem 0.2rem;
    margin-top: 0.8rem;
    margin-left: -0.1rem;
  }
  .xfan {
    transform: rotate(180deg);
    margin-top: 0.5rem !important;
  }
  .active {
    color: #373737;
    border-bottom: 2px solid #146cdc;
  }
}
.centermiddle {
  /*position: fixed;
	left: 0;
	width: 100%;
	top: 4rem;
	overflow: hidden;
	overflow: auto;*/
  margin-top: 4rem;
  margin-bottom: 2rem;
}
.list3 {
  margin-bottom: 0.5rem;
  > div {
    > div {
      height: 60/46.875rem;
      padding: 0 20/40rem;
      line-height: 60/46.875rem;
      background: #fff;
      border-bottom: 1px solid #e3e3e3;
      > span {
        float: left;
        width: 50%;
        > i:nth-child(1) {
          color: #989898;
        }
        > i:nth-child(2) {
          color: #363636;
        }
      }
      > span:nth-child(1) {
        float: left;
        width: 50%;
        border-right: 1px solid #e3e3e3;
        > i:nth-child(1) {
          color: #989898;
        }
        > i:nth-child(2) {
          color: #363636;
        }
      }
      > span:nth-child(2) {
        float: right;
      }
    }
    > div:nth-child(1) {
      width: 100%;
      background: #ff9201;
      > span:nth-child(1) {
        color: #fff;
        border: none;
      }
      > span:nth-child(2) {
        width: 40/46.475rem;
        height: 40/46.475rem;
        background: url("@{public_img}/images/more002.png") no-repeat;
        background-size: 100% 100%;
        float: right;
        margin-top: 8/40rem;
      }
    }
  }
}

.clearfix:after {
  display: block;
  content: "";
  clear: both;
}

.zhudan {
  > div {
    width: 100%;
    background: #ff9201;
    height: 60/46.875rem;
    padding: 0 20/40rem;
    line-height: 60/46.875rem;
    margin-top: 20/40rem;
    > span:nth-child(1) {
      color: #fff;
    }
    > span:nth-child(2) {
      background-size: 100% 100%;
      float: right;
      color: #fff;
    }
  }
  > ul {
    padding: 0 20/40rem;
    background: #fff;
    color: #666;
    li {
      // height: 60/40rem;
      line-height: 60/40rem;
      > span {
        float: left;
      }
      > span:nth-child(1) {
        width: 25%;
      }
      > span:nth-child(2) {
        text-align: right;
        width: 75%;
        float: right;
      }
    }
    > .gexian {
      height: 1px;
      width: 100%;
      background-color: #c0c0c0;
      /* padding: 0; */
    }
  }
}

.zhudan22 {
  > div {
    background: #666;
  }
}

#page {
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0;
  background: white;
  opacity: 0.95;
  z-index: 10;
  div:nth-child(1) {
    width: 100%;
    max-height: 320/46.875rem;
    overflow: auto;
    ul {
      width: 100%;
      li {
        width: 100%;
        height: 80/46.875rem;
        border-bottom: 1px solid #eee;
        text-align: center;
        line-height: 80/46.875rem;
        position: relative;
        img {
          position: absolute;
          width: 37/46.875rem;
          height: 30/46.875rem;
          top: 0.45rem;
          margin-left: 0.3rem;
        }
      }
      li:nth-child(1) {
        color: #2f64d4;
      }
    }
  }
  div:nth-child(2) {
    width: 100%;
    height: 100/46.875rem;
    line-height: 100/46.875rem;
    text-align: center;

    a {
      display: inline-block;
      width: 33%;
      height: 100%;
      text-align: center;
      float: left;
      position: relative;
      color: #000000;
    }
    i {
      width: 0;
      height: 0;
      border-color: #fff #fff #2f64d4 #fff;
      border-style: solid solid solid solid;
      border-width: 0.3rem;
      position: absolute;
      right: 0.75rem;
      top: 0.6rem;
    }
  }
}
.wins {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.2);
  div {
    width: 200/46.875rem;
    height: 184/46.875rem;
    background: #414141;
    opacity: 0.95;
    position: absolute;
    border-radius: 7/46.875rem;
    left: 240/46.875rem;
    top: 170/46.875rem;
    a {
      display: inline-block;
      width: 80%;
      height: 92/46.875rem;
      text-align: center;
      line-height: 92/46.875rem;
      font-size: 28/46.875rem;
      color: white;
      margin: 0 10%;
    }
    a:nth-child(1) {
      border-bottom: 1px solid #aaaaaa;
    }
  }
}
.fase {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.6);
  height: 100%;
  z-index: 5;
}
</style>
