<template>
  <div style="top:0;height:1.9rem;">

    <header class="color1" :style="{'top': isIosWebview ? 40/40+'rem': 0}" ref="headZindex">
      <div @click="goHome">
        <i>
            <img :src="$getPublicImg('/images/backing_out.png')" style="width:.6rem;left:.3rem;position:relative;"/>
        </i>
      </div>
      <div class="title" @click="hideDailog">
        <span>{{title}}</span>
        <i class="small_la"></i>
      </div>
      <div>
        <i style="width: 1rem;height: 1rem;font-size:16px;margin: 0.2rem 0.4rem;float: right;" class=""
           @click.stop="isShowgame">
         <img style="width: 1rem; height: 0.75rem; margin-top: -0.3rem;" :src="$getPublicImg('/images/menumoney.png')"
               alt=""/>
        </i>
        <ul  class="alert_right" v-show="isOpen">
          <li @click='gotoAddress("/my")'>个人中心<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li class="money" @click=''> 账户余额<span style="color:#0b76fa;">￥{{Number(money).toFixed(2)}}</span></li>
	        <li @click='gotoAddress("/Order:0")'>我要充值<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li @click='gotoAddress("/Order:1")'>我要提现<img :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li @click='gotoAddress("/myHistroy")'>下注记录<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li @click='gotoAddress("/game99")'>开奖大厅<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li>开奖音效
			        <input type="checkbox"  v-model="setCheckboxmodel" id="ios-checkbox" name="emulate-ios-button" class="raw-checkbox">
			        <label for="ios-checkbox" class="emulate-ios-button"></label>
	        </li>
	        <li @click='gotoAddress("/todayRule")'>游戏规则<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li @click="gotoPayAddress()">联系我们<img  :src="$getPublicImg('/images/jiantou.png')"  alt=""/></li>
	        <li @click='exit'>退出</li>
				 </ul>
    </div>
  </header>
<div class="mask" @click="mask=false;isOpen=false" v-show="mask">
    </div>
<transition name="fade">
  <div v-show="isShow" class="header-is-active" @click="hideDailog">
    <div class="header-modal-content">
      <ul>
        <li ref="gamename" @click='gotoAddress(k)' v-for="(v,k) in lotteryGame">{{v}}<span class="line"></span></li>
      </ul>
      <i class="up"></i>
      </div>
    </div>
   </transition>
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
    <promptbox  @panelShow="panelShow=false" :promptboxshow="promptboxshow" :panelShow="panelShow"
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
import promptbox from '../../components/promptbox'
export default {
  data() {
    let obj = {
      isIosWebview: isIosWebview,
      is_gd_ali: window.is_gd_ali(),
      checkboxmodel:false,
      showha:false,
      isShow:false,
      isOpen:false,
      mask:false,
      logout: false,
      username:'',
      loading:true,
      isWan:'',
      panelShow:false,
      titleSw: "",
      money:'',
      erreocode:'',
	    promptboxtext:'',
	    panelShow:false,
	    promptboxshow:true,
	    promptsystem:'',
      lotteryGame:{
        game_201 : "极速六合彩",
        game_90 : "88赛马",
        game_60 : "极速时时彩",
        game_551 : "极速赛车",
        game_66:"威尼斯赛艇",
        game_401:'罗马时时彩',
        game_55:"北京赛车",
        game_40:"重庆时时彩",
        game_20:"香港六合彩",
        game_35:"幸运飞艇",
        game_15:"PC蛋蛋",
        game_30:"广东快乐十分",
        game_25:"重庆幸运农场",
        game_88:"江苏骰宝(快3)",
        game_881:"吉林快3",
        game_180:"北京快乐8",
        game_220:"福彩3D",
        game_133:"广东11选5"
      }
    }
    // if (obj.is_gd_ali == 'lv'){
    //   obj.lotteryGame.game_201 = "极速六合彩";
    //
    // }
    return obj;
  },
  components: {
  	promptbox
  },
  props: {
    game_code:{
      type: Number
    },
    title: {
			type:String
  	},
  },
  created(){


  	//判断开奖声音的状态
  	if(sessionStorage.getItem("musicswitch")){
	  		this.checkboxmodel =JSON.parse(sessionStorage.getItem('musicswitch'))
	  	}else{
	  		this.checkboxmodel = false
	  	}
  	this.username = sessionStorage.getItem("im_username")
  	this.money = sessionStorage.getItem("im_money")

    switch (this.game_code){
      case 51:
      delete this.lotteryGame.game_55;
      break;
      case 2:
      delete this.lotteryGame.game_40;
      break;
      case 69:
      delete this.lotteryGame.game_20;
      break;
      case 171:
      delete this.lotteryGame.game_35;
      break;
      case 160:
      delete this.lotteryGame.game_15;
      break;
      case 3:
      delete this.lotteryGame.game_30;
      break;
      case 47:
      delete this.lotteryGame.game_25;
      break;
      case 172:
      delete this.lotteryGame.game_88;
      break;
      case 210:
      delete this.lotteryGame.game_66;
      break;
      case 46:
      delete this.lotteryGame.game_401;
      break;
      case 240:
      delete this.lotteryGame.game_551;
      break;
      case 250:
      delete this.lotteryGame.game_60;
      break;
      case 260:
      delete this.lotteryGame.game_90;
      break;
      case 270:
      delete this.lotteryGame.game_201;
      break;
      case 280:
      delete this.lotteryGame.game_881;
      break;
      case 180:
       delete this.lotteryGame.game_180;
      break;
      case 220:
       delete this.lotteryGame.game_220;
      break;
    }
  },
  computed: {
		setCheckboxmodel: {
			get () {
				return this.checkboxmodel
			},
			set (val) {
				sessionStorage.setItem('musicswitch', JSON.stringify(val))
				this.checkboxmodel = val
			}
		}
  },
  methods: {
    open(){
      this.showha=!this.showha
    },
    hideDailog(i){
    	this.mask = false;
    	this.isOpen = false;
      this.isShow = !this.isShow;
      if(this.$refs.headZindex){
      	this.$refs.headZindex.style.zIndex = '100'
      }
    },
    goHome(){
      this.$router.push({
        path: '/index'
      })

      },
      close_showha() {
        this.showha = false
      },
      regulation() {
        this.$emit('regulation_click');
      },
      exit(){
        sessionStorage.clear();
        this.logout = !this.logout;
        this.$router.push('/index')
      },
   		isShowgame() {
   		 	this.isShow=false;
        this.isOpen = !this.isOpen;
        this.mask = !this.mask;
        if (this.mask) {
          this.$refs.headZindex.style.zIndex = '99999999'
        } else {
          this.$refs.headZindex.style.zIndex = '100'
        }
       this.money = sessionStorage.getItem('im_money')
      },
      gotoAddress(path){
        //试玩账号权限限制
//       window.sound.pause()
        this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == '游客') {
        	this.mask=false;
        	this.isOpen=false;
          if (/^\/Order*/.test(path)) {
          	this.promptboxtext = "请登录正式会员账号!"
          	this.panelShow = true
            return
          }
        }
        if (path == "app") {
          this._window.location.href = this.appdown;
        } else if (/activity*/.test(path)) {
          this.$router.push(path)
        } else {
          if (!sessionStorage.getItem("im_token")) {
           this.$router.push("/login")
         }
         else {
					this.$router.push(path)
         }
        }
      },
       gotoPayAddress(){
       	this.$router.push('/kefu')
    },
    gotoTrendAddress(path) {

      let i = `/trend:${this.game_code}`;
      this.$router.push({path:i})
    },
     log_out() {
        sessionStorage.clear();
        this.logout = false;
        this.mask = false;
      },

    },
    components: {
	  	promptbox
	  }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
  @blue: #146cdc;
  @font_title: #ffffff;
  @font_round: rgb(0, 0, 0);
  @font_balance: #6993d5;
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */
  {
    opacity: 0
  }
.small_la{
  width: 0.6rem;
  display: inline-block;
  height: 0.4rem;
  background: url('@{public_img}/images/small_la.png') no-repeat;
  background-size: 100% 100%;
}
  header {
    display: flex;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    align-items: center;
    padding: 0 0.2rem;
    height: 38/20rem;
    background: @blue;
    color: @font_title;
    z-index: 100;
    .icon-zuo {
      font-size: 18/20rem;
    }
    .icon-hanbaobao {
      font-size: 18/20rem;
    }
    .title{
      font-size: 17/20rem;
      padding-left: 2.3rem;
      i {
        font-size: 12/20rem;
      }
    }
    .showha {
      display: none;
    }
    ul {
      position: absolute;
      right: 5/20rem;
      top: 50/20rem;
      padding: 5/20rem 5/20rem;
      background: rgba(65, 65, 65, 0.9);
      border-radius: 0.2rem;

      /*display: none;*/
      /*z-index:10;*/
      li {
        width: 60/20rem;
        /* height: 25/20rem;*/
        line-height: 25/20rem;
        border-bottom: 1px solid rgba(255, 255, 255, 0.5);
        color: #fff;
        font-size: 14/20rem;
      }
      li:nth-child(1) {
        padding-left: 25/20rem;
        background: url('@{public_img}/images/gz.png') no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
      }
      li:nth-child(2) {
        padding-left: 25/20rem;
        background: url('@{public_img}/images/history.png') no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
      }
      li:nth-child(3) {
        padding-left: 25/20rem;
        background: url('@{public_img}/images/qs.png') no-repeat 1/20rem  5/20rem;
        background-size: 17/20rem 17/20rem;
        border: none;
      }
    }
    ul:before {
      content: "";
      width: 0;
      height: 0;
      border-bottom: 11/20rem solid rgba(65, 65, 65, 0.9);
      border-right: 11/20rem solid transparent;
      border-left: 11/20rem solid transparent;
      border-top: 11/20rem solid transparent;
      position: absolute;
      right: 10/20rem;
      top: -22/20rem;
    }
  }

  .mask {
    position: fixed;
    width: 100%;
    background: rgba(0, 0, 0, 0.4);
    height: 100vh;
    z-index: 999999;
  }

  .header-is-active {

    position: fixed;

    background-color: rgba(0, 0, 0, 0);
    z-index: 9999;
    margin: 0 auto;

  }

  .header-modal-content {
    background: #fff;
    text-align: center;
    position: relative;
    width: 100%;
    margin: 30/20rem auto;
    z-index: 101;
    > ul {
      text-align: center;
      display: inline-block;
      li{
        float:left;
        text-align: center;
        width: 33.3%;
      	height: 70/46.875rem;
        line-height:70/46.875rem;
        font-size: 14/20rem;
        border-bottom: 1px solid #999;
      }
    }
    > ul:nth-last-of-type(1) {
      border: 0;
    }

  }
  .line{
    border-right:1px solid #aaa;
    height:25px;
    float:right;
    margin-top:7px;
    margin-right: -1px;
  }

  .alert_right {
    position: absolute;
    right: .2rem;
    top: 2.2rem;
    padding: 0 !important;
    background: #fff;
    color: #151515;
    border-radius: 0.2rem;
    li {
      width: 8.5rem;
      text-align: left;
      line-height: 1.5rem;
      font-size: 12/20rem;
      border-bottom: 1px solid #ccc !important;
      padding-left: 1.7rem !important;
      color: #000 !important;
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

  .alert_right{
    > li:nth-of-type(1){
      background: url('@{public_img}/images/usergr.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;
      span {
        color: #385efd;
      }
    }
    > li:nth-child(2) {
      background: url('@{public_img}/images/czhi.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(3) {
      background: url('@{public_img}/images/qu_kuan.png') no-repeat 0.2rem 0.2rem;
     background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(4) {
      background: url('@{public_img}/images/xzhu.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(5) {
      background: url('@{public_img}/images/xzjjl.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(6) {
      background: url('@{public_img}/images/kjjl.png') no-repeat 0.2rem 0.2rem;
     background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(7) {
      background: url('@{public_img}/images/music.png') no-repeat 0.3rem 0.2rem;
      background-size: 48/46.875rem 48/46.875rem;
      position: relative;
    }
    > li:nth-child(8) {
      background: url('@{public_img}/images/grule.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;

    }
    > li:nth-child(9) {
      background: url('@{public_img}/images/lxi.png') no-repeat 0.2rem 0.2rem;
      background-size: 54/46.875rem 54/46.875rem;
    }
    > li:nth-child(10) {
      background: url('@{public_img}/images/tchu.png') no-repeat 0.3rem 0.2rem;
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

  .zzc {
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    height: 100%;
    position: absolute;
    width: 100%;
    z-index: 99;
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
    color: #7F7F7F;
    font-size: 0.8rem;
    margin: 0.5rem auto;
  }

  .white2 div {
    border-top: 1px solid #EEEEEE;
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
    background: #0857D8;
    color: #DFDFDF;
  }

  .white2 div button:nth-child(2) {
    color: #D7E4F8;
    background: #707070;
  }
  .loading{
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  color: white!important;
  padding-top: 40%;

  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3; }

    100% {
      opacity: 1; } }

  .line-spin-fade-loader {
    text-align: center;
    position: relative;
    width:100/20rem;
    height: 100/20rem;
    transform: translateX(50px) translateY(50px);
    margin-left: auto;
    margin-right: auto;
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(5) {
    top: -20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out; }
  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out; }

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
 			.emulate-ios-button {
            display: block;
            width: 2rem;
            height: 1rem;
            background: #ccc;
            border-radius: 5rem;
            cursor: pointer;
            position: relative;
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
             position: absolute;
            right: 0.5rem;
            top: 0.3rem;
        }

        /* ==========================================================================
                    设置伪类,来实现模拟滑块滑动,过渡用了transition来实现 ,
                    translateZ来强制启用硬件渲染
       ========================================================================== */

        .emulate-ios-button:after {
            content: '';
            display: block;
            width: .9rem;
            height: .9rem;
            border-radius: 100%;
            background: #fff;
            box-shadow: 0 1px 1px rgba(0, 0, 0, .1);
            position: absolute;
            left: .05rem;
            top: .05rem;
            -webkit-transform:translateZ(0);
            transform:translateZ(0);
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            z-index: 1;
        }

        .emulate-ios-button:active:after {
            width: 1.1rem;
        }

      /* ==========================================================================
                    设置raw-checkbox,视觉直观比较
       ========================================================================== */
        .raw-checkbox{
            height:1rem;
            width:2rem;
            position: absolute;
            right: 0.5rem;
            top: 0.3rem;
            z-index: 2;
            opacity: 0;
        }

        .raw-checkbox:checked+label {
            background: #146cdc;
        }

        /* 这里是伪元素偏移,初始是0.9+0.05 ,所以这里1.05rem */
        .raw-checkbox:checked+label:after {
            left: 1.05rem;
        }

        .raw-checkbox:checked+label:active:after {
            left: .5rem;
        }


        .raw-checkbox:disabled+label {
            background: #d5d5d5;
            pointer-events: none;
        }

        .raw-checkbox:disabled+label:after {
            background: #bcbdbc;
        }

</style>
