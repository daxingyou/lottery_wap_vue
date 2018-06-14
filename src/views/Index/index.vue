<template>
  <div>
    <div class="ggHeader" v-if="closeGG">
      <div>
        <div @click="closeGb"><img src="../../../static/images/icon/headerOut.png" /></div>
        <div class="headerLogo"></div>
        <div>
          <p>{{is_gd_ali ? '打开新版阿理APP' : '打开新版光大APP'}}</p>
        </div>
      </div>
      <div @click='gotoAddress("app")' class="gdcolor">立即下载</div>
    </div>
    <!--位置-->
    <header class="color1 clearfix" :style="{'top': isIosWebview ? 40/40+'rem':headerTop}">
      <h1><img :src="$store.state.website.response[0].logo" alt=""></h1>
      <div v-if="$store.state.userData.username" class="header_login">
        <div :style="{'padding-top': '0.25rem'}">
          <i style="width: 1rem;height: 1rem;font-size:16px;margin: 0.2rem 0.4rem;float: right;" class="" @click="isShow">
            <img style="width: 1rem; height: 0.75rem; margin-top: -0.3rem;" :src="$getPublicImg('/images/menumoney.png')" alt="" />
          </i>
          <span class="username gdusername" style="background: none!important;border: none!important;" @click="gotoMy">
            <img :src="$getPublicImg('/images/indexuser.png')" alt="" />
            <i style="float: right;margin-top: -0.2rem;;">{{$store.state.userData.username}}</i>
          </span>
          <span v-if="$store.state.userData.username == '游客'" class="username gdusername" style="line-height: 0.658rem;float: right;margin-left: 0.2rem;"  @click.prevent="gotoPayAddressone">注册</span>
          <ul class="alert_right" v-show="isOpen">
            <li @click='gotoAddress("/my");'>个人中心<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li class="money"> 账户余额
              <span style="color:#0b76fa;">￥{{$store.state.userData.balance}}</span>
            </li>
            <li @click='gotoAddress("/Order:0")'>我要充值<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li @click='gotoAddress("/Order:1")'>我要提现<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li @click='gotoAddress("/myHistroy")'>下注记录<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li @click='gotoAddress("/game99")'>开奖大厅<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li>开奖音效
              <input type="checkbox" v-model="setCheckboxmodel" id="ios-checkbox" name="emulate-ios-button" class="raw-checkbox">
              <label for="ios-checkbox" class="emulate-ios-button"></label>
            </li>
            <li @click='gotoAddress("/todayRule")'>游戏规则<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li @click="gotoPayAddress()"> 联系我们<img :src="$getPublicImg('/images/jiantou.png')" alt="" /></li>
            <li @click='exit'>退出</li>
          </ul>
        </div>
      </div>
      <div v-else class="header_login">
        <button class="test login_border login" @click='loginAsTourists'>
          <span>
            试玩
          </span>
        </button>
        <button class="login_b login_border login" @click='gotoAddress("/login")'>
          <div>
            <span>
              登录注册
            </span>
          </div>
        </button>
        <div style="clear: both"></div>
      </div>
    </header>
    <div class="mask" @click="mask=false;isOpen=false" v-show="mask">
    </div>
    <div class="swiper_group" :style="{'marginTop': swiperMajgin}">
      <div style="height:150px" class="swiper-box">
        <swiper :options="swiperOption">
          <swiper-slide v-for='(item,i) in msgs.data' :key='i'>
            <a :href="item.href">
              <img :src="item.pic" class="banner-item" :alt="item.name">
              <span>asdf</span>
            </a>
          </swiper-slide>
          <div v-if='msgs' class="swiper-pagination" slot="pagination"></div>
        </swiper>
      </div>
    </div>
    <div class="announcement">
      <div class="im" @click='gotoAddress("/noticeCenter")'>
        <img src="../../../static/images/icon/g6.png" alt="">
      </div>
      <div>
        <marquee scrollamount="5" class="text" ref="txt" v-html="announcements">

        </marquee>
        <a class="manly" @click='gotoAddress("/noticeCenter")'></a>
      </div>
    </div>
    <div class="gameClass inde_bg">
      <ul class="game_list clearfix">
        <li v-for="(item, index) in lotteryLists" @click="gotoAddress(`game_${item.lotteryGameId}`)">
          <button>
            <img :src='item.imageurl' />
            <h5>{{item.gamesName}}</h5>
            <img class="hot-games" v-if="item.lotteryGameId==17" src="../../../wap/images/hot.png" alt="">
          </button>
        </li>
      </ul>
      <ul v-show="is_gd_ali == 'ly'" class="recom">
        <li v-for="(item, index) in lotteryListsTj">
          <img :src='lotteryListsTj[index].tjImg' @click='gotoAddress(lotteryListsTj[index].game)' />
        </li>
      </ul>
    </div>
    <div class="foot_swiper">
      <!-- <h4  v-show="is_gd_ali!='uc'"> -->
      <h4 v-show="activityList.length != 0">
        优惠活动
        <i @click="gotoAddress('More')" style="float: right;margin-right: 0.5rem;color: #666666;font-size:0.5rem;margin-top:0.2rem;">更多<img :src="$getPublicImg('/images/moneyindex.png')" alt="" style="width: 0.5rem;height: 0.5rem;margin-top: -0.2rem;margin-left: 0.2rem;" /></i>
      </h4>
      <div style="height:160px;width:100%;" class="swiper-box swiper-box_b" v-show="activityList.length != 0">
        <!-- <div style="height:160px" class="swiper-box swiper-box_b"  v-show="is_gd_ali!='uc'"> -->
        <swiper :options="swiperOption_b">
          <swiper-slide class="twoswiper" v-for='(item,index) in activityList' :key="index">
            <a :href="item.weburl">
              <div class="img_swiper">
                <img :src="item.imageurl" alt="aa">
              </div>
              <span style="color: #333333!important;">{{item.title}}</span>
            </a>
          </swiper-slide>
        </swiper>
      </div>
      <!--选择版面-->
      <div class="chooseBan">
        <a @click='gotoAddress("app")'>APP下载</a>
        <a class="gdcolor1">触屏版</a>
        <a @click="getPclinks()">电脑版</a>
      </div>
      <!--尾巴\-->
      <div class="footView">
        <div>
          <img :src="$getPublicImg('/images/footerImg.png')" alt="" />
        </div>
        <div>
          <p>Copyright © 2012-2018</p>
          <p>All Rights Reserved</p>
        </div>
      </div>
    </div>

    <!--弹出框-->
    <div class="zzc" v-show="logout">
      <div class="juzho">
        <div class="white2">
          <p>确认退出？</p>
          <div>
            <button class="color1" @click='log_out'>确认</button>
            <button @click='logout=false'>取消</button>
          </div>
        </div>
      </div>
    </div>

    <div class="jin_qin_qi_dai" v-show="$store.state.showRechargeBox">
      <div class="centerwen">
        <div class="color1">通知
          <span @click="nexttk"><img :src="$getPublicImg('/images/agsw.png')" /></span>
        </div>
        <p style="margin-top: 0.8rem;">您的余额为：
          <i>0</i>
        </p>
        <p>建议您先充值再进行游戏！</p>
        <a class="tkljright" @click="nexttk">暂时不用</a>
        <a class="tkljleft color1" @click='xunzxq(2)'>立即充值</a>
      </div>
    </div>
    <div class="jin_qin_qi_daifirst" v-show="firstdown">
      <div class='jinriday'>
        <div class="ignorerigft">使用APP玩游戏更畅快，下载发现更多精彩内容</div>
        <img src="../../../static/images/icon/guan_bi.png" @click="appdownapp" />
        <img :src="$getPublicImg('/images/rocket.png')" alt="" style="left:50%;margin-left:-0.7rem;top:-0.8rem;" />
        <a class="tkljright" @click="appdownapp">忽略</a>
        <a class="tkljleft" @click='gotoAddress("app")'>点击下载</a>
      </div>
    </div>
    <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>

<script>
import footGuide from "../../components/footer/footGuide";
import promptbox from "../../components/promptbox";
import { setStore } from "../../utils/mUtils.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { mapActions, mapMutations } from "vuex";
import _ from "lodash";
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      apititle: getTitle(),
      firstdown: false,
      isIosWebview: isIosWebview,
      expectation: false,
      firstuser: false,
      usertitle: "",
      kuan: "",
      getPclink: location.origin.replace(/wap/, "www") + "/login",
      checkboxmodel: false,
      more: false,
      announcementArr: [],
      activityList: [],
      isApps: typeof window.isApps === "undefined" ? false : window.isApps,
      closeGG: this.$store.state.userData.sessionId ? false : true,
      headerTop: "2.1rem",
      swiperMajgin: "4rem",
      url: "",
      platform: window.is_gd_ali(),
      isOpen: false,
      logoxian: true,
      // 轮播图
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        loop: true
      },
      // 轮播图
      swiperOption_b: {
        pagination: ".swiper-pagination_b",
        slidesPerView: 2,
        paginationClickable: true,
        spaceBetween: 0,
        freeMode: true
      },
      msgs: {
        data: []
      },
      hotmsgs: {},
      title_control: false,
      dialog: false,
      title: "",
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      promptsystem: "",
      api: "",
      announcements: "",
      panelShow: false,
      pcUrl: "",
      appdown: "",
      ite: "3",
      logout: false,
      money: "",
      mask: false,
      indexNav_i: null,
      list_name: [],
      lotteryLists: [],
      lotteryListsTj: [],
      username_pc: "",
      scrollNews: [],
      alertNews: []
    };
  },
  computed: {
    setCheckboxmodel: {
      get() {
        return this.checkboxmodel;
      },
      set(val) {
        sessionStorage.setItem("musicswitch", JSON.stringify(val));
        this.checkboxmodel = val;
      }
    }
  },

  methods: {
    ...mapActions([
      "GET_SWIPER_DATA",
      "GET_ANNOUNCEMENT_DATA",
      "GET_LOTTERYTYPELIST_DATA",
      "GET_ACTIVITY_DATA",
      "LOGIN_AS_TOURIST",
      "GET_WEBSITE_CONFIG"
    ]),
    ...mapMutations(["setUserData", "alertNotifications", "toggleRechageBox"]),
    setSwiper() {
      this.GET_SWIPER_DATA().then(res => {
        //获取轮播图
        let swiperArray = res.response;
        for (let i = 0; i < swiperArray.length; i++) {
          this.msgs.data.push({ pic: swiperArray[i].imageUrl });
        }
      });
    },
    setAnnouncement() {
      this.GET_ANNOUNCEMENT_DATA().then(res => {
        // type:0代表滚动消息 type:1代表弹出的提示 type:2代表其他
        this.scrollNews = _.map(
          _.filter(res.response, item => item.type === 0),
          "content"
        );

        this.alertNews = _.map(
          _.filter(res.response, item => item.type === 1),
          "content"
        );
        this.announcements = this.scrollNews.join(
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"
        );
        if (this.$store.state.alertNotifications) {
          this.infiniteAlert(this.alertNews, 0);
          this.alertNotifications(false);
        }
      });
    },
    setLotteryEntry() {
      this.GET_LOTTERYTYPELIST_DATA().then(res => {
        this.lotteryLists = res.response;
      });
    },
    setActivity() {
      this.GET_ACTIVITY_DATA().then(res => {
        this.activityList = res.response;
      });
    },
    infiniteAlert(arr, index) {
      let _this = this;
      //如果大于一个弹出提示，并且不是最后一个，那么需要自己调用自己
      if (arr.length > 1 && index < arr.length - 1) {
        this.$swal({
          confirmButtonText: "查看详情",
          text: arr[index],
          showCloseButton: true,
          callback: action => {
            _this.infiniteAlert(arr, index + 1);
          }
        }).then(result => {
          if (result.value) {
            _this.$router.push({
              path: "/noticeCenter"
            });
          }
        });
      }
      //如果只有一个或者如果是弹出最后一个，那么就没有回调函数
      if (arr.length == 1 || index == arr.length - 1) {
        this.$swal(
          {
            confirmButtonText: "查看详情",
            text: arr[index],
            showCloseButton: true
          },
          cb => {
            _this.alertNotifications(false);
          }
        ).then(result => {
          if (result.value) {
            _this.$router.push({
              path: "/noticeCenter"
            });
          }
        });
      }
    },
    getPclinks() {
      let oid = this.$store.state.userData.sessionId;

      let username = this.$store.state.userData.username;
      if (this.is_gd_ali == "ali" || this.is_gd_ali == "gd") {
        location.href =
          location.origin.replace(/wap/, "www") +
          "?toPC=1&username=" +
          username +
          "&oid=" +
          oid;
      } else if (this.is_gd_ali == "ly") {
        location.href =
          location.origin.replace(/wap/, "vip") +
          "?toPC=1&username=" +
          username +
          "&oid=" +
          oid;
      } else if (
        this.is_gd_ali == "uc" ||
        this.is_gd_ali == "ct" ||
        this.is_gd_ali == "sd" ||
        this.is_gd_ali == "yiren"
      ) {
        location.href =
          location.origin.replace(/m\./, "vip.") +
          "?toPC=1&username=" +
          username +
          "&oid=" +
          oid;
      } else {
        location.href =
          location.origin.replace(/m\./, "www.") +
          "?toPC=1&username=" +
          username +
          "&oid=" +
          oid;
      }
    },
    xunzxq(push) {
      if (push == 1) {
        this.$router.push({
          path: "/noticeCenter"
        });
      } else {
        // 隐藏充值框
        this.toggleRechageBox(false);
        this.$router.push({
          path: "/Order:0"
        });
      }
    },
    nexttk() {
      // 隐藏充值框
      this.toggleRechageBox(false);
      this.firstuser = false;
      //获取弹窗信息
      if (sessionStorage.getItem("im_tan")) {
        let params = {};

        this.$http
          .post(`/user/getLoginNotice`, JSON.stringify(params))
          .then(res => {
            if (res.data.isAlert == 1) {
              this.expectation = true;
              this.usertitle = res.data.msg;
              sessionStorage.setItem("im_tan", "");
            }
            if (res.data.isAlert == 0 && res.data.alert_download == 1) {
              this.firstdown = true;
            }
          });
      }
    },
    downappw() {
      if (sessionStorage.getItem("im_updown") == 1) {
        this.expectation = false;
        this.firstdown = true;
      } else {
        this.expectation = false;
      }
    },
    appdownapp() {
      this.firstdown = false;
    },
    touch() {
      this.$refs.txt.stop();
    },
    touch1() {
      this.$refs.txt.start();
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
    },
    numbeYs(numberList) {
      return numberList.split(" ");
    },
    exit() {
      this.$swal({
        text: "确定退出?",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      }).then(result => {
        if (result.value) {
          this.setUserData({});
          this.mask = !this.mask;
        }
      });
    },
    isShow() {
      this.isOpen = !this.isOpen;
      this.mask = !this.mask;
    },
    loginAsTourists() {
      this.LOGIN_AS_TOURIST().then(res => {
        this.title_control = true;
        this.isOpen = false;
        this.username = this.$store.state.userData.username;
      });
    },
    gotoAddress(path) {
      let game_path = "";
      switch (path) {
        case "game_260":
          game_path = 90;
          break;
        case "game_240":
          game_path = 551;
          break;
        case "game_250":
          game_path = 60;
          break;
        case "game_210":
          game_path = 66;
          break;
        case "game_46":
          game_path = 401;
          break;
        case "game_51":
          game_path = 55;
          break;
        case "game_2":
          game_path = 40;
          break;
        case "game_69":
          game_path = 20;
          break;
        case "game_160":
          game_path = 15;
          break;
        case "game_171":
          game_path = 35;
          break;
        case "game_3":
          game_path = 30;
          break;
        case "game_47":
          game_path = 25;
          break;
        case "game_172":
          game_path = 88;
          break;
        case "game_270":
          game_path = 201;
          break;
      }
      if (game_path) {
        this.$router.push({
          path: `game_${game_path}`
        });
        return;
      }
      if (this.$store.state.userData.username == "游客") {
        this.mask = false;
        this.isOpen = false;
        if (/^\/Order*/.test(path)) {
          this.promptboxtext = "请登录正式会员账号!";
          this.panelShow = true;
          this.successshow = false;
          return;
        }
      }
      //试玩账号权限限制
      if (path == "app") {
        this.$window.location.href = this.appdown;
      } else if (/activity*/.test(path)) {
        this.$router.push(path);
      } else {
        if (!this.$store.state.userData.sessionId) {
          this.$router.push("/login");
        } else {
          this.$router.push(path);
        }
      }
      let oidInfo = this.$store.state.userData.sessionId;
      let odd = {};
      odd.oid = oidInfo;
    },
    log_out() {
      Object.keys(sessionStorage).forEach((item, index) => {
        if (item != "promotionId") {
          sessionStorage.removeItem(item);
        }
      });
      this.logout = false;
      this.title_control = false;
      this.mask = false;
      this.$router.push("/index");
    },
    gotoPayAddress() {
      this.$router.push("/kefu");
    },
    gotoPayAddresschangeSecondMenu() {
      this.$router.push("/regist");
    },
    gotoMy() {
      if (this.title_control) {
        this.$router.push("/my");
      }
    },
    closeGb() {
      this.closeGG = false;
      this.headerTop = "0";
      this.swiperMajgin = "1.95rem";
    },
    inArray1(needle, array, bool) {
      if (typeof needle == "string" || typeof needle == "number") {
        for (let i in array) {
          if (needle === array[i]) {
            if (bool) {
              return i;
            }
            return true;
          }
        }
        return false;
      }
    }
  },
  //  props: {},
  components: {
    footGuide,
    swiper,
    swiperSlide,
    promptbox
  },
  created() {
    // 设置轮播
    this.setSwiper();
    // 设置滚动信息
    this.setAnnouncement();
    // 彩票游戏入口
    this.setLotteryEntry();
    // 优惠活动
    this.setActivity();

    this.is_gd_ali == "ali" || this.is_gd_ali == "gd"
      ? (this.closeGG = true)
      : (this.closeGG = false);
    if (this.is_gd_ali == "lv" || this.is_gd_ali == "fh") {
      this.kuan = "37rem";
    } else if (
      this.is_gd_ali == "ly" ||
      this.is_gd_ali == "uc" ||
      this.is_gd_ali == "gd"
    ) {
      this.kuan = "15rem";
    } else if (this.is_gd_ali == "ali") {
      this.kuan = "20rem";
    }

    // 彩种列表循环
    let prams = {
      oid: oidInfo
    };

    //判断开奖声音的状态
    if (sessionStorage.getItem("musicswitch")) {
      // .setItem('musicswitch', JSON.stringify(this.checkboxmodel))
      this.checkboxmodel = JSON.parse(sessionStorage.getItem("musicswitch"));
    } else {
      this.checkboxmodel = false;
    }
    //用户注册成功的弹框
    if (sessionStorage.getItem("im_firstr")) {
      this.firstuser = true;
      sessionStorage.setItem("im_firstr", "");
    }
    if (!this.firstuser && sessionStorage.getItem("im_tan")) {
      let params = {};

      this.$http
        .post(`/user/getLoginNotice`, JSON.stringify(params))
        .then(res => {
          sessionStorage.setItem(
            "im_updown",
            JSON.stringify(res.data.alert_download)
          );
          if (res.data.isAlert == 1) {
            this.expectation = true;
            this.usertitle = res.data.msg;
            sessionStorage.setItem("im_tan", "");
          }
          if (res.data.isAlert == 0 && res.data.alert_download == 1) {
            this.firstdown = true;
          }
        });
    }
    if (this.is_gd_ali == "ali" || this.is_gd_ali == "gd") {
      this.getPclink = location.origin.replace(/wap/, "www") + "?toPC=1";
    } else if (this.is_gd_ali == "ly") {
      this.closeGG = false;
      this.getPclink = location.origin.replace(/wap/, "vip") + "?toPC=1";
    } else if (
      this.is_gd_ali == "uc" ||
      this.is_gd_ali == "ct" ||
      this.is_gd_ali == "sd" ||
      this.is_gd_ali == "yiren"
    ) {
      this.closeGG = false;
      this.getPclink = location.origin.replace(/m\./, "vip") + "?toPC=1";
    } else {
      this.closeGG = false;
      this.getPclink = location.origin.replace(/m\./, "www") + "?toPC=1";
    }

    // 如果session 里面存了登录信息, 或者是app的话
    if (!this.closeGG || this.isApps) {
      this.closeGb();
    }
    if (this.$store.state.userData.username == "游客") {
      this.logoxian = true;
    } else {
      this.logoxian = false;
    }
    is_gd_ali() ? (this.indexNav_i = 1) : (this.indexNav_i = 4);
    //判断用户是IOS还是安卓
    let u = navigator.userAgent;
    var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      this.appdown = getIos();
    } else {
      this.appdown = getAndroid();
    }
    //    截取电脑端链接
    this.pcUrl = `//${getUrl().substring(6)}/login`;
    //       验证用户是否登录
    if (this.$store.state.userData.username) {
      this.title_control = true;
      this.username = this.$store.state.userData.username;
    } else {
      this.title_control = false;
    }
    //获取轮播图和公告（图片地址)

    let oidInfo = this.$store.state.userData.sessionId;
  }
};
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import "../../icon/iconfont.css";
@import "../../assets/less/variable.less";
.recom {
  width: 100%;
  overflow: hidden;
  background: #fff;
}
.recom li:nth-child(1) {
  border-bottom: 1px solid #eee;
}
.recom li {
  height: 200/46.875rem;
  padding: 30/46.875rem 25/46.875rem;
}
.recom li img {
  width: 100%;
  border-radius: 5px;
}
.scrollNews {
  overflow: hidden;
  display: inline-block;
  width: 95%;
  padding: 0 10px;
}
.scrollNews > div > ul {
  transition: transform 0.5s;
}

.scroll-list {
  height: 25px;
}

.scrollNews > div {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.scrollNews ul > li {
  line-height: 25px;
  overflow: hidden;
  white-space: nowrap;
}
.icon-hanbaobao {
  font-size: 18/20rem;
  margin-right: 4/20rem;
}

.swiper-box {
  a {
    display: block;
    height: 150px;
    img {
      width: 100%;
    }
  }
}

.login {
  height: 1.6rem;
  text-align: right;
  padding: 0.3rem 10/20rem;
  background: #fff;
  position: relative;
  z-index: 10;
  margin-top: 40/20rem;
  box-shadow: 0 12px 43px -15px #aaa;
  > a {
    text-decoration: none;
    > button {
      padding: 0.2rem;
      border-radius: 0.6rem;
      background: none;
      text-align: center;
      width: 3rem;
      border: 1px solid #fff;
      height: 1.1rem;
      box-shadow: 0 6px 23px -4px #aaa;
      outline: none;
      /*behavior: url(../../../static/images/ie-css3.htc);*/
    }
  }
  img {
    width: 24/20rem;
  }
}

.swiper_group {
  width: 100%;
  position: relative;

  .banner-item {
    width: 100%;
  }
}

@color: #d1506d;
.mu-appbar {
  position: fixed;
  top: 0;
  background: url("@{public_img}/images/blue.png");
  color: #fff;
  height: 2rem;
  text-align: center;
  z-index: 12;
  > p {
    display: inline-block;
    text-align: center;
    font-weight: 100;
  }
}

.mu-appbar img {
  float: right;
  width: 1rem;
  height: 0.8rem;
  margin-top: -1.4rem;
}

.view-tabs {
  background-color: rgb(247, 247, 247);
  color: rgba(0, 0, 0, 0.87);
  height: 46px;
  display: flex;
  > .mu-tab-link {
    color: rgba(102, 102, 102, 1);
    flex: 1;
    width: 20%;
  }
  > .mu-tab-active {
    color: @color;
  }
}

.im {
  width: 20/20rem;
  height: 100%;

  > img {
    margin-top: 8/20rem;

    width: 27/46.875rem;
    margin-left: 30/46.875rem;
  }
}

.announcement {
  height: 30/20rem;
  /*position: absolute;
    left: 0;
    bottom: 0;*/
  display: flex;
  z-index: 1;
  // box-shadow:0 0.1rem 32px 0px #aaa;
  color: #000;
  background: #f2f2f2;

  > div:nth-of-type(2) {
    /* padding: 0.2rem 0 2/20rem;*/
    width: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;
    p {
      white-space: nowrap;
    }
  }
}

.announcement .text {
  width: 270/20rem;
  margin-left: 0.5rem;
  font-size: 12/20rem;
}

.announcement .manly {
  width: 0.5rem;
  height: 0.5rem;
  border-bottom: 1px solid #a39898;
  border-left: 1px solid #a39898;
  transform: rotate(-135deg);
  /*	margin-top: 0.1rem;*/
}

.juzho {
  width: 11rem;
  margin: 10rem auto;
}

.white2 {
  background: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  position: relative;
  z-index: 9999;
}

.white2 p {
  text-align: center;
  color: #7f7f7f;
  font-size: 0.8rem;
  margin: 0.5rem auto;
}

.white2 div {
  border-top: 1px solid #eeeeee;
  text-align: center;
  margin: 0 -0.5rem;
}

.white2 div button {
  border-radius: 5px;
  width: 4.5rem;
  height: 1.5rem;
  border: none;
  margin: 0.5rem auto;
}

.white2 div button:first-child {
  background: #0857d8;
  color: #dfdfdf;
}

.white2 div button:nth-child(2) {
  color: #d7e4f8;
  background: #707070;
}

.headList {
  text-align: center;
  padding: 0 3/20rem 3/20rem 3/20rem;
  .ali_pc {
    width: 30/20rem;
    background-repeat: no-repeat;
    height: 20/20rem;
    background-size: 20/20rem 20/20rem;
  }
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d6e0ea;
    padding: 5/20rem;
    > a {
      color: #245da0;
    }
  }
}
.gameClass {
  background-color: #f2f2f2;
  display: inline-block;
  .game_list {
    font-size: 0;
    // height: 284/20rem;
    h5 {
      font-size: 10/20rem;
      font-weight: 100;
      margin: 4/20rem 0;
    }
    button {
      position: relative;
      margin: 0;
      background-color: rgba(0, 0, 0, 0);
      outline: 0;
      margin-top: 0.6rem;
      padding: 0;
    }
    > li:nth-of-type(1),
    > li:nth-of-type(2),
    > li:nth-of-type(3),
    > li:nth-of-type(4) {
      border-top: 1px solid #d3d3d3;
    }
    li:nth-of-type(2) {
      img {
        height: 55.44/20rem;
      }
    }
    > li {
      background-color: #ffffff;
      /*  padding-top: 15/20rem;*/
      height: 220/46.875rem;
      font-size: 12/20rem;
      float: left;
      text-align: center;
      border-right: 1px solid #d3d3d3;
      border-bottom: 1px solid #d3d3d3;
      width: 25%;
      box-sizing: border-box;
      margin-top: 0.01rem;
      img {
        width: 110/40rem;
      }
      i {
        width: 1.2rem;
        height: 1.2rem;
        display: inline-block;
        background: url("@{public_img}/images/hotag.png") no-repeat;
        background-size: 100% 100%;
        position: absolute;
        right: 0.2rem;
        top: -0.5rem;
      }
    }
    > li:nth-of-type(5),
    > li:nth-of-type(6),
    > li:nth-of-type(7),
    > li:nth-of-type(8),
    > li:nth-of-type(9),
    > li:nth-of-type(10),
    > li:nth-of-type(11),
    > li:nth-of-type(12) {
      border-top: none;
    }
  }
  > div {
    > div {
      > div:nth-last-of-type(1) {
        > ul {
          border-bottom-left-radius: 11/20rem;
          border-bottom-right-radius: 11/20rem;
        }
      }
      > div {
        background: #f8f9fb;
        > a {
          width: 100%;
          display: inline-block;
          padding-top: 36/47rem;
          padding-bottom: 25/47rem;
          border-bottom: 1px solid #eee;
          .gametitle {
            float: left;
            padding-left: 26/47rem;
            div:nth-child(1) {
              height: 31/47rem;
              line-height: 31/47rem;
              margin-bottom: 15/47rem;
              margin-top: 1/20rem;
              border-left: 10/47rem solid #439df3;
              span:nth-child(1) {
                display: inline-block;
                font-weight: bold;
                height: 100%;
                margin: 0 25/47rem 0 15/47rem;
                font-size: 30/47rem;
                width: 4.1rem;
              }
              span:nth-child(2) {
                font-size: 22/47rem;
                text-align: left;
              }
            }
            div:nth-child(2) {
              line-height: 41/47rem;
              font-size: 25/47rem;
              font-weight: bold;
              color: #2967d8;
              > span {
                margin-left: 15/47rem;
              }
            }
          }
          > div {
            float: right;
            color: #272727;
            font-size: 12px;
            border-radius: 10/47rem 0 0 10/47rem;
            overflow: hidden;
            > span {
              display: block;
              color: #fff;
              text-align: center;
              padding: 3/20rem 18/47rem;
            }
            > span:nth-child(1) {
              background: #449df7;
              line-height: 27/47rem;
            }
            > span:nth-child(2) {
              background: #2f64d4;
              line-height: 27/47rem;
              font-size: 32/47rem;
            }
          }
        }
      }
    }
  }
}

header {
  //  justify-content: center;
  position: fixed;
  padding-left: 18/20rem;
  color: white;
  z-index: 99;
  width: 100%;
  height: 39/20rem;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.7);
  h1 {
    float: left;
    margin: 0;
    font-size: 20/20rem;
    color: white;
    font-weight: 100;
    img {
      width: 138/20rem;
    }
  }
  .header_login {
    padding: 3/20rem 0;
    text-align: right;
    button:nth-of-type(1) {
      float: right;
      height: 32/20rem;
      margin: 1/20rem 6/20rem 0 6/20rem;
    }
    button:nth-of-type(2) {
      height: 32/20rem;
      float: right;
      margin-top: 1/20rem;
    }
    button {
      border-radius: 0.3rem;
      text-align: center;
      padding: 0 8/20rem;
      outline: none;
      border: 1px solid #2754b2;
      outline: none;
      font-size: 14/20rem;
      color: white;
      background-color: #2b5cc3;
      > div {
        > span:nth-of-type(2) {
        }
        > span:nth-of-type(1) {
        }
      }
    }
    img {
      /*width: 20/20rem;
        margin-right: 3/20rem;
        height: 24/20rem;*/
    }
    .username {
      font-size: 14/20rem;
      /*  width: 150/46.875rem;*/
      height: 60/46.875rem;

      text-overflow: ellipsis;
      display: inline-block;
      overflow: hidden;
      background-color: #2b5dc4;
      border-radius: 0.2rem;
      border: 2/20rem solid #2858b7;
      padding: 0.3rem;
      > img {
        // width: 0.70rem;
        height: 14/20rem;
        margin-top: -0.6rem;
        margin-right: 0.2rem;
      }
    }
  }
  .header_login {
    > * {
      display: inline-block;
    }
  }
}

.zzc {
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  height: 100%;
  position: fixed;
  width: 100%;
  z-index: 99;
}

.recommend_nav {
  .swiper-box {
    margin-top: 12/20rem;

    > div {
      height: 89/20rem;
    }
  }

  .nav_list_group {
    font-size: 0;
  }

  .nav_list {
    font-size: 12/20rem;
    display: inline-block;
    width: 24.5%;
    text-align: center;
    span {
      display: block;
      position: relative;
    }
    h6 {
      width: 50px;
      height: 50px;
      margin: 0;
      display: inline-block;
      background-size: 100% 100%;
      background-position: center;
    }
    > div {
      > a {
        > img {
          height: auto;
        }
        span {
          color: #333;
        }
      }
    }
  }

  img {
    width: 40/20rem;
  }
  .swiper-pagination {
    margin-bottom: -9/20rem;
  }
}

.alert_right {
  position: absolute;
  right: 0.2rem;
  top: 2.2rem;
  background: #fff;
  color: #151515;
  border-radius: 0.2rem;
  li {
    width: 8.5rem;
    text-align: left;
    line-height: 1.5rem;
    font-size: 12/20rem;
    border-bottom: 1px solid #ccc;
    padding-left: 1.7rem;
    > img {
      margin-right: 0.5rem;
      width: 0.4rem;
      float: right;
      margin-top: 0.4rem;
    }
  }
  .money {
    display: flex;
    justify-content: space-between;
    padding-right: 3/20rem;
  }
}
.alert_right {
  > li:nth-of-type(1) {
    background: url("@{public_img}/images/usergr.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
    span {
      color: #385efd;
    }
  }
  > li:nth-child(2) {
    background: url("@{public_img}/images/czhi.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(3) {
    background: url("@{public_img}/images/qu_kuan.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(4) {
    background: url("@{public_img}/images/xzhu.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(5) {
    background: url("@{public_img}/images/xzjjl.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(6) {
    background: url("@{public_img}/images/kjjl.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(7) {
    background: url("@{public_img}/images/music.png") no-repeat 0.3rem 0.2rem;
    background-size: 48/46.875rem 48/46.875rem;
    position: relative;
  }
  > li:nth-child(8) {
    background: url("@{public_img}/images/grule.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(9) {
    background: url("@{public_img}/images/lxi.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(10) {
    background: url("@{public_img}/images/tchu.png") no-repeat 0.3rem 0.2rem;
    background-size: 46/46.875rem 46/46.875rem;
  }
}

.alert_right:before {
  content: "";
  width: 0;
  height: 0;
  border-bottom: 0.55rem solid #fff;
  border-right: 0.55rem solid transparent;
  border-left: 0.55rem solid transparent;
  border-top: 0.55rem solid transparent;
  position: absolute;
  right: 0.3rem;
  top: -1.1rem;
}

.mask {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  height: 100%;
  z-index: 10;
}

.open_lottery {
  width: 74/20rem;
}

button {
  border: 0;
  background-color: none;
}

.foot_swiper {
  // margin-bottom: 30/20rem;
  > h4 {
    font-size: 32/46.875rem;
    margin-top: 10/46.875rem;
    margin-bottom: 6/20rem;
    padding-left: 10/20rem;
  }
  .swiper_activey {
    overflow-x: scroll;
  }
  ul {
    display: flex;
    > li {
      display: inline-block;
      text-align: center;
    }
  }
}

.swiper-box_b {
  margin-bottom: 20/20rem;
  padding-left: 10/20rem;
  height: 100/20rem !important;
  z-index: 9;
  .img_swiper {
    /*width: 140/20rem;
      height: 98/20rem;*/
    width: 330/46.875rem;
    background-size: contain;
    // overflow: hidden;
    border-top-left-radius: 5/20rem;
    border-top-right-radius: 5/20rem;
    z-index: 0 !important;
    background-repeat: no-repeat;
  }
  span {
    display: block;
    /*padding: 4/20rem 0;*/
    width: 330/46.875rem;
    height: 40/46.875rem;
    font-size: 25/46.875rem;
    /*margin-top: -20/20rem;*/
    text-align: center;
    color: black !important;
    background-color: #e4e4e4;
    border-bottom-left-radius: 5/20rem;
    border-bottom-right-radius: 5/20rem;
    border: 1px solid #cccccc;
    border-top: none;
  }
}
.logo {
  margin-top: 2/20rem;
  margin-left: -10/20rem;
}
.twoswiper {
  width: 174/23.475rem !important;
}
.footView {
  width: 100%;
  height: 130/23.4375rem;
  /*background-color: #2a2a2a;*/
  /*	margin-top: 1.2rem;*/
  > div:nth-child(1) {
    text-align: center;
    padding-top: 52/46.875rem;
    > img {
      width: 664/46.875rem;
    }
  }
  > div:nth-child(2) {
    width: 100%;
    margin-top: 0.8rem;
    > p {
      text-align: center;
      font-size: 24/46.875rem;
      color: #7c7c7c;
    }
  }
}

.chooseBan {
  width: 100%;
  height: 70/46.875rem;
  background-color: #f2f2f2;
  line-height: 70/46.875rem;
  > a {
    display: inline-block;

    color: #acacac;
    font-size: 0.5rem;
  }
  > a:nth-child(1) {
    margin-left: 3rem;
  }
  a:nth-child(2) {
    color: black;
    margin-left: 2rem;
  }
  a:nth-child(3) {
    margin-left: 2rem;
  }
}
.ggHeader {
  height: 100/46.875rem;
  width: 100%;
  position: fixed;
  z-index: 100000;
  > div {
    float: left;
  }
  > div:nth-child(1) {
    height: 100%;
    width: 515/46.875rem;
    background-color: #282828;
    div {
      float: left;
    }
    > div:nth-child(1) {
      width: 33/46.875rem;
      height: 33/46.875rem;
      margin-left: 0.5rem;
      line-height: 100/46.875rem;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > div:nth-child(2) {
      width: 75/46.875rem;
      height: 79/46.875rem;
      margin-left: 0.8rem;

      margin-top: 0.3rem;
      /*margin-top: -0.4rem;*/
    }
    > div:nth-child(3) {
      // 		width:228/46.875rem;
      width: 6.864rem;
      line-height: 100/46.875rem;
      margin-left: 0.5rem;
      > p:nth-child(1) {
        /*     margin-top: 0.2rem;*/
        color: #ffffff;
        font-size: 12/20rem;
      }
      > p:nth-child(2) {
        color: #c0c0c0;
        font-size: 8/20rem;
      }
    }
  }
  div:nth-child(2) {
    height: 100%;
    width: 235/46.875rem;
    background-color: #0b76fa;
    text-align: center;
    color: #ffffff;
    line-height: 100/46.875rem;
    font-size: 14/20rem;
    /*line-height:100/46.875rem;*/
  }
}
.jin_qin_qi_dai {
  z-index: 9;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  .centerwen {
    width: 585/46.875rem;
    height: 340/46.875rem;
    position: absolute;
    left: 50%;
    margin-left: -585/46.875/2rem;
    top: 36%;
    background-color: #ffffff;
    overflow: hidden;
    border-radius: 0.2rem;
    > div:nth-child(1) {
      width: 100%;
      height: 90/46.875rem;
      background: #146cdc;
      line-height: 90/46.875rem;
      text-align: center;
      color: white;
      font-size: 36/46.875rem;
      position: relative;
      span {
        width: 45/46.875rem;
        height: 45/46.875rem;
        position: absolute;
        display: inline-block;
        right: 0.5rem;
        top: -0.1rem;
        color: #fff;
        > img {
          width: 100%;
          height: 100%;
        }
      }
    }
    div:nth-child(2) {
      width: 90%;
      margin: 2% 5%;
      height: 135/46.875rem;
      text-align: justify;
      overflow: hidden;
    }
    div:nth-child(3) {
      margin: 0 auto;
      width: 180/46.845rem;
      height: 70/46.875rem;
      background: #146cdc;
      color: white;
      font-size: 28/46.875rem;
      text-align: center;
      line-height: 70/46.875rem;
      border-radius: 0.2rem;
    }
    p {
      font-size: 26/46.875rem;
      margin-left: 1.5rem;
      i {
        color: red;
      }
    }
    a {
      display: inline-block;
      width: 180/46.875rem;
      height: 70/46.875rem;
      border-radius: 0.2rem;
      text-align: center;
      line-height: 70/46.875rem;
      font-size: 28/46.875rem;
      color: #ffffff;
      margin-top: 0.5rem;
      margin-left: 1.5rem;
    }
    .tkljright {
      background: #a2a2a2;
    }
    .tkljleft {
      background: #2e65d4;
    }
  }
}

.jin_qin_qi_daifirst {
  z-index: 9;
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  .jinriday {
    width: 90%;
    margin-top: 50%;
    height: 250/46.875rem;
    border-radius: 4/20rem;
    position: relative;
    box-shadow: 2/20rem 2/20rem 3/20rem rgba(0, 0, 0, 0.6);
    background: #ffffff;

    > img {
      position: absolute;
      top: -35/20rem;
      right: 0;
      width: 30/20rem;
    }
    .ignorerigft {
      height: 120/46.875rem;
      width: 100%;
      background-color: #eef4ff;
      line-height: 160/46.875rem;
      text-align: center;
      color: #3fa7fd;
      border-top-left-radius: 4/20rem;
      border-top-right-radius: 4/20rem;
    }
    a {
      display: inline-block;
      width: 180/46.875rem;
      height: 70/46.875rem;
      border-radius: 0.2rem;
      text-align: center;
      line-height: 70/46.875rem;
      font-size: 28/46.875rem;

      margin-top: 0.5rem;
      margin-left: 2.2rem;
    }
    .tkljright {
      background: #ffffff;
      color: #3fa7fd;
      border: 1px solid #3fa7fd;
      box-shadow: 2/30rem 2/30rem 3/30rem rgba(0, 0, 0, 0.6);
    }
    .tkljleft {
      background: #3fa7fd;
      color: #ffffff;
    }
  }
}

.emulate-ios-button {
  display: block;
  width: 2rem;
  height: 1rem;
  background: #ccc;
  border-radius: 5rem;
  cursor: pointer;
  position: relative;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  position: absolute;
  right: 0.5rem;
  top: 0.3rem;
}

/* ==========================================================================
                    设置伪类,来实现模拟滑块滑动,过渡用了transition来实现 ,
                    translateZ来强制启用硬件渲染
       ========================================================================== */

.emulate-ios-button:after {
  content: "";
  display: block;
  width: 0.9rem;
  height: 0.9rem;
  border-radius: 100%;
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  position: absolute;
  left: 0.05rem;
  top: 0.05rem;
  -webkit-transform: translateZ(0);
  transform: translateZ(0);
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  z-index: 1;
}

.emulate-ios-button:active:after {
  width: 1.1rem;
}

/* ==========================================================================
                    设置raw-checkbox,视觉直观比较
       ========================================================================== */
.raw-checkbox {
  height: 1rem;
  width: 2rem;
  position: absolute;
  right: 0.5rem;
  top: 0.3rem;
  z-index: 10;
  opacity: 0;
}

.raw-checkbox:checked + label {
  background: #146cdc;
}

/* 这里是伪元素偏移,初始是0.9+0.05 ,所以这里1.05rem */
.raw-checkbox:checked + label:after {
  left: 1.05rem;
}

.raw-checkbox:checked + label:active:after {
  left: 0.5rem;
}

.raw-checkbox:disabled + label {
  background: #d5d5d5;
  pointer-events: none;
}

.raw-checkbox:disabled + label:after {
  background: #bcbdbc;
}
.hot-games {
  position: absolute;
  width: 28px !important;
  top: -15px;
  right: -6px;
}
.foot_swiper ul {
  display: inline-flex !important;
}
</style>
