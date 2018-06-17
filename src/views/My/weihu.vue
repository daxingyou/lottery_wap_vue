<template>
  <div>
      <div class="weihu">
          <p class="wz">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{tex}}</p>
          <div class='main_weu'>
            <p>开始时间:{{stat}}</p>
            <p>结束时间:{{end}}</p>
          </div>
      </div>
  </div>
</template>

<script>
  export default {
    data(){
      return{
        tex:"",
        stat:"",
        endL:""
      }
    },
    created(){
      this.weihu();
    },
    methods:{
      weihu(){
        this.$http.post(`${getUrl()}/getinfo/getMissedOrHasClosedBet`).then(res => {
          this.tex = res.data.info;
          this.stat = res.data.begin;
          this.end = res.data.end
          console.log(this.tex)
          console.log(this.stat)
          console.log(this.end)
        })
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.main_weu{
  margin-top:13rem;
  margin-left:1.5rem;
  color:red;
}
.main_weu p{
  margin-top:.5rem;
}
.weihu{
    background:url("../../../wap/images/weihu_bj.jpg");
    background-size:100% 100%;
    height:28rem;
}
.wz{
    padding:1.5rem;
    font-size:.6rem;
    position: relative;
    top:13rem;
}
</style>
