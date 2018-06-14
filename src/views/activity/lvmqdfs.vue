<template>
  <div class="container" id="contain">
     <div class="title" v-if="!isAndroidWebview">
      <i @click="goBack()"></i>
      <span>满勤大放送</span>
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <div>
        <h4>活动内容:</h4>
         <span>彩投网倾情回馈，周每日存款和周总打码两者全部满足条件，领取对应满勤奖励！</span>
      	 <table cellpadding='0' cellspacing="0">
      	 	<tr>
      	 		<th>单日存款</th>
      	 		<th>周有效打码量</th>
      	 		<th>满勤奖金</th>
      	 	</tr>
      	 	<tr>
      	 		<td>1000</td>
      	 		<td>7万</td>
      	 		<td>88</td>
      	 	</tr>
      	 	<tr>
      	 		<td>5000</td>
      	 		<td>35万</td>
      	 		<td>288</td>
      	 	</tr>
      	 	<tr>
      	 		<td>10000</td>
      	 		<td>75万</td>
      	 		<td>588</td>
      	 	</tr>
      	 	<tr>
      	 		<td>300000</td>
      	 		<td>250万</td>
      	 		<td>1088</td>
      	 	</tr>
      	 	<tr>
      	 		<td>500000</td>
      	 		<td>500万</td>
      	 		<td>3000</td>
      	 	</tr>

      	 </table>
      	  <p style="margin-top: 1.5rem;">活动对象：彩投彩票网所有新老会员</p>
      	  <p>活动日期：2月1日00:00-2月28日24:00</p>
      	  <p>申请时间：每周一00:00-24:00，领取上周活动奖金</p>
      	  <p>申请方式：点击在线客服或添加QQ客服：198866662，【发送会员账号+活动名称（满勤大放送）】，专员收到请求后，会在10分钟内为您添加</p>
      </div>
      <div style="margin-top: 1rem;">
        <p>活动规则（本次活动仅适用于全平台所有游戏）：</p>
        <p>1、本次优惠活动即日起生效，优惠活动适用于彩投彩票全体会员。</p>
        <p>2、每位会员只可拥有一个账号申请该项优惠，同IP、同提款银行卡均视为同一客户。如发现上述情况，重复领取彩金立即冻结该账号。</p>
        <p>3、所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁，滥用公司优惠等行为，公司保留冻结，取消该团体或个人账户结余的权利。</p>
        <p>4、若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，彩投彩票有权要求会员向我们提供充足有效文件，以确认是否享有该优惠的资质。</p>
        <p>5、彩投彩票保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利；适用于所有优惠活动。</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity1',
    mounted(){
      let _w = window.innerWidth;
      let _zoom = _w / 750;
      let ctn = document.getElementById('contain');
//    ctn.style.transform = 'scale(' + _zoom + ')';
//    ctn.style.transformOrigin = '0 0 0';
      //安卓 ?platform=andriodWebview
      if(this.isAndroidWebview){
        this.$refs.content.style.marginTop = '20px';
      }
    },
    data(){
      return {
        isAndroidWebview: location.href.indexOf('?') > -1 ? true : false
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
.container {
    padding: 0;
    margin: 0;
    width: 100%;
  }
  .title{
    width: 100%;
    height: 90/46.875rem;
    background:#146cdc !important;
    line-height: 90/46.875rem;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    >i{
    	display: block;
	    width: 35/46.875rem;
	    height: 50/46.875rem;
	    background: url('@{public_img}/images/backing_out.png') no-repeat;
	    background-size:100% 100%;
	    position: absolute;
	    left: 0.5rem;
	    top: 0.4rem;
	    }
	   >span{
	   	color: #FFFFFF;
	   	font-size: 0.8rem;
	   }
	  }
  .content {
    width: 100%;
    margin-top:90/46.875rem;
    .time{
		    font-size: 0.6rem;
		    color: #999;
		    padding-top: 0.2rem;
		    margin: 0.5rem;
		    margin-bottom: 0.1rem;
		  }
		>h2{
			font-size: 0.7rem;
	    border-bottom: 1px solid #ccc;
	   	margin: 0.5rem;
	   	margin-top: 0.1rem;
	   	padding: 0;
		}
		>div{
			margin: 0 0.5rem;
			h4{
				font-size: 0.7rem;

			}
			table{
		  	width: 100%;
		  	margin: 0.3rem 0;
		  }
		  p{
		  	font-size: 0.6rem;
		  	line-height: 1rem;
		  }
		}
  }


  tr{
  	width: 100%;
  }
  th{
  	text-align: center;
  	padding: 0.1rem;
  	border: 1px solid #7C7C7C;
  }
  td{
  	text-align: center;
  	border: 1px solid #7C7C7C;
  }
</style>
