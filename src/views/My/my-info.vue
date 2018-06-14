<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div >
    <div >
      <i-header class="color1" title="个人资料"></i-header>
    </div>
    <div class="info">
      <div>
        <span>账<i>占位</i>户：</span>
        <span>{{usename}}</span>
      </div>
      <div>
        <span>账户余额：</span>
        <span  class="colorbie" style="color:#196fde;">{{$store.state.userData.balance}}</span>
      <div style="float: right;color:#260161;width:4.5rem;height: 2.1rem;margin-right: 0.1rem;">
	        <span  class="colorbie" @click="gotoAddress('/Order:0')" style="color:#196fde">充值</span>
	        <span class="colorbie" style='padding: 0 0.2rem;color:#196fde'>|</span>
	        <span class="colorbie" @click="gotoAddress('/Order:1')"  style="color:#196fde">提现</span>
        </div>
      </div>
      <div>
        <span>真实姓名：</span>
        <span>{{realname}}</span>
        <!--<input type="text" />-->
      </div>
      <div>
        <span>邮<i>占位</i>箱：</span>
        <span>{{ email == "" || email == null ? '无' : email}}</span>
      </div>
    </div>
    
    	<promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   	:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>


<script>
  import iHeader from '../../components/i-header'
  import promptbox from '../../components/promptbox'
  export default {

    data() {
      return {
        is_gd_ali: is_gd_ali(),
        money:"",
        realname:"",
        usename:"",
        email:"",
        erreocode:'',
	      promptboxtext:'',
	      panelShow:false,
	      promptboxshow:true,
	      promptsystem:""
      }
    },
    methods: {
			gotoAddress(path){
        //试玩账号权限限制
	        this.isWan = this.$store.state.userData.username
	        if (this.isWan == '游客') {
	            this.promptboxtext = "请登录正式会员账号!"
	            this.panelShow = true
	            setTimeout(() => {
	              this.panelShow = false
	            }, 1200);
	        }else{
	        	 this.$router.push(path)
	        }
	      }
    },
    created() {
        this.money=this.$store.state.userData.balance;
        this.realname=this.$store.state.userData.realname;
        this.usename=this.$store.state.userData.username;
        this.email=this.$store.state.userData.emailaddress;
    },
    components: {
      iHeader,
      promptbox
    }
  }

</script>
<style>
	@import '../../assets/less/variable.less';
  .info{
    margin-top:10px;
    background:#fff;
  }
  .info div{
    height:2.1rem;
    line-height:2.1rem;
    margin-left:20px;
    font-size:16px;
    color:#B8B8B8;
    border-bottom:1px solid #F5F5F5;
  }
  .info div span:nth-child(1){
    display:inline-block;
  }

  .info div span i {
    visibility: hidden;
  }
  .info div input{
    outline:none;
    border:1px solid #fff;
  }
  .btn1{
    margin:3rem auto;
    text-align: center;;
  }
  .btn1 button{
    width:14.72rem;
    height:1.8rem;
    line-height:1.8rem;
    border-radius:5px;
    background:#166ADE;
    color:#fff;
    font-size:0.7rem;
    border:1px solid #166ADE;
    outline: none;
  }
</style>
