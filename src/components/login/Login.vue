<template>
  <div class="all1" :style="{'top': isIosWebview ? 40/40+'rem': 0}">
    <div class="login_back color1">
      <a @click="back_index" href="javascript:;">
        <img :src="$getPublicImg('/images/backing_out.png')" alt="" />
      </a>
      <span test="test">用户登录</span>
    </div>
    <div class="container">
      <div>
        <div class="logo" style="background:none!important;">
          <img :src="$store.state.website.response[0].logo" alt="">
        </div>
      </div>
      <div class="input2">
        <div>
          <span class="zhanhao"></span>
          <input type="search" autocapitalize="off" @blur="verification_1(userName)" v-model="userName" placeholder="用户账号" style="padding-left: 1rem" />
        </div>
        <div>
          <span class="loc"></span>
          <input type="password" v-model="passWord" placeholder="登陆密码" ref="passwordInput" />
          <i @click="changePasswordType" :class="`${ispassWord?'openEyes':'closeEyes'}`"></i>
        </div>
        <p style="margin-top: 0.5rem;">
          <label style="color:#146cdc;"><input type="checkbox" class="checkbox" v-model="rememberpassword" />
            <i class="checkboxinput"></i>记住密码</label>
          <a @click='loginAsTourists' style="float: right;color:#146cdc;margin-right:0rem;">免费试玩</a>
        </p>
        <div id="btn">
          <a @click.prevent="subMit">
            <button class="color1" style="color:#fff">确认登录</button>
          </a>
          <a @click.prevent="gotoAddress('/regist')">
            <button class="gdcolor" style="color:#fff;background:#459df7;">立即注册</button>
          </a>
        </div>
      </div>
    </div>
    <div class="foot_bbh">
      Copyright ©2012-2018 All Right Reserved
      <a href="https://want-gaming.com" target="_blank">万游科技提供技术支持</a>
    </div>
    <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:#000;opacity:.8;width:100%;height:100%;z-index:6">
      <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
        <mu-circular-progress style="" :size="40" />
      </div>
    </div>
    <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptsystem="promptsystem" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>

<script>
import base64 from "js-base64";
import promptbox from "../../components/promptbox";
import { mapActions, mapMutations } from "vuex";
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      ispassWord: false,
      userName: "",
      passWord: "",
      panelShow: false,
      de: false,
      title: "",
      logoxian: false,
      isOpen: false,
      doload: false,
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      promptsystem: "",
      successshow: false,
      rememberpassword: localStorage.getItem("user")
        ? JSON.parse(localStorage.getItem("user")).rember
        : false,
      from: {
        input1: false,
        input2: false
      },
      user: {
        userName: "",
        passWord: "",
        rember: ""
      }
    };
  },
  methods: {
    ...mapActions(["LOGIN_AS_TOURIST", "LOGIN"]),
    changePasswordType() {
      (this.ispassWord = !this.ispassWord)
        ? (this.$refs.passwordInput.type = "text")
        : (this.$refs.passwordInput.type = "password");
    },
    gotoAddress(path) {
      this.$router.push(path);
    },
    verification_1(userName) {
      //长度在6~16之间
      if (!/\w{1,14}$/.test(userName)) {
        this.from.input1 = true;
      } else {
        this.from.input1 = false;
      }
    },
    verification_2(passWord) {
      //长度在6~16之间
      if (!/\w{1,14}$/.test(passWord)) {
        this.from.input1 = true;
      } else {
        this.from.input1 = false;
      }
    },
    subMit() {
      if (this.userName.length > 0 && this.passWord.length > 0) {
        let params = {};
        params.username = this.userName;
        params.password = this.passWord;
        this.LOGIN(params).then(res => {
          if (res.data.httpCode === 515) {
            setTimeout(() => {
              this.$router.push("/index");
            }, 1500);
          }
        });
      } else {
        this.de = false;
        this.promptboxtext = "账号或密码输入不正确！";
        this.panelShow = true;
      }
    },
    loginAsTourists() {
      this.LOGIN_AS_TOURIST().then(res => {
        if (res.data.httpCode === 515) {
          setTimeout(() => {
            this.$router.push("/index");
          }, 1500);
        }
      });
    },
    back_index() {
      this.$router.push("/index");
    }
  },
  created() {
    if (localStorage.getItem("user")) {
      this.userName = JSON.parse(localStorage.getItem("user")).userName.trim();
      this.passWord = JSON.parse(localStorage.getItem("user")).passWord.trim();
      this.rememberpassword = JSON.parse(localStorage.getItem("user")).rember;
    } else {
    }
  },
  components: {
    promptbox
  },
  watch: {
    $route(to, from) {}
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
/*登录页*/
.foot_bbh {
  font-size: 12px;
  margin: auto;
  color: #666666;
  text-align: center;
  width: 100%;
  position: relative;
  top: 1rem;
  height: 2rem;
  display: block;
  background: #fff;
  > a {
    color: #4975ca;
  }
}
.container {
  background: #fff;
  .logo {
    width: 580/46.875rem;
    height: 190/46.875rem;

    margin: 3rem auto 2rem;
  }
  .login-ul {
    > li {
      margin-bottom: 0.44rem;
      position: relative;
    }
    .hint {
      color: #ff4081;
    }
  }
}
.all1 {
  width: 100%;
  height: 100%;
  background: #fff !important;
  // background-repeat: no-repeat;
  // background-size: 100vw 100vh;
  // overflow: hidden;
}
.tel {
  border: 0;
  padding-left: 10px;
  font-size: 16px;
}

.messagenum {
  border: 0;
  padding-left: 10px;
  font-size: 16px;
  /*width: 50%;*/
}

.getnum {
  border: 0;
  border: 1px solid #e66280;
  background: #fff;
  padding: 3px;
  color: #e66280;
  border-radius: 5px;
  position: absolute;
  right: 0px;
}

.login-ok {
  width: 100%;
  background: #d1506d;
  border: 0;
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  border-radius: 7px;
  color: #fff;
}

.inv {
  margin-top: 10px;
  color: #e66280;
  text-decoration: underline;
}

.ty {
  display: inline-block;
  float: left;
  margin: 0.5rem 0;
}

.return > i {
  width: 20px;
  height: 30px;
  display: inline-block;
  /*background: url(../../../wap/return.png) no-repeat;*/
  background-size: 70%;
  position: absolute;
  left: 0;
  top: 10px;
}
.input2 {
  padding: 0.5rem;
  // text-align:center;
  span {
    display: inline-block;
    width: 1.2rem;
    height: 1.2rem;
    background: red;
    vertical-align: middle;
  }
}
.input2 {
  > div:nth-child(1) {
    border-bottom: 1px solid #cccccc;
    line-height: 2.8rem;
    > input {
      padding: 0;
      width: 12rem;
      line-height: 1.5rem;
      background-color: #fff;
      padding-left: 1rem;
      border: none;
      margin: 0;
      outline: none;
    }
  }
  > div:nth-child(2) {
    border-bottom: 1px solid #cccccc;
    line-height: 2.8rem;
    position: relative;
    > input {
      padding: 0;
      width: 12rem;
      line-height: 1.5rem;
      padding-left: 1rem;
      background-color: #fff !important;
      border: none;
      margin: 0;
      outline: none;
    }
    .closeEyes,
    .openEyes {
      position: absolute;
      height: 0.4rem;
      width: 0.8rem;
      background: url("@{public_img}/images/eye.png") no-repeat;
      background-size: 100% 100% !important;
      top: 1.2rem;
      right: 0.5rem;
    }
  }
}

::-webkit-input-placeholder {
  color: #d1d5df;
}
.input2 a {
  text-decoration: none;
  > p {
    color: #1a447c;
  }
}
.input2 input:nth-child(3) {
  width: 7rem;
  float: left;
}
.input2 input:nth-child(4) {
  width: 3.5rem;
  float: right;
}
button {
  outline: none;
}
#btn {
  /* margin:1rem auto;*/
  text-align: center;
}
#btn a {
  text-decoration: none;
}
#btn a button {
  border-radius: 0.2rem;
  height: 2rem;
  line-height: 2rem;
  width: 100%;
  margin-top: 1rem;
  border: none;
  font-size: 0.6rem;
}
#btn a button:nth-child(1) {
  color: #b6c3da;
  background: #3369c6;
}

.login_back {
  padding: 0.4rem 0.8rem;
  margin-bottom: -0.8rem;
  height: 1.95rem;
  box-sizing: border-box;
  line-height: 0.95rem;
  width: 100%;
  position: fixed;
  z-index: 100000;
  a {
    display: inline-block;
    text-align: left;
    img {
      width: 14/20rem;
    }
  }
  span {
    vertical-align: middle;
    display: inline-block;
    width: 90%;
    font-size: 36/40rem;
    text-align: center;
    color: #fff;
  }
}
.checkbox {
  position: absolute;
  top: -9999px;
}
.checkboxinput {
  display: inline-block;
  width: 17px;
  height: 17px;
  margin-right: 5px;
  background: url("@{public_img}/images/radio_simulation.png") no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
input:checked + i {
  background: url("@{public_img}/images/radio_simulation_check1.png") no-repeat;
  background-size: 100% 100%;
}
</style>
