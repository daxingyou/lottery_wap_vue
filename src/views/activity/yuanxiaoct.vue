<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if='!isAndroidWebview'>
	  <i @click="goBack()"></i>
	  <span>元宵活动</span>
	</div>
	<div id="nowyear"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
		<div class="intermediately"></div>
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
		isGetBonusesone:'',
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
		height: 1666/46.875rem;
		background: url(/wap/images/lv/yuanxiao.png) no-repeat;
		background-size: 100% 100%;
		position: relative;
		>.intermediately{
			position: absolute;
			left: 69%;
			margin-left: -660/46.875/2rem;
			width: 8rem;
			bottom: 6rem;
			height:1.5rem;
		}
	}
</style>
