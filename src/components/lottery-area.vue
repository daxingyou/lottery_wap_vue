<template>
  <section class="information" :style="{marginTop: isIosWebview ? '2.9rem' : '1.9rem'}">
    <p v-show="zhe" class="masker_al"></p>
    <iframe id="kj" :src="url" v-if="kjsp" scrolling="no" frameborder="0"style="width:16rem; height:11rem; -webkit-text-size-adjust:none!important;">暂无开奖视频
    </iframe>
    <span v-show="clo" class="clos" @click="clos"><img src="/wap/images/clos.png" alt=""></span>
    <div id="top_sp" class="lottery-rs-remain" style="position:relative">
      <div>
        <div>{{lotteryObj.next.round ? `${lotteryObj.next.round}期` : `已封盘`}}</div>
        <div>
          <span>余额:</span>
          <span class="balance color_money1">{{Number(zMoney).toFixed(2)}}</span>
        </div>
      </div>
      <div v-if="game_code == 69" style="width:100%;padding-right:5px">
        <div ref="xgcendtime" :style="{'fontSize':bigger}" style="margin-top: 0.1rem;text-align:right">
          
          <span style="margin-left: 0.1rem;">开奖时间:</span>
          <!-- <span>{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span> -->
          <span v-if="this.gameType=='20'" style="display:none">{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span>
          <span v-if="this.gameType=='20'">{{timetrans(lotteryObj.next.endtime)}}</span>
          <span v-if="this.gameType !=='20'">{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span>
        </div>
        <div class="lottery_play_area">
          <span  @click="shipin">
            <img class="img_icon" style="" v-show="url!==''" src="/wap/images/online.jpg" alt="">
            <span v-show="url!==''" style="color:#e1760e;position:relative;top:.3rem;">开奖直播</span>
          </span>
          <div>
            <i style="font-size: 1.4rem; line-height: 1.2rem;margin-right: 0.25rem;color: #333;margin-top: 0.05rem;">封</i>
            <span v-show="h>0">
              <span style="float: left;">{{lotteryObj.next.round&&!fenpan ? `${h}` : `00`}}</span>
              <i>:</i>
            </span>
            <span>{{lotteryObj.next.round&&!fenpan ? `${m}` : `00`}}</span>
            <i>:</i>
            <span>{{lotteryObj.next.round&&!fenpan ? `${s}` : `00`}}</span>
          </div>
        </div>
      </div>
      <div v-else>
        <div ref="xgcendtime" :style="{'fontSize':bigger}" style="margin-top: 0.1rem;text-align:right">
          <span style="margin-left: 0.1rem;">开奖时间:</span>
          <!-- <span>{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span> -->
          <span v-if="this.gameType=='20'" style="display:none">{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span>
          <span v-if="this.gameType=='20'">{{timetrans(lotteryObj.next.endtime)}}</span>
          <span v-if="this.gameType !=='20'">{{lotteryObj.next.round ? `${myfilter(endtime, endtime - fentime)}` : `00:00`}}</span>
        </div>
        <div class="lottery_play_area">
          <span @click="shipin" >
            <img class="img_ico" v-show="url!==''" src="/wap/images/online.jpg" alt="">
            <span v-show="url!==''" style="color:#e1760e;position:relative;top:.3rem;">开奖直播</span>
          </span>
          <div style="position:relative;">
            <i style="font-size: 1.4rem; line-height: 1.2rem;margin-right: 0.25rem;color: #333;margin-top: 0.05rem;">封</i>
            <span v-show="h>0">
              <span style="float: left;">{{lotteryObj.next.round&&!fenpan ? `${h}` : `00`}}</span>
              <i>:</i>
            </span>
            <span>{{lotteryObj.next.round&&!fenpan ? `${m}` : `00`}}</span>
            <i>:</i>
            <span>{{lotteryObj.next.round&&!fenpan ? `${s}` : `00`}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="lottery-rs-bolls">
      <div class="lottory_time" >
        <span>{{lotteryObj.last.round}}期</span>
      </div>
      <div class="lotteryOpen" @click='gotoAddress("/trend:"+game_code)'>
        <ul>
          <template v-if="game_code==180">
              <li v-for="(v,i) in lotteryObj.last.number" class="boll-item-180" :class="v <= 40 ? 'icon-gray-f-ball' : 'icon-blue-f-ball'">{{jsks?'':v}}</li>
          </template>
          <li v-if="game_code == 270 || game_code == 69" v-for="(v,i) in lotteryObj.last.number" class="boll-item"  :class="`color_${v}`" style="color:#000">{{jsks?'':v}}</li>
          <li v-if="game_code !== 270 && game_code !== 69 && game_code !== 180" v-for="(v,i) in lotteryObj.last.number" class="boll-item"  :class="`color_${v}`">{{jsks?'':v}}</li>
        </ul>
      </div>
    </div>
    <div class="lottery-rs-pertis">
      <!--北京PK10-->
      <div class="sxh bjpksxh" v-show="bjpk==true">
        <ul>
          <li style="background-color: #eaeaea;">冠亚和</li>
          <li>{{pkygh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">1-5球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
          <li>{{pkfive}}</li>
        </ul>
      </div>
      <!--重庆时时彩-->
      <div class="sxh cqsscsxh" v-show="cqssc==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">龙虎</li>
          <li>{{lh}}</li>
        </ul>
      </div>
      <!--广东快乐十分-->
      <div class="sxh gdklsfsxh" v-show="gdklsf==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;width: 15%;">尾大小</li>
          <li>{{wdx}}</li>
          <li style="background-color: #eaeaea;">1-4球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
        </ul>
      </div>
      <!--重庆幸运农场-->
      <div class="sxh cqxynsxh" v-show="cqxync==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{kjzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;width: 15%;">尾大小</li>
          <li>{{wdx}}</li>
          <li style="background-color: #eaeaea;">1-4球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
        </ul>
      </div>
      <!--PC蛋蛋-->
      <div class="sxh pcddsxh" v-show="pcdd==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{pcddzh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
        </ul>
      </div>
      <!--幸运飞艇-->
      <div class="sxh xyftsxh" v-show="xyft==true">
        <ul>
          <li style="background-color: #eaeaea;">冠亚和</li>
          <li>{{pkygh}}</li>
          <li>{{pkyhgdx}}</li>
          <li>{{pkyghds}}</li>
          <li style="background-color: #eaeaea;">1-5球</li>
          <li>{{pkone}}</li>
          <li>{{pktwo}}</li>
          <li>{{pkthree}}</li>
          <li>{{pkfour}}</li>
          <li>{{pkfive}}</li>
        </ul>
      </div>
      <!--香港彩-->
      <div class="sxh xgcsxh" v-show="xglhc==true">
        <ul>
          <li style="background-color: #eaeaea;">总分</li>
          <li>{{kjzh}}</li>
          <li style="background-color: #eaeaea;">生肖</li>
          <li>{{xgcone}}</li>
          <li>{{xgctwo}}</li>
          <li>{{xgcthree}}</li>
          <li>{{xgcfour}}</li>
          <li>{{xgcfive}}</li>
          <li>{{xgcsix}}</li>
          <li>{{xgcseven}}</li>
        </ul>
      </div>
      <!--江苏骰宝（快3）-->
      <div class="sxh jskssxh" v-show="jsks==true">
        <ul>
          <li style="background-color: #eaeaea;">总和</li>
          <li>{{jskszh}}</li>
          <li>{{jsds}}</li>
          <li>{{jsdx}}</li>
          <li style="background-color: #eaeaea;width: 15%;">鱼虾蟹</li>
          <li>{{jsksyxeone}}</li>
          <li>{{jsksyxetwo}}</li>
          <li>{{jsksyxethreee}}</li>
        </ul>
      </div>
    </div>
    <div class="music">
    </div>
  </section>
</template>
<script>
import { Howl } from "howler";
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      h: 0,
      m: 0,
      s: 0,
      lastRound: 0,
      yMoney: 0,
      bjpk: false,
      cqssc: false,
      xyft: false,
      jsks: false,
      gdklsf: false,
      cqxync: false,
      xglhc: false,
      pcdd: false,
      bigger: "0.6rem",
      xgcmager: "2rem",
      jsksyxeone: "",
      jsksyxetwo: "",
      jsksyxethreee: "",
      pkygh: "",
      pkyhgdx: "",
      pkyghds: "",
      pkone: "",
      pktwo: "",
      jsy: "",
      jsx: "",
      jsxie: "",
      pkthree: "",
      pkfour: "",
      pkfive: "",
      kjzh: "",
      lh: "",
      wdx: "",
      jsds: "",
      jsdx: "",
      pcddzh: "",
      jskszh: "",
      pcddone: "",
      pcddtwo: "",
      pcddthree: "",
      xgcone: "",
      xgctwo: "",
      xgcthree: "",
      xgcfour: "",
      xgcfive: "",
      xgcsix: "",
      xgcseven: "",
      game_code: "",
      url: "",
      kjsp: false,
      clo: false,
      zhe: false
    };
  },
  props: {
    gameCode: {
      type: Number,
      default: ""
    },
    lotteryObj: {
      type: Object
    },
    endtime: {
      type: Number
    },
    fentime: {
      type: Number
    },
    zMoney: {
      type: Number
    },
    gameType: {
      type: String,
      default: "55"
    },
    fenpan: {
      type: Boolean
    }
  },
  mounted() {
    this.sound = new Howl({
      src: ["/wap/ling.mp3"]
    });

    //
  },
  created() {
    // gameCode为后续扩展的参数
    if (this.gameCode) {
      this.game_code = this.gameCode;
    }
    var u = navigator.userAgent,
      app = navigator.appVersion;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS == true) {
      //  var iframebody = document.getElementById('kj').contentWindow.document.body;
      //  iframebody.style.width = document.body.clientWidth+'rem';
      //  documenet.getElementById("top_sp").width = "50"+px
    }
    this._getAttrNames();
  },
  methods: {
    //开奖视频
    shipin() {
      this.kjsp = !this.kjsp;
      this.clo = true;
      this.zhe = true;
      // document.getElementById("kj").src = document.getElementById("kj").src;
    },
    //开奖声音设置
    dianji() {
      if (
        sessionStorage.getItem("musicswitch") == null ||
        sessionStorage.getItem("musicswitch") == "false"
      ) {
        this.$nextTick(() => {});
      } else {
        this.$nextTick(() => {
          this.sound.play();
        });
      }
    },
    // 获取生肖属性
    kssx(item) {
      if (item == "1") {
        return "鱼";
      } else if (item == "2") {
        return "虾";
      } else if (item == "3") {
        return "葫芦";
      } else if (item == "4") {
        return "金钱";
      } else if (item == "5") {
        return "蟹";
      } else if (item == "6") {
        return "鸡";
      }
    },
    clos() {
      this.clo = false;
      this.kjsp = false;
      this.zhe = false;
      document.getElementById("top_sp").style.top = "0rem";
    },
    gotoAddress(path) {
      //试玩账号权限限制
      this.isWan = sessionStorage.getItem("im_username");
      if (this.isWan == "游客") {
        this.mask = false;
        this.isOpen = false;
        if (/^\/Order*/.test(path)) {
          this.promptboxtext = "请登录正式会员账号!";
          this.panelShow = true;
          this.successshow = false;
          return;
        }
      }
      if (path == "app") {
        this._window.location.href = this.appdown;
      } else if (/activity*/.test(path)) {
        this.$router.push(path);
      } else {
        if (!sessionStorage.getItem("im_token")) {
          this.$router.push("/login");
        } else {
          this.$router.push(path);
        }
      }
    },
    timetrans(date) {
      var date = new Date(date * 1000); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
    _getAttrNames() {
      this.lastRound = this.lotteryObj.last.round;
      switch (this.gameType) {
        case "15":
          this.pcdd = true;
          this.game_code = 160;
          this.pcddzh =
            Number(this.lotteryObj.last.number[0]) +
            Number(this.lotteryObj.last.number[2]) +
            Number(this.lotteryObj.last.number[4]);
          if (this.pcddzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (this.pcddzh >= 14) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          break;
        case "20":
          this.xglhc = true;
          this.game_code = 69;
          this.bigger = "0.65rem";
          this.xgcmager = "-0.2rem";
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[7]);
          this.xgcone = this.lotteryObj.last.zodiac[0];
          this.xgctwo = this.lotteryObj.last.zodiac[1];
          this.xgcthree = this.lotteryObj.last.zodiac[2];
          this.xgcfour = this.lotteryObj.last.zodiac[3];
          this.xgcfive = this.lotteryObj.last.zodiac[4];
          this.xgcsix = this.lotteryObj.last.zodiac[5];
          this.xgcseven = this.lotteryObj.last.zodiac[6];
          this.url =
            "https://kj.kai861.com/view/video/SixColor_animate/index.html?10048?1682011.cn";
          break;
        case "25":
          // this.xgcmager = "-0.2rem"
          this.cqxync = true;
          this.game_code = 47;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[6]) +
            parseInt(this.lotteryObj.last.number[7]);
          if (this.kjzh >= 85) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }

          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }

          if (
            this.kjzh.toString().substr(this.kjzh.toString().length - 1) >= 5
          ) {
            this.wdx = "尾大";
          } else {
            this.wdx = "尾小";
          }

          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          this.url =
            "https://kj.kai861.com/view/video/cqnc/index.html?10009?1680218.com";
          break;
        case "35":
          this.xyft = true;
          this.game_code = 171;
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "30":
          this.gdklsf = true;
          this.game_code = 3;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[6]) +
            parseInt(this.lotteryObj.last.number[7]);
          if (this.kjzh >= 85) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            this.kjzh.toString().substr(this.kjzh.toString().length - 1) >= 5
          ) {
            this.wdx = "尾大";
          } else {
            this.wdx = "尾小";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          // this.url =
          //   "https://kj.kai861.com/view/video/GDklsf/index.html?10005?1682011.cn";
          break;
        case "40":
          this.cqssc = true;
          this.game_code = 2;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]);

          if (this.kjzh >= 23) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "龙";
          } else if (
            parseInt(this.lotteryObj.last.number[0]) <
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "虎";
          } else {
            this.lh = "和";
          }
          this.url =
            "https://kj.kai861.com/view/video/SSC/index.html?10002?1682011.cn";
          break;
        case "401":
          this.cqssc = true;
          this.game_code = 46;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]);

          if (this.kjzh >= 23) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "龙";
          } else if (
            parseInt(this.lotteryObj.last.number[0]) <
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "虎";
          } else {
            this.lh = "和";
          }
          break;
        case "55":
          this.bjpk = true;
          this.game_code = 51;
          this.xhcLeft = "3.2rem";
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          this.url =
            "//kj.kai861.com/view/video/PK10/video.html?10001?1682011.cn";
          break;
        case "88":
          this.jsks = true;
          this.game_code = 172;
          this.jskszh =
            Number(this.lotteryObj.last.number[0]) +
            Number(this.lotteryObj.last.number[1]) +
            Number(this.lotteryObj.last.number[2]);
          if (this.jskszh % 2 == 0) {
            this.jsds = "双";
          } else {
            this.jsds = "单";
          }
          if (
            this.jskszh > 10 &&
            (this.lotteryObj.last.number[0] !=
              this.lotteryObj.last.number[1]) !=
              this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "大";
          } else if (
            this.jskszh <= 10 &&
            (this.lotteryObj.last.number[0] !=
              this.lotteryObj.last.number[1]) !=
              this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "小";
          } else if (
            (this.lotteryObj.last.number[0] ==
              this.lotteryObj.last.number[1]) ==
            this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "通吃";
          }
          this.jsksyxeone = this.kssx(Number(this.lotteryObj.last.number[0]));
          this.jsksyxetwo = this.kssx(Number(this.lotteryObj.last.number[1]));
          this.jsksyxethreee = this.kssx(
            Number(this.lotteryObj.last.number[2])
          );
          this.url =
            "https://kj.kai861.com/view/video/kuai3_video/Kuai3.html?10007?1682011.cn";
          break;
        case "66":
          this.bjpk = true;
          this.game_code = 210;
          this.xhcLeft = "3.2rem";
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "551":
          this.bjpk = true;
          this.game_code = 240;
          this.xhcLeft = "3.2rem";
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          break;
        case "60":
          this.cqssc = true;
          this.game_code = 250;
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]);

          if (this.kjzh >= 23) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.kjzh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "龙";
          } else if (
            parseInt(this.lotteryObj.last.number[0]) <
            parseInt(this.lotteryObj.last.number[4])
          ) {
            this.lh = "虎";
          } else {
            this.lh = "和";
          }
          this.url = "/video/jsssc/?channel=pcv750&isMobile=1&oid="+sessionStorage.getItem('im_token');
          break;
        case "90":
          this.bjpk = true;
          this.game_code = 260;
          this.xhcLeft = "3.2rem";
          this.pkygh =
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[0]);
          if (this.pkygh > 11) {
            this.pkyhgdx = "大";
          } else {
            this.pkyhgdx = "小";
          }
          if (this.pkygh % 2 == 0) {
            this.pkyghds = "双";
          } else {
            this.pkyghds = "单";
          }
          if (
            parseInt(this.lotteryObj.last.number[0]) >
            parseInt(this.lotteryObj.last.number[9])
          ) {
            this.pkone = "龙";
          } else {
            this.pkone = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[1]) >
            parseInt(this.lotteryObj.last.number[8])
          ) {
            this.pktwo = "龙";
          } else {
            this.pktwo = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[2]) >
            parseInt(this.lotteryObj.last.number[7])
          ) {
            this.pkthree = "龙";
          } else {
            this.pkthree = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[3]) >
            parseInt(this.lotteryObj.last.number[6])
          ) {
            this.pkfour = "龙";
          } else {
            this.pkfour = "虎";
          }
          if (
            parseInt(this.lotteryObj.last.number[4]) >
            parseInt(this.lotteryObj.last.number[5])
          ) {
            this.pkfive = "龙";
          } else {
            this.pkfive = "虎";
          }
          this.url = "/video/88horse/";
          break;
        case "201":
          this.xglhc = true;
          this.game_code = 270;
          this.bigger = "0.65rem";
          this.xgcmager = "-0.2rem";
          this.kjzh =
            parseInt(this.lotteryObj.last.number[0]) +
            parseInt(this.lotteryObj.last.number[1]) +
            parseInt(this.lotteryObj.last.number[2]) +
            parseInt(this.lotteryObj.last.number[3]) +
            parseInt(this.lotteryObj.last.number[4]) +
            parseInt(this.lotteryObj.last.number[5]) +
            parseInt(this.lotteryObj.last.number[7]);
          this.xgcone = this.lotteryObj.last.zodiac[0];
          this.xgctwo = this.lotteryObj.last.zodiac[1];
          this.xgcthree = this.lotteryObj.last.zodiac[2];
          this.xgcfour = this.lotteryObj.last.zodiac[3];
          this.xgcfive = this.lotteryObj.last.zodiac[4];
          this.xgcsix = this.lotteryObj.last.zodiac[5];
          this.xgcseven = this.lotteryObj.last.zodiac[6];
          break;
        case "881":
          this.jsks = true;
          this.game_code = 280;
          this.jskszh =
            Number(this.lotteryObj.last.number[0]) +
            Number(this.lotteryObj.last.number[1]) +
            Number(this.lotteryObj.last.number[2]);
          if (this.jskszh % 2 == 0) {
            this.jsds = "双";
          } else {
            this.jsds = "单";
          }
          if (
            this.jskszh > 10 &&
            (this.lotteryObj.last.number[0] !=
              this.lotteryObj.last.number[1]) !=
              this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "大";
          } else if (
            this.jskszh <= 10 &&
            (this.lotteryObj.last.number[0] !=
              this.lotteryObj.last.number[1]) !=
              this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "小";
          } else if (
            (this.lotteryObj.last.number[0] ==
              this.lotteryObj.last.number[1]) ==
            this.lotteryObj.last.number[2]
          ) {
            this.jsdx = "通吃";
          }
          this.jsksyxeone = this.kssx(Number(this.lotteryObj.last.number[0]));
          this.jsksyxetwo = this.kssx(Number(this.lotteryObj.last.number[1]));
          this.jsksyxethreee = this.kssx(
            Number(this.lotteryObj.last.number[2])
          );

          break;
      }
    },
    p(s) {
      if (s <= 0) {
        return `00`;
      } else if (s > 0 && s < 10) {
        return `0${s}`;
      } else {
        return s;
      }
    },
    // filt(){
    //   var date = new Date(1521293400);
    //   Y = date.getFullYear() + '-';
    //   M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //   D = date.getDate() + ' ';
    //   h = date.getHours() + ':';
    //   m = date.getMinutes() + ':';
    //   s = date.getSeconds();
    //   console.log(Y+M+D+h+m+s)
    // },
    //过滤分秒
    myfilter(second_time, second_endtime) {
      let time = parseInt(second_time);
      let timeE = parseInt(second_endtime);
      let second = second_time % 60;
      let secondE = second_endtime % 60;
      this.s = this.p(secondE);
      let min = Math.floor(second_time / 60) % 60;
      let minE = Math.floor(second_endtime / 60) % 60;
      this.m = this.p(minE);
      let hour = Math.floor(second_time / 3600);
      let hourE = Math.floor(second_endtime / 3600);
      this.h = this.p(hourE);
      if (hour) {
        time = this.p(hour) + ":" + this.p(min) + ":" + this.p(second);
        return time;
      } else {
        time = this.p(min) + ":" + this.p(second);
        return time;
      }
    }
  },
  watch: {
    lotteryObj: {
      handler: function(newValue, oldValue) {
        this._getAttrNames();
        if (oldValue && newValue.last.round != oldValue.last.round) {
          this.dianji();
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../assets/less/variable.less";
@blue: #146cdc;
@font_title: #ffffff;
@font_round: rgb(0, 0, 0);
@font_balance: #6993d5;
.icon-gray-f-ball {
    background: url("@{public_img}/images/gray_f_ball.png") no-repeat;
    background-size: 100%;
    color: #000;
}
.icon-blue-f-ball {
    background: url("@{public_img}/images/blue_f_ball.png") no-repeat;
    background-size: 100%;
    color: #fff;
}
.masker_al{
  width:8rem;
  height:11rem;
  margin-top:-1rem;
  margin-left: -1rem;
  background:rgba(0,0,0,0);
  position: absolute;
}
.information {
  z-index: 9;
  background: white;
  width: 100%;
  margin-top: 38/20rem;
  .balance {
    color: @font_balance;
    min-width: 50/20rem;
    display: inline-block;
  }
  .lottory_time {
    min-width: 100/20rem;
  }
  /* > div:nth-of-type(1) {*/
  .lottery-rs-remain {    
    display: flex;
    height: 120/46.875rem;
    border-bottom: 1px solid #f3f3f3;
    > div:nth-of-type(1) {
      width: 60%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      /* border-right: 1px solid #f3f3f3;*/
      padding-left: 10/20rem;
      font-size: 12/20rem;
      > div:nth-of-type(1) {
        font-size: 20/20rem;
        color: @font_round;
      }
    }
    > div:nth-of-type(2) {
      width: 38%;
      color: #666666;
      box-sizing: border-box;
      text-align: center;
      display: flex;
      flex-direction: column;
      > div:nth-of-type(1) {
        font-size: 12/20rem;
      }
      > div:nth-of-type(2) {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        > div {
          display: flex;
          justify-content: center;
          font-size: 19/20rem;
          i {
            display: inline-block;
            margin: 0 1/20rem;
          }
          span {
            > span {
              background: #404040;
              color: @font_title;
              display: inline-block;
              width: 56/46.875rem;
              height: 62/46.875rem;
              border-radius: 3/20rem;
              line-height: 26/20rem;
            }
          }
          > span:nth-of-type(2) {
            background: #404040;
            color: @font_title;
            display: inline-block;
            width: 56/46.875rem;
            height: 62/46.875rem;
            border-radius: 3/20rem;
            line-height: 26/20rem;
          }

          > span:nth-of-type(3) {
            background: #404040;
            color: @font_title;
            display: inline-block;
            width: 56/46.875rem;
            height: 62/46.875rem;
            border-radius: 3/20rem;
            line-height: 26/20rem;
          }
        }
      }
    }
  }

  /* > div:nth-of-type(2) { */
  .lottery-rs-bolls {
    /*
    position: relative;
    height: 100/46.875rem;
    display: flex;
    align-items: center;
    font-size: 12/20rem;
    z-index: 3;
*/
    display: flex;
    padding: 8/20rem 0;

     /* > div:nth-of-type(1) { */
      .lottory_time {
        /*  width: 65/20rem;*/
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding-left: 10/20rem;
      }
    /* > div:nth-of-type(2) { */
    .lotteryOpen {
          width: auto;
          > ul {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 1/20rem;
            .boll-item-mixin() {
              margin-left: 1.5/20rem;
              width: 45/46.875rem;;
              height: 45/46.875rem;
              text-align: center;
              border-radius: 10/20rem;
              // border: 1px solid #333;
              box-sizing: border-box;
              display: flex;
              justify-content: center;
              align-items: center;
              vertical-align: middle;
              margin: 0.1rem 0;
              margin-left: 0.1rem;
              >i {
                font-size: 14/20rem;
                display: block;
              }
            }
            .boll-item {
              .boll-item-mixin;
              color: @font_title;
              background: @blue;
            }
            .boll-item-180 {
              .boll-item-mixin;
              text-shadow: none;
            }
          }
    }
  }
    .lottery-rs-pertis {  
      position: relative;
      // height: 100/46.875rem;
      display: flex;
      align-items: center;
      font-size: 12/20rem;
      z-index: 3;
      > .sxh {
        padding-bottom: 5/20rem;
        /*border: 1px solid red;*/
        > ul {
          overflow: hidden;
          /*  	width: 690/46.875rem;*/
          > li {
            display: inline-block;
            float: left;
            border-right: 1px solid #c0c0c0;
            border-bottom: 1px solid #c0c0c0;
            border-top: 1px solid #c0c0c0;
          }
          > li:nth-child(1) {
          border-left: 1px solid #c0c0c0;
          }
        }
      }
    .jskssxh {
      width: 98%;
      left: 0.2rem;
      > ul {
        width: 100%;
        > li {
          display: block;
          width: 12%;
          font-size: 24/46.875rem;
          height: 36/46.875rem;
          line-height: 36/46.875rem;
          text-align: center;
        }
        > li:nth-child(1),
        li:nth-child(7) {
          width: 11.5%;
        }
      }
    }
    > .bjpksxh,
    .xyftsxh {
      width: 100%;
      // left: 1.9rem;
      > ul {
        width: 100%;
        padding: 0 0.25rem;
        > li {
          width: 8%;
          text-align: center;
          font-size: 24/46.875rem;
          height: 36/46.875rem;
          // padding: 0 0.25rem;
          line-height: 36/46.875rem;
        }
        > li:nth-child(1),
        li:nth-child(5) {
          width: 18%;
        }
      }
    }
    > .cqsscsxh {
      width: 100%;
      > ul {
        width: 100%;
        padding: 0 0.25rem;
        > li {
          width: 16.66%;
          text-align: center;
          display: block;
          font-size: 24/46.875rem;
          height: 36/46.875rem;
          line-height: 36/46.875rem;
        }
      }
    }
    > .gdklsfsxh,
    .cqxynsxh {
      width: 100%;
      > ul {
        width: 100%;
        padding: 0 0.25rem;
        > li {
          display: block;
          width: 7.5%;
          font-size: 24/46.875rem;
          height: 36/46.875rem;
          line-height: 36/46.875rem;
          text-align: center;
        }
        > li:nth-child(1),
        li:nth-child(7) {
          width: 11.5%;
        }
      }
    }
    > .pcddsxh {
      width: 100%;
      > ul {
        width: 100%;
        padding: 0 0.25rem;
        > li {
          width: 25%;
          text-align: center;
          display: block;
          font-size: 24/46.875rem;
          height: 36/46.875rem;
          line-height: 36/46.875rem;
        }
      }
    }
    > .xgcsxh {
      width: 100%;
      > ul {
        width: 100%;
        padding: 0 0.25rem;
        > li {
          width: 10%;
          display: block;
          font-size: 24/46.875rem;
          text-align: center;
          height: 36/46.875rem;
          // padding: 0 0.35rem;
          line-height: 36/46.875rem;
        }
        > li:nth-child(10) {
          background: #2753b2;
          color: white;
        }
      }
    }
  }
  .lotteryOpen {
    display: flex;
    ul {
      margin-left: -2/20rem;
      flex-wrap: wrap;
    }
  }
}
.lottory_time {
  display: flex;
  flex-wrap: wrap;
}
.game_15 {
  .lotteryOpen {
    > ul {
      li {
        width: 1rem !important;
        height: 1rem !important;
        line-height: 1rem !important;
        border-radius: 50% !important;
        i {
          width: 1rem !important;
          height: 1rem !important;
          line-height: 1rem !important;
          text-shadow: none;
        }
      }
      > li:nth-child(2),
      li:nth-child(4),
      li:nth-child(6) {
        background: none !important;
        width: 0.5rem !important;
        border: none !important;
        color: #999 !important;
        i {
          width: 1rem !important;
        }
      }
      .color_1,
      .color_4,
      .color_7,
      .color_10,
      .color_16,
      .color_19,
      .color_22,
      .color_25 {
        background: green !important;
      }
      .color_3,
      .color_6,
      .color_9,
      .color_12,
      .color_15,
      .color_18,
      .color_21,
      .color_24 {
        background: red !important;
      }
      .color_2,
      .color_5,
      .color_8,
      .color_11,
      .color_17,
      .color_20,
      .color_23,
      .color_26 {
        background: blue !important;
      }
      .color_0,
      .color_13,
      .color_14,
      .color_27 {
        background: #ccc !important;
      }
      > li:nth-child(1),
      li:nth-child(3),
      li:nth-child(5) {
        background: #146cdc !important;
      }
    }
  }
}

.game_55,
.game_551 {
  .lotteryOpen {
    > ul {
      > .color_1 {
        background: #fff600 !important;
      }
      > .color_2 {
        background: #008fff !important;
      }
      > .color_3 {
        background: #4b4b4b !important;
      }
      > .color_4 {
        background: #ff7600 !important;
      }
      > .color_5 {
        background: #7cfdff !important;
      }
      > .color_6 {
        background: #5234ff !important;
      }
      > .color_7 {
        background: #e4e4e4 !important;
      }
      > .color_8 {
        background: #ff2600 !important;
      }
      > .color_9 {
        background: #780b00 !important;
      }
      > .color_10 {
        background: #07bf00 !important;
      }
      > li {
        border-radius: 4/20rem !important;
      }
    }
  }
}

.game_20 {
  .lotteryOpen {
    > ul {
      > li:nth-child(7) {
        background: none !important;
        border: none !important;
        color: #333 !important;
        font-size: 1rem;
      }
      .color_1,
      .color_2,
      .color_7,
      .color_8,
      .color_12,
      .color_13,
      .color_18,
      .color_19,
      .color_23,
      .color_24,
      .color_29,
      .color_30,
      .color_34,
      .color_35,
      .color_40,
      .color_45,
      .color_46 {
        // background-color: #ff3545 !important;
        background: url("../../wap/images/red_ball.png") !important;
        background-size: 100% 100% !important;
      }
      .color_3,
      .color_4,
      .color_9,
      .color_10,
      .color_14,
      .color_15,
      .color_20,
      .color_25,
      .color_26,
      .color_31,
      .color_36,
      .color_37,
      .color_41,
      .color_42,
      .color_47,
      .color_48 {
        // background-color: #4f57fa !important;
        background: url("../../wap/images/blue_ball.png") !important;
        background-size: 100% 100% !important;
      }
      .color_5,
      .color_6,
      .color_11,
      .color_16,
      .color_17,
      .color_21,
      .color_22,
      .color_27,
      .color_28,
      .color_32,
      .color_33,
      .color_38,
      .color_39,
      .color_43,
      .color_44,
      .color_49 {
        // background-color: #22620c !important;
        background: url("../../wap/images/green_ball.png") !important;
        background-size: 100% 100% !important;
      }
    }
  }
}
.game_88,.game_881 {
  .lotteryOpen {
    > ul {
      li {
        border: none !important;
        border-radius: 0 !important;
        margin-left: 0.2rem !important;
      }
      .color_1 {
        background: url("../../wap/images/sia1.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      .color_2 {
        background: url(../../wap/images/sia2.png) no-repeat !important;
        background-size: 100% 100% !important;
      }
      .color_3 {
        background: url(../../wap/images/sia3.png) no-repeat !important;
        background-size: 100% 100% !important;
      }
      .color_4 {
        background: url(../../wap/images/sia4.png) no-repeat !important;
        background-size: 100% 100% !important;
      }
      .color_5 {
        background: url(../../wap/images/sia5.png) no-repeat !important;
        background-size: 100% 100% !important;
      }
      .color_6 {
        background: url(../../wap/images/sia6.png) no-repeat !important;
        background-size: 100% 100% !important;
      }
    }
  }
}
.game_35 {
  .lotteryOpen {
    > ul {
      > .color_1 {
        background: #fff600 !important;
      }
      > .color_2 {
        background: #008fff !important;
      }
      > .color_3 {
        background: #4b4b4b !important;
      }
      > .color_4 {
        background: #ff7600 !important;
      }
      > .color_5 {
        background: #7cfdff !important;
      }
      > .color_6 {
        background: #5234ff !important;
      }
      > .color_7 {
        background: #e4e4e4 !important;
      }
      > .color_8 {
        background: #ff2600 !important;
      }
      > .color_9 {
        background: #780b00 !important;
      }
      > .color_10 {
        background: #07bf00 !important;
      }
      > li {
        border-radius: 4/20rem !important;
      }
    }
  }
}

.game_30 {
  .lotteryOpen {
    > ul {
      > .color_19 {
        background: #df3836 !important;
      }
      > .color_20 {
        background: #df3836 !important;
      }
    }
  }
}

.game_30,
.game_35,
.game_55,
.game_551 {
  .lotteryOpen {
    > ul {
      > li {
        text-shadow: -1px 2px 2px #000000;
      }
    }
  }
}

.game_25 {
  .lotteryOpen {
    > ul {
      > li {
        font-size: 0px !important;
        border: none !important;
      }
      > .color_01 {
        background: url("@{public_img}/images/xync_1.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_02 {
        background: url("@{public_img}/images/xync_2.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_03 {
        background: url("@{public_img}/images/xync_3.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_04 {
        background: url("@{public_img}/images/xync_4.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_05 {
        background: url("@{public_img}/images/xync_5.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_06 {
        background: url("@{public_img}/images/xync_6.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_07 {
        background: url("@{public_img}/images/xync_7.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_08 {
        background: url("@{public_img}/images/xync_8.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_09 {
        background: url("@{public_img}/images/xync_9.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_10 {
        background: url("@{public_img}/images/xync_10.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_11 {
        background: url("@{public_img}/images/xync_11.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_12 {
        background: url("@{public_img}/images/xync_12.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_13 {
        background: url("@{public_img}/images/xync_13.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_14 {
        background: url("@{public_img}/images/xync_14.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_15 {
        background: url("@{public_img}/images/xync_15.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_16 {
        background: url("@{public_img}/images/xync_16.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_17 {
        background: url("@{public_img}/images/xync_17.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_18 {
        background: url("@{public_img}/images/xync_18.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_19 {
        background: url("@{public_img}/images/xync_19.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
      > .color_20 {
        background: url("@{public_img}/images/xync_20.png") no-repeat !important;
        background-size: 100% 100% !important;
      }
    }
  }
}

.lottery_play_area{
  display: flex;
  justify-content: flex-end!important;
}
@media screen and (max-width:320px){
  .img_icon{
    width: 17px;
    margin-right: -1rem!important;
    position:relative;
    left:-1rem!important;
    top:.21rem
  }
  .img_ico{
    width: 17px;
    margin-right:-2.5rem  !important;
    position:relative;
    left:-2.5rem!important;
    top:.21rem
  }
}

.img_icon {
  width: 17px;
  position:relative;
  top:.21rem;
  margin-right:-1rem;
  left:-1rem
}
.img_ico {
  width: 17px;
  position:relative;
  top:.21rem;
  margin-right:-1.8rem;
  left:-1.8rem;
}
.clos {
  position: absolute;
  right: 0.2rem;
  top: 3.5rem;
}
.clos img {
  width: 1rem;
}

</style>
