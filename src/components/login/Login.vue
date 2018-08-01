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
        <div class="logo logoali">
          <img v-if="$platform==='ly'" src="../../../wap/images/pn/panda.png" alt="">
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
          <a @click='isShiwan' style="float: right;color:#146cdc;margin-right:0rem;">免费试玩</a>
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
      Copyright ©2012-2018 All Right Reserved <br/>
      <a v-show="techShow" href="https://want-gaming.com" target="_blank">万游科技提供技术支持</a>
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
// base 64
import base64 from 'js-base64'
import promptbox from '../../components/promptbox'
//  md5
//  import md5 from 'blueimp-md5'
//  import { getUrl} from '../../api'
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      ispassWord: false,
      userName: '',
      passWord: '',
      panelShow: false,
      de: false,
      title: '',
      logoxian: false,
      isOpen: false,
      doload: false,
      erreocode: '',
      promptboxtext: '',
      panelShow: false,
      promptboxshow: true,
      promptsystem: '',
      successshow: false,
      rememberpassword: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')).rember
        : false,
      from: {
        input1: false,
        input2: false
      },
      user: {
        userName: '',
        passWord: '',
        rember: ''
      },
      techShow: false
    }
  },
  methods: {
    changePasswordType() {
      ;(this.ispassWord = !this.ispassWord)
        ? (this.$refs.passwordInput.type = 'text')
        : (this.$refs.passwordInput.type = 'password')
    },
    gotoAddress(path) {
      this.$router.push(path)
    },
    verification_1(userName) {
      //长度在6~16之间
      if (!/\w{1,14}$/.test(userName)) {
        this.from.input1 = true
      } else {
        this.from.input1 = false
      }
    },
    verification_2(passWord) {
      //长度在6~16之间
      if (!/\w{1,14}$/.test(passWord)) {
        this.from.input1 = true
      } else {
        this.from.input1 = false
      }
    },
    subMit() {
      //判定填写表单符合验证标准，且不为空
      this.de = true
      if (this.userName.length > 0 && this.passWord.length > 0) {
        let params = {}
        let href = window.location.href
        if (
          href.indexOf('www.') > 0 ||
          href.indexOf('wap.') > 0 ||
          href.indexOf('m.') > 0
        ) {
          href = href.split('//')[1]
          href = href.split('/')[0]
          params.domain = href.split('/')[0]
        } else {
          href = href.split('//')[1]
          params.domain = href.split('/')[0]
        }
        params.username = this.userName
        params.password = this.passWord
        setTimeout(() => {
          if (!this.doload) {
            this.de = false
            this.panelShow = true
            this.erreocode = '10015'
            this.promptsystem = '您的网络连接超时，请稍后再试!'
            this.promptboxshow = false
            this.successshow = false
            return
          }
        }, 10000)
        this.$http
          .post(`${getUrl()}/user/signin`, JSON.stringify(params))
          .then(res => {
            console.log(res.data.rate_version)
            this.de = false
            this.doload = true
            this.successshow = false
            if (res.data.msg == 2001) {
              this.promptboxtext =
                '账号/密码错误,你还有' + res.data.times + '次机会'
              this.panelShow = true
            } else if (res.data.msg == 2002) {
              this.promptboxtext = '用户不存在'
              this.panelShow = true
            } else if (res.data.msg == 2005) {
              this.promptboxtext = '帐号已经被禁用，请联系客服人员。'
              this.panelShow = true
              this.promptboxshow = false
            } else if (res.data.msg == 2013) {
              this.panelShow = true
              this.promptboxtext = '请联系客服解锁！或2小时后再尝试登录！'
              this.promptboxshow = false
            } else if (res.data.msg == 2018) {
              this.promptboxtext = '请修改密码'
              this.panelShow = true
              sessionStorage.setItem('im_token', res.data.oid)
              setTimeout(() => {
                this.panelShow = false
                this.$router.push('/passwordD')
              }, 2000)
            } else if (res.data.oid) {
              if (this.rememberpassword) {
                this.user.userName = ' ' + this.userName
                this.user.passWord = ' ' + this.passWord
                this.user.rember = this.rememberpassword
                localStorage.setItem('user', JSON.stringify(this.user))
              } else {
                localStorage.removeItem('user')
              }
              this.promptboxtext = '登陆成功！'
              this.panelShow = true
              this.successshow = true
              sessionStorage.setItem('im_token', res.data.oid)
              sessionStorage.setItem('im_money', res.data.money)
              sessionStorage.setItem('im_username', res.data.username)
              sessionStorage.setItem('im_realname', res.data.realname)
              sessionStorage.setItem(
                'im_email',
                JSON.stringify(res.data.qqskype)
              )
              sessionStorage.setItem(
                'im_telphone',
                JSON.stringify(res.data.telphone)
              )
              sessionStorage.setItem('im_tan', res.data.oid)
              // 重新加载赔率
              if (
                localStorage.getItem('odds_version') &&
                res.data.rate_version != localStorage.getItem('odds_version')
              ) {
                localStorage.clear()
              }
              localStorage.setItem('odds_version', res.data.rate_version)
              setTimeout(() => {
                this.panelShow = false
                this.$router.push('/index')
              }, 1000)
            } else if (res.data.msg == 3003) {
              this.erreocode = '3003'
              this.panelShow = true
              this.promptsystem = '因网络原因，您登录未成功，请重试!'
              this.successshow = false
              this.promptboxshow = false
            }
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        this.de = false
        this.promptboxtext = '账号或密码输入不正确！'
        this.panelShow = true
      }
    },
    isShiwan() {
      this.logoxian = true
      this.isOpen = false
      this.$http
        .post(`${getUrl()}/user/signdemo`)
        .then(res => {
          if (res.data.oid) {
            this.promptboxtext = '试玩账号登陆成功！'
            this.panelShow = true
            this.successshow = true
            sessionStorage.setItem('im_token', res.data.oid)
            sessionStorage.setItem('im_money', res.data.money)
            sessionStorage.setItem('im_username', res.data.username)
            sessionStorage.setItem('im_realname', res.data.realname)
            setTimeout(() => {
              if (sessionStorage.getItem('im_username')) {
                this.promptboxtext_control = true
                this.username = sessionStorage.getItem('im_username')
              } else {
                this.promptboxtext_control = false
              }
            }, 0)
            setTimeout(() => {
              this.panelShow = false
              this.$router.push('/index')
            }, 1000)
          } else {
            this.promptboxtext = '试玩账号登录失败'
            this.panelShow = true
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    back_index() {
      this.$router.push('/index')
    }
  },
  beforeCreate() {},
  created() {
    ['lv', 'uc', 'fh', 'ly', 'gd','ali'].forEach(item => {
      if (item === this.is_gd_ali) {
        this.techShow = true
      }
    })

    if (localStorage.getItem('user')) {
      this.userName = JSON.parse(localStorage.getItem('user')).userName.trim()
      this.passWord = JSON.parse(localStorage.getItem('user')).passWord.trim()
      this.rememberpassword = JSON.parse(localStorage.getItem('user')).rember
    } else {
    }
  },
  components: {
    promptbox
  },
  watch: {
    $route(to, from) {}
  }
}
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
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
  /*height: 100%;*/
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
      background: url('@{public_img}/images/eye.png') no-repeat;
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
  top: 0;
  -webkit-transform: translateZ(0);
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
  background: url('@{public_img}/images/radio_simulation.png') no-repeat;
  background-size: 100% 100%;
  vertical-align: middle;
}
input:checked + i {
  background: url('@{public_img}/images/radio_simulation_check1.png') no-repeat;
  background-size: 100% 100%;
}
</style>
