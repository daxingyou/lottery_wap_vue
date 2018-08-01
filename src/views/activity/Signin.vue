<template>
  <div class="container" >
    <div class="title color1" v-show='!isAndroidWebview'>
		  <i @click="goBack()"></i>
		  <span>签到送豪礼</span>
		</div>
	<div id="signin" :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
		<div class="signinali" v-show="is_gd_ali=='ali'">
			<ul>
				<li v-for="(item,index) in daycount" class='alibgimg' ref='aliimg'>
					<i>{{item}}</i>
					<img style="z-index: 1;" v-show='item==day&&statusArr[day]==0' src="../../../wap/images/ali/ksqdp.png"  @click='yesimg'/>
					<img style="z-index: 2;" v-show="statusArr[item]=='1'||statusArr[item]=='3'" src="../../../wap/images/ali/yesimg.png" @click='yesimg'/>
				</li>
			</ul>
		</div>
		<div class="signingd" v-show="is_gd_ali=='gd'">
			<ul>
				<li v-for="(item,index) in daycount" ref ="bgimg">
					<i @click='yesimg' v-show='item==day&&statusArr[day]==0'>可签到</i>
					<img v-show="statusArr[item]=='1'||statusArr[item]=='3'" :src="imgsrc" alt="" />{{item}}
				</li>
			</ul>
		</div>
		<div class="signinly" v-show="is_gd_ali=='ly'||is_gd_ali=='lv'">
			<ul>
				<li v-for="(item,index) in daycount" class="daylist" ref ="lybgimg">
					<font>{{item}}</font>
					<i @click='yesimg' v-show='item==day&&statusArr[day]==0'>可签到</i>
					<img v-show="statusArr[item]=='1'||statusArr[item]=='3'" :src="lyimgsrc" alt="" />
				</li>
			</ul>
		</div>

	</div>
	<promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow"
   		:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
	import promptbox from '../../components/promptbox'
  export default {
    name: 'activity1',
    mounted(){
    },
    components: {
			promptbox
		},
    data(){
      return {
      	is_gd_ali: is_gd_ali(),
		  	isIosWebview: isIosWebview,
      		isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
			panelShow:false,
			title:'',
			daycount:'',
			imgsrc:'../../../wap/images/gd/yessig.png',
			aliimgsrc:'../../../wap/images/ali/ksqdp.png',
			lyimgsrc:'../../../wap/images/pn/yessig.png',
			imgshow:false,
			day:'',
			imMoney:sessionStorage.getItem("im_money"),
			statusArr:'',
			imghide:true,
			bgmoney:'',
			dayj:'',
			c:null,
			isWan:'',
			titleshow:true,
			month:'',
			year:'',
			imghidegd:false,
			erreocode:'',
			promptboxtext:'',
			panelShow:false,
			promptboxshow:true,
			successshow:false,
			promptsystem:''
      }
    },
    components: {
			promptbox
		},
    methods: {
      goBack(){
        history.go(-1);
      },
     getRandom(min, max){
     	return Math.random() * (max - min ) + min;
     },
     nextmonth(){
     		this.month++;
     		if(this.month>12){
     			this.month=1
     		}
     		this.daycount = new Date(this.year,this.month,0).getDate();
     },
     lastmonth(){
     		this.month--;
     		if(this.month<1){
     			this.month=12
     		}
     		this.daycount = new Date(this.year,this.month,0).getDate();

     },
     yesimg(){
     	 this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == '游客') {
            this.promptboxtext = "请登录正式会员账号!"
            this.panelShow = true
            this.successshow=false
            return
        }
     	let params = {};
      if(window.location.href.indexOf('?')!=-1){
				this.promptboxtextshow = false
      	let userOid = window.location.href.split('?')[1].split('=')[1];
      	params.oid = userOid;
			}else{
				this.promptboxtextshow = true
      	let userOid = sessionStorage.getItem('im_token');
      	params.oid = userOid;
			};
      this.$http.post(`${getUrl()}/SignActivity/doUserSign`, JSON.stringify(params)).then(res =>{
       	this.successshow=false
       	if (res.data.msg == 4001) { //  1未登陆
            sessionStorage.clear();
						this.panelShow = true;
          	this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() => {
	          	this.panelShow = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
          }else if(res.data.msg==9001){
          	this.panelShow = true;
          	this.promptboxtext = "签到失败,请重新登陆再试!";
          	this.promptboxshow =false;
          }else if(res.data.msg==9002){
          	this.panelShow = true;
          	this.promptboxtext = "签到失败,今日已经签到!";
          	this.promptboxshow =false;
          }else if(res.data.msg==2006){
          	this.imghide = false
						this.imMoney=this.imMoney+Number(res.data.money)
        		sessionStorage.setItem('im_money', this.imMoney)
          	this.panelShow = true;
          	this.successshow=true
          	if(res.data.money==0){
          		this.promptboxtext = "该帐号或IP今日已经领取过";
          	}else{
          		this.promptboxtext = "签到成功";
          	}
          		this.statusArr=res.data.statusArr
          		for(var a in this.statusArr){
					if(this.statusArr[a]==1){
						this.dayj=a
						if(this.dayj==1){
							if(this.is_gd_ali=='gd'){
								this.$refs.bgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/gd/moneyyl.png) no-repeat;background-size: 100% 100%;'
							}else if(this.is_gd_ali=='ali'){
								this.$refs.aliimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/ali/moneybi.png) no-repeat;background-size: 100% 100%;'
							}else if(this.is_gd_ali=='ly'){
								this.$refs.lybgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;'
							}else if(this.is_gd_ali=='lv'){
								if (this.is_gd_ali=='lv' && this.$refs.lybgimg.length > 28){
									this.$refs.lybgimg[28].style = 'background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;';
								}
								// this.$refs.lybgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;'
							}
						}
						break
					}
				}
				this.dayj=a
				if(this.dayj!=''){
					let b=parseInt((this.daycount-this.dayj)/7)
						for (var i = 1; i <=b; i++){
								this.c=Number(this.dayj) +i*7;
								for(var j=0;j<=this.daycount+1;j++){
									if(j==this.c){
										if(this.is_gd_ali=='gd'){
										this.$refs.bgimg[this.c-2].style='background:url(../../../wap/images/gd/moneyyl.png) no-repeat;background-size: 100% 100%;'
									}else if(this.is_gd_ali=='ali'){
										this.$refs.aliimg[this.c-2].style='background:url(../../../wap/images/ali/moneybi.png) no-repeat;background-size: 100% 100%;'
									}else if(this.is_gd_ali=='ly'){
											this.$refs.lybgimg[this.c-2].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;'
									}else if(this.is_gd_ali=='lv'){
										this.$refs.lybgimg[this.c-2].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;'
										if (this.is_gd_ali=='lv' && this.$refs.lybgimg.length > 28){
											this.$refs.lybgimg[27].style = 'background:none';
										}
									}
								}
							}
						}
					}
          		}else if(res.data.msg==9005){
          			this.panelShow = true;
          			this.promptboxtext = res.data.info;
          			this.promptboxshow =false;
          		}
       		}).catch(err => {
          		console.log(err)
          	})
     	}
    },
    created(){
		   var today = new Date();//获得当前日期
		   this.year = today.getFullYear();
		   this.month = today.getMonth() + 1;
		   this.day = today.getDate();
		   this.daycount = new Date(this.year,this.month,0).getDate()
		   let params = {};
		   if(window.location.href.indexOf('?')!=-1){
					this.promptboxtextshow = false
	      	let userOid = window.location.href.split('?')[1].split('=')[1];
	      	params.oid = userOid;
				}else{
					this.promptboxtextshow = true
	      	let userOid = sessionStorage.getItem('im_token');
	      	params.oid = userOid;
				}
		   	 this.$http.post(`${getUrl()}/SignActivity/getUserSignStauts`, JSON.stringify(params)).then(res =>{
		   	 		if (res.data.msg == 4001) { //  1未登陆
		   	 			this.successshow=false
		            sessionStorage.clear();
								this.panelShow = true;
		          	this.promptboxtext = "您的账户已失效，请重新登录";
		            setTimeout(() => {
			          	this.panelShow = false;
			          	this.$router.push({
			            	path: '/login'
			          	})
			          },1000)
					  }
					  console.log(res.statusArr);
					this.statusArr=res.data.statusArr
					for(var a in this.statusArr){
						if(this.statusArr[a]==1){
							this.dayj=a
							if(this.dayj==1){
								if(this.is_gd_ali=='gd'){
									this.$refs.bgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/gd/moneyyl.png) no-repeat;background-size: 100% 100%;'
								}else if(this.is_gd_ali=='ali'){
									this.$refs.aliimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/ali/moneybi.png) no-repeat;background-size: 100% 100%;'
								}else if(this.is_gd_ali=='ly'){
									this.$refs.lybgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;'
								}else if(this.is_gd_ali=='lv'){
									if (this.is_gd_ali=='lv' && this.$refs.lybgimg.length > 28){
										this.$refs.lybgimg[28].style = 'background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;';
									}
									// this.$refs.lybgimg[parseInt(this.daycount)-1].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;background-size: 100% 100%;'
								}
							}
							break
						}
					}
					this.dayj=a
					if(this.dayj!=''){
						let b=parseInt((this.daycount-this.dayj)/7)
							for (var i = 1; i <= b; i++){
									this.c=Number(this.dayj) +i*7;
									for(var j=0;j<=this.daycount+1;j++){
										if(j==this.c){
											if(this.is_gd_ali=='gd'){
												this.$refs.bgimg[this.c-2].style='background:url(../../../wap/images/gd/moneyyl.png) no-repeat;background-size: 100% 100%;'
										}else if(this.is_gd_ali=='ali'){
											this.$refs.aliimg[this.c-2].style='background:url(../../../wap/images/ali/moneybi.png) no-repeat;background-size: 100% 100%;'
										}else if(this.is_gd_ali=='ly'){
											this.$refs.lybgimg[this.c-2].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;'
										}else if(this.is_gd_ali=='lv'){
											this.$refs.lybgimg[this.c-2].style='background:url(../../../wap/images/pn/moneylv.png) no-repeat;'
											if (this.is_gd_ali=='lv' && this.$refs.lybgimg.length > 28){
												this.$refs.lybgimg[27].style = 'background:none';
											}
										}
									}
								}
							}
						}
		   	 		}).catch(err => {
          				console.log(err)
          			})

	    		}
	 		 }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.container {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .title{
    width: 100%;
    height: 90/46.875rem;
    background:#196fde;
    line-height: 90/46.875rem;
    text-align: center;
    z-index: 10;
    /*position: fixed;*/
    left: 0;
    top: 0;
    >i{
    	display: block;
	    width: 35/46.875rem;
	    height: 50/46.875rem;
	    background: url('@{public_img}/images/backing_out.png') no-repeat;
	    background-size:100% 100%;
	    position: absolute;
	    left: 0.5rem;
	    top: 0.4rem;
	    }
	   >span{
	   	color: #FFFFFF;
	   	font-size: 0.8rem;
	   }
	  }
	#signin{
		width: 100%;
		margin-top:90/46.875rem;
		height: 1850/46.875rem;
		background-size:100% 100%;
		position: relative;
		/*阿里活动*/
		.signinali{
			width: 725/46.875rem;
			height: 500/46.875rem;
			position: absolute;
			left: 50%;
			top: 12.5rem;
			margin-left: -725/46.875/2rem;
			>ul{
				overflow: hidden;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0;
				>li{
					width: 85/46.875rem;
					height: 80/46.875rem;
					float: left;
					margin-left: 0.3rem;
					margin-top: 0.3rem;
					position: relative;
					>img{
						width: 100%;
						height: 100%;
						position: absolute;
						left: 0;
						top: 0;
					}
					>i{
						width: 0.7rem;
						height: 0.7rem;
						display: inline-block;
						color: #000000;
						font-size:0.6rem;
						text-align: center;
						margin-top: 0.18rem;
						position: absolute;
						z-index:4;

					}
				}
			}
		}
		/*光大乐盈签到活动*/
		.signingd{
			width: 690/46.875rem;
			height: 440/46.875rem;
			position: absolute;
			left: 50%;
			top: 13.7rem;
			margin-left: -690/46.875/2rem;
			>ul{
				overflow: hidden;
				width: 100%;
				height: 100%;
				position: absolute;
				left: 0;
				top: 0rem;
				>li{
					float: left;
					width: 70/46.875rem;
					height: 70/46.875rem;
					font-size: 1rem;
					text-align: center;
					line-height: 70/46.875rem;
					margin-top: 0.25rem;
					margin-left: 0.5rem;
					color: #7f031c;
					border-radius:50%;
					position: relative;
					>img{
						position: absolute;
   					left: 15%;
    				top: 0.5rem;
    				width: 70%;
					}
					>i{
						font-size:0.5rem;
						color: white;
						height: 0.6rem;
						width: 1.9rem;
						text-align: center;
						line-height: 0.6rem;
						position: absolute;
						left: 0;
						bottom: 0;
					}
				}
			}
		}
		/*乐盈签到活动*/
		.signinly{
			width: 650/46.875rem;
			height: 500/46.875rem;
			position: absolute;
			left: 50%;
			top: 11rem;
			margin-left: -650/46.875/2rem;
			background: url(../../../wap/images/pn/datasin.png) no-repeat;
			background-size: 100% 100%;
			>ul{
				overflow: hidden;
				width: 100%;
				height: 75%;
				position: absolute;
				left: 0;
				top: 1.8rem;
				>li{
					float: left;
					width: 72/46.875rem;
					height: 72/46.875rem;
					font-size: 0.75rem;
					text-align: center;
					line-height:70/46.875rem;
					margin-left: 0.05rem;
					color: #853335;
					position: relative;
					background-size: 1rem!important;
    			background-position: 0.2rem 0.8rem!important;
					img{
						width:75%;
    				margin-top: 0.55rem;
					}
					font{
					position: absolute;
					left: 0.5rem;
					top: -0.2rem;
					}
					>i{
						display: inline-block;
						color: #781618;
						height: 0.6rem;
						width: 100%;
						text-align: center;
						line-height: 0.6rem;
						margin-top: 0.8rem;
						font-family:'Microsoft YaHei';
						font-size:12px;
						position: absolute;
						left: 0;
						bottom: 0.1rem;
					}
					>a{
						width: 0.8rem;
						height: 0.8rem;
						display: inline-block;
						position: absolute;
						left: 0.3rem;
						top:0.7rem;
						>img{
							width: 100%;
							height: 100%;
						}
					}
				}
				>li:nth-child(1){
					margin-left: 3rem;
				}
				>li:nth-child(7){
					margin-left: 1.4rem;
				}
				>li:nth-child(14){
					margin-left: 1.4rem;
				}
				>li:nth-child(21){
					margin-left: 1.4rem;
				}
				>li:nth-child(28){
					margin-left: 1.4rem;
				}
			}
		}

	}
</style>
