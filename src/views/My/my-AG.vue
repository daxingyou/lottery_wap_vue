<template>
  <div class="box">
  <div class="title color1">
		  <i @click="goBack()"></i>
		  <span>AG游戏</span>
		</div>
    <div class='bgImg' ref="bgagimg">
    	<div class="edzh" v-show="isWan!='游客'" style="z-index: 2;position: fixed;left: 0;top:1.92rem;">
    		<div class="top_t">
		      <p>AG余额 :<span>{{agMoney}}</span></p>
		      <p>彩票余额:<span>{{balance}}</span></p>
		    </div>
		    <div class="headerChoose">
		    	<button @click="edzhag">额度转换</button>
		    	<button @click="gotoPayAddress">AG充值</button>
		    	<button @click="gotoPayAddresscz">AG提现</button>
		    </div>
    	</div>
		<div class="anNiu">
			<button @click="ykzr">
				<img src="../../../wap/images/zhenWan.png"/>
			</button>
			<button @click="shiwan">
				<img :src="`../../../wap/images/${is_gd_ali}/isWan.png`"/>
			</button>
		</div>
		 <div class="edzhmodel" v-show="isEdzh">
		 	<div class="edzhdiv">
	    		<div class="edzhTop color1" >
	    			 <span style="margin-left: 1rem;">额度转换</span>
	    			  <a style="float: right;text-align:center;line-height: 1rem;margin-right: 0.3rem;margin-top:0.3rem;display:block;width: 1rem;height: 1rem;" @click="gbedzh">
	    			  		<img  style="width: 100%;"  :src="$getPublicImg('/images/agsw.png')"/></a>
	    		</div>
	    		<div class="edzhFood">
	    			<label><input type="radio" class="radio" name="1"  v-model="transferType" value="1"/><i class="checkboxinput"></i><a>彩票余额</a><img :src="$getPublicImg('/images/edzhjt.png')"/><a>AG余额</a></label>
	    			<label>
	    				<input type="radio" class="radio" v-model="transferType" value="0"/>
	    				<i class="checkboxinput"></i><a>AG余额</a>
	    				<img :src="$getPublicImg('/images/edzhjt.png')"/><a>彩票余额</a></label>
	    			<div class="numberMoney"><span></span>
	    				<input type="tel"  
	    					pattern="\d*"
	    					placeholder="请输入转换金额" 
	    					@input.stop.prevent="zhengshu" 
	    					v-model="nut"/>
	    			</div>
	    			<div class="edzhbtn">
	    				<button @click="submit">确认</button>
	    				<button @click="chongzhi">重置</button>
	    			</div>
	    		</div>
    		</div>
   		</div>
    </div>
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
     <div v-show="istx">
      <div class="modal_box_feedback">
        <div class="modal_div">
          <div class="modal_header color1">
            <span style="margin-left: 1rem;">通知</span>
            <a style="float: right;text-align:center;line-height: 1rem;margin-right: 0.3rem;margin-top:0.45rem;display:block;width: 1rem;height: 1rem;"</a>
          </div>
          <div class="modal_foot">
            <div  clss="gantan"><img style="width: 100%;height: 100%;" :src="$getPublicImg('/images/gantan.png')"/></div>
            <p>试玩模式金额不能提现</p>
          </div>
        </div>
      </div>
    </div>
    <div v-show="isykag">
      <div class="modal_box_feedback">
        <div class="modal_div">
          <div class="modal_header color1">
            <span>通知</span>
          </div>
          <div class="modal_foot">
            <div  clss="gantan" style="margin-top: 0.2rem;"><img style="width: 100%;height: 100%;" :src="$getPublicImg('/images/gantan.png')"/></div>
            <p>请先注册</p>
            <button style="background: #2e64d2;margin-left: 2rem;" @click="agzc">注册</button>
            <button style="background: #da524d;margin-left: 1rem;" @click="gbzr">关闭</button>
          </div>
        </div>
      </div>
    </div>
    	<promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
  import iHeader from '../../components/j-header'
	import promptbox from '../../components/promptbox'
	import { mapActions } from "vuex";
  export default {
    components: {
      iHeader,
      promptbox
    },
    data() {
      return {
      	isWan:this.$store.state.userData.username?this.$store.state.userData.username:'游客',
      	bgSrc:'',
      	agbgimg:'',
      	isUser:false,
      	panelShow: false,
      	promptboxtext:'',
      	agMoney: null,          // ag余额
        balance: null,           // 彩票余额
				isEdzh:false,
				is_gd_ali: is_gd_ali(),
				nut:null,
				folder: "../../../wap/images/"+window.type+"/isWan.png",
				imgPath: window.type,
        transferType: 1,// 彩票转ag
        showCurtion:true,
        istx:false,
        isykag:false,
        erreocode:'',
	      promptboxtext:'',
	      panelShow:false,
	      promptboxshow:true,
	      successshow:false,
	      promptsystem:''
      }
    },
    methods:{
			...mapActions(["GAME_BALANCE", "GAME_TRANSFER", "GAME_AGLOGIN"]),
    	gbzr(){
    		this.isykag=false
    	},
    	agzc(){
    		 this.$router.push({
          path: '/regist'
        })
    	},
			goBack() {
         if (this.isIndex==1) {
           window.location.href=sessionStorage.getItem("im_sportsurl");
         }
         else {
            // 发送后退的状态
           // 后退
           this.$router.go(-1)
         }
    },			    	
    	ykzr(){
    		this.successshow=false
    		if(this.isWan=='游客'){
    			this.isykag=true
    		}else{
    			if(Number(this.agMoney)==0){
						this.panelShow = true;
		        this.promptboxtext = 'AG余额不足'
    			}else{
    				this.showCurtion=true
						this.GAME_AGLOGIN({actype:1}).then(res=>{
							location.href=res.data.response[0].url;
						});		       
    			}
    		}
    	},
    	yksw(){
				this.successshow=false
				this.GAME_AGLOGIN({actype:0}).then(res=>{
					location.href=res.data.response[0].url;
				});		
    	},
    	shiwan(){
			this.yksw()
    	},
    	gbedzh(){
    		this.isEdzh=false
    	},
      	edzhag(){
      		this.isEdzh=true
      	},
      	zhengshu(){
	       this.nut= this.nut.replace(/[^0-9]/g, "");
	       this.nut = Number(this.nut);
	       if(this.nut == 0){
	       	this.nut = null
	       }
      	},
      	submit(){
      		this.successshow=false
	        let params ={};
					params.amount = this.nut
					params.gameOut = this.transferType=='0'?"AG":0;					
	        params.gameIn = this.transferType=='0'?0:"AG";
				// kong 或者 0
	        if(this.nut == 0){
	          this.panelShow = true;
	          this.promptboxtext = '金额必须是整数且最少是1元';
	          this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	          setTimeout(()=>{
	            this.panelShow = false;
	          },1200);
	          return;
	        }
	        if(this.nut ==null){
	          this.panelShow = true;
	          this.promptboxtext = '请输入转换金额';
	          this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	          setTimeout(()=>{
	            this.panelShow = false;
	          },1200);
	          return;
	        }
	        if(this.transferType == 1){// 彩票转AG
	          if(Number(this.balance) < Number(this.nut)){
	            this.panelShow = true;
	            this.promptboxtext = '彩票余额不足';
	            this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	            setTimeout(()=>{
	              this.panelShow = false;
	            },1200)
	          }else {
	            this.showCurtion = true;
	            this.getData(params);
	          }
	        }else{  // AG转彩票
	          if(Number(this.agMoney) < Number(this.nut)){
	            this.panelShow = true;
	            this.promptboxtext = 'AG余额不足';
	            this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')";
	            setTimeout(()=>{
	              this.panelShow = false;
	            },1200)
	          }else{
	            this.showCurtion = true;
	            this.getData(params);
	          }
	        }
      },
      chongzhi(){
      	this.nut=""
      },
      getData(params){
				this.successshow=false
				this.GAME_TRANSFER(params).then(res=>{
					if(this.transferType == 1){
						this.agMoney = parseFloat(this.agMoney) +  parseFloat(this.nut);
						this.balance = parseFloat(this.balance) - parseFloat(this.nut);
					}else if(this.transferType == 0){
						this.agMoney =parseFloat(this.agMoney) - parseFloat(this.nut);
						this.balance =  parseFloat(this.balance) + parseFloat(this.nut);
					}
					this.panelShow = true;           
					this.isEdzh=false
				})
      },
      gotoPayAddress(){
        this.$router.push('/order:0?GameName=AG')
      },
      gotoPayAddresscz(){
        this.$router.push('/order:1?GameName=AG')
      },

    },
    created() {
       	if(this.isWan=='游客'){
       		this.showCurtion=false
       	}else{
					this.GAME_BALANCE({gpkey:'AG'}).then(res=>{				
					this.showCurtion = false;				 
					if(res.data.response[0].agBalance < 0){
						this.promptboxtext = "AG余额不足";
						this.panelShow = true;
						setTimeout(() => {
							this.panelShow = false;
							this.$router.push('/index');
						},1200)
					}
					this.agMoney =res.data.response[0].agBalance;			          
					this.balance = res.data.response[0].balance;	     
				})
       	}
    },
    mounted(){

    }
  }
</script>


<style  lang='less' scoped>
@import '../../assets/less/variable.less';
  @zoom: 46.875rem;
  .title{
    width: 100%;
    height: 90/46.875rem;
    background:#196fde;
    line-height: 90/46.875rem;
    text-align: center;
    z-index: 4;
    position: fixed;
    left: 0;
    top:0;
    >i{
    	display: block;
	    width: 0.7rem;
	    height: 0.9rem;
	    background: url('@{public_img}/images/backing_out.png') no-repeat;
	    background-size:100% 100%;
	    position: absolute;
	    left: 0.5rem;
	    top: 0.5rem;
	    }
	   >span{
	   	color: #FFFFFF;
	   	font-size: 0.8rem;
	   }
	  }
.box{
	height: 100%;
	>.bgImg{
		width: 100%;
		height: 1334/46.875rem;
		background: url(../../../wap/images/user.png) no-repeat;
		background-size: 100% 100%;
		position:fixed;
		top:90/46.875rem;
		>.edzh{
			width: 100%;
			height:196/@zoom;
			background: #FFFFFF;
			>.top_t{
			    height:84/46.875rem;
			    /*line-height:84/46.875rem;*/
			    padding:0.6rem;
			    border-bottom: 1px solid #E0E2E7;
			  }
			>.top_t p{
			    display: inline-block;
			    width:49%;
			    text-align: center;
			    font-size:28/46.875rem;
			    color:#000;
			  }

			 >.top_t p:nth-of-type(1){
			    text-align: left;
			  }
			  >.top_t p:nth-of-type(2){
			    text-align:right;
			  }
			  >.top_t p span{
			    margin-left:.3rem;
			    color:#507BD9;
			  }

			>.headerChoose{
				 height:112/46.875rem;
			    line-height:112/46.875rem;
			    >button{
			    	border: none;
			    	background: none;
			    	float: left;
			    	margin-left: 30/@zoom;
			    	width: 206/@zoom;
			    	height: 76/@zoom;
			    	color: #fff;
			    	font-size: 28/@zoom;
			    	border-radius:0.2rem;
			    	line-height:76/@zoom;
			    	margin-top: 18/@zoom;
			    }
			    >button:nth-child(1){
			    	background: #2e65d4;
			    }
			    >button:nth-child(2){
			    	background: #e74d62;
			    }
			    >button:nth-child(3){
			    	background: #e8a14c;
			    }
			}
		}
		>.anNiu{
			width: 100%;
			position: absolute;
			bottom:345/@zoom;
			left: 0;

			>button{
				background: none;
				border: none;
				outline: none;
				>img{
					width:100%;
					height:100%;
				}
			}
			>button:nth-child(1){
				float: left;
				width: 330/@zoom;
				height: 110/@zoom;
				margin-left:78/@zoom;
			}
			>button:nth-child(2){
				float: right;
				width:245/@zoom;
				height: 115/@zoom;
				margin-right:78/@zoom;
			}
		}
		>.edzhmodel{
			background: rgba(0,0,0,0.2);
			width: 100%;height: 100%;
			z-index: 10;
			position: absolute;
			left:0;top: 0;

			>.edzhdiv{
				position: absolute;
				background: #fff;
				width:550/@zoom;
				height:440/@zoom;
				left: 50%;
				top: 23%;
				margin-left: -275/@zoom;
				border-radius:0.5rem;
				>.edzhTop{
					height: 80/@zoom;
					width: 100%;
					border-top-right-radius:0.5rem;
					border-top-left-radius:0.5rem;
					color: #fff;
					text-align: center;
					font-size: 36/@zoom;
					line-height:80/@zoom;
					overflow: hidden;
					font-weight: 800;
				}
				>.edzhFood{

					>label{
						display: block;
						margin-top: 20/@zoom;
						text-align: center;
						position: relative;
						>img{
							width: 1.2rem;
							padding: 0 0.1rem;
						}
						>a{
							display: inline-block;
							width: 134/@zoom;
							height: 54/@zoom;
							background-color: #F2F2F2;
							border: 1px solid #D3D3D3;
							background: #F2F2F2;
							border-radius:0.2rem;
							line-height: 54/@zoom;
							text-align: center;
							color: #000000;
							margin: 0 0.2rem;
						}
						>.radio{
							opacity: 0;
							border: 1px solid red;
							position: absolute;
							left: 1.45rem;
							top: 0.3rem;
						}
						>.checkboxinput{
						    display: inline-block;
						    width:20px; height: 20px;
						    margin-right: 0.6rem;
						    margin-top: -0.2rem;
						    background: url('@{public_img}/images/radiono.png') no-repeat;
						    background-size: 100% 100%;
						    vertical-align: middle;

						}
						>input:checked+i{
						    background: url('@{public_img}/images/radioyes.png') no-repeat;
						    background-size: 100% 100%;

						}
					}
					>.numberMoney{
						margin: 28/@zoom auto;
						width: 484/@zoom;
						height: 74/@zoom;
						border: 1px solid #D3D3D3;
						border-radius: 0.2rem;
						>span{
							width:0.6rem;
							height:0.8rem;
							background: url('@{public_img}/images/rmb.png') no-repeat;
							background-size: 100% 100%;
							display: inline-block;
							margin-top: 0.3rem;
							float: left;
							margin-left: 0.2rem;
						}
						>input{
							border: none;
							outline: none;
							float: left;
							height: 100%;
							padding-left: 0.2rem;
						}
					}
					>.edzhbtn{
						overflow: hidden;
						>button{
							background: none;
							border: none;
							float: left;
							width: 168/@zoom;
							height: 65/@zoom;
							border-radius:10rem;
							color: white;
							font-size: 16px;
							outline: none;
						}
						>button:nth-child(1){
							background: #2e65d4;
							margin-left: 2rem;
						}
						>button:nth-child(2){
							background: #da524d;
							margin-left: 1rem;
						}
					}

				}
			}

		}
	}
}

.modal_box_feedback .modal_div .modal_header{
	border-top-right-radius:0.5rem;
	border-top-left-radius:0.5rem;
}
.modal_box_feedback .modal_div{
	border-radius:0.5rem;
}
.modal_foot{
	overflow: hidden;
	>button{
		background: none;
		border: none;
		float: left;
		width: 166/@zoom;
		height: 64/@zoom;
		border-radius:1rem;
		color: white;
		font-size: 16px;
		outline: none;
		margin-bottom: 0.4rem;
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
.agbgimg{
	width: 100%;
	height:1206/46.875rem;
	position:fixed;
	left: 0;top: 1.92rem;
}
</style>
