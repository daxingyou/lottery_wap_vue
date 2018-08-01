<template>

  <div id="app">
    <!--<div class='view'>-->
      <div style="width:100%; height: 1rem; position: fixed; top:0; left:0; background: red; z-index: 111;" :style="{background: is_gd_ali ? '#146cdc': '#e60d39'}" v-if="isIosWebview&hideTop">
      </div>
      <router-view class="child-view" :style="{top: isIosWebview ? '1rem' : 0}"></router-view>
    <!--</div>-->
  </div>
</template>

<script>
import URLParams from './utils/URLParams'
export default {
  data() {
    return {
      is_gd_ali: is_gd_ali(),
      isIosWebview: window.isIosWebview,
      hideTop: location.href.split("?"),
      bottomNav: "movies",
      bottomNavColor: "movies",
      transitionName: "slide-left" // 动画
    };
  },
  methods: {
    handleChange(val) {
      this.bottomNav = val;
    },
    // 切换动画
    tooge() {
      if (this.goBack) {
        // 如果状态是false 那么是后退
        this.transitionName = "slide-right";
        this.$store.dispatch("noBack");
      } else {
        this.transitionName = "fade";
      }
    }
    },
  created() {
    // 有一定概率取不到this.$route.query.promotionId，所以需要用到URLParams
    if (URLParams.promotionId && !sessionStorage.getItem("promotionId")) {
      sessionStorage.setItem("promotionId", URLParams.promotionId);
    }
  },
  watch: {
    $route(to) {
      this.tooge();
      // 去掉  '/'

      var path = to.path.substring(1);
      // this.footerChange(path)
      setTimeout(() => {
        document.body.scrollTop = 0;
      }, 25);
    }
  }
};
</script>

<style>
@import "./icon/iconfont.css";
@import "./assets/css/common.css";
</style>

<style lang="less" rel="stylesheet/less">
.view{
  height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}
// 动画
.child-view {
  display: flex;
  flex-direction: column;
  /*position: absolute;*/
  width: 100%; // transition: all .3s cubic-bezier(.55, 0, .1, 1);
  /*height: 100vh;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;*/
  /*margin-top: 0.6rem;*/
}

/*动画*/

.fade-enter-active {
  // transition: opacity 0.05s;
}

.fade-enter,
.fade-leave-active {
  // opacity: 0;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  -webkit-transform: translate(300px, 0);
  transform: translate(300px, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  // opacity: 0;
  -webkit-transform: translate(-50px, 0);
  transform: translate(-50px, 0);
}

#app {
  height: 100%;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
}

@color: #d1506d;
.mu-appbar {
  background: #fff;
  color: @color;
  height: 46px;
}

.view-tabs {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  > .mu-tab-link {
    color: rgba(102, 102, 102, 1);
  }
  > .mu-tab-active {
    color: @color;
  }
}
</style>
