<template>
  <!--个人中心-->
  <div class="myCenter" style="height:100%;background:#fff;">
    <!--头部-->
    <header class="tohop_head container color1" :style="{'top': isIosWebview ? 40/40 + 'rem': 0}">
      <div class="text-center">
        <span @click="goback">
          <img :src="$getPublicImg('/images/backing_out.png')" alt="" />
        </span>
        <span>个人中心</span>
        <span class="log-out-btn" @click="log_out">退出</span>
      </div>
    </header>
    <div class="my_header my_bg">
      <div>
      </div>
      <div style='font-size:0.7rem'>
        {{time}},{{im_username}}
      </div>
      <div>
        用户余额:
        <i>￥{{Number(im_money).toFixed(2)}}</i>
        <img :style="{transition:transition,transform:transform}" @click="refresh_money" :src="$getPublicImg('/images/refresh.png')" />
      </div>
    </div>

    <div class="my_main">
      <ul>
        <li @click='gotoAddress("/myInfo")'>
          <div class="sm_avatar">
          </div>
          <span>个人资料</span>
        </li>
        <li @click="gotoAddress('/changePwd')">
          <div class="lock_my">
          </div>
          <span>修改密码</span>
        </li>
        <li @click='gotoAddress("/noticeCentermy")'>
          <div class="note_my">
          </div>
          <span>我的消息</span>
        </li>
        <li @click="gotoAddress('/Order:0')">
          <div class="money_my">
          </div>
          <span>资金管理</span>
        </li>
        <li @click="gotoAddress('/hahaMoney')">
          <div class="lock_money">
          </div>
          <span>银行卡</span>
        </li>

        <li @click='gotoAddress("/myHistroy")'>
          <div class="history_my">
          </div>
          <span>下注记录</span>
        </li>

        <li @click='gotoAddress("/noticeCenter")'>
          <div class="hook">
          </div>
          <span>新闻中心</span>
        </li>
        <li @click='gotoAddress("/myAbout")'>
          <div class="my_about">
          </div>
          <span>关于我们</span>
        </li>
        <li @click='open_serviec'>
          <div class="service_my">
          </div>
          <span>客服中心</span>
        </li>
      </ul>
    </div>
    <div class="foot_bbh">
      Copyright ©2012-2018 All Right Reserved <br/>
      <a v-show="techShow" href="https://want-gaming.com" target="_blank">万游科技提供技术支持</a>
    </div>

    <!--弹出框-->
    <div class="zzc" v-show="logout">
      <div class="white2">
        <p>确认退出？</p>
        <div>
          <button class="color1" @click='log_out()'>确认</button>
          <button @click='quxiao()'>取消</button>
        </div>
      </div>
    </div>
    <promptbox @panelShow="panelShow=false" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>
  </div>
</template>
<script>
import promptbox from '../../components/promptbox'
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: isIosWebview,
      panelShow: false,
      im_username: '',
      im_money: '',
      logout: false,
      serviec_url: '',
      window: null,
      promptboxtext: '',
      isWan: '',
      time: '',
      transform: '',
      transition: '',
      erreocode: '',
      promptboxtext: '',
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      techShow: false
    }
  },
  methods: {
    gotoAddress(path) {
      this.isWan = sessionStorage.getItem('im_username')
      if (this.isWan == '游客') {
        if (
          /^\/Order*/.test(path) ||
          /^\/changePwd*/.test(path) ||
          /^\/hahaMoney*/.test(path)
        ) {
          this.promptboxtext = '请登陆正式会员账号！'
          this.panelShow = true
          this.successshow = false
          return
        }
      }
      this.$router.push(path)
    },
    refresh_money() {
      this.transition = 'all 3s'
      this.transform = 'rotate(1080deg)'
      let oidInfo = sessionStorage.getItem('im_token')
      let odd = {}
      odd.oid = oidInfo
      this.$http
        .post(`${getUrl()}/getinfo/money`, JSON.stringify(odd))
        .then(res => {
          if (res.data.msg == 4003) {
            this.$router.push({
              path: '/weihu'
            })
          }
          setTimeout(() => {
            this.transition = ''
            this.transform = 'rotate(0deg)'
          }, 3000)

          sessionStorage.setItem('im_money', res.data.money)
          this.im_money = res.data.money
        })
    },
    quxiao() {
      this.logout = false
    },
    goback() {
      this.$store.dispatch('goBack') // 发送后退的状态
      // 后退
      this.$router.go(-1)
    },
    log_out() {
      sessionStorage.clear()
      this.$router.push('/index')
    },
    open_serviec() {
      this.$router.push('/kefu')
    }
  },
  created() {
    ['lv', 'uc', 'fh', 'ly', 'gd','ali'].forEach(item => {
      if (item === this.is_gd_ali) {
        this.techShow = true
      }
    })
    function Get_Greetings() {
      var now = new Date()
      var times = now.getHours()
      if (times >= 0 && times < 6) {
        return '晚上好'
      }
      if (times >= 6 && times < 9) {
        return '早上好'
      }
      if (times >= 9 && times < 11) {
        return '上午好'
      }
      if (times >= 11 && times < 13) {
        return '中午好'
      }
      if (times >= 13 && times < 17) {
        return '下午好'
      }
      if (times >= 17 && times < 19) {
        return '傍晚好'
      }
      if (times >= 19 && times < 24) {
        return '晚上好'
      }
    }
    this.time = Get_Greetings()
    if (sessionStorage.getItem('im_money')) {
      this.im_username = sessionStorage.getItem('im_username')
      this.im_money = sessionStorage.getItem('im_money')
    } else {
      this.$router.push('/login')
    }
  },
  components: {
    promptbox
  }
}
</script>


<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
@zoom: 46.875rem;
button {
  outline: none;
}
.foot_bbh {
  font-size: 12px;
  margin: auto;
  color: #666666;
  text-align: center;
  width: 100%;
  position: relative;
  height: 3rem;
  top: 2rem;
  background: #fff;
  > a {
    color: #4975ca;
  }
}
.log-out-btn {
  float: right;
  position: absolute;
  right: 0.5rem;
  font-size: 0.7rem;
}
.myCenter {
  /*头部*/
  > header {
    background: url('@{public_img}/images/blue.png') no-repeat;
    background-size: 100% 100%;
    height: 2rem;
    line-height: 2rem;
    text-align: center;
    font-size: 0.9rem;
    > div {
      height: 100%;
      color: #ffffff;
    }
  }
  .text-center span:first-child {
    position: absolute;
    left: 15px;
    > img {
      width: 13px;
      height: 20px;
      margin-top: -5px;
      margin-left: 9px;
    }
  }
  /*登陆注册*/
  .person_img {
    margin-top: 40/20rem;
    .login-msg {
      background: url('@{public_img}/images/blue1.png') no-repeat;
      background-size: 100% 100%;
      padding: 0.8rem 1.4em;
      border-bottom: 1px solid #ccc;
      a {
        display: block;
        /*color: #333;*/
      }

      .head {
        width: 2.8rem;
        height: 2.8rem;
        background-color: #eeeeee;
        float: left;
        border-radius: 10px;
        > img {
          width: 100%;
          border-radius: 10px;
        }
      }

      .clickLogin {
        position: relative;
        top: 0.5rem;
        left: 0.8rem;
        color: #9ab4ed;
        > p:nth-of-type(1) {
          font-size: 18/20rem;
        }

        .username {
          line-height: 2.8rem;
        }
        > a {
          display: inline;
          padding: 0.4rem;
        }
        .loging {
          margin-left: 0.4rem;
          > p:first-child {
            margin: 0.4rem 0rem;
          }
        }
        .sign {
          border: 0;
          background: #fff;
          border: 1px solid #e97194;
          border-radius: 3px;
          color: #333;
          padding-left: 5px;
          padding-right: 5px;
          font-size: 12px;
        }
      }

      .account {
        line-height: 2.8rem;
        a {
          display: inline;
        }
        > span {
          padding: 0 0.3rem;
        }
      }
    }
    /*优惠*/
    .person_in {
      display: flex;
      padding: 10px 0;
      background: #fff;
      border-bottom: 1px solid #eeeeee;
      a {
        color: #585858;
      }
      > div {
        flex: 1;
        text-align: center;
        > div {
          text-align: center;
          margin: 5px auto;
          > a {
            display: inline-block;
            position: relative;
            width: 80px;
            img {
              width: 40%;
            }
            p {
              color: #585858;
              position: absolute;
              left: 0;
              right: 0;
              margin: auto;
              font-size: 0.7rem;
              font-weight: 600;
            }
            > span {
              position: relative;
              left: 2rem;
              top: -0.5rem;
              > span {
                position: absolute;
                left: 0.2rem;
                color: #fff;
              }
              > img {
                width: 1rem;
                height: 0.7rem;
              }
            }
          }
        }
      }
    }
  }
  /*订单*/
  .person_order {
    margin-top: 10px;
    background: #fff; //全部订单
    .person_ordin {
      padding: 15px;
    }
    .person_order_in {
      display: flex;
      > div {
        flex: 1;
        text-align: center;
        p {
          margin-top: 5px;
        }
        img {
          width: 40%;
        }
      }
    }
  }

  .arrow {
    background: url('@{public_img}/images/cou_r.png') no-repeat;
    width: 12px;
    height: 10px;
    display: inline-block;
    background-size: 50%;
    margin-left: 5px;
    margin-top: 5px;
  }
}

.person_ordin > span {
  font-size: 16px;
  color: #000;
}

.person_ordin > i {
  color: #999;
}

.person_order_in {
  background: #fff;
  padding-top: 10px;
  padding-bottom: 5px;
  border-top: 1px solid #ccc;
}

.person_order_in ul li {
  width: 24%;
}

.person_order_in ul li img {
  width: 40%;
  margin-bottom: 5px;
}

.person_my {
  background: #fff;
  margin-top: 0.8rem;
  border-top: 1px solid #eeeeee;
}

.person_my > ul > li {
  border-bottom: 1px solid #eeeeee;
  padding: 10px 0;
  height: 45px;
}

.person_my > ul > li i {
  font-size: 0.58rem;
  color: #999;
  margin-left: 0.2rem;
}

.person_my > ul > li img {
  width: 6%;
}

.person_order_in > ul > li {
  position: relative;
}

.order-num {
  width: 20px;
  height: 20px;
  position: absolute;
  top: -5px;
  right: 20px;
  border: 1px solid red;
  border-radius: 50%;
  color: #fff;
  font-size: 10px;
  background: red;
}

.sign-yes {
  border: 0;
  background: #fff;
  border: 1px solid #e97194;
  border-radius: 3px;
  color: #333;
  padding-left: 5px;
  padding-right: 5px;
  position: absolute;
  left: 90px;
  top: 35px;
  font-size: 12px;
}

.zzc {
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  height: 100%;
  position: absolute;
  width: 100%;
}

.white2 {
  margin: 10rem auto;
  width: 11rem;
  background: #fff;
  border-radius: 5px;
  padding: 0.5rem;
}

.white2 p {
  text-align: center;
  color: #7f7f7f;
  font-size: 0.8rem;
  margin: 0.5rem auto;
}

.white2 div {
  border-top: 1px solid #eeeeee;
  text-align: center;
  margin: 0 -0.5rem;
}

.white2 div button {
  border-radius: 5px;
  width: 4.5rem;
  height: 1.5rem;
  border: none;
  margin: 0.5rem auto;
}

.white2 div button:first-child {
  background: #0857d8;
  color: #dfdfdf;
}

.white2 div button:nth-child(2) {
  color: #d7e4f8;
  background: #707070;
}

.modal_box_feedback_regist {
  z-index: 99999;
  position: fixed;
  top: 0;
  height: 100%;
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
.my_main {
  background-color: white;
  > ul {
    font-size: 0;
    > li {
      display: inline-block;
      width: 33.33%;
      text-align: center;
      font-size: 12/20rem;
      /*height: 100/20rem;*/
      height: 200 / @zoom;
      border-right: 1px solid #e0e1e5;
      border-bottom: 1px solid #e0e1e5;
      > div {
        width: 72 / @zoom;
        height: 72 / @zoom;
        margin: 20 / @zoom auto;
        background-size: contain;
        margin-top: 35 / @zoom;
        background-position: center;
      }
    }
    > li:nth-of-type(3),
    li:nth-of-type(6),
    li:nth-of-type(9) {
      border-right: 0;
    }
    // > li:nth-of-type(7), li:nth-of-type(8), li:nth-of-type(9) {
    //   border-bottom: 0;
    // }
  }
}
.tohop_head {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 9;
}
.my_header {
  background-repeat: no-repeat;
  background-size: cover;
  text-align: center;
  margin-top: 40/20rem;
  padding-top: 7/20rem;
  > div:nth-of-type(1) {
    background-image: url('@{public_img}/images/avatar.png');
    background-repeat: no-repeat;
    background-position: center;
    background-size: 26%;
    height: 90/20rem;
  }
  > div:nth-of-type(3) {
    padding: 0/20rem 0 10/20rem 10/20rem;
    > i {
      color: white;
    }
    > img {
      width: 20/20rem;
      margin-left: 10/20rem;
      position: absolute;
    }
  }
}

.avatar_gd {
  background-image: url('@{public_img}/sm_avatar.png');
}
</style>
