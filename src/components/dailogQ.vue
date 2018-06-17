<template>
<div class="">

  <div class="is-active" v-if="!panelShow">
    <div class="modal-content" v-show="loading">
      <div class="title">投注明细</div>
      <ul>
        <li v-for="(item,j) in lotteryS">
          <div>
            <span>{{item.groupName}}</span>
            <span>{{item.name}}</span>
          </div>
          <div>
            <span class="monry">{{item.money}}</span>
          </div>
          <i @click.stop="delt(j)"></i>
        </li>
      </ul>
      <div class="total">
        <div>
          <span>组数</span>
          <span  class="color_money"  style="color: #0a44e1;">{{lengths}}</span>
        </div>
        <div>
          <span>总计</span>
          <span class="color_money" style="color: #0a44e1;">{{zonghe}}元</span>
        </div>
      </div>
      <footer class="color1 gdcolor">
        <span @click="xiazhu">确认</span>
        <span @click="hideDailog" >取消</span>
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
  <promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
</div>
</template>
<script>
import promptbox from '../components/promptbox'
export default {
  data() {
    return {
    	is_gd_ali: is_gd_ali(),
      lotteryS: [],
      lengths: 0,
      zonghe: 0,
      odd: {},
      title: "",
      loading:true,
      panelShow: false,
      ip_xxx:null,
      newHao:false,
      erreocode:'',
	    promptboxtext:'',
	    panelShow:false,
	    promptboxshow:true,
	    successshow:false,
	    promptsystem:'',
	    gametoken1:JSON.parse(sessionStorage.getItem('gametoken')),
    }
  },
  components: {
	      promptbox
	    },
  mounted(){
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
    game_code:{
      type: Number
    },
    type_code:{
      type: Number
    },
    gametoken:{
      type: String
    }
  },
  created(){
  	
    this.lotteryS = this.lotteryM;
   	let s= ''
    for (let i=0; i<this.lotteryS.length; i++){
      this.lotteryS[i].money = this.money;
       s= this.lotteryS[i].key;
      this.odd[s] = this.money;
      this.lengths++;
      this.zonghe = this.lengths * this.money
   }
   
  },
  beforeUpdate(){
  },
  methods: {
    sendParent(){
      this.$emit("listenToChildEvent",true);
    },
    delt(j) {
      this.lengths=0;
      this.zonghe=0;
      this.odd = {};
      this.lotteryS.splice(j, 1);
    for (let i = 0; i < this.lotteryS.length; i++){
      this.lotteryS[i].money = this.money;
      let s = this.lotteryS[i].key;
      this.odd[s] = this.money;
      this.lengths++;
      this.zonghe = this.lengths * this.money
    }
	  if(this.lengths === 0) {
	    this.sendParent();
	    this.$store.dispatch('hideDailogQ')
	  	}
    },
    kadun(){
    },
    xiazhu() {
//  	for(var a in this.lotteryS ){
//	     this.lotteryS[a].isCheck=false
//     }//循环遍历true
      this.sendParent();
      this.loading=false
      let oidInfo = sessionStorage.getItem('im_token');
      this.odd.oid = oidInfo;
      this.odd.game_code = this.game_code;
      this.odd.type_code = this.type_code;
      this.odd.round = this.round;
   		this.odd.token =this.gametoken1;
      this.$http.post(`${getUrl()}/inup`, JSON.stringify(this.odd), {}).then(res => {
      	this.successshow=false
      	if(res.data.msg==4003){
	        		this.$router.push({
	            	path: '/weihu'
	          })
	        }
       if ((res.data) instanceof Array) {
      		this.promptboxtext = '恭喜您下注成功'
          this.panelShow = true
          this.successshow=true
          this.sendParent();
        	sessionStorage.setItem('gametoken', JSON.stringify(res.data[0].token))
       		setTimeout(this.hideDailog,1200);
       } else if(res.data.msg == 4001){
        	sessionStorage.clear();
          this.promptboxtext = '您的账户已失效，请重新登录'
          this.panelShow = true
          setTimeout(this.kadun,1200);
          setTimeout(this.hideDailog,1000);
       } else if(res.data.msg == 5001){
          this.promptboxtext = '下注项为空，金额不正确,请重新输入'
          this.panelShow = true
          setTimeout(this.kadun,1200);
          setTimeout(this.hideDailog,1000);
          
        }
        else if (res.data.msg == 5002) {
          this.erreocode='5002'
					this.panelShow = true
					this.promptsystem = "该游戏正在封盘，可前往其他游戏！" 
          this.sendParent();
          setTimeout(this.hideDailog, 1200);
        }
        else if (res.data.msg == 5003){
          this.erreocode='5003'
					this.panelShow = true
					this.promptsystem = "因网络原因，本次投注未成功，请稍后重试！" 
          this.sendParent();
          setTimeout(this.hideDailog,1200);
        }
        else if (res.data.msg == 5004) {
          this.promptboxtext = '余额不足'
          this.panelShow = true
        	this.sendParent();
          setTimeout(this.hideDailog, 1200);
        }
        else if(res.data.msg==5008){
          this.erreocode='5008'
					this.panelShow = true
					this.promptsystem = "网络繁忙，请稍等在试"
					this.sendParent();
					 setTimeout(this.hideDailog, 1200);
        }
        else if(res.data.msg==5009){
          this.promptboxtext = "提交太频繁，请稍等在试";
          this.panelShow = true
          this.sendParent();
          setTimeout(this.hideDailog, 1200);
        }
        else if(res.data.msg==5010){
          this.promptboxtext = "请勿重复提交";
          this.panelShow = true
          this.sendParent();
          setTimeout(this.hideDailog, 1200);
          sessionStorage.setItem('gametoken', JSON.stringify(""))
        }
        else if (res.data.msg == 7001){
         	this.promptboxtext = "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注"
          this.panelShow = true
          this.sendParent();
          setTimeout(this.hideDailog, 3900);
        }else if (res.data.msg ==3004){
					this.promptboxtext = "PC蛋蛋同一期中的大单、大双、小单、小双只能下期中一注"
          this.panelShow = true
          setTimeout(this.hideDailog, 1200)
        }else if(res.data.msg ==3001){
        	this.erreocode='3001'
					this.panelShow = true
					this.promptsystem = "下注内容未开放，请尝试其他游戏！"
					this.sendParent();
					 setTimeout(this.hideDailog, 1200);
        }else if(res.data.msg ==3002){
        	this.erreocode='3002'
					this.panelShow = true
					this.promptsystem = "下注内容未开放，请尝试该游戏的其他玩法!" 
					this.sendParent();
					setTimeout(this.hideDailog, 1200);
        }else if(res.data.msg ==3003){
        	this.erreocode='3003'
					this.panelShow = true
					this.promptsystem = "抱歉，网络原因导致下注未成功，请重新尝试!" 
					this.sendParent();
					setTimeout(this.hideDailog, 1200);
        }
      }).catch(err => {
          	console.log(err)
          })
    },
    hideDailog() {
      this.$store.dispatch('hideDailogQ')
    }
  },
  components: {
  	promptbox
  }
}
</script>

<style lang='less' rel="stylesheet/less">
@import url(../icon/iconfont.css);
@import '../assets/less/variable.less';
.fade-enter-active, .fade-leave-active {
  transition: opacity 2s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
.icon-ok {
    display: none;
}
.is-active {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    font-family: '黑体';
    width: 13.8rem;

    border-radius: 20/45rem;

    background: #fff;

    text-align: center;
    font-size: 32/45rem;
    .title {
        height: 72/45rem;
        line-height: 72/45rem;
        font-size: 34/45rem;
        font-weight: bold;
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
            text-align: left;
            span {
                font-family: arial;
            }
            span:nth-child(2) {
                display: inline-block;
               /* margin-right: 20/45rem;*/
            }
            .monry {
                padding: 0;
                width: 100%;
                text-align: center;
            }
            span:nth-child(1) {
              display: inline-block;

              letter-spacing: 1px;
                /*padding-left: 20/45rem;*/
            }
        }
        div:nth-of-type(1){
          width: 70%;
        }
        div:nth-of-type(2){
          width: 30%;
        }
        i {
            position: absolute;
            top: 14/34rem;
            right: 20/45rem;
            width: 30/45rem;
            height: 30/45rem;
            border-radius: 10/45rem;
            background: url('@{public_img}/images/ll.png') no-repeat;
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
        border-radius: 0 0 10/45rem 20/45rem;
        font-size: 0;
        span {
            line-height: 70/45rem;
            color: #fff;
            width: 265/45rem;
            box-sizing: border-box;
            font-size: 16/20rem;
        }
        span:nth-child(1) {
            border-right: 2px solid #fff;
          display: inline-block;

        }
        span:nth-child(2) {
          display: inline-block;

        }
    }
}
.header-modal-content ul{
  li{
    height: 100%;
    line-height: 2;
  }
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

</style>
