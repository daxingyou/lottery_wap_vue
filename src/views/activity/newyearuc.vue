<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if='!isAndroidWebview'>
	  <i @click="goBack()"></i>
	  <span>新年活动</span>
	</div>
	<div id="nowyear"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
		<div class="intermediate_uc" @click='ljlq'></div>
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
      	isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
				panelShow:false,
				
				title:'',
				isWan:'',
				titleshow:true,
				isAllowJoinone:'',
				isGetBonusesone:'',
				isGetBonusestwo:'',
				erreocode:'',
	      promptboxtext:'',
	      panelShow:false,
	      promptboxshow:true,
	      successshow:false,
	      promptsystem:''
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      },
     ljlq(){
     		this.successshow=false
     		this.isWan = this.$store.state.userData.username
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
	      	let userOid = this.$store.state.userData.sessionId;
	      	params.oid = userOid;
				}
					this.$http.post(`/DepositActivity/doSingleDepositUC2018`, JSON.stringify(params)).then(res =>{
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
	       	}else if(res.data.msg==9005){
          	this.panelShow = true;
          	this.promptboxtext = res.data.info;
          	this.promptboxshow =false;
          }else if(res.data.msg==7001){
          	this.panelShow = true;
          	this.promptboxtext = res.data.info;
          	this.promptboxshow =false;
          }else if(res.data.msg==2006){
          	
        		
        		this.panelShow = true;
        		this.promptboxtext = "领取成功";
          	this.successshow=true
          }
      	}).catch(err => {
          	console.log(err)
          })


      }
    },
    created(){
		this.isWan = this.$store.state.userData.username
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
	  		let userOid = this.$store.state.userData.sessionId;
	  		params.oid = userOid;
			}
			this.$http.post(`/DepositActivity/getSingleDepositUC2018`, JSON.stringify(params)).then(res =>{
            console.log(res)
                if(res.data.msg==9005){
              	this.panelShow = true;
              	this.promptboxtext = res.data.info;
              	this.promptboxshow =false;
              }else if(res.data.msg==7001){
              	this.panelShow = true;
              	this.promptboxtext = res.data.info;
              	this.promptboxshow =false;
            }else{
                console.log(res.data.stage)
                this.panelShow = true;
                this.promptboxtext = "恭喜你闯到第"+res.data.stage+"关";
                    setTimeout(()=>{
                    this.panelShow = false;
                  },1500)
            }

      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
@zoom:46.875rem;
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
    position: fixed;
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
	#nowyear{
		width: 100%;
		height: 1989/46.875rem;
		background: url(../../../wap/images/uc/newyear.png) no-repeat;
		background-size: 100% 100%;
		position: relative;


		>.intermediate_uc{
			position: absolute;
			left: 50%;
			top: 21.5rem;
			height:1.2rem;
			width: 200/46.875rem;
			margin-left: -100/46.875rem;
		}
	}
</style>
