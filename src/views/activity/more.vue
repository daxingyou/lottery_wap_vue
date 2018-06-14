<template lang="html">
    <div class="">
        <i-header title="活动中心" v-if='!isAndroidWebview' class="activity-header"></i-header>
        <div style="height:46px"></div> 
        <ul class="top_1">
           <li v-for='item in activityList'>
              <a @click="gotoAddress(`${item.link.split('#')[1]}`)" >
            <div  >
                <img  :src="item.imageurl" alt="">
                <span>{{item.title}}</span>
            </div>
            </a>
           </li>
        </ul> 
    </div>
</template>
<script>
import iHeader from "../../components/j-header";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      api: "",
      isAndroidWebview: location.href.indexOf("?") > -1 ? true : false,
      activityList: []
    };
  },
  components: {
    iHeader
  },
  methods: {
    ...mapActions(["GET_ACTIVITY_DATA"]),
    gotoAddress(path) {
      this.$router.push(path);
    }
  },
  created() {
    this.GET_ACTIVITY_DATA().then(res => {
      this.activityList = res.data.response
    });
  }
};
</script>

<style lang='less' rel="stylesheet/less" scoped>
.activity-header {
  position: fixed;
  width: 100%;
}
.top_1 {
  margin: 0.5rem auto;
  display: flex;
  flex-wrap: wrap;
}
.top_1 li {
  width: 50%;
  padding: 0 10px;
  margin-bottom: 10px;
}
.top_1 li a {
  display: block;

  background: #e4e4e4;
  border-radius: 0.3rem;
  overflow: hidden;
}
.top_1 div img {
  width: 100%;
  // border-radius: 0.3rem 0.3rem 0 0;
}
.top_1 div span {
  border-top: none;
  width: 100%;
  color: #333;
  display: inline-block;
  text-align: center;
  height: 0.85333333rem;
}
</style>
