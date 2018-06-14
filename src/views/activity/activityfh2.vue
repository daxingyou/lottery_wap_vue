<template>
  <div class="container" id="contain">
     <div class="title" v-if="!isAndroidWebview" >
      <i @click="goBack()"></i>
      <span>周周有奖，活动乐翻天</span>
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <div class="time">2017-11-30</div>
      <!--<h2 class="ctitle">会员首次充值后，未有投注，联系在线客服申请，即可到账</h2>-->
      <div class="ads1">
      </div>
      <div>
        <h4>活动一:签到活动</h4>
      	 <table cellpadding='0' cellspacing="0">
      	 	<tr>
      	 		<th>每周存款</th>
      	 		<th>2000</th>
      	 		<th>5000</th>
      	 		<th>10000</th>
      	 		
      	 		<th>30000</th>
      	 		<th>50000</th>
      	 		<th>120000</th>
      	 	</tr>
      	 	<tr>
      	 		<td>奖金</td>
      	 		<td>38</td>
      	 		<td>88</td>
      	 		<td>128</td>
      	 		<td>258</td>
      	 		<td>388</td>
      	 		<td>688</td>
      	 	</tr>
      	 	
      	 </table>
      	  <h4>活动二:返利优惠，仅限高频彩</h4>
      	 
      	  <table cellpadding='0' cellspacing="0" style="margin-top: 0.2rem;"> 
      	 	<tr>
      	 		<th>周负盈利</th>
      	 		<th>2000-30000</th>
      	 		<th>30001-100000</th>
      	 		<th>100001+</th>
      	 	</tr>
      	 	<tr>
      	 		<td>返利金额</td>
      	 		<td>2%</td>
      	 		<td>3%</td>
      	 		<td>4%</td>
      	 	</tr>
      	 </table>
      	 <div style="width: 75%;margin: 0 auto;background-color: #0112FE;color: white;text-align: center;border-radius:2rem;height: 1.2rem;line-height: 1.2rem;">活动一与活动二可同时参加，一并领取</div>
      </div>
      <div>
        <h4>活动规则:</h4>
        <p>1:本周游戏天数≥5日，未满足条件，系统无法添加</p>
        <p>2:领取时间：每周一12:00-21:00，其余时间不予受理</p>
        <p>3:彩投网会员重复申请账号时，本娱乐城保留取消、收回会员优惠彩金的权利，甚至没收会员账户余额的权利，每一位万家、每一个地址、每一个电子邮箱、每一个电话号码、相同的支付卡/信用卡号码，同一IP，以及共享电脑环境（例如网吧，其他公用电脑等）只能申请一次相关优惠</p>
        <p>4:任何对冲对打投注不计，未接受注单/赛果为平的注单不计。在真人娱乐/彩票游戏/无风险投注不计。无风险投注包括在百家乐同时投注庄家、闲家、任何取消注单赛事或局数不计</p>
        <p>5:彩投保留所有权利在任何时候更改、停止、取消优惠活动</p>
       
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
		  	font-size:0.65rem;
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
  	border: 1px solid #7C7C7C;
  	padding: 0.05rem;
  	background-color: #FE0000;
  	color: #FFFFFF;
  	
  }
  td{
  	text-align: center;
  	border: 1px solid #7C7C7C;
  }
</style>
