import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const myInfo = () => import("../views/My/my-info");

const myPassword = () => import("../views/My/my-password");

const myCenter = () => import("../views/My/my-center");

const ag = () => import("../views/My/my-AG");

const mg = () => import("../views/My/my-mg");

const qpHistory = () => import("../views/My/qphistory");

const dzHistory = () => import("../views/My/dzHistory");

const realHistory = () => import("../views/My/realHistory");

const myHistory = () => import("../views/My/my-histroy");

const sport = () => import("../views/My/my-sport");

const chess = () => import("../views/My/my-chess");

const sportHistory = () => import("../views/My/sportHistory");

const fish = () => import("../views/My/my-fish");

const fishHistory = () => import("../views/My/fishHistory");

const my = () => import("../views/My/my");

const game99 = () => import("../views/My/game_99");

const weihu = () => import("../views/My/weihu");

const order = () => import("../views/Order/order");

const addbank = () => import("../views/Order/my_money");

const aliPay = () => import("../views/Order/aliPay");

const handPay = () => import("../views/Order/handPay");

const zf = () => import("../views/Order/zf");

const todayBuyColor = () => import("../views/today/buy-color");

const todayWinning = () => import("../views/today/winning");

const myHistroy = () => import("../views/My/my-histroy");

const todayRule = () => import("../views/Today/rule");

const noticedetails = () => import("../views/today/noticedetails");

const noticeCenter = () => import("../views/today/noticeCenter");

const noticeCentermys = () => import("../views/today/noticeCentermys");

const noticeCentermy = () => import("../views/today/noticeCentermy");

const kefu = () => import("../views/today/kefu");

const passwordZ = () => import("../views/password/password-z");

const passwordD = () => import("../views/password/password-d");
const myService = () => import("../views/My/my-service");
const changePwd = () => import("../views/My/changePwd");
const myAbout = () => import("../views/My/my-about");
const trend = () => import("../views/trend/trend");
const activityly1 = () => import("../views/activity/activityly1");
const activityfh1 = () => import("../views/activity/activityfh1");
const activityfh2 = () => import("../views/activity/activityfh2");
const Activity2 = () => import("../views/activity/activity2");
const Activity3 = () => import("../views/activity/activity3");
const activitylv3 = () => import("../views/activity/activitylv3");
const activitylv4 = () => import("../views/activity/activitylv4");
const sdhd = () => import("../views/activity/sdhd");
const zfbhd = () => import("../views/activity/zfbhd");
const ucfan = () => import("../views/activity/ucfan");
const Activity5 = () => import("../views/activity/activity5");
const newyear = () => import("../views/activity/newyear");
const newyearuc = () => import("../views/activity/newyearuc");
const newyearuc2 = () => import("../views/activity/newyearuc2");
const sevneuc = () => import("../views/activity/sevneuc");
const hbuc = () => import("../views/activity/hbuc");
const yuanxiaouc = () => import("../views/activity/yuanxiaouc");
const yuanxiaoct = () => import("../views/activity/yuanxiaoct");
const newyearpn = () => import("../views/activity/newyearpn");
const yuanxiaoly = () => import("../views/activity/yuanxiaoly");
const newyearlv = () => import("../views/activity/newyearlv");
const lvlh = () => import("../views/activity/lvlh");
const lvmqdfs = () => import("../views/activity/lvmqdfs");
const lvsczs = () => import("../views/activity/lvsczs");
const wechatuc = () => import("../views/activity/wechatuc");
const More = () => import("../views/activity/more");
const lottery = () => import("../views/activity/lottery");
const Signin = () => import("../views/activity/Signin");
const newyearsd = () => import("../views/activity/newyearsd");
const yuanxiaosd = () => import("../views/activity/yuanxiaosd");
const sdnewyear = () => import("../views/activity/sdnewyear");
const aliAG = () => import("../views/activity/aliAG");
const gdAG = () => import("../views/activity/gdAG");
const aliBuyuw = () => import("../views/activity/ali_buyuw");
const agcai = () => import("../views/activity/agcai");
const gdBuyuw = () => import("../views/activity/gd_buyuw");
const lvlhc = () => import("../views/activity/lvlhc");

const ucagent = () => import("../views/activity/ucagent");

const ucwy = () => import("../views/activity/ucwy");

const yrsc = () => import("../views/activity/yrsc");

const ttkaihuyouli = () => import("../views/activity/ttkaihu");

const ttlianyinjiajiang = () => import("../views/activity/ttlianyin");

/* const Index = () => import("../views/Index/index") */
const Index = () => import("../views/Index/index");

const Game55 = () => import("../views/Games/game_55");

const Game90 = () => import("../views/Games/game_90");

const Game551 = () => import("../views/Games/game_551");

const Game66 = () => import("../views/Games/game_66");

const Game60 = () => import("../views/Games/game_60");

const Game40 = () => import("../views/Games/game_40");

const Game401 = () => import("../views/Games/game_401");

const Game35 = () => import("../views/Games/game_35");

const Game30 = () => import("../views/Games/game_30");

const Game88 = () => import("../views/Games/game_88");

const Game881 = () => import("../views/Games/game_881");

const Game25 = () => import("../views/Games/game_25");

const Game20 = () => import("../views/Games/game_20");

const Game201 = () => import("../views/Games/game_201");

const Game15 = () => import("../views/Games/game_15");

const Test = () => import("../components/test");

let routes = [
  {
    path: "/index",
    component: Index
  },
  {
    path: "",
    redirect: "/index"
  },
  {
    path: "/game_55",
    component: Game55
  },
  {
    path: "/game_90",
    component: Game90
  },
  {
    path: "/game_551",
    component: Game551
  },
  {
    path: "/game_66",
    component: Game66
  },
  {
    path: "/game_60",
    component: Game60
  },
  {
    path: "/game_40",
    component: Game40
  },
  {
    path: "/game_401",
    component: Game401
  },
  {
    path: "/game_35",
    component: Game35
  },
  {
    path: "/game_30",
    component: Game30
  },
  {
    path: "/game_88",
    component: Game88
  },
  /*  {
    path: '/game_881',
    component: Game881
  }, */
  {
    path: "/game_25",
    component: Game25
  },
  {
    path: "/game_20",
    component: Game20
  },
  {
    path: "/game_201",
    component: Game201
  },
  {
    path: "/game_15",
    component: Game15
  },
  {
    path: "/my",
    component: my
  },
  {
    path: "/game99",
    component: game99
  },
  {
    path: "/weihu",
    component: weihu
  },
  {
    path: "/myInfo",
    component: myInfo
  },
  {
    path: "/myPassword",
    component: myPassword
  },
  {
    path: "/ag",
    component: ag
  },
  {
    path: "/mg",
    component: mg
  },
  {
    path: "/qpHistory",
    component: qpHistory
  },
  {
    path: "/realHistory",
    component: realHistory
  },
  {
    path: "/dzHistory",
    component: dzHistory
  },
  {
    path: "/sport",
    component: sport
  },
  {
    path: "/chess",
    component: chess
  },
  {
    path: "/agcai",
    component: agcai,
    query: "id"
  },
  {
    path: "/sportHistory",
    component: sportHistory
  },
  {
    path: "/fish",
    component: fish
  },
  {
    path: "/fishHistory",
    component: fishHistory
  },
  {
    path: "/myCenter",
    component: myCenter
  },
  {
    //历史走势
    path: "/pay:id",
    component: aliPay
  },
  {
    //游戏规则
    path: "/todayRule",
    component: todayRule
  },
  {
    //公告中心
    path: "/noticeCenter",
    component: noticeCenter
  },
  {
    //公告详情
    path: "/noticedetails/:id",
    component: noticedetails
  },
  {
    //消息中心
    path: "/noticeCentermy",
    component: noticeCentermy
  },
  {
    //消息详情
    path: "/noticeCentermys:index",
    component: noticeCentermys
  },
  {
    path: "/handPay:zf",
    component: handPay
  },
  {
    path: "/login",
    component: require("../components/login/Login.vue")
  },

  {
    path: "/regist",
    component: require("../components/regist/regist.vue")
  },
  {
    // 资金管理
    path: "/order:id",
    component: order
  },
  {
    //未结明细
    path: "/todayBuyColor",
    component: todayBuyColor
  },
  {
    //今日已结
    path: "/todayWinning",
    component: todayWinning
  },
  {
    //注册
    path: "/myHistroy",
    component: myHistroy
  },
  {
    //修改支付密码
    path: "/passwordZ",
    component: passwordZ
  },
  {
    //修改银行卡
    path: "/addbank",
    component: addbank
  },
  {
    //修改登录密码
    path: "/passwordD",
    component: passwordD
  },
  {
    path: "/changePwd",
    component: changePwd
  },
  ,
  {
    path: "/myAbout",
    component: myAbout
  },
  {
    //客服
    path: "/myService",
    component: myService
  },
  {
    //历史走势
    path: "/trend:id",
    component: trend
  },
  {
    path: "/activityly1",
    component: activityly1
  },
  {
    path: "/activityfh1",
    component: activityfh1
  },
  {
    path: "/activityfh2",
    component: activityfh2
  },
  {
    path: "/activitylv3",
    component: activitylv3
  },
  {
    path: "/activitylv4",
    component: activitylv4
  },
  {
    path: "/activity2",
    component: Activity2
  },
  {
    path: "/activity3",
    component: Activity3
  },
  {
    path: "/activity5",
    component: Activity5
  },
  {
    path: "/zfbhd",
    component: zfbhd
  },
  {
    path: "/ucfan",
    component: ucfan
  },
  {
    path: "/sdhd",
    component: sdhd
  },
  {
    path: "/lottery",
    component: lottery
  },
  {
    path: "/Signin",
    component: Signin
  },
  {
    path: "/newyearsd",
    component: newyearsd
  },
  {
    path: "/yuanxiaosd",
    component: yuanxiaosd
  },
  {
    path: "/sdnewyear",
    component: sdnewyear
  },
  {
    path: "/aliAG",
    component: aliAG
  },
  {
    path: "/aliBuyuw",
    component: aliBuyuw
  },
  {
    path: "/gdBuyuw",
    component: gdBuyuw
  },
  {
    path: "/gdAG",
    component: gdAG
  },
  {
    path: "/newyear",
    component: newyear
  },
  {
    path: "/lvlh",
    component: lvlh
  },
  {
    path: "/lvmqdfs",
    component: lvmqdfs
  },
  {
    path: "/lvsczs",
    component: lvsczs
  },
  {
    path: "/lvlhc",
    component: lvlhc
  },
  {
    path: "/wechatuc",
    component: wechatuc
  },
  {
    path: "/newyearuc",
    component: newyearuc
  },
  {
    path: "/newyearuc2",
    component: newyearuc2
  },
  {
    path: "/sevneuc",
    component: sevneuc
  },
  {
    path: "/hbuc",
    component: hbuc
  },
  {
    path: "/yuanxiaouc",
    component: yuanxiaouc
  },
  {
    path: "/yuanxiaoct",
    component: yuanxiaoct
  },
  {
    path: "/newyearlv:index",
    component: newyearlv
  },
  {
    path: "/newyearpn",
    component: newyearpn
  },
  {
    path: "/yuanxiaoly",
    component: yuanxiaoly
  },
  {
    path: "/more",
    component: More
  },
  {
    path: "/kefu",
    component: kefu
  },
  {
    path: "/ucagent",
    component: ucagent
  },
  {
    path: "/ucwy",
    component: ucwy
  },
  {
    path: "/ttkaihu",
    component: ttkaihuyouli
  },
  {
    path: "/ttlianyin",
    component: ttlianyinjiajiang
  },
  {
    path: "/yrsc",
    component: yrsc
  },
  {
    path: "/zf:id",
    component: zf
  },
  {
    path: "/test",
    component: Test
  },
  {
    // 默认跳转到 '/index/recommend'
    path: "*",
    redirect: "/index"
  }
];
export default new Router({
  mode: 'history',
  routes
});
