<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
    <div>
      <i-header title="开奖大厅"></i-header>
    </div>
    <div class="gameClass inde_bg" v-if="isReady">
      <div>
        <div>
          <div v-show="showkjw" style="height: 2.56rem;">
            <a class="game_55" @click="kjw">
              <div class="gametitle" style="margin-bottom: 0rem;">
                <div class="border_left" style="width: 100%;margin-bottom: 0;">
                  <span style="width: 100%!important;">{{titletext}}</span>
                </div>
                <div class=" game_55" style="width: 100%;margin-bottom: 0.2rem;">
                  <span style="width: 100%!important;margin: 0;font-size: 0.6rem;color: #666666!important;">更全面的内容，更新鲜的资讯</span>
                </div>
              </div>
              <div class="open_lottery" style="margin-right:0.5rem;">
                <span class="run_lottery_b" style="margin-top: 0.2rem;">即刻前往</span>
              </div>
              <i class="clj"></i>
            </a>
            <img :src="$getPublicImg('/images/kjwlogo.png')" alt="" :style="{left:kjlogoleft}" style="position: absolute;top: 0;width: 2.2rem;" />
          </div>
          <div v-for="(item,index) in list">
            <a :class="className[index]" @click='gotoAddress("/trend:"+item.lotterygamesId)'>
              <div class="gametitle">
                <div class="border_left">
                  <span>{{item.lotterygamesId|filterGameName}}</span>
                  <span style="color: #999">——第{{item.round}}期</span>
                </div>
                <div :class="className[index]">
                  <span style="text-align: left;margin: 0;">上期:</span>
                  <span v-if="item.lotterygamesId==51||item.lotterygamesId==240||item.lotterygamesId==171||item.lotterygamesId==210||item.lotterygamesId==260" v-for="i in numbeYs(item.number)" :class="`cl_${i} color88`"></span>
                  <span v-if="item.lotterygamesId==47" v-for="i in numbeYs(item.number)" :class="`color_${i} color88`"></span>
                  <span v-if="item.lotterygamesId==3||item.lotterygamesId==2||item.lotterygamesId==46||item.lotterygamesId==250" v-for="i in numbeYs(item.number)" :class="`color_${i} color88`" style="border-radius:50%">{{i}}</span>
                  <span v-if="item.lotterygamesId==172" v-for="i in numbeYs(item.number)" :class="`color_${i} color88`"></span>
                  <span v-if="item.lotterygamesId==160" v-for="i in pcdd" :class="`color_${i} color88`" style="border-radius:50%">{{i}}</span>
                  <span v-if="item.lotterygamesId==69" v-for="i in xq" :class="i=='+'?`color_v color88`:`color_${i} color88`" style="border-radius:50%">{{i}}</span>
                  <span v-if="item.lotterygamesId==270" v-for="i in jc" :class="i=='+'?`color_v color88`:`color_${i} color88`" style="border-radius:50%">{{i}}</span>
                </div>
              </div>
              <div class="open_lottery">
                <span class="run_lottery_b">开奖时间</span>
                <!-- <span>12:20</span> -->
                <span class="">{{eval(time[index]) > 0 ? myfilter(eval(time[index])):'封盘'}}</span>
              </div>
              <i class="clj"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
    <div :style='de?"display:block":"display:none"' style="position: fixed;top:0;left:0;background:#000;opacity:.8;width:100%;height:100%;z-index:6">
      <div style='position: fixed;top:50%;left:50%;width:40px;height:40px;margin:-20px 0 0 -20px;'>
        <mu-circular-progress style="" :size="40" />
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import footGuide from "../../components/footer/footGuide";
import iHeader from "../../components/i-header";
import lotteryGames from "../../config/lotteryGames.config";
import { setStore } from "../../utils/mUtils.js";
import { swiper, swiperSlide } from "vue-awesome-swiper";

export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      list: {},
      showkjw: true,
      kjlogoleft: "",
      de: true,
      isIosWebview: isIosWebview,
      timeBj: null,
      timeCq: null,
      timeXg: null,
      timeXy: null,
      timeGd: null,
      timeNc: null,
      time28: null,
      timeKS: null,
      timeWNS: null,
      timeJsc: null,
      timeJsssc: null,
      timeTj: null,
      timeSm: null,
      timeLhc: null,
      time: [],
      className: [],
      isOpen: false,
      isReady: false,
      // 轮播图
      swiperOption: {
        pagination: ".swiper-pagination",
        paginationClickable: true,
        autoplay: 4000,
        autoplayDisableOnInteraction: false,
        loop: true
      },
      msgs: {
        data: []
      },
      hotmsgs: {},
      title_control: false,
      dialog: false,
      title: "",
      titletext: "",
      an_announcement: "",
      panelShow: false,
      pcUrl: "",
      appdown: "",
      logout: false,
      money: "",
      mask: false,
      pcdd: [],
      xq: "",
      jc: "",
      timerOut: null,
      timerInterval: null
    };
  },
  mounted() {},
  filters: {
    filterGameName: function(val) {
      let result = "";
      lotteryGames.forEach(item => {
        if (val === item.code) {
          result = item.title;
        }
      });
      return result;
    }
  },
  methods: {
    ...mapActions(["OPEN_SELET"]),
    countDownInterval(timeArr) {
      this.timerInterval = setInterval(() => {
        timeArr.forEach(gameSort => {
          if (this[gameSort] === 0) {
            // 开始拿开奖结果
            this.getLotteryResult();
          } else {
            this[gameSort]--;
          }
        });
      }, 1000);
    },
    getLotteryResult() {
      return this.OPEN_SELET().then(res => {
        this.de = false;
        this.isReady = true;
        this.list = res.data.response;
        this.time = [];
        for (let i = 0; i < this.list.length; i++) {
          let gameTime = "";
          let className = "";
          switch (this.list[i].lotterygamesId) {
            case "270":
              this.timeLhc =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeLhc";
              className = "game_201";
              let jc = res.data.response[i].number.split(",");
              jc.splice(6, 0, "+");
              this.jc = jc;
              break;
            case "260":
              this.timeSm =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeSm";
              className = "game_260";
              break;
            case "240":
              this.timeJsc =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeJsc";
              className = "game_55";
              break;
            case "250":
              this.timeJsssc =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeJsssc";
              className = "game_60";
              break;
            case "46":
              this.timeTj =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeTj";
              className = "game_40";
              break;
            case "210":
              this.timeWNS =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeWNS";
              className = "game_35";
              break;
            case "51":
              this.timeBj =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeBj";
              className = "game_55";
              break;
            case "2":
              this.timeCq =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeCq";
              className = "game_40";
              break;
            case "69":
              this.timeXg =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeXg";
              className = "game_20";
              let xq = res.data.response[i].number.split(",");
              xq.splice(6, 0, "+");
              this.xq = xq;
              break;
            case "171":
              this.timeXy =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeXy";
              className = "game_35";
              break;
            case "3":
              this.timeGd =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeGd";
              className = "game_30";
              break;
            case "172":
              this.timeKS =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeKS";
              className = "game_88";
              break;
            case "47":
              this.timeNc =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.timeNc";
              className = "game_25";
              break;
            case "160":
              this.time28 =
                res.data.response[i].openTime - res.data.response[i].sysTime;
              gameTime = "this.time28";
              className = "game_15";
              let sum = 0,
                resultArr = [],
                filteredArray = [];
              res.data.response[i].number.split(",").forEach(num => {
                sum += num * 1;
              });
              resultArr = [...res.data.response[i].number.split(","), `${sum}`];

              resultArr.forEach((item, index) => {
                if (index === resultArr.length - 1) {
                  filteredArray = [...filteredArray, "=", item];
                } else if (index === resultArr.length - 2) {
                  filteredArray = [...filteredArray, item];
                } else {
                  filteredArray = [...filteredArray, item, "+"];
                }
              });
              this.pcdd = filteredArray;
              break;
            default:
              break;
          }
          this.className.push(className);
          this.time.push(gameTime);
        }
      });
    },
    p(s) {
      if (s <= 0) {
        return `00`;
      } else if (s > 0 && s < 10) {
        return `0${s}`;
      } else {
        return s;
      }
    },
    //过滤分秒
    myfilter(second_time, second_endtime) {
      let time = parseInt(second_time);
      let timeE = parseInt(second_endtime);
      let second = second_time % 60;
      let secondE = second_endtime % 60;
      this.s = this.p(secondE);
      let min = Math.floor(second_time / 60) % 60;
      let minE = Math.floor(second_endtime / 60) % 60;
      this.m = this.p(minE);
      let hour = Math.floor(second_time / 3600);
      let hourE = Math.floor(second_endtime / 3600);
      this.h = this.p(hourE);
      if (hour) {
        time = this.p(hour) + ":" + this.p(min) + ":" + this.p(second);
        return time;
      } else {
        time = this.p(min) + ":" + this.p(second);
        return time;
      }
    },
    eval(val) {
      console.log(val);
      return eval(val);
    },
    numbeYs(numberList) {
      return numberList && numberList.split(",");
    },
    exit() {
      this.logout = !this.logout;
    },
    isShow() {
      this.isOpen = !this.isOpen;
      this.mask = !this.mask;
    },
    goback() {
      this.$router.go(-1);
    },
    gotoAddress(path) {
      if (path == "app") {
        window.location.href = this.appdown;
      } else {
        if (!this.$store.state.userData.sessionId) {
          this.$router.push("/login");
        } else {
          this.$router.push(path);
        }
      }
    },
    log_out() {
      sessionStorage.clear();
      this.logout = false;
      this.promptboxtext_control = false;
      this.mask = false;
    },
    kjw() {
      if (this.is_gd_ali == "ali") {
        window.location.href = "http://pk10tv.com/";
      } else if (this.is_gd_ali == "gd") {
        window.location.href = "http://www.caipiaoshipin.com";
      } else if (this.is_gd_ali == "lv") {
        window.location.href = "http://www.1188kai.com/html/public/home.html";
      } else if (this.is_gd_ali == "uc") {
        window.location.href = "http://www.kkj333.com/";
      } else if (this.is_gd_ali == "fh") {
        window.location.href = "https://www.428kj.com";
      } else if (this.is_gd_ali == "ly") {
        window.location.href = "https://www.87111.com/";
      } else if (this.is_gd_ali == "yiren") {
        window.location.href = "https:/yirkj.com/";
      } else if (this.is_gd_ali == "agcai") {
        window.location.href = "https:/yirkj.com/";
      }
    },
    inArray1(needle, array, bool) {
      if (typeof needle == "string" || typeof needle == "number") {
        for (let i in array) {
          if (needle === array[i]) {
            if (bool) {
              return i;
            }
            return true;
          }
        }
        return false;
      }
    }
  },
  components: {
    footGuide,
    swiper,
    iHeader,
    swiperSlide
  },
  getdata() {},
  created() {
    if (this.is_gd_ali == "ali") {
      this.titletext = "PK10tv.com开奖网";
      this.kjlogoleft = "6rem";
    } else if (this.is_gd_ali == "gd") {
      this.titletext = "caipiaoshipin.com开奖网";
      this.kjlogoleft = "7.5rem";
    } else if (this.is_gd_ali == "lv") {
      this.showkjw = false;
      this.titletext = "1188kai.com开奖网";
      this.kjlogoleft = "6rem";
    } else if (this.is_gd_ali == "uc") {
      this.titletext = "kkj333.com开奖网";
      this.kjlogoleft = "6rem";
    } else if (this.is_gd_ali == "fh") {
      this.titletext = "428kj.com开奖网";
      this.kjlogoleft = "5.5rem";
    } else if (this.is_gd_ali == "ly") {
      // this.showkjw=false
      this.titletext = "87111.com开奖网";
      this.kjlogoleft = "5.6rem";
    } else if (this.is_gd_ali == "klc") {
      this.showkjw = false;
      this.titletext = "87111.com开奖网";
      this.kjlogoleft = "5.6rem";
    } else if (this.is_gd_ali == "yiren") {
      this.showkjw = true;
      this.titletext = "yirkj.com开奖网";
      this.kjlogoleft = "5.2rem";
    } else if (this.is_gd_ali == "agcai") {
      this.showkjw = false;
      this.titletext = "yirkj.com开奖网";
      this.kjlogoleft = "5.2rem";
    }
    this.getLotteryResult().then(() => {
      this.countDownInterval([
        "time28",
        "timeBj",
        "timeCq",
        "timeNc",
        "timeSm",
        "timeGd",
        "timeJsc",
        "timeLhc",
        "timeJsssc",
        "timeTj",
        "timeWNS",
        "timeXy",
        "timeKS",
        "timeXg"
      ]);
    });
  },
  watch: {
    timeBj: function() {
      let arry_time = [
        0,
        10,
        20,
        30,
        40,
        50,
        60,
        70,
        80,
        90,
        100,
        110,
        120,
        130,
        140,
        150,
        160,
        170,
        180,
        190,
        200,
        200,
        210,
        220,
        230,
        240,
        250,
        260,
        270,
        280,
        290
      ];
      if (
        arry_time.indexOf(this.timeBj) != -1 ||
        this.timeCq == 0 ||
        this.timeXg == 0 ||
        this.timeXy == 0 ||
        this.timeXy == 0 ||
        this.timeGd == 0 ||
        this.time28 == 0 ||
        this.timeNc == 0 ||
        this.timeSm == 0 ||
        this.timeLhc == 0
      ) {
        this.getLotteryResult();
      }
    }
  }
};
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import "../../icon/iconfont.css";
@import "../../assets/less/variable.less";
.i-header {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 10;
}
.text-center span:first-child {
  position: absolute;
  left: 15px;
  font-size: 36/40rem;
  > img {
    width: 13px;
    height: 20px;
    margin-top: 0.7rem;
    margin-left: 0.3rem;
  }
}
.icon-hanbaobao {
  font-size: 18/20rem;
  margin-right: 4/20rem;
}
.open_lottery {
  padding: 0.15rem 0.4rem 0.15rem 0rem;
  margin-right: 0.6rem;
}
.swiper-box {
  a {
    display: block;
    height: 160px;
    img {
      height: 100%;
    }
  }
}
.login {
  height: 1.6rem;
  text-align: right;
  padding: 0.3rem 10/20rem;
  background: #fff;
  position: relative;
  z-index: 10;
  margin-top: 40/20rem;
  box-shadow: 0 12px 43px -15px #aaa;
  > a {
    text-decoration: none;
    > button {
      padding: 0.2rem;
      border-radius: 0.6rem;
      background: none;
      text-align: center;
      width: 3rem;
      border: 1px solid #fff;
      height: 1.1rem;
      box-shadow: 0 6px 23px -4px #aaa;
      outline: none;
    }
  }
  img {
    width: 24/20rem;
  }
}
.swiper_group {
  width: 100%;
  position: relative;
  margin-top: 40/20rem;
  .banner-item {
    width: 100%;
  }
}
@color: #d1506d;
.mu-appbar {
  position: fixed;
  top: 0;
  background: url("@{public_img}/images/blue.png");
  color: #fff;
  height: 2rem;
  text-align: center;
  z-index: 12;
  > p {
    display: inline-block;
    text-align: center;
    font-weight: 100;
  }
}
.mu-appbar img {
  float: right;
  width: 1rem;
  height: 0.8rem;
  margin-top: -1.4rem;
}
.view-tabs {
  background-color: rgb(247, 247, 247);
  color: rgba(0, 0, 0, 0.87);
  height: 46px;
  display: flex;
  > .mu-tab-link {
    color: rgba(102, 102, 102, 1);
    flex: 1;
    width: 20%;
  }
  > .mu-tab-active {
    color: @color;
  }
}
.im {
  width: 32px;
  height: 40/47rem;
  > img {
    margin-top: 3/20rem;
    width: 50%;
    height: 40/47rem;
    margin-left: 4/20rem;
  }
}
.announcement {
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 1;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  > div:nth-of-type(2) {
    padding: 0.2rem 0 2/20rem;
    width: 90%;
    overflow: hidden;
    display: flex;
    align-items: center;
    p {
      white-space: nowrap;
    }
  }
}
.juzho {
  width: 11rem;
  margin: 10rem auto;
}
.white2 {
  background: #fff;
  border-radius: 5px;
  padding: 0.5rem;
  position: relative;
  z-index: 9999;
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
.headList {
  text-align: center;
  padding: 0 3/20rem 3/20rem 3/20rem;
  .ali_pc {
    width: 30/20rem;
    background-repeat: no-repeat;
    height: 20/20rem;
    background-size: 20/20rem 20/20rem;
  }
  > li {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d6e0ea;
    padding: 5/20rem;
    > a {
      color: #245da0;
    }
  }
}
.gameClass {
  padding: 0.3rem;
  background-color: #eee;
  margin-top: 1.92rem;
  > div {
    border: 1px solid #cccccc;
    border-radius: 0.3rem;
    overflow: hidden;
    > div {
      /*height: 1110/46.875rem;*/
      > div {
        background: #f8f9fb;
        height: 150/46.875rem;
        position: relative;
        border-bottom: 1px solid #eee;
        > a {
          width: 100%;
          display: inline-block;
          padding: 22/46.875rem 0;
          .gametitle {
            float: left;
            margin-top: 0.25rem;
            div:nth-child(1) {
              height: 31/47rem;
              line-height: 31/47rem;
              margin-bottom: 2/46.875rem;
              span:nth-child(1) {
                display: inline-block;
                font-weight: bold;
                height: 100%;
                margin: 0 0 15/47rem 10/46.875rem;
                font-size: 30/47rem;
              }
              span:nth-child(2) {
                font-size: 28/47rem;
                text-align: left;
              }
            }
            div:nth-child(2) {
              line-height: 41/47rem;
              font-size: 25/47rem;
              font-weight: bold;
              color: #fff;
              padding: 0.2rem;
              > span {
                margin-left: 4/40rem;
                width: 40/40rem;
                height: 40/40rem;
                font-weight: normal;
                line-height: 40/40rem;
                text-align: center;
                border-radius: 0.2rem;
                color: #fff;
                font-size: 0.65rem;
                text-shadow: 1px 1px #333;
                float: left;
                font-size: 20/40rem;
              }
            }
          }
          > div {
            float: right;
            color: #272727;
            font-size: 12px;
            border-radius: 10/47rem 0 0 10/47rem;
            /*overflow: hidden;*/
            margin-top: 0.07rem;
            position: relative;
            > span {
              display: block;
              color: #676767;
              text-align: right;
            }
            > span:nth-child(2) {
              color: #fd9303;
              font-size: 32/40rem;
              letter-spacing: -0.9px;
              position: absolute;
              // left: 0;
              top: 1rem;
              text-align: right;
              right: 10px;
            }
          }
        }
      }
    }
  }
}

header {
  position: fixed;
  padding-left: 18/20rem;
  color: white;
  z-index: 99;
  width: 100%;
  h1 {
    float: left;
    margin: 0;
    font-size: 20/20rem;
    color: white;
    font-weight: 100;
    img {
      width: 138/20rem;
    }
  }

  .header_login {
    padding: 3/20rem 0;
    text-align: right;
    button:nth-of-type(1) {
      float: right;
      height: 32/20rem;
      margin: 0 6/20rem;
    }
    button:nth-of-type(2) {
      height: 32/20rem;
      float: right;
      margin: 0 6/20rem;
    }
    button {
      border-radius: 0.3rem;
      text-align: center;
      padding: 0;
      width: 56/20rem;
      outline: none;
      border: 0px;
      outline: none;
      font-size: 14/20rem;
      color: #3a3a3a;
      > div {
        width: 40/20rem;
        > span:nth-of-type(2) {
          font-size: 10/20rem;
          display: block;
        }
        > span:nth-of-type(1) {
          display: block;
        }
      }
    }
    img {
      width: 20/20rem;
      margin-right: 3/20rem;
      height: 24/20rem;
    }
    .username {
      font-size: 14/20rem;
      width: 68/20rem;
      text-overflow: ellipsis;
      overflow: hidden;
      /*   background: url(../../../wap/images/user.png);*/
      background-repeat: no-repeat;
      background-size: 20/20rem;
      padding-left: 20/20rem;
    }
    .test {
      background-repeat: no-repeat;
    }
    .login_b {
      > div {
      }
    }
  }
  .header_login {
    > * {
      display: inline-block;
    }
  }
}

.zzc {
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  height: 100%;
  position: absolute;
  width: 100%;
}
.recommend_nav {
  .swiper-box {
    margin-top: 12/20rem;
    > div {
      height: 89/20rem;
    }
  }

  .nav_list_group {
    font-size: 0;
  }

  .nav_list {
    font-size: 12/20rem;
    display: inline-block;
    width: 24.5%;
    text-align: center;
    span {
      display: block;
      position: relative;
    }
    h6 {
      width: 50px;
      height: 50px;
      margin: 0;
      display: inline-block;
      background-size: 100% 100%;
      background-position: center;
    }
    > div {
      > a {
        > img {
          height: auto;
        }
        span {
          color: #333;
        }
      }
    }
  }

  img {
    width: 40/20rem;
  }

  .swiper-pagination {
    margin-bottom: -9/20rem;
  }
}

.alert_right {
  position: absolute;
  right: 0.2rem;
  top: 2.2rem;
  // padding: 0.25rem 0.25rem;
  background: #fff;
  color: #151515;
  border-radius: 0.2rem;
  li {
    width: 8.5rem;
    text-align: left;
    line-height: 1.8rem;
    font-size: 12/20rem;
    border-bottom: 1px solid #ccc;
    padding-left: 1.8rem;
  }

  .money {
    display: flex;
    justify-content: space-between;
    padding-right: 3/20rem;
  }
}
.alert_right {
  > li:nth-of-type(1) {
    background: url("@{public_img}/images/usergr.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
    span {
      color: #385efd;
    }
  }
  > li:nth-child(2) {
    background: url("@{public_img}/images/czhi.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(3) {
    background: url("@{public_img}/images/qu_kuan.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(4) {
    background: url("@{public_img}/images/xzhu.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(5) {
    background: url("@{public_img}/images/xzjjl.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(6) {
    background: url("@{public_img}/images/kjjl.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(7) {
    background: url("@{public_img}/images/grule.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(8) {
    background: url("@{public_img}/images/lxi.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
  > li:nth-child(9) {
    background: url("@{public_img}/images/tchu.png") no-repeat 0.2rem 0.2rem;
    background-size: 54/46.875rem 54/46.875rem;
  }
}

.alert_right:before {
  content: "";
  width: 0;
  height: 0;
  border-bottom: 0.55rem solid #fff;
  border-right: 0.55rem solid transparent;
  border-left: 0.55rem solid transparent;
  border-top: 0.55rem solid transparent;
  position: absolute;
  right: 0.3rem;
  top: -1.1rem;
}

.mask {
  position: fixed;
  width: 100%;
  background: rgba(0, 0, 0, 0.4);
  height: 100vh;
  z-index: 9;
}

.gametitle .game_20,
.gametitle .game_201 {
  > span:nth-child(8) {
    background: none !important;
    width: 0.5rem !important;
    color: #999 !important;
    font-weight: normal !important;
    text-shadow: none !important;
  }
  .color_1,
  .color_2,
  .color_7,
  .color_8,
  .color_12,
  .color_13,
  .color_18,
  .color_19,
  .color_23,
  .color_24,
  .color_29,
  .color_30,
  .color_34,
  .color_35,
  .color_40,
  .color_45,
  .color_46 {
    //  background-color: #ff3545 !important;
    //  border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/red_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  .color_3,
  .color_4,
  .color_9,
  .color_10,
  .color_14,
  .color_15,
  .color_20,
  .color_25,
  .color_26,
  .color_31,
  .color_36,
  .color_37,
  .color_41,
  .color_42,
  .color_47,
  .color_48 {
    // background-color: #4f57fa !important;
    // border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/blue_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  .color_5,
  .color_6,
  .color_11,
  .color_16,
  .color_17,
  .color_21,
  .color_22,
  .color_27,
  .color_28,
  .color_32,
  .color_33,
  .color_38,
  .color_39,
  .color_43,
  .color_44,
  .color_49 {
    //  background-color: #22620c !important;
    //  border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/green_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  .color_v {
    width: 1rem !important;
    height: 1rem !important;
    border: none !important;
  }
}
.game_40,
.game_20,
.game_60,
.game_201 {
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
  }
  > span {
    width: 1rem !important;
    height: 1rem !important;
    line-height: 1rem !important;
  }
}
.game_15 {
  > span:nth-child(3),
  span:nth-child(5),
  span:nth-child(7) {
    background: none !important;
    width: 0.5rem !important;
    color: #999 !important;
    font-weight: normal;
    text-shadow: none !important;
  }

  /*>span:nth-child(7){
          background: red!important;
       }*/
  .color_1,
  .color_4,
  .color_7,
  .color_10,
  .color_16,
  .color_19,
  .color_22,
  .color_25 {
    background: green !important;
    border: 1px solid #666666;
  }
  .color_3,
  .color_6,
  .color_9,
  .color_12,
  .color_15,
  .color_18,
  .color_21,
  .color_24 {
    background: red !important;
    border: 1px solid #666666;
  }
  .color_2,
  .color_5,
  .color_8,
  .color_11,
  .color_17,
  .color_20,
  .color_23,
  .color_26 {
    background: blue !important;
    border: 1px solid #666666;
  }
  .color_0,
  .color_13,
  .color_14,
  .color_27 {
    background: #ccc !important;
    border: 1px solid #666666;
  }

  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;

    background: none !important;
  }
  > span:nth-child(2),
  span:nth-child(4),
  span:nth-child(6) {
    background: #146cdc !important;
    border: 1px solid #666666;
  }
}
.game_55,
.game_551,
.game_260 {
  > span {
    width: 40/46.875rem !important;
    height: 40/46.875rem !important;
    line-height: 40/46.875rem !important;
  }
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
  }
  // .gametitle{
  // >ul{
  > .color_1 {
    background: #ffc600 !important;
  }
  > .color_2 {
    background: #008fff !important;
  }
  > .color_3 {
    background: #4b4b4b !important;
  }
  > .color_4 {
    background: #ff7803 !important;
  }
  > .color_5 {
    background: #5dd1d1 !important;
  }
  > .color_6 {
    background: #5334fe !important;
  }
  > .color_7 {
    background: #aaa !important;
  }
  > .color_8 {
    background: #ff2602 !important;
  }
  > .color_9 {
    background: #730b00 !important;
  }
  > .color_10 {
    background: #09bc00 !important;
  }
  > span {
    border-radius: 0rem !important;
  }
  // }
  // }
}
.game_20,
.game_201 {
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
  }
  > span:nth-child(8) {
    background: none !important;
    width: 0.5rem !important;
    color: #999 !important;
    font-weight: normal !important;
    text-shadow: none !important;
  }
  // .lotteryOpen{
  //   >ul{
  .color_1,
  .color_2,
  .color_7,
  .color_8,
  .color_12,
  .color_13,
  .color_18,
  .color_19,
  .color_23,
  .color_24,
  .color_29,
  .color_30,
  .color_34,
  .color_35,
  .color_40,
  .color_45,
  .color_46 {
    // background-color: #ff3545 !important;
    // border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/red_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  .color_3,
  .color_4,
  .color_9,
  .color_10,
  .color_14,
  .color_15,
  .color_20,
  .color_25,
  .color_26,
  .color_31,
  .color_36,
  .color_37,
  .color_41,
  .color_42,
  .color_47,
  .color_48 {
    //  background-color: #4f57fa !important;
    //  border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/blue_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  .color_5,
  .color_6,
  .color_11,
  .color_16,
  .color_17,
  .color_21,
  .color_22,
  .color_27,
  .color_28,
  .color_32,
  .color_33,
  .color_38,
  .color_39,
  .color_43,
  .color_44,
  .color_49 {
    // background-color: #22620c !important;
    // border: 1px solid #666666;
    text-shadow: none !important;
    background: url(/wap/images/green_ball.png);
    background-size: 100% 100% !important;
    color: #333 !important;
  }
  // }
  // }
}

.game_40,
.game_60,
.game_20,
.game_201 {
  > .color88 {
    background-color: #146cdc !important;
    border: 1px solid #666666;
  }
}
.game_35 {
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
  }
  > span {
    width: 40/46.875rem !important;
    height: 40/46.875rem !important;
    line-height: 40/46.875rem !important;
  }
  // .lotteryOpen{
  //   >ul{
  > span {
    border-radius: 0rem !important;
  }
  > .color_1 {
    background: #ffc600 !important;
  }
  > .color_2 {
    background: #008fff !important;
  }
  > .color_3 {
    background: #4b4b4b !important;
  }
  > .color_4 {
    background: #ff7803 !important;
  }
  > .color_5 {
    background: #5dd1d1 !important;
  }
  > .color_6 {
    background: #5334fe !important;
  }
  > .color_7 {
    background: #aaa !important;
  }
  > .color_8 {
    background: #ff2602 !important;
  }
  > .color_9 {
    background: #730b00 !important;
  }
  > .color_10 {
    background: #09bc00 !important;
  }
  //   }
  // }
}

.game_25,
.game_30 {
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
    background: none;
  }
  > span {
    background: #146cdc;
    width: 1rem !important;

    height: 1rem !important;
    line-height: 1rem !important;
  }
  // .lotteryOpen{
  //   >ul{
  > .color_19 {
    background: #f24d2f !important;
  }
  > .color_20 {
    background: #f24d2f !important;
  }
  //   }
  // }
}
/*
  .game_30,.game_35,.game_55{
    // .lotteryOpen{
    //   >ul{
        >li{
          text-shadow: -1px 2px 2px #333;
        }
    //   }
    // }
  }*/
.game_25 {
  > span:nth-child(1) {
    font-size: 0.55rem !important;
    // color: #333!important;
  }
  > span {
    font-size: 0 !important;
    // color: #333!important;
  }
  .color_01 {
    background: url("@{public_img}/images/xync_1.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_02 {
    background: url("@{public_img}/images/xync_2.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_03 {
    background: url("@{public_img}/images/xync_3.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_04 {
    background: url("@{public_img}/images/xync_4.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_05 {
    background: url("@{public_img}/images/xync_5.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_06 {
    background: url("@{public_img}/images/xync_6.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_07 {
    background: url("@{public_img}/images/xync_7.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_08 {
    background: url("@{public_img}/images/xync_8.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_09 {
    background: url("@{public_img}/images/xync_9.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_10 {
    background: url("@{public_img}/images/xync_10.png") no-repeat !important;
    background-size: 100% 100% !important;
  }

  .color_11 {
    background: url("@{public_img}/images/xync_11.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_12 {
    background: url("@{public_img}/images/xync_12.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_13 {
    background: url("@{public_img}/images/xync_13.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_14 {
    background: url("@{public_img}/images/xync_14.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_15 {
    background: url("@{public_img}/images/xync_15.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_16 {
    background: url("@{public_img}/images/xync_16.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_17 {
    background: url("@{public_img}/images/xync_17.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_18 {
    background: url("@{public_img}/images/xync_18.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_19 {
    background: url("@{public_img}/images/xync_19.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_20 {
    background: url("@{public_img}/images/xync_20.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
}
.clj {
  position: absolute;
  right: 0.5rem;
  top: 50%;
  margin-top: -0.2rem;
  width: 0.4rem !important;
  height: 0.4rem !important;
  border-bottom: 1px solid #a39898;
  border-left: 1px solid #a39898;
  transform: rotate(-135deg);
}
.game_88 {
  > span {
    width: 1rem !important;
    height: 1rem !important;
    border: none !important;
    border-radius: 0 !important;
  }
  > span:nth-child(1) {
    width: 1.4rem !important;
    text-shadow: none !important;
    color: #666666 !important;
  }
  .color_1 {
    background: url("../../../wap/images/sia1.png") no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_2 {
    background: url(../../../wap/images/sia2.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_3 {
    background: url(../../../wap/images/sia3.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_4 {
    background: url(../../../wap/images/sia4.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_5 {
    background: url(../../../wap/images/sia5.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
  .color_6 {
    background: url(../../../wap/images/sia6.png) no-repeat !important;
    background-size: 100% 100% !important;
  }
}

.game_30 {
  > .clg2_01,
  .clg2_02,
  .clg2_03,
  .clg2_04,
  .clg2_05,
  .clg2_06,
  .clg2_07,
  .clg2_08,
  .clg2_09,
  .clg2_10,
  .clg2_11,
  .clg2_12,
  .clg2_13,
  .clg2_14,
  .clg2_15,
  .clg2_16,
  .clg2_17,
  .clg2_18 {
    background: #146cdc !important;
    border: 1px solid #666666;
  }
  > .clg2_20,
  .clg2_19 {
    background: #f24d2f !important;
  }
}
</style>
