<template>
  <div style="height:100%">
    <div class="header-sec">
      <div class="header_order">
        <i-header title="资金管理"></i-header>
      </div>
      <div class="bank">
        <div>
          <span>用户:</span>
          <i>{{gameUsername}}</i>
        </div>
        <div>
          <span>余额:</span>
          <i>￥{{gameUsermoney}}</i>
        </div>
      </div>
      <mu-tabs :value="activeTab" @change="handleTabChange">
        <mu-tab value="all" :title="Recharge" />
        <mu-tab value="obligation" :title="Withdraw" />
        <mu-tab value="paid" :title="transactionRecord" />
      </mu-tabs>
    </div>
    <div>
      <div class="payTab" v-if="activeTab ==='all'">
        <div class="order_title">
          在线支付 Online Payment
        </div>
        <div class="ban" @click="gotoPayAddress(onlinePay)" v-if="BankisCunzai.length>0">
          <img :src="$getPublicImg('/images/livepay.png')" alt="" />
          <p>网银在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(aliPay)" v-if="AliisCunzai.length>0">
          <img :src="$getPublicImg('/images/bao.png')" alt="" />
          <p>支付宝在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(wechatPay)" v-if="WechatisCunzai.length>0">
          <img :src="$getPublicImg('/images/weixin.png')" alt="" />
          <p>微信在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(CftPay)" v-if="CftisCunzai.length>0">
          <img :src="$getPublicImg('/images/qqqb.png')" alt="" />
          <p>QQ钱包在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(kjzfPay)" v-if="ZjzfisCunzai.length>0">
          <img :src="$getPublicImg('/images/kjzf.png')" alt="" />
          <p>快捷支付在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(jdPay)" v-if="jdisCunzai.length>0">
          <img src="/wap/images/jd.png" alt="" />
          <p>京东在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(ylPay)" v-if="ylisCunzai.length>0">
          <img src="/wap/images/wy.png" alt="" />
          <p>银联在线充值</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="order_title">
          线下支付 Offline Payment
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'bankpay_array')" v-if="lineBankisCunzai.length>0">
          <img :src="$getPublicImg('/images/livepay.png')" alt="" />
          <p>银行转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'alipay_array')" v-if="lineAliisCunzai.length>0">
          <img :src="$getPublicImg('/images/bao.png')" alt="" />
          <p>支付宝转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'wechat_array')" v-if="lineWechatisCunzai.length>0">
          <img :src="$getPublicImg('/images/weixin.png')" alt="" />
          <p>微信转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'cft_array')" v-if="lineCftisCunzai.length>0">
          <img :src="$getPublicImg('/images/qqqb.png')" alt="" />
          <p>QQ钱包转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'jdpay_array')" v-if="lineJdisCunzai.length>0">
          <img src="/wap/images/jd.png" alt="" />
          <p>京东转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
        <div class="ban" @click="gotoPayAddress(handPay,'yl_array')" v-if="lineYlisCunzai.length>0">
          <img src="/wap/images/wy.png" alt="" />
          <p>银联转账</p>
          <span class="pay-arrow-right-icon"></span>
        </div>
      </div>
      <div class="take_class" v-if="activeTab ==='obligation'">
        <div v-if="check&&!isBank" class="ban" style="text-align:center;" @click='tiaozhuan'>
          <a>
            <img :src="$getPublicImg('/images/ch.png')" alt="" />
          </a>
          <span>添加/删除银行账户</span>
        </div>
        <div v-if="isBank">
          <div class="js" @click='tiaozhuan'>
            <img :src="findBankListUrl(resDate.bank_name)" style="width:1.5rem;float:left;position:relative;top:0.2rem;" alt="" />
            <p>{{resDate.bank_name}}</p>
            <p>{{str}}</p>
            <a style="width: 1rem;display: inline-block;float: right;margin-top: -0.2rem;">
              <img style="width: 100%;" :src="$getPublicImg('/images/bangka.png')" alt="" />
            </a>
          </div>
          <div class="js1">
            <p>提现金额
              <!-- <span>({{nameMoney}}{{resDate.money}})</span> -->
              <span>({{resDate.money}})</span>
            </p>
            <p style="font-size:0.9rem">
              <span>¥</span><input type="number" placeholder="金额" v-model="payMoney" min="100" pattern="\d*" />
            </p>
          </div>
          <div class="js1">
            <p>提款密码</p>
            <p>
              <input style='padding:0' type="password" placeholder="请正确填写4位取款密码" v-model="paypassWd" onkeyup="this.value=this.value.replace(/\D/g,'')" />
            </p>
          </div>
        </div>
        <div class="btn2-container" v-if="isBank">
          <div class="btn1">
            <button class="color1" @click="submit2">确认提现</button>
          </div>
          <div class="btn2">
            <button @click='chongzhi'>重置金额</button>
          </div>
        </div>
      </div>
      <div class="cun_qu_list" v-if="activeTab ==='paid'" ref="historyM">
        <div class="demo-infinite-container" style="border:none;">
          <div class="cz_list" style="border-bottom:1px solid #E4E4E4">
            <span v-if="is_gd_ali != 'fulicai'" @click="game" style="color:#196fde">{{daywen}}</span>
            <span v-else style="color:#196fde">{{daywen}}</span>
            <!--<span>{{curSelectedDate}}</span>-->
            <span>{{ dateOptions.selectedDate }}</span>
            <!--<span><img :src="$getPublicImg('/images/data.png')" alt="" @click="datashow" class="img_data" style="filter:brightness(.2)" /></span>-->
            <span><img :src="$getPublicImg('/images/data.png')" alt="" class="img_data" style="filter:brightness(.2)" /></span>

            <mu-date-picker class="date-picker-x" v-model="dateOptions.selectedDate" :minDate="dateOptions.minDate" :maxDate="dateOptions.maxDate" :disableYearSelection="true"/>

            <ul>
              <li v-for="(item,key) in activeList" @click="list_lis(item)" ref="lis" v-show="lis" v-if="key!==daywen">{{key}}</li>
            </ul>
          </div>
          <div v-show="list.length==0" style="text-align:center;height:50px;line-height:50px;font-size:16px;">暂无数据....</div>
          <mu-list>
            <template v-if="item" v-for="item in list">
              <div class="js2" @click="isShowMoney1(item)">
                <p style="font-size:0.65rem;">{{getLocalTime(item.addtime)}}</p>
                <p style="color:#666" class="">{{getState(item)}}：{{item.money}}</p>
                <a>
                  <img :src="$getPublicImg('/images/28.png')" alt="" />
                </a>
                <span :class="checkTransactionStatus(item)">
                  {{parseInt(item.status) ? (parseInt(item.is_clear) ? "成功" : "失败") : ('等待审核')}}
                </span>
              </div>
              <mu-divider/>
            </template>
          </mu-list>
          <!-- <mu-infinite-scroll :scroller="scroller" :loading="loading" @load="loadMore" /> -->
        </div>
      </div>
    </div>
    <!--遮罩层开始-->
    <div class="zzc" v-if="isShowMoney">
      <div class="white">
        <div style="border-bottom: none;">
          <span id="x">
            <img :src="$getPublicImg('/images/guanb.png')" alt="" @click="qufan()" />
          </span>
        </div>
        <div class="clearfix">
          <div>
            交易记录详情
          </div>
          <p>交易单号：
            <span>{{singeMoney.order_code}}</span>
          </p>
          <p>交易时间：
            <span>{{getLocalTime(singeMoney.addtime)}}</span>
          </p>
          <p>交易方式：
            <span>{{parseInt(singeMoney.type_code) ? '取出': '存入' }}</span>
          </p>
          <p>
            交易状态：
            <span :class="checkTransactionStatus(singeMoney)">

              {{parseInt(singeMoney.status) ? (parseInt(singeMoney.is_clear) ? "成功" : "失败") : ('等待审核')}}
            </span>

          </p>
          <p v-html='singeMoney.context!== "" ? singeMoney.context  : "请联系客服"' :class="{'error': true,
                      'has-error': !parseInt(singeMoney.is_clear),
                      'no-error':parseInt(singeMoney.is_clear) }"></p>

          <p>交易金额：
            <span>{{singeMoney.money}}</span>
          </p>
          <button @click="qufan()" class="color1" style="color: rgb(255, 255, 255);">确认</button>
        </div>
      </div>
    </div>
    <promptbox @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
    <!--遮罩层结束-->
    <div style="position: absolute; left: 0; right: 0; top:0; bottom:0; background: rgba(0,0,0,0.5);z-index: 1000!important;" ref="div" v-if="showCurtion">
      <div class="loading">
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
    </div>
    <div v-show='isShowCalendar' class='mask1' @click="dateCancel"></div>
    <div v-show='isShowCalendar' class='dayshow'>
      <div class="dayheader color1">{{daydata}}</div>
      <div class="dayfoot">
        <div>
          <span @click="lastdata"></span>
          <span>{{yearyue}}</span>
          <span @click='nextdata'></span>
        </div>
        <div>
          <ul>
            <li style="margin-left: 1.2rem;">日</li>
            <li>一</li>
            <li>二</li>
            <li>三</li>
            <li>四</li>
            <li>五</li>
            <li>六</li>
          </ul>
          <ul>
            <li v-for='(item,index) in daycount' ref='tenli' class='lis' @click='selectDate(index, item)'>{{item}}</li>
          </ul>
        </div>
        <div>
          <a @click="dateCancel">取消</a>
          <a @click='dateConfirm'>确定</a>
        </div>
      </div>
    </div>
      <!--底部选择页-->
      <div v-show='isShowPagerNumPanel' class='mask1' @click="isShowPagerNumPanel=false" style="z-index: 101;top: 0;"></div>
      <div id="pager" v-show='isShowPager'>
        <div v-show="isShowPagerNumPanel">
          <ul>
            <li :class="index+1 == curPage ? 'selected-page-num' : ''"  v-for='(item,index) in totalPage' @click="toPage(index+1)">第{{index+1}}页
              <img  v-show="index+1==curPage"  :src="$getPublicImg('/images/goulszd.png')"/>
            </li>
          </ul>
        </div>
        <div v-show='pagenmb' :style="{'box-shadow':boxshadow}">
          <a @click='lastPage' ref='lastcolor'>上一页</a>
          <a @click='showPagerNumPanel'>第{{curPage}}页<i></i></a>
          <a @click='nextPage'>下一页</a>
        </div>
      </div>
  </div>
</template>

<script>
import iHeader from "../../components/i-header";
import promptbox from "../../components/promptbox";
import moment from 'moment'

export default {
  components: {
    iHeader,
    promptbox
  },
  data() {
    return {
      isAG: location.href.split("?")[1] == "GameName=AG" ? true : false,
      issport: location.href.split("?")[1] == "GameName=sport" ? true : false,
      ischess: location.href.split("?")[1] == "GameName=chess" ? true : false,
      isLo: location.href.split("?")[1] == "GameName=lo" ? true : false,
      isfish: location.href.split("?")[1] == "GameName=fish" ? true : false,
      // nameMoney:location.href.split('?')[1] == 'GameName=AG' ? 'AG余额' : '账户余额',
      transfre: "",
      daywen: "彩票游戏",
      activeList: {
        彩票游戏: 1,
        真人视讯: 2,
        体育游戏: 3,
        // 棋牌游戏: 4,
      },
      lis: false,
      is_gd_ali: is_gd_ali(),
      Recharge: "充值",
      Withdraw: "提现",
      transactionRecord: "交易记录",
      gameUsername: 0,
      gameUsermoney: 0,
      isChOrRu: 0,
      bankmin: 0,
      bankmin2: 100,
      bankmax2: 0,
      bankmax: 0,
      singeMoney: {},
      AliisCunzai: [],
      WechatisCunzai: [],
      BankisCunzai: [],
      CftisCunzai: [],
      ZjzfisCunzai: [],
      jdisCunzai: [],
      ylisCunzai: [],

      lineAliisCunzai: [],
      lineWechatisCunzai: [],
      lineBankisCunzai: [],
      lineCftisCunzai: [],
      lineZjzfisCunzai: [],
      lineJdisCunzai: [],
      lineYlisCunzai: [],
      
      isShowMoney: 0,
      list: [],
      page: 0,
      zongshu: 0,
      number: 100,
      num: 10,
      loading: false,
      // scroller: null,
      resDate: {},
      resDateBank: [],
      resDateAli: [],
      resDateWechat: [],
      resDateHand: {},
      paypassWd: "",
      payMoney: null,
      isBank: false,
      aliPayId: "",
      wechatPayId: "",
      jdPayId: "",
      ylPayId: "",
      onlinePayId: "",
      payId: "",
      onlinePay: 55,
      wechatPay: 66,
      jdPay: 22,
      ylPay: 33,
      CftPay: 88,
      handPay: "handPay",
      aliPay: 77,
      activeTab: "all",
      panelShow: false,
      title: "",
      kjzfPay: 99,
      str: null,
      nowday: "本月",
      check: true,
      banHeight: "0rem",
      transtionwechatPay: false,
      transtionjdPay: false,
      transtionylPay: false,
      transtionaliPay: false,
      transtiononlinePay: false,
      transtionCftPay: false,
      currentBankListImageUrl: "",
      showCurtion: true,
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      promptsystem: "",
      math: Math.random().toFixed(2),
      isShowCalendar: false,
      daydata: "",
      tempDaydata: "",
      tempDaynian: "",
      tempDayyue: "",
      tempDaytian: "",
      curSelectedDate: '',
      yearyue: "",
      daycount: "",
      daytian: "",
      dayday: '',
      bankList: [
        {
          bankName: "工商",
          url: "bank_gs.png"
        },
        {
          bankName: "建设",
          url: "bank_js.png"
        },
        {
          bankName: "农业",
          url: "bank_ny.png"
        },
        {
          bankName: "邮政",
          url: "bank_yz.png"
        },
        {
          bankName: "中国银行",
          url: "bank_zgyh.png"
        },
        {
          bankName: "招商",
          url: "bank_zs.png"
        },
        {
          bankName: "中信",
          url: "bank_zx.png"
        },
        {
          bankName: "广发",
          url: "bank_gf.png"
        },
        {
          bankName: "民生",
          url: "bank_ms.png"
        },
        {
          bankName: "兴业",
          url: "bank_xy.png"
        },
        {
          bankName: "华夏",
          url: "bank_hx.png"
        },
        {
          bankName: "光大",
          url: "bank_gd.png"
        },
        {
          bankName: "渤海",
          url: "bank_bh.png"
        },
        {
          bankName: "北京农商",
          url: "bank_ns.png"
        },
        {
          bankName: "上海",
          url: "bank_sh.png"
        },
        {
          bankName: "浦发",
          url: "bank_pf.png"
        },
        {
          bankName: "平安",
          url: "bank_pa.png"
        },
        {
          bankName: "交通",
          url: "bank_jt.png"
        },
        {
          bankName: "OTHER",
          url: "bank_default.png"
        }
      ],

      dayOfWeek: ['周日','周一','周二','周三','周四','周五','周六'],
      isPressedChoiceDay: false,

      totalPage: 1,
      curPage: 1,
      pageSize: 30,

      userOid: '',

      TAB_DEPOSIT: 0,        // 充值
      TAB_WITHDRAW: 1,       // 提现
      TAB_TRANSACTION: 2,    // 交易记录

      GAME_NAME_LO: 'Lo',         // 彩票
      GAME_NAME_AG: 'AG',         // AG
      GAME_NAME_SPORT: 'sport',   // 体育
      GAME_NAME_CHESS: 'chess',   // 棋牌
      GAME_NAME_FISH: 'fish',     // 捕鱼

      cruGameName: 'Lo',

      isShowPager: false,
      isShowPagerNumPanel: false,
      pagenmb: true,
      pays:[],
      payss:'',

      boxshadow: '',

      // 交易记录的时间
      dateOptions: {
        minDate: moment().add(-6, 'days').format('YYYY-MM-DD'),// 可选择的最小时间
        maxDate: moment().format('YYYY-MM-DD'),// 可选择的最大时间
        selectedDate: moment().format('YYYY-MM-DD'),// 选中的时间,格式如:'2010-01-01'
      }
    };
  },
  watch: {
    // 交易记录的日期一更改就请求对应的数据
    'dateOptions.selectedDate'(val) {
      this.getTransactionData({
        date: val,
        number: 30,
      })
    },
    activeTab(val) {
      if (val == 'paid') {
        this.list = []// 切换TAB时清空数据
      }
    }
  },
  mounted() {
    // this.scroller = this.$refs.historyM;
  },
  beforeCreate() {
    let params = {};
    this.userOid = sessionStorage.getItem('im_token');
    params.oid = this.userOid;
    this.$http
      .post(`${getUrl()}/getinfo/money`, JSON.stringify(params))
      .then((res) => {
        this.gameUsername = res.data.username;
        this.str = res.data.bank_code || '';
        sessionStorage.setItem(
          "im_bankcode",
          JSON.stringify(res.data.bank_code)
        );
        var reg = /^(\d{4})(\d*)(\d{4})$/;
        this.str = this.str.replace(reg, function(a, b, c, d) {
          return b + c.replace(/\d/g, "*") + d;
        });
        if (res.data.msg == "4001") {
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
          this.gameUsername = res.data.username;
          this.resDate = res.data;
          this.resDate.money = res.data.money;
          if (this.resDate.bank_code) {
            this.isBank = true;
          }
        }
      });

    this.$http
      .post(`${getUrl()}/user/newPayin`, JSON.stringify(params))
      .then(res => {
        this.showCurtion = false;
        this.successshow = false;
        if (res.data.msg == "4001") {
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
          let types = res.data.online_pay_limit;
          for (let i = 0; i < types.length; i++) {
            this.pays.push(types[i].pay_type)
            if(types[i].pay_type == 0){
               this.BankisCunzai.push(types[i])
            }
            if(types[i].pay_type == 1){
               this.AliisCunzai.push(types[i])
            }
            if(types[i].pay_type == 2){
               this.WechatisCunzai.push(types[i])
            }
            if(types[i].pay_type == 3){
               this.CftisCunzai.push(types[i])
            }
            if(types[i].pay_type == 4){
               this.ZjzfisCunzai.push(types[i])
            }
            if(types[i].pay_type == 6){
               this.ylisCunzai.push(types[i])
            }
            if(types[i].pay_type == 7){
               this.jdisCunzai.push(types[i])
            }

          }
          let typess = res.data.linedown_pay_limit;
          for (let j = 0; j < typess.length; j++) {
            console.log(typess[j].pay_type)
            if(typess[j].pay_type == 0){
               this.lineBankisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 1){
               this.lineAliisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 2){
               this.lineWechatisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 3){
               this.lineCftisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 4){
               this.lineBankisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 6){
               this.lineYlisCunzai.push(typess[j])
            }
            if(typess[j].pay_type == 7){
               this.lineJdisCunzai.push(typess[j])
            }
            
          }
        
          // this.lineAliisCunzai = res.data.alipay_array;
          // this.lineWechatisCunzai = res.data.wechat_array;
          // this.lineBankisCunzai = res.data.bankpay_array;
          // this.lineCftisCunzai = res.data.cft_array;
          // this.resDateBank = res.data.online_bank;
          // this.resDateAli = res.data.online_alipay;
          // this.resDateWechat = res.data.online_wechat;
          // this.BankisCunzai = res.data.online_bank;
          // this.AliisCunzai = res.data.online_alipay;
          // this.CftisCunzai = res.data.online_cft;
          // this.WechatisCunzai = res.data.online_wechat;
          // this.ZjzfisCunzai = res.data.online_quickpay;
          // this.bankmin = Number(res.data.moneylimit.bankmin);
          // this.bankmax = Number(res.data.moneylimit.bankmax);
        }
      });

  },
  created() {
    this.openChessOrNot()// 是否要开启棋牌的交易记录
    this.cruGameName = this.$route.query.GameName || this.GAME_NAME_LO;
    this.isChOrRu = this.$route.params.id.split(":")[1];
    this.isShowPager = this.TAB_TRANSACTION == this.isChOrRu;
    this.userOid = sessionStorage.getItem('im_token');
    let myDate = new Date();
    this.daytian = myDate.getDate();
    this.dayday = myDate.getDate();
    if (this.daytian < 7) {
      this.l = this.daytian;
      this.yesyue = 7 - this.l;
    } else {
      this.l = 7;
    }
    let year = myDate.getFullYear();
    let month = myDate.getMonth() + 1;
    let monthday = myDate.getDate();
    this.daycount = new Date(year, month, 0).getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (monthday < 10) {
      monthday = "0" + monthday;
    }
    this.nowday = myDate.getFullYear() + "-" + month + "-" + monthday;
    let dayday = this.dayOfWeek[myDate.getDay()];
    this.dayyue = String(myDate.getMonth() + 1);
    this.dayyue1 = String(myDate.getMonth() + 1);
    this.daynian = String(myDate.getFullYear());
    this.daydata =
      String(myDate.getMonth() + 1) +
      "月" +
      String(myDate.getDate()) +
      "日" +
      dayday;
    this.yearyue = this.daynian + "年" + this.dayyue + "月";

    let params = {};
    params.oid = this.userOid;
    if (this.isAG) {
      this.daywen = "真人视讯";
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
    } else if (this.issport) {
      this.daywen = "体育游戏";
      this.$http
        .post(`${getUrl()}/user/getSportsBalance`, JSON.stringify(params))
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
            this.gameUsermoney = Number(res.data.balance).toFixed(2);
            this.resDate.money = Number(res.data.balance).toFixed(2);
          } else if (res.data.msg == 7001) {
            this.erreocode = "7001";
            this.panelShow = true;
            this.promptsystem = res.data.info;
          }
        });
    } else if (this.isfish) {
      // else if(this.ischess){
      //   this.daywen = "棋牌游戏"
      //   this.$http.post(`${getUrl()}/Wh_H5_Api/getWhInfo`, JSON.stringify(params)).then(res => {
      //     console.log(res)
      //     this.successshow=false
      // 			if(res.data.msg=='4003'){
      //       		this.$router.push({
      //           	path: '/weihu'
      //         })
      //      }
      //      this.showCurtion = false;
      // 		 if(res.data.msg == 4001){
      // 	          sessionStorage.clear();
      // 	          this.panelShow = true;
      // 	          this.promptboxtext = "您的账户已失效，请重新登录";
      // 	          setTimeout(() => {
      // 	            this.panelShow = false;
      // 	            this.$router.push({
      // 	              path: '/login'
      // 	            })
      // 	          },1000);
      //         } else if(res.data.msg == 2006){
      // 	          this.gameUsermoney = Number(res.data.balance.whBalance).toFixed(2);
      // 	          this.resDate.money = Number(res.data.balance.serBalance).toFixed(2);
      //         }else if(res.data.msg == 7001){
      //         		this.erreocode='7001'
      // 						this.panelShow = true
      // 						this.promptsystem = res.data.info;
      //         }
      //   })
      // }
      this.daywen = "捕鱼游戏";
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
    } else {
      let params = {};
      params.oid = this.userOid;
      this.$http
        .post(`${getUrl()}/getinfo/money`, JSON.stringify(params))
        .then(res => {
          console.log(res);
          if (res.data.msg == "4001") {
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
            this.gameUsername = res.data.username;
            this.gameUsermoney = Number(res.data.user_balance).toFixed(2);
            sessionStorage.setItem("im_money", res.data.money);
            this.resDate = res.data;

            this.resDate.money = res.data.money;
            if (this.resDate.bank_code) {
              this.isBank = true;
            }
          }
        });
    }

    if (Number(this.isChOrRu) == 1) {
      this.handleTabChange("obligation");
    } else if (Number(this.isChOrRu) == 2) {
      this.handleTabChange("paid");
    }

  },
  methods: {
    // 查询该平台是否有棋牌游戏，有则开启棋牌的交易记录
    openChessOrNot() {
      // 棋牌的ID为6，检查sort字段里面是否有该ID
      const hasChess = JSON.parse(sessionStorage.gamesort).sort.indexOf('6') > -1
      if (hasChess) {
        this.activeList['棋牌游戏'] = 4
      }
    },
    selectDate(index, day) {
      for (var i = 0; i < this.l; i++) {
        if (this.daytian - index > 7 || this.daytian - index <= 0) {
          // 浅色区域，即不可点击的日期
          // this.$refs.tenli[this.daytian - this.l + i].style.color = "#ccc";
          this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor = "red"
        } else {
          // 深色区域，可点击的日期
          if (this.daytian - this.l + i == index) {
            this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor = "green"
            // 所点击的那天
            this.isPressedChoiceDay = true;
            this.tempDaydata = this.daydata;
            this.tempDaynian = this.daynian;
            this.tempDayyue = this.dayyue;
            this.tempDaytian = this.dayday;
            let weekday = null;
            this.dayday = this.daytian - this.l + i + 1;
            // this.dayday = day;
            var _date = new Date();
            _date.setFullYear(this.daynian);
            _date.setMonth(this.dayyue-1);
            _date.setDate(day);
            weekday = this.dayOfWeek[_date.getDay()];
            this.daydata = this.dayyue + "月" + this.dayday + "日" + weekday;
            this.$refs.tenli[index].style.backgroundColor = "#2e65d4";
            this.$refs.tenli[index].style.color = "#fff";
          } else {
            this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor = "blue"
            // 剩下非点击的其它天数
            this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor = "";
            this.$refs.tenli[this.daytian - this.l + i].style.color = "#373737";
          }
        }
      }
    },
    dateConfirm() {
      if (this.dateyes == "") {
        this.dateyes = this.nowday;
      }
      if (this.dayyue < 10) {
        this.dayyue = "0" + this.dayyue;
      }
      if (this.dayday < 10) {
        this.dayday = "0" + this.dayday;
      }
      this.dateyes = String(this.daynian) + "-" + String(this.dayyue) + "-" + String(this.dayday);
      this.curSelectedDate = this.dateyes;
      this.nowday = this.dateyes;
      this.curPage = 1;
      /*
      let params = {};
      params.game_code = this.urlId;
      params.page = this.page;
      params.date = this.dateyes;
      params.number = this.pageNumber;
      params.oid = this.userOid;
      this.nowday = this.dateyes;

      this.$http
        .post(`${getUrl()}/getinfo/record`, JSON.stringify(params))
        .then(res => {
          this.isShowCalendar = false;
          this.lotteryList = res.data.result;
          if (Number(res.data.allnumb) > Number(this.pageNumber)) {
            this.pagenmb = true;
            this.totalPage = Math.ceil(res.data.allnumb / this.pageNumber);
          }
          this.isShowCalendar = false;
          this.isReady = true;
          this.datatrueq = true;
        });
      */

      this.getTransactionData({date: this.dateyes});
      this.isShowCalendar = false;
    },
    datashow() {
      this.isPressedChoiceDay = false;
      this.isShowCalendar = !this.isShowCalendar;
      this.daymargin(this.getWeek(this.daynian, this.dayyue));
      console.log('debug this.dayday=', this.dayday)
      for (var i = 0; i < this.l; i++) {
        this.$refs.tenli[this.daytian - this.l + i].style = "color:black";
        // if (i == this.l - 1) {
        //   this.$refs.tenli[this.dayday - this.l + i].style.backgroundColor =
        //     "#2e65d4";
        //   this.$refs.tenli[this.dayday - this.l + i].style.color = "#fff";
        // }
      }
      this.$refs.tenli[this.dayday - 1].style.backgroundColor = "#2e65d4";
      this.$refs.tenli[this.dayday - 1].style.color = "#fff";

      this.dayyue = String(new Date().getMonth() + 1);
      this.yearyue = this.daynian + "年" + this.dayyue + "月";
    },
    dateCancel() {
      if (this.isPressedChoiceDay) {
        this.daynian = this.tempDaynian;
        this.dayyue = this.tempDayyue;
        this.dayday = this.tempDaytian;
        this.daydata = this.tempDaydata;
      }
      this.isShowCalendar = false;
      this.dayyue = String(new Date().getMonth() + 1);
    },
    nextdata() {
      this.dayyue++;
      this.yearyue = this.daynian + "年" + this.dayyue + "月";
      if (this.dayyue == this.dayyue1) {
        this.yearyue = this.daynian + "年" + this.dayyue + "月";
        // 将每一天的颜色先初始化为灰色
        this.$refs.tenli.forEach(item => {
          item.style.color = '#ccc'
        })
        // 然后再将可点击的变为黑色
        for (var i = 0; i < this.l; i++) {
          this.$refs.tenli[this.daytian - this.l + i].style = "color:black";
          if (i == this.l - 1) {
            this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor =
              "#2e65d4";
            this.$refs.tenli[this.daytian - this.l + i].style.color = "#fff";
          }
        }
        let today = new Date(); //获得当前日期
        let year = today.getFullYear();
        let month = this.dayyue;
        this.daycount = new Date(year, month, 0).getDate();
        this.daymargin(this.getWeek(year, this.dayyue));
        for (var i = 0; i < this.yesyue; i++) {
          this.$refs.tenli[parseInt(this.daycount - 1 - i)].style.color = '#373737'
        }
      } else {
        this.$refs.tenli.map(value => {
          value.style = "color:#cccccc";
        });
        if (this.dayyue > 12) {
          this.dayyue = 1;
        }
        if (this.dayyue <= 9) {
          this.yearyue =
            this.daynian + "年" + String(parseInt(this.dayyue)) + "月";
        } else {
          this.yearyue =
            this.daynian + "年" + String(parseInt(this.dayyue)) + "月";
        }
        if (this.dayyue == this.dayyue1) {
          this.yearyue = this.daynian + "年" + this.dayyue + "月";
          for (var i = 0; i < this.l; i++) {
            this.$refs.tenli[this.daytian - this.l + i].style = "color:black";
            if (i == this.l - 1) {
              this.$refs.tenli[
                this.daytian - this.l + i
              ].style.backgroundColor =
                "#2e65d4";
              this.$refs.tenli[this.daytian - this.l + i].style.color = "#fff";
            }
          }
        }
        let today = new Date(); //获得当前日期
        let year = today.getFullYear();
        let month = this.dayyue;
        this.daycount = new Date(year, month, 0).getDate();
        this.daymargin(this.getWeek(year, this.dayyue));
      }
    },
    daymargin(today) {
      if (today == "1") {
        this.$refs.tenli[0].style.marginLeft = "2.05rem";
      } else if (today == "2") {
        this.$refs.tenli[0].style.marginLeft = "3.55rem";
      } else if (today == "3") {
        this.$refs.tenli[0].style.marginLeft = "5.05rem";
      } else if (today == "4") {
        this.$refs.tenli[0].style.marginLeft = "6.55rem";
      } else if (today == "5") {
        this.$refs.tenli[0].style.marginLeft = "8.05rem";
      } else if (today == "6") {
        this.$refs.tenli[0].style.marginLeft = "9.5rem";
      } else if (today == "7") {
      }
    },
    getWeek(year, month) {
      let d = new Date();
      d.setYear(year);
      d.setMonth(month - 1);
      d.setDate(1);
      //获得周几
      var weeks = ["7", "1", "2", "3", "4", "5", "6"];
      return weeks[d.getDay()];
    },
    lastdata() {
      // 	console.log(this.dayyue,parseInt(this.dayyue1))
      this.dayyue--;

      this.yearyue = this.daynian + "年" + this.dayyue + "月";
      if (this.dayyue == this.dayyue1) {
        this.yearyue = this.daynian + "年" + this.dayyue + "月";
        for (var i = 0; i < this.l; i++) {
          this.$refs.tenli[this.daytian - this.l + i].style = "color:black";
          if (i == this.l - 1) {
            this.$refs.tenli[this.daytian - this.l + i].style.backgroundColor =
              "#2e65d4";
            this.$refs.tenli[this.daytian - this.l + i].style.color = "#fff";
          }
        }
        let today = new Date(); //获得当前日期
        let year = today.getFullYear();
        let month = this.dayyue;
        this.daycount = new Date(year, month, 0).getDate();
        this.daymargin(this.getWeek(year, this.dayyue));
      } else {
        this.$refs.tenli.map(value => {
          value.style = "color:#cccccc";
        });
        if (this.dayyue < 1) {
          this.dayyue = 12;
        }
        if (this.dayyue <= 9) {
          this.yearyue =
            this.daynian + "年" + String(parseInt(this.dayyue)) + "月";
        } else {
          this.yearyue =
            this.daynian + "年" + String(parseInt(this.dayyue)) + "月";
        }
        let today = new Date(); //获得当前日期
        let year = today.getFullYear();
        let month = this.dayyue;
        this.daycount = new Date(year, month, 0).getDate();
        this.daymargin(this.getWeek(year, this.dayyue));
        for (var i = 0; i < this.yesyue; i++) {
          this.$refs.tenli[parseInt(this.daycount - 1 - i)].style =
            "color:#373737";
        }
      }
    },
    timetrans(date) {
      var date = new Date(date * 1000); //如果date为13位不需要乘1000
      let M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      let D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      let h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      let m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      let s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return M + D + h + m + s;
    },
    game() {
      this.lis = !this.lis;
    },
    list_lis(type) {
      console.log(type);
      let pathinfo = ":2?GameName=";
      if (type == 1) {
        pathinfo += "Lo";
        this.daywen = "彩票游戏";
        this.cruGameName = this.GAME_NAME_LO;
      } else if (type == 2) {
        pathinfo += "AG";
        this.daywen = "真人视讯";
        this.cruGameName = this.GAME_NAME_AG;
      } else if (type == 3) {
        pathinfo += "sport";
        this.daywen = "体育游戏";
        this.cruGameName = this.GAME_NAME_SPORT;
      } else if (type == 4) {
        pathinfo += "chess";
        this.daywen = "棋牌游戏";
        this.cruGameName = this.GAME_NAME_CHESS;
      }
      this.lis = false;
      // this.$router.push({
      //   path: "order" + pathinfo
      // });
      this.curSelectedDate = '';
      this.handleTabChange("paid", true);
    },
    getState(item) {
      if (item.transfer == "0") {
        if (item.bank_name == "AG") {
          return item.bank_account;
        } else {
          if (item.type_code == "0") {
            return this.$route.query.GameName=='Lo'?"存入":"转入";
          } else {
            return this.$route.query.GameName=='Lo'?"取出":"转出";
          }

        }
      } else if (item.transfer == "1") {
        if (item.type_code == "0") {
          return "转入";
        } else {
          return "转出";
        }
      } else if (item.transfer == "2") {
        if (item.type_code == "0") {
          return "转入";
        } else {
          return "转出";
        }
      } else if (item.transfer == "3") {
        return item.type_code == "0" ? "WH存入彩票" : "彩票提到WH"
      } else {
        return '--'
      }
    },
    findBankListUrl(bank_name) {
      let i = 0;
      for (; i < this.bankList.length; i++) {
        if (bank_name.indexOf(this.bankList[i].bankName) !== -1) {
          return this.$getPublicImg(`/images/${this.bankList[i].url}`);
          break;
        } else {
          return `${this.$getPublicImg("/images/bank_default.png")}`;
        }
      }
    },
    chongzhi() {
      this.payMoney = null;
      this.paypassWd = "";
    },
    qufan() {
      this.isShowMoney = !this.isShowMoney;
    },
    isShowMoney1(item) {
      this.singeMoney = item;
      this.isShowMoney = !this.isShowMoney;
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

    getLocalTime(nS) {
      let time = new Date(parseInt(nS) * 1000);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      let h = time.getHours();
      let m = time.getMinutes();
      let s = time.getSeconds();
      return `${year}-${this.p(month)}-${this.p(date)} ${this.p(h)}:${this.p(
        m
      )}:${this.p(s)}`;
    },
    loadMore() {

      /*
      if (this.page * 10 <= this.zongshu) {
        this.loading = true;
        this.page++;
        let param = {};
        param.oid = this.userOid;
        param.page = this.page;
        param.number = this.number;
        let _this = this;
        this.$http
          .post(`${getUrl()}/getinfo/record`, JSON.stringify(param))
          .then(res => {
            if (res.data.msg == "4001") {
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
              for (let i = 0; i < res.data.res.length; i++) {
                // this.list.push(res.data.res[i]);
                _this.list = res.data.res;
              }
              this.num += 10;
              this.loading = false;
            }
          });
      } else {
        return null;
      }
      */
    },
     showPagerNumPanel() {
      this.isShowPagerNumPanel = !this.isShowPagerNumPanel;
      if (this.isShowPagerNumPanel) {
        this.boxshadow = "";
      } else {
        this.boxshadow = "0 0.06rem 0.8rem rgba(0, 0, 0, 0.2)";
      }
    },
    // 取某一页的注单
    toPage(index) {
      this.curPage = index;
      let params = {
        page: this.curPage
      };
      if (this.curSelectedDate) {
        params.date = this.curSelectedDate;
      }
      this.getTransactionData(params);
      this.isShowPagerNumPanel = false;
    },
    // 上一页
    lastPage() {
      if (this.curPage <= 1) return;
      this.curPage--
      let params = {
        page: this.curPage
      };
      if (this.curSelectedDate) {
        params.date = this.curSelectedDate;
      }
      this.getTransactionData(params);
    },
    // 下一页
    nextPage() {
      if (this.curPage >= this.totalPage) return;
      this.curPage++
      let params = {
        page: this.curPage
      };
      if (this.curSelectedDate) {
        params.date = this.curSelectedDate;
      }
      this.getTransactionData(params);
    },
    /**
     * 获取彩票交易记录
     */
    getLotteryTransactionList(params = {}) {
      params.oid = this.userOid;
      params.date = params.date || moment().format('YYYY-MM-DD')
      let paramsStr = JSON.stringify(params);
      // this.$http.post(`${getUrl()}/getinfo/record`, paramsStr)\
      this.$http.post(`${getUrl()}/getinfo/record`, paramsStr)
          .then(res => {
              let data = res.data;
              this.successshow = false;
              if (this.isLoginExpired(data.msg)) {
                this.loginExpired(data.msg);
              } else {
                this.list = data.res;
                this.loading = false;
                this.totalPage = Math.ceil(data.page.allnmb / this.pageSize);
              }
          });
    },
    /**
     * AG
     */
    getAGTransationList(params = {}) {
      params.oid = this.userOid;
      params.GameName = params.gameName != undefined ? params.gameName : this.GAME_NAME_AG;
      let paramsStr = JSON.stringify(params);
      this.$http.post(`${getUrl()}/getinfo/ag_record`, paramsStr)
        .then(res => {
          let data = res.data,
              item = data.res;
          if (this.isLoginExpired(data.msg)) {
            this.loginExpired(data.msg);
          } else {
            this.totalPage = Math.ceil(data.page.allnmb / this.pageSize);
            this.list = data.res;
          }
        });
    },
    /**
     * 体育
     */
    getSportTransationList(params = {}) {
      params.oid = this.userOid;
      params.GameName = this.GAME_NAME_SPORT;
      let paramsStr = JSON.stringify(params);
      this.$http.post(`${getUrl()}/getinfo/ty_record`, paramsStr)
        .then(res => {
          let data = res.data;
          if (this.isLoginExpired(data.msg)) {
            this.loginExpired(data.msg);
          } else if (data.msg == 2006) {
            this.list = data.res || [];
            this.list = this.list.filter((value, index) => {
              return value.transfer == "0";
            });
            this.zongshu = Number(data.page.allnmb);
            this.totalPage = Math.ceil(data.page.allnmb / this.pageSize);
          }
        });
    },
    /**
     * 棋牌
     */
    getChessTransationList(params = {}) {
      let that = this
      this.list = []// 请求前先清空数据
      params.oid = this.userOid;
      params.size = 30;
      if (params.date) {
        // 有传时间就用传过来的
        params.stime = moment(params.date).format('YYYY-MM-DD 00:00:00')
        params.etime = moment(params.date).format('YYYY-MM-DD 23:59:59')
        delete params.date
      } else {
        // 没传时间就用日期插件选中的那个
        params.stime = moment(this.dateOptions.selectedDate).format('YYYY-MM-DD 00:00:00')
        params.etime = moment(this.dateOptions.selectedDate).format('YYYY-MM-DD 23:59:59')
      }
      // params.GameName = this.GAME_NAME_CHESS;
      let paramsStr = JSON.stringify(params);
      // this.$http.post(`${getUrl()}/Wh_H5_Api/SearchCreditBill`, paramsStr)
      // this.$http.post(`${getUrl()}/Wh_APP_Api/SearchCreditBill`, paramsStr)
      this.$http.post(`${getUrl()}/Wh_APP_Api/SearchCreditBill`, paramsStr)
        .then(res => {
          let data = res.data,
              item = data.data;
          if (!item) {
            that.list = data.data || []
            return
          }

          if (that.isLoginExpired(data.msg)) {
            that.loginExpired(data.msg);
          } else if (data.msg == 2006) {
            that.list = data.data || [];
            /*for (let i in item) {
              that.list[i] = item[i] || [];
              that.list = that.list[i].filter((value, index) => {
                return value.transfer == "2";
              });
            }*/
            that.zongshu = Number(res.data.page.allnmb);
            that.totalPage = Math.ceil(data.page.allnmb / that.pageSize);
            // 页数大于1页才显示分页器
            /*if (res.data.page.allnmb / res.data.page.number > 1) {
              this.isShowPager = true
            } else {
              this.isShowPager = false
            }*/
          } else {
            that.totalPage = Math.ceil(data.page.allnmb / that.pageSize);
            that.pagenmb = Math.ceil(data.page.allnmb / that.pageSize);
          }

        });
    },
    isLoginExpired(code) {
       return code == 4001;
    },
    loginExpired(code) {
      if (this.isLoginExpired(code)) {
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
    },
    /**
     * 获交易数据
     */
    getTransactionData(params = {}) {
      params.number = this.pageSize;
      // params.date = this.tempDaynian ? moment().format('YYYY-MM-DD') : `${ this.tempDaynian }-${ this.}-${}`
      // let gameName = this.$route.query.GameName;
      // 有选中日期则格式化日期
      if (this.tempDaynian) params.date = `${ this.tempDaynian }-${ this.tempDayyue }-${ this.dayday }`
       let gameName = this.cruGameName;
      switch(gameName) {
        case this.GAME_NAME_LO:
          this.getLotteryTransactionList(params);
        break;
        case this.GAME_NAME_AG:
          this.getAGTransationList(params);
        break;
        case this.GAME_NAME_SPORT:
          this.getSportTransationList(params);
        break;
        case this.GAME_NAME_CHESS:
          this.getChessTransationList(params);
        break;
        case this.GAME_NAME_FISH:
          params.GameName = '';
          this.getAGTransationList(params);
        break;
        default:
        break;
      }
    },
    handleTabChange(val, flag) {
      this.page = 0;
      if (val == "paid") {
        this.isShowPager = true;
        let gameName = this.cruGameName;
        // let gameName = this.$route.query.GameName || 'Lo';
        // if (!flag) {
        //   this.$router.push({
        //     path: "order" + ":2?GameName="+ gameName
        //   });
        // }
        this.curPage = 1;
        let params = {};
            params.page = this.curPage;
        switch(gameName) {
          case this.GAME_NAME_LO:
            this.daywen = "彩票游戏";
          break;
          case this.GAME_NAME_AG:
            this.daywen = "真人视讯";
          break;
          case this.GAME_NAME_SPORT:
            this.daywen = "体育游戏";
          break;
          case this.GAME_NAME_CHESS:
             this.daywen = "棋牌游戏";
          break;
          case this.GAME_NAME_FISH:
            this.daywen = "捕鱼游戏";
          break;
          default:
          break;
        }
        this.getTransactionData(params);
      } else {
        this.isShowPager = false;
      }
      this.activeTab = val;
    },
    submit2() {
      this.successshow = false;
      // this.showCurtion=true
      if (this.payMoney < this.bankmin2) {
        this.promptboxtext = `取款金额不能少于${this.bankmin2}`;
        this.panelShow = true;
        setTimeout(() => {
          this.panelShow = false;
        }, 1200);
        return false;
      }
      if (parseFloat(this.payMoney) > parseFloat(this.gameUsermoney)) {
        this.promptboxtext = `取款金额不能大于${this.gameUsermoney}`;
        this.panelShow = true;
        setTimeout(() => {
          this.panelShow = false;
        }, 1200);
        return false;
      }

      if (this.payMoney >= 100) {
        let params = {};
        params.oid = this.userOid;
        params.money = this.payMoney;
        params.paypasswd = this.paypassWd;
        params.bankname = this.resDate.bank_name;
        params.bankaddress = this.resDate.bank_address;
        params.bankcode = this.resDate.bank_code;
        let _params = location.href.split("?")[1];
        if (_params == "GameName=AG") {
          params.GameName = "AG";
        }
        let postKind = this.$http;
        let _this = this;
        this.$http
          .post(`${getUrl()}/user/online_get`, JSON.stringify(params))
          .then(res => {
            console.log(res.data);
            _this.chongzhi();
            _this.showCurtion = false;
            if (res.data.msg == "4001") {
              sessionStorage.clear();
              _this.panelShow = true;
              _this.promptboxtext = "您的账户已失效，请重新登录";
              setTimeout(() => {
                _this.panelShow = false;
                _this.$router.push({
                  path: "/login"
                });
              }, 1000);
            } else {
              if (res.data.msg == 3003) {
                _this.erreocode = "3003";
                _this.panelShow = true;
                _this.promptsystem = "因网络原因，提款失败，请重试!";
                _this.promptboxshow = false;
              } else if (res.data.msg == 2007) {
                _this.promptboxtext = "提现密码错误";
                _this.panelShow = true;
              } else if (res.data.msg == 5006) {
                _this.promptboxtext = "操作频繁，请稍后重试";
                _this.panelShow = true;
              } else if (res.data.msg == 2006) {
                _this.resDate.money -= _this.payMoney;
                _this.gameUsermoney -= _this.payMoney;
                _this.successshow = true;
                _this.promptboxtext = "取款信息提交成功";
                _this.panelShow = true;
              } else {
                if (res.data.msg == 3003) {
                  _this.erreocode = "3003";
                  _this.panelShow = true;
                  _this.promptsystem = "因网络原因，提款失败，请重试!";
                  _this.promptboxshow = false;
                } else if (res.data.msg == 2007) {
                  _this.promptboxtext = "提现密码错误";
                  _this.panelShow = true;
                } else if (res.data.msg == 5006) {
                  _this.promptboxtext = "操作频繁，请稍后重试";
                  _this.panelShow = true;
                } else if (res.data.msg == 2006) {
                  _this.resDate.money -= _this.payMoney;
                  _this.gameUsermoney -= _this.payMoney;
                  _this.successshow = true;
                  _this.promptboxtext = "取款信息提交成功";
                  _this.panelShow = true;
                  (_this.paypassWd = ""),
                    (_this.payMoney = null),
                    setTimeout(() => {
                      _this.panelShow = false;
                    }, 1200);
                } else if (res.data.msg == 5004) {
                  _this.promptboxtext = "金额不足";
                  _this.panelShow = true;
                } else if (res.data.msg == 6003) {
                  _this.promptboxtext = "金额数量少于最低限制100元";
                  _this.panelShow = true;
                } else if (res.data.msg == 20061) {
                  _this.promptboxtext = "余额不足，提款失败";
                  _this.panelShow = true;
                } else if (res.data.msg == 60041) {
                  _this.promptboxtext = "存在未审核订单,请耐心等待";
                  _this.panelShow = true;
                } else if (res.data.msg == 6004) {
                  _this.promptboxtext = "提款次数达到上限";
                  _this.panelShow = true;
                }
              }
            }
          });
        if (_params == "GameName=sport") {
          params.GameName = "sport";
        }
      }
    },
    gotoPayAddress(kind, zf, xu) {
      let _params = location.href.split("?")[1];
      let i = "";
      //线下
      if (kind == "handPay") {
        i = `/handPay:${zf}`;
      } else {
        i = `/pay:${kind}`;
      }
      if (_params == "GameName=AG") {
        i += "?GameName=AG";
      }
      if (_params == "GameName=sport") {
        i += "?GameName=sport";
      }
      this.$router.push({ path: i });
    },
    tiaozhuan() {
      this.$router.push({
        path: "/hahaMoney"
      });
    },
    checkTransactionStatus(singeMoney) {
      var status = "";
      if (singeMoney.status == "1") {
        if (singeMoney.is_clear == "1") {
          status = "proccess-complete"; // grey
        } else {
          status = "proccess-fail"; // red
        }
      } else {
        status = "failed-transaction"; // blue
      }
      return status;
    }
  },
  computed: {}
};
/*$("#x").click(function(){
  $(".zzc").css("display","none;");
  })*/
</script>

<style lang='less' ref="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
@zoom: 46.875rem;
.mask1 {
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  position: fixed;
  left: 0;
  top: 1.9rem;
  z-index: 100;
}
.dayshow {
  width: 580/46.875rem;
  height: 660/46.875rem;
  position: absolute;
  left: 50%;
  margin-left: -580/2/46.875rem;
  z-index: 101;
  top: 5rem;
  > .dayheader {
    height: 110/46.875rem;
    width: 100%;
    background: #2e65d4;
    font-size: 40/46.875rem;
    color: #fff;
    line-height: 110/46.875rem;
    text-align: center;
  }
  > .dayfoot {
    width: 100%;
    height: 550/46.875rem;
    background: #f4f4f4;
    position: relative;
    div:nth-child(1) {
      height: 1.5rem;
      /*border-bottom: 1px solid red;*/
      line-height: 1.5rem;
      text-align: center;
      span:nth-child(1),
      span:nth-child(3) {
        width: 0.5rem;
        height: 0.5rem;
        margin-top: 0.5rem;
        border-bottom: 1px solid #373737;
        border-left: 1px solid #373737;
        display: inline-block;
      }
      span:nth-child(1) {
        margin-right: 2.5rem;
        transform: rotate(45deg);
      }
      span:nth-child(2) {
        font-size: 28/46.875rem;
        color: #373737;
      }
      span:nth-child(3) {
        transform: rotate(-135deg);
        margin-left: 2.5rem;
      }
    }
    div:nth-child(2) {
      width: 100%;
      text-align: center;
      ul:nth-child(1) {
        overflow: hidden;
        width: 100%;
        li {
          float: left;
          font-size: 28/46.875rem;
          color: #cccccc;
          margin-left: 0.5rem;
          width: 1rem;
          height: 1rem;
        }
      }
      ul:nth-child(2) {
        overflow: hidden;
        width: 95%;
        margin-left: 0.55rem;

        li {
          float: left;
          font-size: 28/46.875rem;
          color: #cccccc;
          margin-left: 0.5rem;
          width: 1rem;
          height: 1rem;
          margin-top: 0.25rem;
          line-height: 1rem;
          border-radius: 50%;
        }
      }
    }
    div:nth-child(3) {
      position: absolute;
      left: 0;
      bottom: 0.5rem;
      a {
        color: 28/48.675rem;
        color: #373737;
        float: left;
        margin-left: 3.5rem;
      }
    }
  }
}
.demo-infinite-container {
  width: 100%;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  border: 1px solid #d9d9d9;
}
.shangla {
  transform: rotate(180deg);
}
.xiala {
  transform: rotate(0deg);
}
.mu-tabs {
  background: #fff;
  // position: static;
  z-index: 11;
  border-bottom: 1px solid #e4e4e4;
  border-top: 1px solid #e4e4e4;
  button {
    color: #000;
    font-size: 0.65rem;
    border-right: 1px solid #f4f4f4;
    margin-right: -1px;
    padding: 10px;
    height: 2.2rem;
    line-height: 1.8rem;
    min-height: 1rem;
  }
}

.atctive {
  display: none;
}

.bank {
  height: 1.8rem;
  background: #fff;
  box-shadow: 0 1px 5px 0 #e4e4e4;
  position: relative;
  z-index: 10;
  line-height: 1.8rem;
  padding-left: 1rem;
  > div {
    > span {
      font-size: 0.7rem;
      color: #646464;
    }
    > i {
      // font-size: 0.7rem;
    }
  }
}

.ban {
  /*  height: 2.5rem;*/
  background: #fff;
  position: relative;
  z-index: 10;
  line-height: 2rem;
  padding-left: 1rem;
  border-bottom: 1px solid #e4e4e4;
}
.ban {
  > div {
    line-height: 1.5rem;

    li >  {
      display: inline-block;
      width: 200/@zoom;
      height: 55/@zoom;
      background: #f2f2f2;
      border: 1px solid #eaeaea;
      text-align: center;
      line-height: 55/@zoom;
      margin-left: 0.2rem;
      margin-top: -0.5rem;
      border-radius: 0.1rem;
    }
  }
}
.js,
.js1,
.js2 {
  height: 3rem;
  background: #fff;
  line-height: 2rem;
  border-bottom: 1px solid #e4e4e4;
  padding: 0.5rem 1rem;
}

.js1 {
  margin-top: 0.5rem;
}

.js1 p {
  line-height: 1rem;
  font-size: 0.7rem;
  color: #c0c0c0;
  height: 1.3rem;
}

.js1 p:first-child {
  color: #545454;
}

.js1 p:first-child span {
  color: #acacac;
}

.js1 p:nth-child(2) input {
  width: 90%;
  border: none;
  outline: none;
  font-size: 0.64rem;
  position: relative;
  top: -0.2rem;
  /* padding-left: 10/20rem;*/
  color: #acacac;
}

::-webkit-input-placeholder {
  color: #dadada;
}

.js p,
.js2 p {
  line-height: 1rem;
  font-size: 0.7rem;
  color: #b8b8b8;
  width: 80%;
  height: 1.3rem;
  margin-left: 2rem;
}

.js2 p {
  margin-left: 0;
}

.js2 span {
  float: right;
  position: relative;
  top: -2.5rem;
  left: -1rem;
  color: #6c96e6;
  font-size: 0.6rem;
}

.js a,
.js2 a {
  text-decoration: none;
  img {
    float: right;
    margin-top: -2rem;
    width: 0.5rem;
  }
}

.js2 {
  border-bottom: none !important;
}

.bank p {
  display: inline-block;
  color: #777777;
  font-size: 0.7rem;
}

.bank {
  position: relative;
  > div {
    width: 40%;
    display: inline-block;
    > i {
      color: #196fde;
      margin-left: 0.2rem;
    }
  }
  > div:nth-child(1) {
    text-align: left;
  }
  > div:nth-child(2) {
    text-align: right;
    margin-left: 2rem;
  }
}

.ban p {
  display: inline-block;
  color: #666666;
  font-size: 0.6rem;
  text-indent: 26/@zoom;
}

.ban a {
  text-decoration: none;
  display: inline-block;
  width: 1rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: 1.5rem;
  font-weight: 100;
  border-radius: 50%;
  color: #2a92cb;
  position: relative;

  top: 0.1rem;
}

.js p:nth-child(1) {
  margin-left: 0 !important;
  color: #545454;
}

.ban span {
  color: #146cdc;
  font-size: 0.7rem;
}

.ban img {
  width: 1.2rem;
  margin-top: 10/@zoom;
}

.order-list {
  margin-top: -0.6rem;
}

.tab1 > div {
  margin-top: 0.6rem;
  border-top: 1px solid #e4e4e4;
}

.mu-tab-active {
  background: #166ade;
  color: #fff !important;
}

.btn2-container {
  background-color: #f5f5f5;
  padding-top: 85/@zoom;
}

.btn2,
.btn1 {
  text-align: center;
  margin-bottom: 25/@zoom;
}

.btn2 button,
.btn1 button {
  width: 690/@zoom;
  height: 90/@zoom;
  line-height: 2rem;
  border-radius: 5px;
  outline: none;
  border: none;
  font-size: 0.7rem;
}

.btn1 button {
  background: #0857d8;
  color: #e7e5e5 !important;
}

.btn2 button {
  background: #e7e5e5;
  color: #828282 !important;
}

span.mu-tab-link-highlight {
  background-color: darkolivegreen !important;
  position: absolute !important;
  left: 0 !important;
  bottom: -0.042666666666666665rem !important;
  height: 0.384rem !important;
  background: url(/wap/img/arrow-up.39b86bb.png) no-repeat bottom !important;
  background-size: contain !important;
  transition: -webkit-transform 0.3s !important;
  transition: transform 0.3s !important;
  transition: transform 0.3s, -webkit-transform 0.3s !important;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
}

.zzc {
  position: absolute;
  z-index: 100;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.white {
  width: 14rem;
  border-radius: 5px;
  margin: 5rem auto;
  div {
    padding: 0.5rem 0.3rem;
    font-size: 0.6rem;
    color: #333;
    border-bottom: 1px solid #dadada;
    background: #fff;
  }
  p {
    // height: 1.8rem;
    line-height: 1.8rem;
    margin: auto 0.3rem;
    font-size: 0.6rem;
    color: #333;
    border-bottom: 1px solid #dadada;
    span {
      float: right;
      text-align: left;
    }
  }
  button {
    width: 300/@zoom;
    height: 90/@zoom;
    display: block;
    margin: 0 auto;
    margin-top: 30/@zoom;
    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
    border: 0px solid #000000;
  }
}

.white div:nth-child(1) {
  background: none !important;
  position: relative;
  span {
    position: absolute;
    right: 0;
    top: -15px;
    img {
      width: 66/@zoom;
    }
  }
}

.white div:nth-child(2) {
  border-radius: 5px 5px 5px 5px;
  -moz-border-radius: 5px 5px 5px 5px;
  -webkit-border-radius: 5px 5px 5px 5px;
  border: 0px solid #000000;
}

.cun_qu_list {
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  height: 1008/@zoom;
}

.cun_qu_list_b {
  height: 440/20rem;
  overflow-y: scroll;
}

.isBank_b {
  display: flex;
  justify-content: center;
  padding: 20/20rem;
  font-size: 18/20rem;
}

.order_title {
  color: #8f8f8f;
  padding: 10/20rem 0/20rem 10/20rem 20/20rem;
  border-bottom: 1px solid #e4e4e4;
  background-color: #f6f6f6;
}

.payTab,
.take_class,
.mu-list {
  margin-top: 21/@zoom;
  border-top: 1px solid #e4e4e4;
  padding-top: 0 !important;
  margin-bottom: 0.5rem;
}

.pay-arrow-right-icon {
  position: absolute;
  right: 45/@zoom;
  top: 25/@zoom;
  width: 46.875/@zoom;
  height: 46.875/@zoom;
  background: url("@{public_img}/images/28.png") no-repeat;
  width: 0.7rem;
  height: 1rem;
  background-size: 100% 100%;
}

.proccess-complete {
  color: #bcbcbc !important;
}

.failed-transaction {
  color: #3063ce !important;
}

.proccess-fail {
  color: #ea0014 !important;
}

.has-error {
  display: block;
}

.no-error {
  display: none;
}

.error {
  word-wrap: break-word;
  line-height: 1.5 !important;
  background-color: #eeeeee;
  padding: 10px;
}
.mu-tabs button {
  margin: 0 !important;
  padding: 0 !important;
}
#pager{
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 0;
    background: white;
    opacity: 0.95;
    z-index: 102;
    div:nth-child(1){
      width: 100%;
      max-height: 320/46.875rem;
      overflow: auto;
      ul{
        width: 100%;
        li{
          width: 100%;
          height: 80/46.875rem;
          border-bottom: 1px solid #eee;
          text-align: center;
          line-height: 80/46.875rem;
          position: relative;
          img{
            position: absolute;
              width: 37/46.875rem;
              height: 30/46.875rem;
              top: 0.45rem;
            margin-left: 0.3rem;
          }
        }
        // li:nth-child(1){
        //   color: #2f64d4;
        // }
      }
  }
  div:nth-child(2){
    width: 100%;
    height: 100/46.875rem;
    line-height: 100/46.875rem;
    text-align: center;

    a{
      display: inline-block;
      width: 33%;
      height: 100%;
      text-align: center;
      float: left;
      position: relative;
      color: #000000;
    }
    i{
      width:0;
      height:0;
      border-color: #fff #fff #2f64d4 #fff;
      border-style: solid solid solid solid;
      border-width: 0.3rem;
      position: absolute;
      right: 0.75rem;
      top: 0.6rem;
    }
  }
}

</style>
<style>
.mu-tab-link-highlight {
  position: absolute !important;
  left: 0;
  bottom: -0.042666666666666665rem;
  height: 0.384rem !important;
  background: url(../../../wap/images/arrow-up.png) no-repeat bottom !important;
  background-size: contain !important;
  transition: -webkit-transform 0s !important;
  transition: transform 0s !important;
  transition: transform 0s, -webkit-transform 0s !important;
  -webkit-backface-visibility: hidden !important;
  backface-visibility: hidden !important;
  /* transform: translate3d(200%, 0px, 0px)!important;*/
}

.cz_list{
  position: relative;
}
.cz_list ul {
  background: #fff;
  overflow: hidden;
}
.cz_list ul li {
  float: left;
  width: 33.3%;
  border-bottom: 1px solid #ddd;
  height: 1.8rem;
  line-height: 1.8rem;
  text-align: center;
}
.cz_list ul li a {
  display: inline-block;
  height: 1.2rem;
  line-height: 1.2rem;
  border-right: 1px solid #eee;
  color: #333;
  width: 100%;
  /* position: relative;
  top:-1.5rem; */
}
.cz_list span {
  display: inline-block;
  width: 32%;
  text-align: center;
  height: 1.2rem;
  line-height: 1.2rem;
}
.img_data {
  filter: alpha(#0066ff);
  width: 20px;
}
.selected-page-num { color:#196fde; }
.header-sec .tohop_head {
  z-index: 15;
}
</style>

<style lang='less'>
.date-picker-x{
  position: absolute;
  top: 0;
  right: 0;
  width: 33%;
  height: 1.2rem;
  & > div:last-child{
    display: none;
  }
}
.date-picker-x .mu-text-field{
  width: 100%;
  min-height: initial;
  margin: 0;
}
.mu-text-field-input{
  height: initial;
}
.date-picker-x .mu-text-field-content{
  padding: 0;
  opacity: 0;
}
.mu-date-display{
  background-color: #146cdc;
}
.mu-day-button-bg{
  background-color: #146cdc;
}
.mu-flat-button-primary{
  color: #146cdc;
}
.mu-day-button.now .mu-day-button-text{
  color: #146cdc;
}
.mu-day-button.selected .mu-day-button-text{
  color: white;
}
</style>
