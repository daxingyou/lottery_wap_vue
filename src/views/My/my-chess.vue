<template>
  <div class="box chess-page">
    <div class="title color1">
		  <i @click="goBack()"></i>
		  <span>棋牌游戏</span>
		</div>

      <div class="box">
        <div class="edzh" v-show="isWan!='游客'" style="z-index: 2;">
          <div class="top_t">
            <p>棋牌余额 :<span>{{chessMoney}}</span></p>
            <p>彩票余额:<span>{{balance}}</span></p>
          </div>
          <div class="headerChoose">
            <button @click="edzhag">额度转换</button>
            <button @click="gotoPayAddress('/qpHistory')">下注记录</button>
            <button @click="gotoPayAddresscz">交易记录</button>
          </div>
        </div>
        <div class='bgImg' ref="bgagimg">
          <div class="qp_logo">
            <img src="../../../wap/images/logo.png" alt="">
          </div>
          <!--<div class="anNiu">
                  <button @click="ykzr">
                      <img src="../../../wap/images/start-button.png"/>
                  </button>
                  <span  class="start">
                          <img src="../../../wap/images/start-button-light-effects.png" alt="">
                  </span>
              </div>-->

          <div class="download-tips">
            <p>请使用彩票账密登录棋牌APP进行游戏</p>
            <span>进行游戏</span>
          </div>

          <div class="app-download">
            <button @click="downloadApp">点击下载APP</button>
            <!--<button @click="checkAppHelp">查看教程</button>-->
          </div>

          <div class="edzhmodel" v-show="isEdzh">
            <div class="edzhdiv">
              <div class="edzhTop color1" >
                <span style="margin-left: 1rem;">额度转换</span>
                <a style="float: right;text-align:center;line-height: 1rem;margin-right: 0.3rem;margin-top:0.3rem;display:block;width: 1rem;height: 1rem;" @click="gbedzh">
                  <img  style="width: 100%;"  :src="$getPublicImg('/images/agsw.png')"/></a>
              </div>
              <div class="edzhFood">
                <label><input type="radio" class="radio" name="1"  v-model="transferType" value="0"/><i class="checkboxinput"></i><a>彩票余额</a><img :src="$getPublicImg('/images/edzhjt.png')"/><a>棋牌余额</a></label>
                <label>
                  <input type="radio" class="radio" v-model="transferType" value="1"/>
                  <i class="checkboxinput"></i><a>棋牌余额</a>
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
                <a style="float: right;text-align:center;line-height: 1rem;margin-right: 0.3rem;margin-top:0.45rem;display:block;width: 1rem;height: 1rem;"></a>
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
      </div>

    <promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :successicon="successicon" :promptboxshow="promptboxshow" :panelShow="panelShow"
   	:promptboxtext="promptboxtext" :promptsubtitle="promptsubtitle" :promptbottomtips="promptbottomtips" :erreocode="erreocode" :autohide="false" @bottom-clicked="downloadApp"></promptbox>
  </div>
</template>
<script>
  import iHeader from '../../components/j-header'
  import promptbox from '../../components/promptbox'

  export default {
    components: {
      iHeader,
      promptbox,
    },
    data() {
      return {
      	isWan:sessionStorage.getItem('im_username')?sessionStorage.getItem('im_username'):'游客',
      	bgSrc:'',
      	agbgimg:'',
      	isUser:false,
      	panelShow: false,
      	promptboxtext:'',
        promptsubtitle: [],
        promptbottomtips: '',
        successicon: false,
      	chessMoney: null,          // ag余额
        balance: null,           // 彩票余额
				isEdzh:false,
				is_gd_ali: is_gd_ali(),
				nut:null,
				folder: "../../../wap/images/"+window.type+"/isWan.png",
				imgPath: window.type,
        transferType: 0,// 彩票转棋牌
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
      // 检测是否创建了棋牌账号,没创建的话就创建账号
      // 不用创建，一调用棋牌其它接口就自动创建
      /*isCreatedAccount() {
        this.$http.post("Wh_APP_Api/is_open", JSON.stringify({oid: sessionStorage.getItem('im_token')})).then(res => {
          if (res.data && !res.data.data.whopen) {
            // 还没创建账号，开始创建
            this.createAccount()
          }
        })
      },
      // 创建账号
      createAccount() {
        this.$http.post("Wh_APP_Api/index", JSON.stringify({oid: sessionStorage.getItem('im_token')})).then(res => {
          if (!res.data.msg == '2006') {
            console.log('创建账号成功')
          } else {
            console.log('创建账号失败')
          }
        })
      },*/
      // 点击下载APP
      downloadApp() {
        /*const UA = window.navigator.userAgent.toLowerCase();
        const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

        if (isIOS) {
          window.location.href = getIos();
        } else {
          this.$http.post("download/wh_app_down").then(res => {
            if (res.data) {
              window.open( res.data.data.wh_apk_url, '_blank' )
            }
          })
        }*/
        window.open('download/wh_download_mobile_client', '_blank')
      },
      // 查看教程
      /*checkAppHelp() {
        const UA = window.navigator.userAgent.toLowerCase();
        const isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

        if (isIOS) {
          window.location.href = getIos();
        } else {
          window.location.href = getAndroid();
        }
      },*/
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
           this.$store.dispatch('goBack') // 发送后退的状态
           // 后退
           this.$router.go(-1)
         }
    },
    	ykzr(){
    		this.successshow=false
    		if(this.isWan=='游客'){
    			this.isykag=true
    		}else{
    			if(Number(this.chessMoney)==0){
						this.panelShow = true;
		        this.promptboxtext = '棋牌余额不足'
    			}else{
    				this.showCurtion=true
    			let params ={};
						params.oid = sessionStorage.getItem('im_token');
							params.oid = sessionStorage.getItem('im_token');
							// this.$http.post(`${getUrl()}/Wh_H5_Api/RedirectLogin`, JSON.stringify(params)).then(res => {
							this.$http.post(`${getUrl()}/Wh_APP_Api/RedirectLogin`, JSON.stringify(params)).then(res => {
									this.showCurtion=false
		         	if(res.data.msg == 4001){
				          sessionStorage.clear();
				          this.showCurtion=false
				          this.panelShow = true;
				          this.promptboxtext = "您的账户已失效，请重新登录";
				          setTimeout(() => {
				            this.panelShow = false;
				            this.$router.push({
				              path: '/login'
				            })
				          },1000);
			        }else if(res.data.msg == 2006){
			        	this.showCurtion=false
								window.open(res.data.link);
			        }else if(res.data.msg ==7001){
			        	this.showCurtion=false
			        	this.panelShow = true;
			            this.promptboxtext = '请先转账或充值到棋牌，激活账户';
			            setTimeout(() => {
			              this.panelShow = false;
			            },1200);
					 			}
							});
    			}
    		}
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
	       console.log();
      	},
      	submit(){
          document.getElementsByClassName('chess-page')[0].classList.remove('bold-success-title')// 每次打开窗口时，要去掉“转换成功！”的标题的加粗效果

					console.log()
      		this.successshow=false
	        let params ={};
	        params.oid = sessionStorage.getItem('im_token');
	        params.amount = this.nut
	        params.type = this.transferType;
				// kong 或者 0
	        if(this.nut == 0){
	          this.panelShow = true;
	          this.promptboxtext = '金额必须是整数且最少是1元';
	          // this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	          setTimeout(()=>{
	            this.panelShow = false;
	          },1200);
	          return;
	        }
	        if(this.nut ==null){
	          this.panelShow = true;
	          this.promptboxtext = '请输入转换金额';
	          // this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	          setTimeout(()=>{
	            this.panelShow = false;
	          },1200);
	          return;
	        }
					if(this.transferType == 1){// 棋牌转彩票转
	          if(Number(this.chessMoney) < Number(this.nut)){
	            this.panelShow = true;
              this.initPanel()
	            this.promptboxtext = '棋牌余额不足';
	            // this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
	            setTimeout(()=>{
	              this.panelShow = false;
	            },1200)
	          }else {
	            this.showCurtion = true;
	            this.getData(params);
	          }
					}else if(this.transferType ==0){  // 彩票转棋牌
	          if(Number(this.balance) < Number(this.nut)){
	            this.panelShow = true;
              this.initPanel()
	            this.promptboxtext = '彩票余额不足';
	            // this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')";
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
          debugger
      		// this.$http.post(getUrl()+'/Wh_H5_Api/PrepareCreditOrder',JSON.stringify(params)).then(res => {
      		this.$http.post(getUrl()+'/Wh_APP_Api/PrepareCreditOrder',JSON.stringify(params)).then(res => {
            debugger
   				this.showCurtion = false;
          if(res.data.msg == 4001){
            sessionStorage.clear();
            this.panelShow = true;
            this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
              this.panelShow = false;
              this.$router.push({
                path: '/login'
              })
            },1000)


					}else if(res.data.msg == 7001){
						 this.panelShow = true;
						this.promptboxtext = res.data.info;
						setTimeout(() => {
                this.panelShow = false;
              },1200)
					}else if(res.data.msg == 2006){
            // 余额不足
            if(res.data.amount == 'undefined'){
              this.panelShow = true;
              this.promptboxtext = '余额不足,请充值'
              // this.$refs.rscenter.style.backgroundImage = "url('../../../wap/images/erreo.png')"
              setTimeout(() => {
                this.panelShow = false;
              },1200)
              return;
            }
            // 余额足够
            document.getElementsByClassName('chess-page')[0].classList.add('bold-success-title')// 只有转换成功时标题才要加粗，所以这里单独定制
          	this.successshow=false
            this.promptboxtext = "转换成功!";

            if (params.type == '0') {
              // 彩票转棋牌需要这些额外提示
              this.promptsubtitle = ['请登录棋牌APP进行游戏', '（使用彩票登录账密即可）']
              this.promptbottomtips = '没有棋牌APP？去下载'
            } else {
              this.promptsubtitle.length = 0
              this.promptbottomtips = ''
            }
            this.successicon = true
            this.nut = '';

            if(this.transferType == 0){
              this.chessMoney = parseFloat(this.chessMoney) +  parseFloat(res.data.data.amount);
              this.balance = parseFloat(this.balance) - parseFloat(res.data.data.amount);
							sessionStorage.setItem('im_money', this.balance)
            }else if(this.transferType == 1){
              this.chessMoney =parseFloat(this.chessMoney) - parseFloat(res.data.data.amount);
              this.balance =  parseFloat(this.balance) + parseFloat(res.data.data.amount);
              sessionStorage.setItem('im_money', this.balance)
            }
            this.chessMoney = this.chessMoney.toFixed(2);
            this.balance = this.balance.toFixed(2);
            sessionStorage.setItem('im_money', this.balance)
            this.panelShow = true;

            this.isEdzh=false
          }
        })
      },
      gotoPayAddress(path){
				let game_code = '';
        this.game_code = game_code;
        //试玩账号权限限制
        this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == '游客') {
        	this.mask=false;
        	this.isOpen=false;
          if (/^\/Order*/.test(path)){
            this.promptboxtext = "请登录正式会员账号!";
            this.panelShow = true;
            this.successshow = false;
            return;
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
				// this.$router.push('/myHistroy?GameName=QP')
				this.$router.push('/qpHistory')
      },
      gotoPayAddresscz(path){
				 this.$router.push('/order:2?GameName=chess')
      },
      initPanel() {
        this.promptsubtitle = []
        this.promptbottomtips = ''
        this.successicon = false
      }
			},

    created() {
				let params = {};
     		params.oid = sessionStorage.getItem('im_token');
				// this.$http.post(`${getUrl()}/Wh_H5_Api/index`, JSON.stringify(params)).then(res => {
				this.$http.post(`${getUrl()}/Wh_APP_Api/index`, JSON.stringify(params)).then(res => {
						if(res.data.msg == 7001){
							this.promptboxtext = res.data.info;
			          this.panelShow = true;
			          setTimeout(() => {
			            this.panelShow = false
			          },1200)
						}
				});

       	if(this.isWan=='游客'){
       		this.showCurtion=false
       	}else{
       	let params = {};
     		params.oid = sessionStorage.getItem('im_token');
				// this.$http.post(`${getUrl()}/Wh_H5_Api/getWhInfo`, JSON.stringify(params)).then(res => {
				this.$http.post(`${getUrl()}/Wh_APP_Api/getWhInfo`, JSON.stringify(params)).then(res => {
				this.showCurtion = false;
				 if(res.data.msg == 4001){
			          sessionStorage.clear();
			          this.panelShow = true;
			          this.promptboxtext = "您的账户已失效，请重新登录";
			          setTimeout(() => {
			            this.panelShow = false;
			            this.$router.push({
			              path: '/login'
			            })
			          },1000);
		        } else if(res.data.msg == 2006){
			          if(res.data.balance.agBalance < 0){
			            this.promptboxtext = "棋牌余额不足";
			            this.panelShow = true;
			            setTimeout(() => {
			              this.panelShow = false;
			              this.$router.push('/index');
			            },1200)
		          }
			          this.chessMoney = Number(res.data.balance.whBalance).toFixed(2);
			          this.balance = Number(res.data.balance.userBalance).toFixed(2);
			          sessionStorage.setItem('im_money', this.balance)
		        }else if(res.data.msg == 7001){
			          this.promptboxtext = res.data.info;
			          this.panelShow = true;
			          setTimeout(() => {
			            this.panelShow = false
			          },1200)
		        }else{
			          this.promptboxtext = "获取真人游戏额度失败";
			          this.panelShow = true;
			          setTimeout(() => {
			            this.panelShow = false
			            this.$router.push('/index')
			          },1200)
			        }
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
    position: relative;
    width: 100%;
    background:#196fde;
    line-height: 90/46.875rem;
    text-align: center;
    z-index: 4;
    /*position: fixed;*/
    /*left: 0;*/
    /*top:0;*/
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
  flex: 1;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  >.edzh{
    width: 100%;
    height:196/@zoom;
    background: #FFFFFF;
    >.top_t{
      height:84/46.875rem;
      /*line-height:84/46.875rem;*/
      /*padding:0.6rem;*/
      padding:0.4rem 0.6rem 0;
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
	>.bgImg{
		width: 100%;
		/*height:25.5rem;*/
		height:100%;
		background: url(../../../wap/images/chess_bj_2.png) no-repeat;
		background-size: 100% 100%;
		/*position:fixed;*/
		/*top:0;*/
		>.anNiu{
			width: 100%;
			position: absolute;
			bottom:4.52rem;
			left: 0;
			text-align: center;
			>button{
				width: 165/@zoom;
				height: 165/@zoom;
				background: none;
				border: none;
				outline: none;
				padding:0;
				position: relative;
				z-index: 1;
				top:-.6rem;
				>img{
					height:100%;
					width:100%;
				}
			}
			// >button:nth-child(1){
			// 	width: 139/@zoom;
			// 	height: 139/@zoom;
			// 	position:relative;
      // }
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
.qp_logo{
    padding-top: 5rem;
    text-align: center;
    >img{
        width:85%;
        // height:350/@zoom;
    }
}
.start img{
	 	// height:200/@zoom;
		// width:200/@zoom;
		// position: relative;
    // top: -4.9rem;
		// left: -2.5rem;
		margin-left: -8.9rem;
		margin-top:-.7rem;
		width:100%;
		-webkit-animation-name:'ripple';/*动画属性名，也就是我们前面keyframes定义的动画名*/
		-webkit-animation-duration: 1s;/*动画持续时间*/
		-webkit-animation-timing-function: ease; /*动画频率，和transition-timing-function是一样的*/
		-webkit-animation-delay: 0s;/*动画延迟时间*/
		-webkit-animation-iteration-count: infinite;/*定义循环资料，infinite为无限次*/
		-webkit-animation-direction: alternate;/*定义动画方式*/
}
@keyframes ripple {
	0% {
		transform: scale(1.2);
	}
	100% {
	transform: scale(1);
	}
}
.start{
		width: 249/@zoom;
		height: 249/@zoom;
    border-radius:50%;
    display:inline-block;
		position: absolute;
    margin-top: -.75rem;
}
.download-tips{
  color: white;
  text-align: center;
  font-size: 14px;
  span{
    font-size: 16px;
    text-shadow: 2px;
  }
}
.app-download{
  margin-top: 50px;
  text-align: center;
  button{
    width: 109px;
    height: 34px;
    border-radius: 2px;
    border: 0;
    color: white;
    font-size: 12px;
    &:first-child{
      background: linear-gradient(to bottom, #feb423, #dc8001);
    }
    /*&:last-child{
      margin-left: 20px;
      background-color: transparent;
      border: 1px solid;
    }*/
  }
}
</style>
<style>
.bold-success-title .prompttitle{
  font-weight: bold;
}
</style>
