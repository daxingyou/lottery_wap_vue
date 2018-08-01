<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if='!isAndroidWebview'>
	  <i @click="goBack()"></i>
	  <span>抽奖活动</span>
	</div>
	<div id="lottery"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
		<p v-show="is_gd_ali=='ali'">剩余抽奖次数<i style="color: red;font-weight: 900;">{{times}}</i>次</p>
		<p style="top:12rem;" v-show="is_gd_ali=='fh'"><i style="color: red;font-weight: 900;margin-left: 4.7rem;">{{times}}</i></p>
			<p style="top:11.2rem;" v-show="is_gd_ali=='lv'"><i style="color: red;font-weight: 900;margin-left: 4.7rem;">{{times}}</i></p>
		<div class="zhuanpan">
			<div class="circle"  :style="{transform:transform}" @click=cjd>
				<div class='pointer'></div>
			</div>
		</div>
	</div>
     <promptbox  @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow"
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
	import promptbox from '../../components/promptbox'
  export default {
    name: 'activity1',
    mounted(){
    },
    data(){
      return {
      		is_gd_ali: is_gd_ali(),
      		isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
					transform:'',
					panelShow:false,
					title:'',
					times:'0',
					imMoney:sessionStorage.getItem("im_money"),
					isWan:'',
					titleshow:true,
					erreocode:'',
      		promptboxtext:'',
          panelShow:false,
          promptboxshow:true,
          successshow:false
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      },
     getRandom (min, max){
     	return Math.random() * (max - min ) + min;
     },
     cjd(){
     		this.successshow=false
     		this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == '游客') {
         		this.times = 0
            this.promptboxtext = "请登录正式会员账号!"
            this.panelShow = true

            return
        }
      	let params = {};
      	if(window.location.href.indexOf('?')!=-1){
	      	let userOid =window.location.href.split('?')[1].split('=')[1];
	      	params.oid = userOid;
				}else{
	      	let userOid = sessionStorage.getItem('im_token');
	      	params.oid = userOid;
				}
      	this.$http.post(`${getUrl()}/WheelActivity/doUserDraw`, JSON.stringify(params)).then(res =>{

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
          }else if(res.data.msg==9004){
          	this.panelShow = true;
          	this.promptboxtext = "您已经没有抽奖次数!";
          	this.promptboxshow =false;
          }else if(res.data.msg==2006){
          	this.successshow=true
//        	this.panelShow = false
          	if(res.data.money=='2'){
          		this.transform = 'rotate('+this.getRandom (1113,1152)+'deg)'
          	}else if(res.data.money=='8'){
          		this.transform = 'rotate('+this.getRandom (1164,1200)+'deg)'
          	}else if(res.data.money=='38'){
          		this.transform = 'rotate('+this.getRandom (1212,1256)+'deg)'
          	}else if(res.data.money=='88'){
          		this.transform = 'rotate('+this.getRandom (1270,1310)+'deg)'
          	}
          	setTimeout(() => {
	          	this.panelShow = true;
	          },5500)
          	setTimeout(() => {
	          	this.panelShow = false;
	          },7500)
          	this.promptboxtext = "恭喜您抽到"+res.data.money+"彩金!";
          	this.promptboxshow =false;
          	this.imMoney=this.imMoney+Number(res.data.money)
        		sessionStorage.setItem('im_money', this.imMoney)
        		this.times = 0
          }else if(res.data.msg==9003){
          	this.panelShow = true;
          	this.promptboxtext = "抽奖失败,抽奖条件未达成!";
          	this.promptboxshow =false;
          	setTimeout(() => {
	          	this.panelShow = false;
	          },3000)
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
    components: {
	    promptbox
	  },
    created(){
    		this.isWan = sessionStorage.getItem('im_username')
        if (this.isWan == '游客') {
          this.times = 0
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
			}
       this.$http.post(`${getUrl()}/WheelActivity/getUserDrawTimes`, JSON.stringify(params)).then(res => {
       	if (res.data.msg == 4001){
            sessionStorage.clear();
						this.panelShow = true;
          	this.promptboxtext = "您的账户已失效，请重新登录";
            setTimeout(() =>{
	          	this.panelShow = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
          }else if(res.data.msg==9004){
          	this.panelShow = true;
          	this.promptboxtext = "您已经没有抽奖次数!";
     				this.promptboxshow =false;
          }else if(res.data.msg==2006){
          	this.times =res.data.times
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
    z-index: 4;
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
	#lottery{
		width: 100%;
		background-size:100% 100%;
		position: relative;
		p{
			width: 100%;
			color:#fff228;
			font-size: 0.9rem;
			font-weight: 600;
			text-align: center;
			position: absolute;
			left: 0;
			top: 11.5rem;
			>i{
				padding: 0 0.2rem;
				font-size: 1rem;
			}
		}
		.zhuanpan{
			width: 668/46.875rem;
			height: 668/46.875rem;

			position: absolute;
			left: 50%;
			margin-left: -668/46.875/2rem;
			top: 13.5rem;
			.circle{
				width: 207/46.875rem;
				height: 207/46.875rem;

				position: absolute;
				left: 50%;
				margin-left: -207/46.875/2rem;
				top: 50%;
				margin-top: -207/46.875/2rem;
				z-index: 3;
				transition:all 5s;

			/*	transform-origin:50% 50%;*/
				>.pointer{
						width: 25/46.875rem;
					height: 60/46.875rem;
					position: absolute;
					top: -1.08rem;
					left: 48%;

					background-size:100% 100%;
				}
			}

		}
	}
</style>
