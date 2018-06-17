<template lang="html">
    <div class="">
        <i-header title="活动中心" v-if='!isAndroidWebview' class="activity-header"></i-header>
        <div style="height:46px"></div> 
        <ul class="top_1">
           <li v-for='(item,index) in activet'>
              <a v-if="item.ptype == 0" @click="goPath(item)" >
                <div  >
                  <img  :src="item.wap_titleImg" alt="">
                  <span>{{item.title}}</span>
                </div>
              </a>
              <a v-else-if="item.ptype == 1 || item.ptype == 4|| item.ptype == 3" @click="gotoAddress(item.route_path)" >
                <div  >
                  <img  :src="item.wap_titleImg" alt="">
                  <span>{{item.title}}</span>
                </div>
              </a>
            </li>
        </ul> 
    </div>
</template>
<script>
import iHeader from "../../components/j-header";
export default {
  data() {
    return {
      api: "",
      activet:'',
      isAndroidWebview: location.href.indexOf("?") > -1 ? true : false,
      // activet: [
      //   {
      //     link: "",
      //     image: "",
      //     text: ""
      //   },
      //   {
      //     link: "",
      //     image: "",
      //     text: ""
      //   },
      //   {
      //     link: "",
      //     image: "",
      //     text: ""
      //   },
      //   {
      //     link: "",
      //     image: "",
      //     text: ""
      //   },
      //   {
      //     link: "",
      //     image: "",
      //     text: ""
      //   }
      // ],
      is_gd_ali: window.is_gd_ali()
    };
  },
  components: {
    iHeader
  },
  methods: {
    gotoAddress(path) {
      this.$router.push(path);
    },
    goPath(path){
      this.$router.push({path:'activityall',query:{title:path.title,bg:path.wap_bgimg}})
    },
  },
  created() {
    //各家活动
    let params = {}
    params.client = 2;
    this.$http.post(`${getUrl()}/Promotion/getPromotionList`,JSON.stringify(params)).then(res => {
      this.activet = res.data;
    })
    this.api = getUrl();
  }
};
</script>

<style lang='less' rel="stylesheet/less" scoped>
.activity-header{
  position:fixed;
  width: 100%;
}
.top_1 {
  margin: 0.5rem auto;
  display: flex;
  flex-wrap: wrap
}
.top_1 li{
  width: 50%;
  padding: 0 10px;
  margin-bottom: 10px;
}
.top_1 li a{
  display: block;
  
  background: #e4e4e4;
  border-radius:0.3rem;
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
  height: 0.85333333rem
}
</style>
