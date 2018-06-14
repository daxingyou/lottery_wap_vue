<template>
  <div class="all1" :style="{'top': isIosWebview ? 40/40+'rem': 0}">
    <div class="topHeader" :style="{'background': is_gd_ali ? '#e60d39': '#146cdc'}" v-if="isIosWebview"></div>
    <div class="login_back color1">
      <a @click="goback" href="javascript:;">
        <img :src="$getPublicImg('/images/backing_out.png')" alt="" />
      </a>
      <span>新用户注册</span>
    </div>
    <div class="container" style="padding: 0px 30px;">
      <div>
        <div class="logo" style="margin-top:3rem;background-images:none!important;">
          <img :src="$store.state.website.response[0].logo" alt="">
        </div>
      </div>
      <div class="form">
        <div>
          <span class="zhanhao"></span>
          <input @blur="verification_1(userName)" type="text" v-model="userName" placeholder="用户账号(6-15英文数字)" />
          <img v-show="from.input1" :src="$getPublicImg('/images/warning _b.png')" />
        </div>
        <div>
          <span class="loc"></span>
          <input ref="passwordInput" @blur="verification_2(passWord)" type="password" placeholder="登录密码(6-15英文数字)" v-model="passWord" />
          <i @click="changePasswordType_a" :class="`${ispassword_a?'openEyes':'closeEyes'}`"></i>
          <img v-show="from.input2" :src="$getPublicImg('/images/warning _b.png')" />
        </div>
        <div>
          <span class="loc"></span>
          <input ref="passwordInput_again" @blur="verification_3(passWordAgain)" type="password" placeholder="确认密码(6-15英文数字)" v-model="passWordAgain" />
          <i @click="changePasswordType_b" :class="`${ispassword_b?'openEyes':'closeEyes'}`"></i>
          <img v-show="from.input3" :src="$getPublicImg('/images/warning _b.png')" />
        </div>
        <div>
          <span class="zhanhao"></span>
          <input @blur="verification_4(realName)" type="text" placeholder="您的姓名(与提款的银行户名一致)" v-model="realName" />
          <img v-show="from.input4" :src="$getPublicImg('/images/warning _b.png')" />
        </div>
        <div class="select_a">
          <span class="loc"></span>
          <div class="input3">
            <select v-model="selected1">
              <option v-for="option in options" v-bind:value="option">
                {{option}}
              </option>
            </select>
            <select v-model="selected2">
              <option v-for="option in options" v-bind:value="option">
                {{option}}
              </option>
            </select>
            <select v-model="selected3">
              <option v-for="option in options" v-bind:value="option">
                {{option}}
              </option>
            </select>
            <select v-model="selected4">
              <option v-for="option in options" v-bind:value="option">
                {{option}}
              </option>
            </select>
          </div>
          <div>提现密码</div>
        </div>
        <div class="btn5">
          <button class="color1" @click="subMit">立即注册</button>
        </div>
      </div>
      <div class="back_login">
        <span>已有账号?</span>
        <a class="color_money" @click='gotoAddress("/login")'>马上登陆</a>
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
    <div class="foot_bbh">
      Copyright ©2012-2018 All Right Reseverd
      <a href="https://want-gaming.com" target="_blank">万游科技提供技术支持</a>
    </div>
    <promptbox @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
// base 64
import base64 from "js-base64";
//  md5
import md5 from "blueimp-md5";
import promptbox from "../../components/promptbox";
import paramsObj from "../../utils/URLParams";
import { mapActions ,mapMutations} from "vuex";
//import { getUrl} from '../../api'
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      showCurtion: false,
      paypasswd: "",
      realName: "",
      passWordAgain: "",
      email: "",
      agname: "",
      pn: "",
      pid: "",
      options: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      selected1: 0,
      selected2: 0,
      selected3: 0,
      selected4: 0,
      // 手机号码
      userName: "",
      // 验证码
      passWord: "",
      passWordE: "", // 验证码错误信息
      // 邀请码
      inviteCode: "",
      //错误信息
      errormsg: "",
      dialog: false,
      doload: false,
      codeMessage: "", //  返回的验证码信息
      from: {
        input1: false,
        input2: false,
        input3: false,
        input4: false,
        input5: false
      },
      panelShow: false,
      ispassword_a: false,
      ispassword_b: false,
      title: "",
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      promptsystem: "",
      successshow: false
    };
  },
  components: {
    promptbox
  },
  created() {},
  methods: {
    ...mapActions(["REGISTER"]),
    ...mapMutations(["toggleRechageBox"]),
    changePasswordType_a() {
      (this.ispassword_a = !this.ispassword_a)
        ? (this.$refs.passwordInput.type = "text")
        : (this.$refs.passwordInput.type = "password");
    },
    changePasswordType_b() {
      (this.ispassword_b = !this.ispassword_b)
        ? (this.$refs.passwordInput_again.type = "text")
        : (this.$refs.passwordInput_again.type = "password");
    },
    subMit() {
      if (
        !this.from.input1 &&
        !this.from.input2 &&
        !this.from.input3 &&
        !this.from.input4 &&
        !this.from.input5 &&
        this.userName.length > 0 &&
        this.passWord.length > 0 &&
        this.passWordAgain.length > 0 &&
        this.realName.length > 0
      ) {
        for (let i = 1; i < 5; i++) {
          let j = `selected${i}`;
          let w = this[j];
          this.paypasswd = `${this.paypasswd}${this[j]}`;
        }
        let params = {};
        params.username = this.userName;
        params.password = this.passWord;
        params.realName = this.realName;
        params.payPassword = this.paypasswd;
        params.pn = paramsObj.promotionId;

        this.REGISTER(params).then(res => {
          // 注册成功之后需要提示用户充值
          setTimeout(() => {
            this.toggleRechageBox(true)
            this.$router.push("/index");
          }, 1500);
        });
      }
    },

    verification_1(userName) {
      //字母、数字组成，字母开头，6-15位。
      if (!/^[a-zA-Z0-9]{6,115}$/.test(userName)) {
        this.from.input1 = true;
      } else {
        this.from.input1 = false;
        let params = {};
        params.username = this.userName;
        params.password = "a123456";
        this.$http.post(`/user/signin`, JSON.stringify(params)).then(res => {
          if (res.data.msg != 2002) {
            this.from.input1 = true;
            this.promptboxtext = "用户已存在";
            this.panelShow = true;
            this.successshow = false;
          }
        });
      }
    },
    verification_2(passWord) {
      //字母、数字、下划线组成，字母开头，6-15位。
      if (!/^[a-zA-Z0-9]{6,15}$/.test(passWord)) {
        this.from.input2 = true;
      } else {
        this.from.input2 = false;
      }
    },
    verification_3(passWord) {
      if (!(this.passWord == passWord)) {
        this.from.input3 = true;
      } else {
        this.from.input3 = false;
      }
    },
    verification_4(realName) {
      //两个以上的中文字
      if (!/^[\u4E00-\u9FA5·]{2,}$/.test(realName)) {
        this.from.input4 = true;
      } else {
        this.from.input4 = false;
      }
    },
    verification_5(i) {},
    // 组件方法
    close() {
      this.dialog = false;
    },
    goback() {
      // 后退
      this.$router.go(-1);
    },
    gotoAddress(path) {
      this.$router.push(path);
    }
    //        验证账号
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
::-webkit-input-placeholder {
  font-size: 12/20rem;
}
/*登录页*/
.foot_bbh {
  font-size: 12px;
  margin: auto;
  color: #666666;
  text-align: center;
  width: 100%;
  margin-top: -1rem;
  background: #fff;
  height: 3rem;
  line-height: 3rem;
  > a {
    color: #4975ca;
  }
}

button {
  outline: none;
}

.container {
}

.all1 {
  width: 100%;
  height: 100%;
  background: #fff;
}

.back_login {
  padding-top: 1rem;
  text-align: center;
}

.cent1 > a {
  text-decoration: none;
  margin: 0.5rem auto;
  display: inline-block;
  img {
    width: 0.5rem;
    height: 0.8rem;
  }
}

::-webkit-input-placeholder {
  color: #cbcbcb;
}

.cent1 {
  padding: 0.5rem 1.5rem;
  .logoazhu {
    width: 580/46.875rem;
    height: 190/46.875rem;
    margin: 2rem auto 1rem;
  }
}

.cent1 h3 {
  padding: 0;
  margin: 0;
  color: #fff;
}

.form input {
  width: 9.7rem;
  height: 2rem;
  line-height: 2rem;
  border: 1px solid #a9acbc;
  border-radius: 10px;
  background: rgba(156, 159, 176, 0.3);
  padding-left: 10px;
  margin-top: 0.4rem;
  margin-left: 5/20rem;
  outline: 0;
}

.form span {
  color: #e0e2e7;
  font-size: 0.6rem;
}

.input3 {
  width: 160/20rem;
  margin-left: 4/25rem;
  float: left;
  margin-top: 0.25rem;
}

.select_a {
  height: 48/20rem;
  > span:nth-of-type(1) {
    width: 1.05rem;
    margin-right: 10/20rem;
  }
  > div:nth-last-of-type(1) {
    display: inline-block;
    width: 62/20rem;
    font-size: 10/20rem;
    padding-top: 6/20rem;
    height: 30/20rem;
    line-height: 20/20rem;
    color: white;
    background-image: url("@{public_img}/images/cata1.png");
    background-size: 100% 100%;
    text-align: center;
    padding-left: 6/20rem;
  }
}

.input3 select {
  width: 32/20rem;
  height: 1.5rem;
  line-height: 1.5rem;
  text-align: center;
  outline: none;
  font-size: 20px;
  appearance: none;
  -webkit-appearance: none;
  border-radius: 5px;
  background: #eeeeee;
  border: 1px solid #e3e3e3;
  padding-left: 0.5rem;
  margin-right: 0/20rem;
}

.w {
  color: #fff;
  margin: 0.5rem 0 0.5rem 3rem;
}

.form .btn5 {
  margin: 1rem auto;
  border-bottom: none;
}

.btn5 button {
  width: 100%;
  height: 2rem;
  line-height: 2rem;
  border-radius: 0.2rem;
  background: #3f79cb;
  color: #c6cedf;
  font-size: 0.7rem;
  border: none;
}

.form {
  margin-top: 38/20rem;
  span {
    width: 21/20rem;
    height: 21/20rem;
    background: red;
  }
  > div {
    border-bottom: 1px solid #cccccc;
    height: 40/20rem;
    line-height: 40/20rem;
    > span:nth-of-type(1) {
      float: left;
      margin-top: 10/20rem;
    }
    > input {
      padding: 0;
      width: 220/20rem;
      height: 1.5rem;
      background-color: #fff;
      padding-left: 13/20rem;
      border: none;
      margin: 0;
      outline: none;
    }
    .closeEyes,
    .openEyes {
      position: absolute;
      height: 0.35rem;
      width: 0.8rem;
      background: url("@{public_img}/images/eye1.png") no-repeat;
      background-size: 100% 100% !important;
      top: 1.2rem;
      right: 0.5rem;
    }
  }
  > div {
    position: relative;
    > img {
      position: absolute;
      width: 35/20rem;
      right: -25/20rem;
    }
  }
}

.login_back {
  padding: 0.275rem 0.8rem;
  margin-bottom: -0.8rem;
  width: 100%;
  height: 1.95rem;
  position: fixed;
  z-index: 10;
  a {
    display: inline-block;
    text-align: left;
    // margin-top:-0.3rem;
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

.loading {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 9999;
  text-align: center;
  color: white !important;
  padding-top: 40%;
  @keyframes line-spin-fade-loader {
    50% {
      opacity: 0.3;
    }
    100% {
      opacity: 1;
    }
  }
  .line-spin-fade-loader {
    text-align: center;
    position: relative;
    width: 100/20rem;
    height: 100/20rem;
    transform: translateX(50px) translateY(50px);
    margin-left: auto;
    margin-right: auto;
  }
  .line-spin-fade-loader > div:nth-child(1) {
    top: 20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.12s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(2) {
    top: 13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.24s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(3) {
    top: 0;
    left: 20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.36s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(4) {
    top: -13.63636/20rem;
    left: 13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.48s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(5) {
    top: -20/20rem;
    left: 0;
    -webkit-animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.6s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(6) {
    top: -13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    transform: rotate(-45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.72s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(7) {
    top: 0;
    left: -20/20rem;
    -webkit-transform: rotate(90deg);
    -ms-transform: rotate(90deg);
    transform: rotate(90deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.84s infinite ease-in-out;
  }
  .line-spin-fade-loader > div:nth-child(8) {
    top: 13.63636/20rem;
    left: -13.63636/20rem;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
    -webkit-animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
    animation: line-spin-fade-loader 1.2s 0.96s infinite ease-in-out;
  }
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