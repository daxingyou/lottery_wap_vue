<template>
	<div id="sdhdshow">
		<div class="title color1" v-if="!isAndroidWebview">
			<i @click="goBack()"></i>
			<span>彩金好礼送不停</span>
		</div>
		<div id="sdhd" :style="{'margin-top': isAndroidWebview ? 0+'rem': 90/46.875+'rem'}">
			<div class="lingqu">
				<div>
					<span>会员账号:</span>
					<span>{{username}}</span>
				</div>
				<div>
					<span>有效投注:</span>
					<span>{{agtotal}}</span>
				</div>
				<div>
					<span>可领金额:</span>
					<span>{{agmoney}}</span>
				</div>
				<a @click='lingqu'>立即领取</a>
			</div>
		</div>
		<promptbox @panelShow="panelShow=false" :promptsystem="promptsystem" :successshow="successshow" :promptboxshow="promptboxshow" :panelShow="panelShow" :promptboxtext="promptboxtext" :erreocode="erreocode"></promptbox>

	</div>
</template>

<script>
import promptbox from "../../components/promptbox";
export default {
  data() {
    return {
      isAndroidWebview: location.href.indexOf("?") > -1 ? true : false,
      username: this.$store.state.userData.username,
      agtotal: "",
      agmoney: "",
      panelShow: false,
      title: "",
      is_gd_ali: is_gd_ali(),
      erreocode: "",
      promptboxtext: "",
      panelShow: false,
      promptboxshow: true,
      successshow: false,
      promptsystem: ""
    };
  },
  components: {
    promptbox
  },
  methods: {
    goBack() {
      history.go(-1);
    },
    lingqu() {
      this.successshow = false;
      if (sessionStorage.getItem("im_isGetBonuses")) {
        this.panelShow = true;
        this.promptboxtext = "您今天已经领取过奖金";
        this.promptboxshow = false;
        return;
      }
      let params = {};
      if (window.location.href.indexOf("?") != -1) {
        let userOid = window.location.href.split("?")[1].split("=")[1];
        params.oid = userOid;
      } else {
        let userOid = this.$store.state.userData.sessionId;
        params.oid = userOid;
      }
      this.$http
        .post(`/AgActivity/getAgReurnAmount`, JSON.stringify(params))
        .then(res => {
          this.panelShow = true;
          this.promptboxtext = "领取成功";
          this.successshow = true;
        });
    }
  },
  created() {},
  mounted() {
    let params = {};
    if (window.location.href.indexOf("?") != -1) {
      let userOid = window.location.href.split("?")[1].split("=")[1];
      params.oid = userOid;
    } else {
      let userOid = this.$store.state.userData.sessionId;
      params.oid = userOid;
    }
    this.$http
      .post(`/AgActivity/christmasAndNewYear2017`, JSON.stringify(params))
      .then(res => {
        if (res.data.isGetBonuses == 0) {
          if (res.data.username == "demo") {
            this.username = "游客";
          } else {
            this.username = res.data.username;
          }
          this.agtotal = res.data.total;
          this.agmoney = res.data.money;
        } else {
          sessionStorage.setItem(
            "im_isGetBonuses",
            JSON.stringify(res.data.isGetBonuses)
          );
        }
      });
  }
};
</script>
<style  lang='less' rel="stylesheet/less"  scoped>
@import "../../assets/less/variable.less";
@zoom: 46.875rem;
.title {
  width: 100%;
  height: 90/46.875rem;
  background: #196fde;
  line-height: 90/46.875rem;
  text-align: center;
  z-index: 4;
  position: fixed;
  left: 0;
  top: 0;
  > i {
    display: block;
    width: 0.6rem;
    height: 0.9rem;
    background: url("@{public_img}/images/backing_out.png") no-repeat;
    background-size: 100% 100%;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  > span {
    color: #ffffff;
    font-size: 0.8rem;
  }
}
#sdhd {
  width: 750 / @zoom;
  height: 2126 / @zoom;
  position: relative;
  > .lingqu {
    width: 690 / @zoom;
    height: 345 / @zoom;
    background: rgba(225, 225, 225, 0.4);
    position: absolute;
    left: 50%;
    top: 24.1rem;
    margin-left: -690/2 / @zoom;
    > div {
      width: 525 / @zoom;
      height: 55 / @zoom;
      margin: 0.5rem auto;
      span:nth-child(1) {
        color: #ffffff;
        line-height: 55 / @zoom;
        display: inline-block;
        height: 55 / @zoom;
        float: left;
        margin-right: 0.2rem;
      }
      span:nth-child(2) {
        display: inline-block;
        width: 300 / @zoom;
        height: 55 / @zoom;
        line-height: 55 / @zoom;
        background: #ffffff;
        border-radius: 0.2rem;
        padding-left: 20 / @zoom;
      }
    }
    a {
      width: 210 / @zoom;
      height: 50 / @zoom;
      display: inline-block;
      background-color: #ff0000;
      color: #ffc600;
      text-align: center;
      margin-left: 5.5rem;
      line-height: 50 / @zoom;
      border-radius: 0.2rem;
    }
  }
}
</style>