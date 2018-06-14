<template>
  <div>
    <div>
      <i-header title="修改支付密码"></i-header>
    </div>
   
    <div class="middle2" style="margin-top:2.5rem">
      <!-- <input v-model="old_password" type="tel" @blur="show_x(value)"  pattern="[0-9]*" placeholder="请输入旧的支付密码" onkeyup="this.value=this.value.replace(/\D/g,'');"style="-webkit-text-security:disc" minlength="4" maxlength="4"/> -->
      <input v-model="old_password" type="tel" pattern="\d*" placeholder="请输入旧密码 (四位的纯数字)"
             onkeyup="this.value=this.value.replace(/\D/g,'');" style="-webkit-text-security:disc" minlength="4"
             maxlength="4"/>
    </div>
    <div class="middle2" style="margin-top:0.8rem">
      <input type="tel" v-model="new_password" pattern="\d*" placeholder="请输入新密码 (四位的纯数字)"
             onkeyup="this.value=this.value.replace(/\D/g,'');" style="-webkit-text-security:disc" minlength="4"
             maxlength="4"/>
    </div>
    <div class="middle2">
      <input type="tel" pattern="\d*" v-model="new_password_again" placeholder="请再次输入新密码 (四位的纯数字)"
             onkeyup="this.value=this.value.replace(/\D/g,'');" style="-webkit-text-security:disc;border-top:none"
             minlength="4" maxlength="4"/>
    </div>
    <div class="btn1">
      <button @click="submit" class="color1"  style='border:none'>确认修改</button>
    </div>
   	<promptbox  @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" 
   			:promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
  import iHeader from '../../components/i-header'
  import promptbox from '../../components/promptbox'
  import { mapActions } from "vuex";
  //  import {getOid,getUrl} from '../../api'
  export default {
    data() {
      return {
        old_password: "",
        new_password: "",
        new_password_again: "",
        title: "",
        panelShow: false,
        is_gd_ali: is_gd_ali(),
        erreocode:'',
	      promptboxtext:'',
	      panelShow:false,
	      promptboxshow:true,
	      successshow:false,
	      promptsystem:''
      }
    },
    methods: {
      ...mapActions([
        "UPDATA_PAY_PASSWORD",
      ]),
      submit(){
//    	this.successshow=false
        if(this.old_password == ''){
          this.promptboxtext = '请输入旧的支付密码';
          this.panelShow = true;
        }else if(this.new_password == '') {
          this.promptboxtext = '请输入新的支付密码';
          this.panelShow = true;
        }else if(this.new_password_again == ''){
          this.promptboxtext = '请再次输入新的支付密码';
          this.panelShow = true;
        }else if(this.new_password != this.new_password_again){
          this.promptboxtext = '新密码两次输入不相同或不符合规范';
          this.panelShow = true;
        }
        if(this.panelShow){
          setTimeout(() => {
            this.panelShow = false;
          },1000)
          return;
        }
        let prams = {};
        prams.payPassWord = this.new_password;
        prams.oldPayPassWord = this.old_password;
        if (this.new_password_again == this.new_password && this.new_password.length == 4) {
          this.UPDATA_PAY_PASSWORD(prams).then(res=>{
            this.promptboxtext = "修改成功"
            this.panelShow = true
            this.successshow = true
            setTimeout(() => {
              this.panelShow = false
              this.$router.go(-2)
            }, 1200);
          });
        }         
        else {
          this.promptboxtext = "新密码两次输入不相同或不符合规范"
            if(this.old_password.length == 0){
              this.promptboxtext = "请输入旧支付密码"
            }else if(this.new_password.length == 0){
              this.promptboxtext = "请输入新的支付密码"
            }
          this.panelShow = true
          setTimeout(() => {
            this.panelShow = false
          }, 1200);
        }
      },
      show_x: function () {
        if (this.old_password.length == 0) {
          this.promptboxtext = "请输入旧支付密码"
          this.panelShow = true
          setTimeout(() => {
            this.panelShow = false
          }, 1200);
        }
      },
      show_xn: function (value) {
        if (this.new_password.length == 0) {
          this.promptboxtext = "请输入新的支付密码"
          this.panelShow = true
          setTimeout(() => {
            this.panelShow = false
          }, 1200);
        }
      },
    },

    created() {

    },
    components: {
      iHeader,
      promptbox
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
  .header1 {
    height: 46px;
    line-height: 46px;
    border-bottom: 1px solid #ECECEC;
    > span {
      font-size: 18px;
      text-align: center;
      display: block;
    }
  }

  .middle2 {
    height: 45px;
    background: #fff;
  }

  .middle2 input {
    height: 45px;
    width: 100%;
    border-left: none;
    border-right: none;
    border-top: 1px solid #E9E9EB;
    border-bottom: 1px solid #E9E9EB;
    outline: none;
    padding-left: 15px;
    font-size: 16px;
    color: #8B8B8B;
  }

  .middle2 p {
    padding-top: 12px;
    font-size: 16px;
    font-weight: 500;
    text-align: left;
    padding-left: 17px;
    color: #777777;
  }

  .btn {
    margin: 40px auto;
    width: 90%;
  }

  .btn button {
    text-align: center;
    border: 1px solid #DDDDDD;
    background: #dddddd;
    height: 1.8rem;
    border-radius: 5px;
    line-height: 1.8rem;
    width: 100%;
    color: #BEBEBE;
    font-size: 0.7rem;
    outline: none;;
  }

  .modal_box_feedback_login {
    z-index: 99999;
    position: fixed;
    top: 0;
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      background: rgba(0, 0, 0, 0.5);
      color: white;
      padding: 10px 40px;
      border-radius: 4px;
    }
  }
    button.color1{
    width:90%;
    height:45px;
    border-radius:5px;
    color:#fff;
    line-height: 45px;
    display:inline-block;
    margin:5%;
  }
  .return1 {

  }
</style>
