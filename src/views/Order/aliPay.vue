<template>
  <div class="box">
    <i-header title="资金管理"></i-header>
    <div class="pay_header">
      <div>
        <img :src="pay_img_url" />
      </div>
    </div>
    <div class="aisle">
	    <div v-for = "(j,i) in aliPayId" @click.stop= "payonline(j,i)" :class="`${(navIndex == i)?'active':''}`">
	     	 通道{{i+1}}
	    </div>
	    <span style="display: inline-block;color:#9a9a9a;width: 90%;font-size: 0.5rem;margin-top: 0.3rem;margin-left: 0.5rem;">若充值失败，请更换其他通道</span>
	  </div>
    <div class="seach" v-if="isShowBank">
      <span>银行：</span>
      <div>
        <select v-model="bankName">
          <option v-for="option in options" v-bind:value="option">
            {{option}}
          </option>
        </select>
      </div>
    </div>
    <form ref="formPay" method="post" target="_blank" onsubmit="return false">
      <div class="content">
        <label>
          <div class="yen_currency"></div>
          <input type="number" name="" :placeholder="`${min_text} ${max_text}`" v-model="shu" onkeyup="this.value=this.value.replace(/\D/g,'')">
        </label>
        <ul ref="amount">
          <li v-for='(item, index) in data' @click='dianji(item,index)'>{{item}}</li>
        </ul>
        <p v-html="minmax_info"></p>
      </div>
      <p>
        <span style="color:#9a9a9a!important" v-show="moneyMin">单笔下限<span style="color:#9a9a9a!important">{{moneyMin}}.00</span></span>
        <span style="color:#9a9a9a!important" v-show="moneyMax">单笔上限<span style="color:#9a9a9a!important">{{moneyMax}}.00</span></span>
      </p>
    </form>
    <div class="submit_div_a">
      <button class="color1" @click.prevent.stop="submitM()">确认充值</button>
      <button class="color1" @click="chongzhi()">重置金额</button>
    </div>
    <promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
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
  </div>
</template>
<script>
//import {
//  getOid,
//  getUrl
//} from '../../api'
import iHeader from '../../components/i-header'
import promptbox from '../../components/promptbox'
export default {
  components: {
    iHeader,
    promptbox
  },
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      alipaymin: 0,
      moneyMin: 0,
      moneyMax: 0,
      arrayMap: ["22", "55", "166"],
      options: ["农业银行", "中国银行", "招商银行", "建设银行", "交通银行", "工商银行", "渤海银行", "光大银行", "兴业银行", "民生银行", "中信银行", "广发银行", "华夏银行", "平安银行", "邮政储蓄银行", "浦发银行", "中国银行", "华夏银行", "北京农商", "上海银行", "银联支付"],
      bankName: "工商银行",
      titleH: "",
      isBlue: false,
      isKindShow: false,
      isEnd: false,
      blank: "",
      aliPayId: [],
      data: ['','','','','','','',''],
      shu: '',
      payUrl: '',
      panelShow: false,
      promptboxtext: "",
      iframe:null,
      urlId: "",
      pay_img_url: "",
      paramsL: "",
      navIndex: 0,
      isShowBank: false,
      canSubmit: true,
      canSubmitMax: true,
      payurls:'',
      showCurtion:false,
      erreocode:'',
      promptboxtext:'',
      panelShow:false,
      promptboxshow:true,
      successshow:false,
      promptsystem:'',
      moneyMin:"",
      moneyMax:"",
      min_text:"",
      max_text:"",
      minmax_info:"",
      type_list:{
        0:"55",
        1:"77",
        2:"66",
        3:"88",
        4:"99",
        6:"33",
        7:"22"
      },
      payUrls:''
    }
  },
  methods: {
    payonline(j, i) {
      if (i == undefined){
        i = 0
      }
      this.navIndex = i; 
      this.paramsL = j;
      this.moneyMin = j.min;
      this.moneyMax = j.max;
      if(j.isShowBank == 1){
        this.isShowBank = j.isShowBank
      }
      if(j.isShowBank == 0){
        this.isShowBank = ''
      }
      this.min_text = "最少输入"+this.moneyMin+"元,";
      this.max_text = "最多输入"+this.moneyMax+"元,";
      if(this.is_gd_ali == 'agcai'){
        this.moneyMin = Number(this.moneyMin);
        if (this.moneyMin <= 50) {
          this.data = [50, 100, 300, 500, 800, 1000, 2000, 3000]
        } else if (this.moneyMin > 50 && this.moneyMin < 500) {
          this.data = [100, 200, 300, 500, 800, 1000, 2000, 3000]
        } else if (this.moneyMin >= 500 && this.moneyMin <= 600) {
          this.data = [this.moneyMin, this.moneyMin + 100, this.moneyMin + 200, this.moneyMin + 300, 1000, 2000, 3000, 5000]
        } else { 
          this.data = [this.moneyMin + 500, this.moneyMin + 1000, this.moneyMin + 1500, this.moneyMin + 2000, this.moneyMin + 2500, this.moneyMin + 3000, this.moneyMin + 3500, this.moneyMin + 4000]
        }
      }else{
        this.moneyMin = Number(this.moneyMin);
        if (this.moneyMin <= 50) {
          this.data = [51, 102, 304, 502, 801, 1005, 2002, 3003]
        } else if (this.moneyMin > 50 && this.moneyMin < 500) {
          this.data = [102, 201, 301, 502, 801, 1002, 2003, 3004]
        } else if (this.moneyMin >= 500 && this.moneyMin <= 600) {
          this.data = [this.moneyMin, this.moneyMin + 101, this.moneyMin + 202, this.moneyMin + 304, 1001, 2002, 3004, 5001]
        } else { 
          this.data = [this.moneyMin + 501, this.moneyMin + 1002, this.moneyMin + 1503, this.moneyMin + 2001, this.moneyMin + 2504, this.moneyMin + 3004, this.moneyMin + 3504, this.moneyMin + 4001]
        }
      }
    },
    submitM(){
      if (this.isShowBank == 1){
      	this.successshow=false
        if (Number(this.shu) < Number(this.moneyMin)) {
          this.promptboxtext = `存款金额不能少于${this.moneyMin}`
          this.panelShow = true
          this.canSumbit = false
          setTimeout(() => {
            this.panelShow = false
            return
          }, 1200)
        } else {
          this.canSumbit = true
        };
        if(Number(this.shu) > Number(this.moneyMax)) {
          if(this.moneyMax != 0) {
            this.canSubmitMax = false
            this.promptboxtext = `存款金额不能大于${this.moneyMax}`
            this.panelShow = true
      		  return;
          }
        } 
        if (this.shu < this.alipaymin) {
          this.promptboxtext = `取款金额不能少于${this.alipaymin}`
          this.panelShow = true
          return;
        } else if (this.isEnd == false) {
          this.promptboxtext = "支付信息获取中"
          this.panelShow = true
          return;
        } else {
        	this.showCurtion = true;
          let t = this.paramsL;
          this.payUrl = `&money=${this.shu}`;
          if(location.href.split('?')[1]=='GameName=AG'){
          	this.payUrl+='&GameName=AG';
          }
          window.location.href = this.payUrls+this.payUrl+"&PayId="+this.bankName;
        }
      } else {
        if (Number(this.shu) < Number(this.moneyMin)) {
          this.promptboxtext = `存款金额不能少于${this.moneyMin}`;
          this.panelShow = true;
          this.canSumbit = false;
          return
        } else {
          this.canSumbit = true;
        }
        if (Number(this.shu) > Number(this.moneyMax)) {
          this.canSubmitMax = false;
          this.promptboxtext = `存款金额不能大于${this.moneyMax}`;
          this.panelShow = true;
          return;
        } else {
          this.canSubmitMax = true;
        }
        if (this.shu < this.alipaymin) {
          this.promptboxtext = `取款金额不能少于${this.alipaymin}`;
          this.panelShow = true;
          return
        } else if (this.isEnd == false) {
          this.promptboxtext = "支付信息获取中"
          this.panelShow = true;
          return
        } else if (this.shu >= this.alipaymin && this.isEnd == true) {
        	this.showCurtion = true;
          let t = this.paramsL;
          this.payUrl = `${t}&money=${this.shu}` ;
          if(location.href.split('?')[1]=='GameName=AG'){
          	this.payUrl+='&GameName=AG';
          }
          window.location.href = this.payUrls+this.payUrl;
        } else {
          this.promptboxtext = "操作异常，请重试";
          this.panelShow = true;
          return;
        }
      }
    },
    dianji(item, index) {
      this.shu = item;
      for (var i = 0; i < this.$refs.amount.children.length; i++) {
        this.$refs.amount.children[i].style.border = '1px solid #aaa';
      }
      this.$refs.amount.children[index].style.border = '2px solid #3B6BD6'
    },
    chongzhi() {
      this.shu = '';
      for (var i = 0; i < this.$refs.amount.children.length; i++) {
        this.$refs.amount.children[i].style.border = '1px solid #aaa';
      }
    },
  },
  created() {
    this.urlId = this.$route.params.id.split(':')[1];
    this.pay_img_url = this.$getPublicImg(`/images/pay_${this.urlId}.png`)
    if(this.urlId == 22){
      this.pay_img_url = '/wap/images/pay_22.png'
    }
    if(this.urlId == 33){
      this.pay_img_url = '/wap/images/pay_33.png'
    }
    let urlId = "";
    let urlIds = "";
    let params = {};
    let userOid = sessionStorage.getItem('im_token');
    params.oid = userOid;
    this.$http.post(`${getUrl()}/user/newPayin`, JSON.stringify(params)).then(res => {
    	if(res.data.msg=='4003'){
	        		this.$router.push({
	            	path: '/weihu'
	          })
	        }
      if (res.data.msg == "4001") {
        sessionStorage.clear();
        this.panelShow = true;
        this.promptboxtext = "您的账户已失效，请重新登录";
        setTimeout(() => {
          this.panelShow = false;
          this.$router.push({
            path: '/login'
          })
        }, 1000)
      } else {
        for (let i = 0; i < res.data.online_pay_limit.length; i++) {
          if (this.urlId == this.type_list[res.data.online_pay_limit[i].pay_type]) {
            this.aliPayId.push(res.data.online_pay_limit[i])
            this.payUrls = res.data.online_pay_limit[i].payUrl
          }
        }
        let money_ss =  this.aliPayId[0]
        this.resDate = eval("money_ss");
        this.moneyMin = this.resDate.min;
        this.moneyMax = this.resDate.max;
        this.min_text = "最少输入"+this.moneyMin+"元,";
        this.max_text = "最多输入"+this.moneyMax+"元,";
        if(this.resDate.isShowBank == 1){
          this.isShowBank = this.resDate.isShowBank
        }
        if(this.moneyMin == 0){
          this.min_text = "";
        }
        if(this.moneyMax == 0){
          this.max_text = "";
        }
        if(this.moneyMin == 0 && this.moneyMax == 0){
          this.min_text = "请输入充值金额";
        }
        this.isEnd = true;
      }
      if(this.is_gd_ali == 'agcai'){
        this.moneyMin = Number(this.moneyMin);
        if (this.moneyMin <= 50) {
          this.data = [50, 100, 300, 500, 800, 1000, 2000, 3000]
        } else if (this.moneyMin > 50 && this.moneyMin < 500) {
          this.data = [100, 200, 300, 500, 800, 1000, 2000, 3000]
        } else if (this.moneyMin >= 500 && this.moneyMin <= 600) {
          this.data = [this.moneyMin, this.moneyMin + 100, this.moneyMin + 200, this.moneyMin + 300, 1000, 2000, 3000, 5000]
        } else { 
          this.data = [this.moneyMin + 500, this.moneyMin + 1000, this.moneyMin + 1500, this.moneyMin + 2000, this.moneyMin + 2500, this.moneyMin + 3000, this.moneyMin + 3500, this.moneyMin + 4000]
        }
      }else{
        this.moneyMin = Number(this.moneyMin);
        if (this.moneyMin <= 50) {
          this.data = [51, 102, 304, 502, 801, 1005, 2002, 3003]
        } else if (this.moneyMin > 50 && this.moneyMin < 500) {
          this.data = [102, 201, 301, 502, 801, 1002, 2003, 3004]
        } else if (this.moneyMin >= 500 && this.moneyMin <= 600) {
          this.data = [this.moneyMin, this.moneyMin + 101, this.moneyMin + 202, this.moneyMin + 304, 1001, 2002, 3004, 5001]
        } else { 
          this.data = [this.moneyMin + 501, this.moneyMin + 1002, this.moneyMin + 1503, this.moneyMin + 2001, this.moneyMin + 2504, this.moneyMin + 3004, this.moneyMin + 3504, this.moneyMin + 4001]
        }
      }
      
    })


  }
}
</script>


<style lang='less' ref="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
@zoom: 46.875rem;
.bank-select {
  line-height: 2rem;
  background-color: #fff;
  text-align: left;
  padding-left: 1rem;
}
.bank-select-icon {
  float: right;
  margin-right: 10px;
  color: #cbcbcb;
}
.box {
  background-color: #f2f2f2;
  height: 100%;
}
.title {
  height: 85/40rem;
  line-height: 85/40rem;
  background: #fff;
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

.content {
  text-align: center;
  label {
    background-color: #fff;
    height: 120/@zoom;
    display: inline-block;
    border-radius: 0.25rem;
    margin-top: 23.4375/@zoom;
    width: 694/@zoom;
    >div {
      color: #9b9b9b;
      width: 90/@zoom;
      height: 120/@zoom;
      text-align: center;
      float: left;
      background-size: 40/@zoom 50/@zoom;
      background-position: center;
    }
  }
  input {
    width: 604/@zoom;
    height: 120/@zoom;
    border: none;
    outline: none;
    background-color: #fff;
    color: #cdcdcd;
    float: left;
  }
  ul {
    margin-top: 15/@zoom;
    li {
      display: inline-block;
      width: 160/@zoom;
      height: 80/@zoom;
      line-height: 70/40rem;
      border-radius: 10/40rem;
      background-color: #fff;
      margin: 5/20rem 3/20rem;
      text-align: center;
      border: 1px solid #cccccc;
      color: #666666;
      font-weight: 600;
    }
  }
}
p {
  line-height: 1.025rem;
  padding-left: 32/@zoom;
  color: #9a9a9a;
  text-align: left;
  span {
    color: #002ed5!important;
    font-family: arial;
  }
}
.biao {
  width: 100%;
  text-align: center;
}
button {
  width: 693/@zoom;
  height: 90/@zoom;
  border: none;
  outline: none;
  margin: 0 auto 22/40rem;
  border-radius: 10/40rem;
  border: 1px solid #cccccc;
}
button:nth-child(1) {
  background: #0857d8;
  color: #fff;
}
button:nth-child(2) {
  background: #fff !important;
  color: #000000;
}
.submit_div_a {
  text-align: center;
  margin-top: 50/@zoom;
}
.zzc {
  position: fixed;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background: rgba(9, 9, 9, 0.1);
}
.contain_m {
  background: #aaa;
  border-radius: 5px;
  height: 9.5rem;
  width: 8rem;
  margin: 10rem auto;
  text-align: center;
  padding: .3rem .5rem;
}

.contain_m p {
  color: #2E6EC9;
  font-size: .75rem;
}

.contain_m div {
  color: #fff;
  border-bottom: 1px solid #ddd;
  padding: .5rem;
  font-size: .75rem;
}

.pay_header {
  font-size: 0;
  height: 210/46.875rem;
  >div {
    width: 100%;
    height: 210/@zoom;
    img {
      width: 374/@zoom;
      height: 100/@zoom;
      margin: 55/@zoom 188/@zoom;
    }
  }
}

.aisle {
  font-size: 0;
  margin-top: 12/20rem;
  >div {
    height: 29/20rem;
   /* background-image: url(../../../wap/images/pay_aisle.png);*/
    background-color:#E4E4E4;
  /*  box-shadow: 0 1/20rem 2/20rem #a0a0a0;*/
    
    margin-left: 8/20rem;
    margin-top: 6/20rem;
    display: inline-block;
    font-size: 14/20rem;
    width: 95/20rem;
    border-radius: 3/20rem 3/20rem 3/20rem 3/20rem;
   
    color: #9C9C9C;
    font-weight: 600;
    text-align: center;
    line-height: 29/20rem;
  }
  .active {
    background-color: #2F64D4;
    color: white;
    /*background-image: url(../../../wap/images/pay_aisle_active.png);*/
  }
}

.seach {
  width: 100%;
  height: 100/@zoom;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #E4E4E4;
  border-bottom: 1px solid #E4E4E4;
  overflow: hidden;
  >* {
    display: inline-block;
  }
  span {
    width: 110/@zoom;
    height: 100/@zoom;
    line-height: 100/@zoom;
    text-align: center;
    font-size: 30/@zoom;
    float: left;
    margin-left: 30/@zoom;
  }
  select {

    width: 610/@zoom;
    height: 100/@zoom;
    line-height: 100/@zoom;
    border: none;
    outline: none;
    text-indent: 20/@zoom;
    option {
      padding-left: 20/@zoom;
      box-sizing: border-box;
    }
  }
}
</style>
