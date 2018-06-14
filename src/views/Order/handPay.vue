<template>
  <div class="" style="height:100%">
    <i-header title="线下支付"></i-header>
    <div class="user-bank-info" v-if="requesstOk">
      <div class=info-bank-title>收款方式</div>
      <div class="m11">
        <div>
          <div class="hand_pay_from">
            <div class="bank-user-info">
              <div class="list_1" v-if="activePay=='bankpay_array'">
                <span>开户行:</span>
                <span>{{resDate.bank_name}}</span>
              </div>
              <div class="list_1" v-if="activePay=='bankpay_array'">
                <span>{{(resDate.id==70)?'卡&nbsp;&nbsp;号':"卡&nbsp;&nbsp;&nbsp;号"}}:</span>
                <span id="hk" style="width: auto;">{{resDate.bank_account}}</span>
                <button @click="showkh" class="btn" type="button" data-clipboard-action="copy" data-clipboard-target="#hk" :data-clipboard-text="resDate.bank_account">
                  复制
                </button>
              </div>
              <div class="list_1">
                <span>收款人:</span>

                <span id="hkuser" style="width: auto">{{resDate.bank_user}}</span>

                <button v-show="alipaycopy" @click="showkh" class="btn" type="button" data-clipboard-action="copy" data-clipboard-target="#hkuser" :data-clipboard-text="resDate.bank_user">
                  复制
                </button>
              </div>
              <div class="list_1" v-if="imgurl">
                <span>银行卡号:</span>
                <span id="hk1" style="width: auto">{{resDate.bank_account}}</span>
                <button @click="showkh" class="btn" type="button" data-clipboard-action="copy" data-clipboard-target="#hk1" :data-clipboard-text="resDate.bank_account">
                  复制
                </button>
              </div>
              <div class="list_1" v-if="imgurl">
                <span>开户行:</span>
                <span>{{resDate.bank_addres}}</span>
              </div>
              <div class="ewm1" v-if="resDate.bank_image_url">
                <div class="barcode-container">
                  <img :src="resDate.bank_image_url" alt="">
                </div>
              </div>
            </div>
            <div class="bank-user-form">
              <div class="bank-form-title">
                付款账户
              </div>
              <div class="m1">
                <span>{{username}}:</span>
                <input type="text" :placeholder="wxname" onbeforepaste="clipboardData.setData('text',clipboardData.getData('text').replace(/[\d]/g,''))" maxlength=10 name="Numbers" v-model="payUer" />
              </div>
              <div class="m1">
                <span style="position:relative;top:-5px;">存款金额:</span>
                <input type="text" name="exchangeamount" style="ime-mode:disabled" :placeholder="`${min_x} ${max_x}`" v-model.trim="payMoney" @keyup="show($event)" class="inp" />
                <!-- <span class="math" v-show="is_gd_ali!=='fh'"  v-if="routezf == 'wechat_array'">{{math}}</span> -->
              </div>
              <div class="m1">
                <span style="padding-left: 1px;">汇款日期:</span>
                <span style="margin-left: 0.3rem;">{{nowdate}}</span>
              </div>
              <div class="m1" v-if="resDate.bank_image_url">
                <span>{{business}}</span>
                <input type="" name="" :placeholder="`请输入${business}`" v-model="amoutF" minlength="4" maxlength="4" style="width: 10rem;">
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn1_group">
        <button type="button" class="btn1 color1" name="button" @click="subMit">确认存款</button>
      </div>
    </div>

    <promptbox @panelShow="panelShow=false" :promptsystem="promptsystem" :promptboxshow="promptboxshow" :successshow="successshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
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
  </div>
</template>
<script>
//copy
import Clipboard from "clipboard";
import iHeader from "../../components/i-header";
import promptbox from "../../components/promptbox";
export default {
  components: {
    iHeader,
    Clipboard,
    promptbox
  },
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      options: [
        "工商银行",
        "建设银行",
        "农业银行",
        "招商银行",
        "交通银行",
        "兴业银行",
        "中国银行",
        "广发银行",
        "深发银行",
        "中信银行",
        "光大银行",
        "浦发银行",
        "中国邮政",
        "民生银行",
        "平安银行(原深圳发展银行)",
        "华夏银行"
      ],
      a: {},
      b: {},
      c: {},
      d: {},
      linedownmin: 0,
      resDateS: {},
      resDate: {},
      resDate1: {},
      bankName: "",
      amoutF: "",
      payUer: "",
      payRea: "",
      payMoney: "",
      timeDay: new Date(),
      paykind: "银行",
      panelShow: false,
      promptboxtext: "",
      activePay: "bankpay_array",
      nowdate: "",
      time: "",
      hour: "",
      minutes: "",
      showCurtion: true,
      requesstOk: false,
      imgurl: true,
      username: "用户姓名",
      wxname: "请输入账户姓名",
      business: "商户号单号后四位",
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      alipaycopy: false,
      successshow: false,
      alipaycopy: false,
      promptsystem: "",
      note: "",
      // math:Math.random().toFixed(2).substring(1),
      all: "",
      routezf: "",
      min_x: "",
      max_x: ""
    };
  },
  mounted() {
    const clipboard = new Clipboard(".btn");
  },
  created() {
    let routezf = this.$route.params.zf.split(":")[1]; //order传过来的支付方式的参数
    this.routezf = routezf;
  },
  beforeCreate() {
    let routezf = this.$route.params.zf.split(":")[1]; //order传过来的支付方式的参数
    this.routezf = routezf;
    let all = "";
    setInterval(() => {
      let myDate = new Date();
      myDate.getFullYear();
      myDate.getMonth() + 1;
      myDate.getDate();
      myDate.getHours();
      myDate.getMinutes();
      myDate.getSeconds();
      this.nowdate =
        myDate.getFullYear() +
        "-" +
        parseInt(myDate.getMonth() + 1) +
        "-" +
        myDate.getDate() +
        " " +
        myDate.getHours() +
        ":" +
        myDate.getMinutes() +
        ":" +
        myDate.getSeconds();
    }, 1000);
    let params = {};
    let userOid = this.$store.state.userData.sessionId;
    params.oid = userOid;
    this.$http.post(`/user/payin`, JSON.stringify(params)).then(res => {
      this.successshow = false;
      this.a = res.data.bankpay_array[0];
      this.b = res.data.alipay_array[0];
      this.c = res.data.wechat_array[0];
      this.d = res.data.quickpay_array[0];
      this.resDate = res.data.bankpay_array[0];
      this.resDateS = res.data.linedown;
      this.linedownmin = res.data.moneylimit.linedownmin;
      this.min = eval("res.data." + routezf + "[0].min");
      this.max = eval("res.data." + routezf + "[0].max");
      this.min_x = "最低输入" + this.min + "元";
      this.max_x = "最高输入" + this.max + "元";
      if (this.max == 0) {
        this.max_x = "";
      }
      if (this.min == 0) {
        this.min_x = "";
      }
      var _type = res.data[routezf]; //支付对象
      this.changeUrl(_type, routezf); //调用点击事件
      for (var key in this.resDateS) {
        if (this.resDateS[key].length > 0) {
        }
      }
      if (routezf == "alipay_array") {
        this.alipaycopy = true;
        this.imgurl = true;
      } else if (routezf == "wechat_array") {
        this.imgurl = true;
        this.username = "微信昵称";
        this.wxname = "请输入您的微信昵称";
      } else {
        this.imgurl = false;
        this.business = "订单号后四位";
      }
      this.showCurtion = false;
      this.requesstOk = true;
    });
  },
  methods: {
    showkh() {
      this.promptboxtext = "复制成功";
      this.panelShow = true;
      this.successshow = false;
      setTimeout(() => {
        this.panelShow = false;
      }, 1200);
    },
    show(t) {
      let e = event || window.event || arguments.callee.caller.arguments[0];
      if (e && e.keyCode == 8) {
      } else {
        t.target.value = t.target.value.replace(/[^0-9.]/g, "");
        if (
          !(
            parseFloat(t.target.value) > 0 &&
            /^\d+\.?\d{0,2}$/.test(t.target.value)
          )
        ) {
          t.target.value = parseFloat(t.target.value).toFixed(2);
        }
        if ("NaN" == t.target.value) {
          t.target.value = "";
        }
      }
    },
    changeUrl(payType, j) {
      this.resDate = payType[0];
      if (j == "alipay_array") {
        this.resDate.showBankInfo = true;
      } else {
        this.resDate.showBankInfo = false;
      }
      this.activePay = j;
    },
    tanBank() {
      this.promptboxtext = "不支持这种充值方式";
      this.panelShow = true;
      this.successshow = false;
      setTimeout(() => {
        this.panelShow = false;
      }, 1200);
      return;
    },
    subMit() {
      this.successshow = false;
      if (this.$route.params.zf.split(":")[1] == "wechat_array") {
        if (this.payUer == "") {
          this.promptboxtext = `请输入微信昵称`;
          this.panelShow = true;
          return;
        }
      } else {
        if (!/^[\u4E00-\u9FA5·]{2,}$/.test(this.payUer)) {
          this.promptboxtext = `请输入正确姓名`;
          this.panelShow = true;
          return;
        }
      }
      if (this.payMoney < Number(this.min)) {
        this.promptboxtext = `金额最少${this.min}元`;
        this.panelShow = true;
        return;
      } else if (this.payMoney >= Number(this.max)) {
        if (this.max == 0) {
        } else {
          this.promptboxtext = `金额最多${this.max}元`;
          this.panelShow = true;
          return;
        }
      }
      if (!this.resDate.bank_image_url) {
        this.amoutF = "0000";
      }
      let amoutF = /[a-zA-Z0-9]{4}/.test(this.amoutF);
      let amouRea = this.payRea;
      if (amoutF) {
        let params = {};
        let userOid = this.$store.state.userData.sessionId;
        params.oid = userOid;
        params.realname = this.payUer; // 真实姓名 real name
        params.amount = this.payMoney; // amount
        // if(this.is_gd_ali !== 'fh' && this.routezf == 'wechat_array'){
        //   params.amount = this.payMoney + this.math;
        // }

        params.orderNo = this.amoutF; // last 4 numbers of the order
        params.bank_id = this.resDate.id; // bank id
        params.typeName = this.activePay; // 支付方式 payment way
        params.payReason = this.payRea; // notes
        params.date = this.nowdate; // date
        params.bankName = this.bankName; // bank name
        params.way = this.paykind; // bank
        let _params = location.href.split("?")[1];
        if (_params == "GameName=AG") {
          params.GameName = "AG";
        }
        this.$http
          .post(`/user/offline_pay`, JSON.stringify(params))
          .then(res => {
            this.successshow = false;
            if (res.data.msg == 2006) {
              this.promptboxtext = "订单提交成功";
              this.panelShow = true;
              this.successshow = true;
              this.payUer = "";
              this.payMoney = null;
              this.amoutF = "";
              setTimeout(() => {
                this.panelShow = false;
                this.$router.push("/index"); // 订单提交成功后返回到首页
              }, 1200);
            }
          });
      } else {
        this.promptboxtext = "请输入单号后四位";
        this.panelShow = true;
        this.successshow = false;
        //        setTimeout(() => {
        //          this.panelShow = false
        //        }, 1200);
      }
    }
  },
  hui() {
    this.$router.push({
      path: "/order:0"
    });
  }
};
</script>
<style lang='less' ref="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
@zoom: 46.875rem;
.weishu {
  color: #e47c4a;
}
.weishu1 {
  color: #e7511c;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-top: 0.5rem;
}
// .math{
//   border-left:1px solid #aaa;
//   height:2.048rem;
//   position: relative;
//   top:-.3rem;
//   padding-left:.8rem;
//   line-height: 2.048rem;
//   color:#E7511C!important;
// }
.inp {
  width: 10rem !important;
  position: relative;
  top: -5px;
}
.mu-tab-active {
  background: #fff !important;
  border: 1px solid #aaa;
  color: #aaa;
}

.mu-tab-link {
  border: 1px solid #aaa !important;
  color: #aaa !important;
}

.mu-tabs {
  background: #fff;
}

.list_1 {
  background: #fff;
  padding: 0.3rem 0.3rem;
  border-bottom: 1px solid #cfcfcf;
  line-height: 60 / @zoom;
  color: #3a3a3a;
  span {
    display: inline-block;
  }
  > span:nth-of-type(1) {
    width: 60/20rem;
    color: #656565;
  }
  > span:nth-of-type(2) {
    width: 230/20rem;
  }
}

.list_1 input {
  outline: none;
  border: #fff;
}

.m11 {
}

.m1 {
  padding: 0.3rem 0.3rem;
  background-color: #ffffff;
  height: 96 / @zoom;
  border-bottom: 1px solid #cfcfcf;
  line-height: 60 / @zoom;
}

.m1 span {
  display: inline-block;
  color: #656565;
}
.m1 span:nth-child(1) {
  text-align: right;
}

.m1 select {
  border: none;
  height: 100%;
  width: 12rem;
  outline: none;
  -webkit-appearance: none;
  background-size: 23px;
}

.m1 select:active {
  border: none;
}

.ewm1 span {
  display: inline-block;
  width: 5rem;
  padding: 1rem;
  color: #b9b9b9;
}

.ewm1 img {
  top: -1rem;
  width: 5rem;
  height: 4.5rem;
}

.btn1 {
  background: #0857d8;
  color: #fff;
  text-align: center;
  padding: 0.3rem 1.8rem;
  outline: none;
  /* border: 1px solid #0857D8;*/
  margin: 1rem auto;
  display: inline-block;
  border-radius: 5px;
  width: 690 / @zoom;
  height: 90 / @zoom;
  border: none;
}

.btn1_group {
  text-align: center;
}

.yhk {
  height: 87px;
  width: 1600 / @zoom;
  overflow: auto;
  background-color: #f6f6f6;
  padding-top: 23 / @zoom;
  padding-bottom: 23 / @zoom;
}

.bank-list-scrollable {
  overflow-x: auto;
}

.yhk {
  .active {
    border: 1px solid #2c65d8;
    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
  }
  > div {
    display: inline-block;
    width: 180 / @zoom;
    height: 120 / @zoom;
    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
    margin-left: 23 / @zoom;
    border: 0px solid #ccc;
    -webkit-box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.75);
    -moz-box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.75);
    box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.75);
  }
  button {
    float: left;
    background: #fff;
    border: 0;
    outline: none;
    padding: 0;
    height: 100%;
    width: 100%;
    padding: 13 / @zoom;
    border-radius: 5px 5px 5px 5px;
    -moz-border-radius: 5px 5px 5px 5px;
    -webkit-border-radius: 5px 5px 5px 5px;
    border: 0px solid #ccc;
    > img {
      width: 100%;
    }
  }
}

.title {
  height: 85/40rem;
  line-height: 85/40rem;
  background: #fff;
  border-bottom: 1px solid #dbdbdf;
  margin-top: 43/20rem;
  span {
    background: url("@{public_img}/images/fanhui.png") no-repeat;
    background-size: 40/40rem 40/40rem;
    width: 55/40rem;
    height: 45/40rem;
    float: left;
    margin-top: 20/40rem;
    margin-right: 20/40rem;
    margin-left: 20/40rem;
    border-right: 1px solid #dfdfdf;
  }
  h3 {
    margin: 0;
    float: left;
    font-weight: normal;
    color: #272526;
  }
}

.i-header {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}

.modal_box_feedback_login {
  z-index: 99999;
  position: fixed;
  top: 0;
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    padding: 10px 40px;
    border-radius: 4px;
  }
}

.hand_pay_from {
  border-top: 1px solid #cfcfcf;
}

.hand_pay_from input {
  border: 0;
  padding: 3px;
  text-indent: 5px;
  width: 570 / @zoom;
  color: #676767;
}

.hand_pay_from div:first-child {
}

.user-bank-info {
  margin-top: 109 / @zoom;
}

.info-bank-title {
  height: 90 / @zoom;
  color: #323232;
  background-color: #f6f6f6;
  border-top: 1px solid #cccccc;
  /* border-bottom: 1px solid #cccccc;*/
  padding-top: 20 / @zoom;
  padding-left: 20 / @zoom;
  font-weight: bolder;
}
.bank-user-info {
  /*margin-bottom: 21/@zoom;
  border-bottom: 1px solid #cfcfcf;*/
}
.bank-user-form {
  border-top: 1px solid #cfcfcf;
}
.time {
  height: 60 / @zoom;
  background-color: #f2f2f2;
}
.time-text {
  text-align: right;
}
.bank-form-title {
  height: 90 / @zoom;
  border-bottom: 1px solid #cfcfcf;
  line-height: 80 / @zoom;
  text-indent: 30 / @zoom;
  font-weight: bolder;
}
.date {
  background-color: #f2f2f2;
  height: 60 / @zoom;
  width: 300 / @zoom!important;
  outline: none;
}
.date::-webkit-inner-spin-button {
  -webkit-appearance: none;
  display: none;
}
.hour,
.minutes {
  display: inline-block;
  width: 70 / @zoom !important;
  background-color: #f2f2f2;
  text-indent: 20 / @zoom;
  color: #676767;
}
.barcode-container {
  width: 380 / @zoom;
  height: 380 / @zoom;
  margin: 30px auto 30px auto;
  > img {
    width: 100%;
    height: 100%;
  }
}
.bank-select {
  text-indent: 43 / @zoom;
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
.btn {
  position: absolute;
  right: 10px;
  color: #008fff;
  border: none;
  background: none;
}
</style>
