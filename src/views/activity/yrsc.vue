<template>
  <div class="container" id="contain">
     <div class="title" v-if="!isAndroidWebview">
      <i @click="goBack()"></i>
      <span>首存送大礼</span>
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <h2 class="ctitle">首存优惠送大礼</h2>
      <div>
        <h4>首存优惠一:</h4>
      	 <table cellpadding='0' cellspacing="0">
      	 	<tr>
      	 		<th>存款金额</th>
      	 		<th>赠送金额</th>
                <th>流水金额</th>
      	 	</tr>
      	 	<tr>
      	 		<td>100+</td>
      	 		<td>18</td>
                <td>一倍流水</td>
      	 	</tr>
      	 	<tr>
      	 		<td>500+</td>
      	 		<td>38</td>
                <td>一倍流水</td>
      	 	</tr>
               <tr>
      	 		<td>1000+</td>
      	 		<td>58</td>
                <td>一倍流水</td>
      	 	</tr>
               <tr>
      	 		<td>5000+</td>
      	 		<td>188</td>
                <td>一倍流水</td>
      	 	</tr>
               <tr>
      	 		<td>10000+</td>
      	 		<td>388</td>
                <td>一倍流水</td>
      	 	</tr>
            <tr>
      	 		<td>50000+</td>
      	 		<td>588</td>
                <td>一倍流水</td>
      	 	</tr>
               <tr>
      	 		<td>100000+</td>
      	 		<td>1888</td>
                <td>一倍流水</td>
      	 	</tr>
             <tr>
      	 		<td>300000+</td>
      	 		<td>3888</td>
                <td>一倍流水</td>
      	 	</tr>
                <tr>
      	 		<td>500000+</td>
      	 		<td>6888</td>
                <td>一倍流水</td>
      	 	</tr>
                <tr>
      	 		<td>1000000+</td>
      	 		<td>9888</td>
                <td>一倍流水</td>
      	 	</tr>
      	 </table>
      	 <p>（例如：会员首次存款1000元，申请首存Ⅰ活动，可获得1000（本金）+58（彩金）=1058，会员在有总效投注达到1058X1=1058后可申请提款）</p>
        <h4 style="margin-top:1.5rem">首存优惠二:</h4>
      	  <table cellpadding='0' cellspacing="0" style="margin-top: 1rem;">
      	 	<tr>
      	 		<th>存款金额</th>
      	 		<th>优惠百分比</th>
      	 		<th>最高优惠</th>
                <th>有效投注要求</th>
      	 	</tr>
      	 	<tr>
      	 		<td>500以上+</td>
      	 		<td>100%</td>
      	 		<td>888</td>
                <td>18倍</td>
      	 	</tr>
      	 </table>
           <p>（例如：会员首次存款500，申请此活动，可获得彩金500+本金500=1000，会员在有效总投注达到1000×18+彩金= 18000后可申请提款）</p>
      </div>
      <div>
        <h4 style="margin-top:1rem;">申请方式 </h4>
        <p>符合申请条件的会员请在（存款成功）后“未下注”前联系【24小时在线客服】申请，若会员存款后“已下注”游戏，则视为自动放弃此优惠，不得争议。</p>
        <h4 style="margin-top:1rem;">首存细致</h4>
        <p>此活动只合适首存存款到（亿人彩票网）且未进行投注的会员，且必须存款成功后24小说内向【在线客服】申请。逾期视为自动放弃，审核通过后系统将在15分钟内将优惠金额存入您的会员账号内；会员可以自由选择活动方案（首存优惠Ⅰ、首存优惠Ⅱ）中任何一个方案；</p>
        <p>流水计算方式：（存款金额+回馈彩金）*相应的流水倍数=提款需达到的最低有效投注；</p>
        <p>参与此优惠，即表示您同意《一般优惠规则与条款》</p>
        <h4 style="margin-top:1rem;">优惠规则与条款</h4>
        <p>1.所有优惠以人民币（CNY）为结算金额，以北京时间(UTC+8)为计时区间。</p>
        <p>2.每位玩家.每户.每一住址.每一电子邮箱地址.每一电话号码.相同支付方式（相同借记卡/信用卡/银行账户）及IP地址只能享有一次优惠；若会员有重复申请账号行为，公司保留取消或收回会员优惠彩金的权利。</p>
        <p>3.亿人彩票的所有优惠特为玩家而设，如发现任何团体或个人，以不诚实方式套取红利或任何威胁、滥用公司优惠等行为，公司保留冻结、取消该团体或和人账户结余的权利。</p>
        <p>4.若会员对活动有争议时，为确保双方利益，杜绝身份盗用行为，亿人彩票有权要求会员向我们提供充足有效的文件，用以确认是否享有该优惠的资质。</p>
        <p>5.当参与优惠会员未能完全遵守、或违反、或滥用任何有关公司优惠或推广的条款，又或我们有任何证据有任何团体或个人投下一连串的关联赌注，籍以造成无论赛果怎样都可以确保可以从该存款红利或其他推广活动提供的优惠获利，亿人彩票保留权利向此团队或个人停止、取消优惠或索回已支付优惠红利。此外，公司亦保留权利向这些客户扣取相当于优惠红利价值的行政费用，以补偿我们的行政成本。</p>
        <p>6.亿人彩票保留对活动的最终解释权；以及在无通知的情况下修改、终止活动的权利；</p>
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
    background:#c33949 !important;
    line-height: 90/46.875rem;
    text-align: center;
    /*position: fixed;*/
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
			margin: 0.5rem;
			h4{
				font-size: 0.75rem;
			}
			table{
		  	width: 100%;
		  	margin-top: 0.5rem;
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
  	padding: 0.2rem;
  }
  td{
  	text-align: center;
  	border: 1px solid #7C7C7C;
  }
</style>
