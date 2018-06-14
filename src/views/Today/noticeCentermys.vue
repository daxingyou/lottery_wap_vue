<template>
  <div>
  	<div>
    	<i-header title="消息详情"></i-header>
  	</div>
  	<div>
  		<div class="noticeCenter">
  			<span>{{$store.state.stationLetter.data&&getLocalTime($store.state.stationLetter.data.response[routeZindex].createdTime)}}</span><i v-if="routeZindex==0">NEW</i>
  			<h3>{{wentitle}}</h3>
  		</div>
  		<p class="ne" style="width: 94%;margin: 0.8rem auto;line-height: 1rem;text-align: justify;">{{$store.state.stationLetter.data&&$store.state.stationLetter.data.response[routeZindex].message}}</p>
  	</div>
  </div>
</template>
<script>
import iHeader from "../../components/i-header";
export default {
  data: function() {
    return {
      is_gd_ali: is_gd_ali(),
      annousments: [],
      wentitle: ""
    };
  },
  components: {
    iHeader,
    routeZindex: "",
    annousments: ""
	},
	methods:{
		//过滤分秒
    p(s) {
      if (s <= 0) {
        return `00`;
      } else if (s > 0 && s < 10) {
        return `0${s}`;
      } else {
        return s;
      }
    },
    getLocalTime(nS) {
      let time = new Date(parseInt(nS) * 1000);
      let year = time.getFullYear();
      let month = time.getMonth() + 1;
      let date = time.getDate();
      month = this.p(month);
      date = this.p(date);
      let time_split = time.toLocaleTimeString().split(":");
      let time_a = `${time_split[0]}:${time_split[1]}`;
      return `${year}-${month}-${date}`;
    }
	},
  created() {
    this.routeZindex = this.$route.params.index.split(":")[1]; //noticeCenter传过来的支付方式的参数
    console.log(this.annousments);

    if (this.is_gd_ali == "ali") {
      this.wentitle = "WELCOME TO ALI LOTTERY";
    } else if (this.is_gd_ali == "gd") {
      this.wentitle = "WELCOME TO GD LOTTERY";
    } else if (this.is_gd_ali == "lv") {
      this.wentitle = "WELCOME TO CT LOTTERY";
    } else if (this.is_gd_ali == "uc") {
      this.wentitle = "WELCOME TO UC LOTTERY";
    } else if (this.is_gd_ali == "ly") {
      this.wentitle = "WELCOME TO LEYING LOTTERY";
    } else if (this.is_gd_ali == "fh") {
      this.wentitle = "WELCOME TO 668 LOTTERY";
    }
  }
};
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import "../../assets/less/variable.less";
.noticeCenter {
  width: 94%;
  margin: 0 auto;
  padding-top: 30/46.875rem;
  padding-bottom: 15/46.875rem;
  border-bottom: 1px solid #e5e5e5;
  > span {
    color: #b6b6b6;
  }
  > i {
    background-color: #ef9836;
    color: #ffffff;
    border-radius: 0.1rem;
    width: 70/46.875rem;
    height: 35/46.875rem;
    font-size: 12px;
    display: inline-block;
    text-align: center;
    margin-left: 15/46.875rem;
  }
  > h3 {
    margin: 0;
    margin-top: 0.2rem;
  }
}
.ne {
  font-size: 0.7rem;
  color: #282828;
}
</style>
