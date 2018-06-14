<template>
  <div class="container" id="contain">
     <div class="title" v-if="!isAndroidWebview">
      <i @click="goBack()"></i>
      <span>一送在送，优惠不停</span>
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <div class="time">2017-11-30</div>
      <h2 class="ctitle">会员首次充值后，未有投注，联系在线客服申请，即可到账</h2>
      <div class="ads1">
      </div>
      <div>
        <h4>活动详情:</h4>
      	 <table cellpadding='0' cellspacing="0">
      	 	<tr>
      	 		<th>存款金额</th>
      	 		<th>赠送比例</th>
      	 		<th>流水倍数</th>
      	 		<th>最高彩金</th>
      	 	</tr>
      	 	<tr>
      	 		<td>首存100+</td>
      	 		<td>50%</td>
      	 		<td>18</td>
      	 		<td>888</td>
      	 	</tr>
      	 	<tr>
      	 		<td>二存500+</td>
      	 		<td>30%</td>
      	 		<td>13</td>
      	 		<td>1588</td>
      	 	</tr>
      	 </table>
      	  <p>该活动无法参与ag游戏，若参加ag游戏将扣除盈利</p>
      	  <h4>流水计算:</h4>
      	  <span>例如，首存500元，申请首存活动，可获得彩金500+250=750元，会员有效总投注量达到750*18=13500后可申请提款</span>
      	  <table cellpadding='0' cellspacing="0" style="margin-top: 0.2rem;"> 
      	 	<tr>
      	 		<th>存款金额</th>
      	 		<th>赠送彩金</th>
      	 		<th>流水倍数</th>
      	 	</tr>
      	 	<tr>
      	 		<td>100+</td>
      	 		<td>18</td>
      	 		<td>1倍</td>
      	 	</tr>
      	 	<tr>
      	 		<td>500+</td>
      	 		<td>28</td>
      	 		<td>1倍</td>
      	 	</tr>
      	 	<tr>
      	 		<td>1000+</td>
      	 		<td>38</td>
      	 		<td>1倍</td>
      	 	</tr><tr>
      	 		<td>3000+</td>
      	 		<td>58</td>
      	 		<td>1倍</td>
      	 	</tr>
      	 	<tr>
      	 		<td>5000+</td>
      	 		<td>88</td>
      	 		<td>1倍</td>
      	 	</tr>
      	 	<tr>
      	 		<td>10000+</td>
      	 		<td>188</td>
      	 		<td>1倍</td>
      	 	</tr>
      	 </table>
      	 <div style="width: 75%;margin: 0 auto;background-color: #0112FE;color: white;text-align: center;border-radius:2rem;height: 1.2rem;line-height: 1.2rem;">活动一与活动二任选其一参加，不可同时参加</div>
      </div>
      <div>
        <h4>活动规则:</h4>
        <p>1:首存活动每个会员只能领取一次，无法与其他首存活动共享</p>
        <p>2:活动一和活动二只可选择其一参加，无法同时参加</p>
        <p>3:彩投网会员重复申请账号时，本娱乐城保留取消、收回会员优惠彩金的权利，甚至没收会员账户余额的权利，每一位玩家、每一个地址、每一个电子邮箱、每一个电话号码、相同的支付卡/信用卡号码，同一IP，以及共享电脑环境（例如网吧，其他公用电脑等）只能申请一次相关优惠</p>
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
  	padding: 0.2rem;background-color: #FE0000;
  	color: #FFFFFF;
  }
  td{
  	text-align: center;
  	border: 1px solid #7C7C7C;
  }
</style>
