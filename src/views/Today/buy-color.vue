<template>
  <!--当新用户或者没选择门店用户进来时  会让选择默认门店-->
  <div>
    <div>
      <i-header title="未结明细"></i-header>
    </div>
    <div class="midd">
      <div class="cen2" v-for="groups in finished">
        <p class="my_1">注单号：{{groups.no}}
          <span>{{groups.time}}</span>
        </p>
        <div>
          <p>{{groups.game_name}} 第<span>{{groups.round}}</span>期</p>
          <p>玩法：{{groups.detail}}</p>
          <p>下注金额：{{groups.money}}</p>
          <p>可赢金额：{{groups.win_money}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import iHeader from '../../components/i-header'
//  import {getOid,getUrl} from '../../api'
  export default {

    data() {
      return {
        finished:{}
      }
    },
    methods: {
      initData(){
        let prams = {};

        let oidinfo = sessionStorage.getItem('im_token');
        prams.oid = oidinfo;
        this.$http.post(`${getUrl()}/getinfo/bet`,JSON.stringify(prams)).then(res => {
        	if(res.data.msg=='4003'){
	        		this.$router.push({
	            	path: '/weihu'
	          })
	        }
          if(res.data.msg==4001){
             sessionStorage.clear();
			this.panelShow = true;
	      	this.promptboxtext = "您的账户已失效，请重新登录";
	        setTimeout(() => {
	          	this.panelShow = false;
	          	this.$router.push({
	            	path: '/login'
	          	})
	          },1000)
          }
          this.finished=res.data[0].res

        })
      }
    },
    created() {
      this.initData();
      // 先判断是否选择了门店 没有就跳转到appointmentShop
      // if()
    },
    components: {
      iHeader
    }
  }
</script>
<style>
@import '../../assets/less/variable.less';
  .midd{
    padding:0.5rem;
  }

  .cen2{
    background:#fff;
    border-radius:5px;
    margin-bottom:10px;
  }
  .cen2 > p{
    /*background:url(../../../wap/images/blue.png);*/
    background: #929292;
    color:#fff;
    height:1.8rem;
    border-radius:5px 5px 0 0;
    padding:10px;
    overflow:hidden;
    font-size:0.7rem;
  }
  .cen2 > p span{
    float:right;
    font-size:14px;
  }
  .cen2 > div{
    margin-left:20px;
    padding-bottom:3px;
  }
  .cen2 > div p{
    margin:3px;
    font-size:15px;
    color:#7B838F;
  }
  .cen2 > div p > span{
    font-size:15px;
  }
  .cen2 > div p:last-child span{
    color:#115FDD;
  }
</style>
