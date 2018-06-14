<template>
  <div class="container" id="contain">
    <div class="title color1"  v-if="!isAndroidWebview">
      <i @click="goBack()"></i>签到送豪礼
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <div class="time">2017-11-16</div>
      <h2 class="ctitle">连续签到送豪礼</h2>
      <div>
        <img src="../../../wap/images/a2.jpg" width="100%" height="auto"/>
      </div>
      <div>
        <h4>签到活动</h4>
        <p>签到每天送2彩金</p>
        <p>连续签到&nbsp;&nbsp;7天 赠送20彩金</p>
        <p>连续签到14天 赠送30彩金</p>
        <p>连续签到21天 赠送50彩金</p>
        <p>连续签到30天 赠送88彩金</p>
      </div>
      <div style="margin-bottom: 20px">
        <h4>活动说明</h4>
        <p>1.活动仅限APP用户可参与。</p>
        <p>2.每日00:00重置可签到状态。</p>
        <p>3.中断签到或连续签到满30天后将重置已连续签到天数，重新累计。</p>
        <p>4.若存在任何形式套利，【{{titletxt}}】有权没收活动所得奖励并取消活动资格。</p>
        <p>5.活动最终解释权归【{{titletxt}}】所有。</p><br/>
        <p>6.<span style="color: red; font-weight: bold;">即将上线,敬请期待。</span></p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'activity2',
    mounted(){
    },
    data(){
      return {
        isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
        isIosWebview: isIosWebview,
        is_gd_ali: is_gd_ali(),
        titletxt:''
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    },
    created(){
    	if(this.is_gd_ali=='ali'){
    		this.titletxt = '阿理彩票'
    	}else if(this.is_gd_ali=='ali'){
    		this.titletxt = '光大彩票'
    	}else if(this.is_gd_ali=='ly'){
    		this.titletxt = '乐盈彩票'
    	}
    }
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
@import '../../assets/less/variable.less';
  .container {
    padding: 0;
    width: 750/46.875rem;
  }

  .title {
    width: 100%;
    height: 90/46.875rem;
    background: #146cdc;
    display: inline-block;
    line-height: 90/46.875rem;
    text-align: center;
    font-size: 36/46.875rem;
    color: #ffffff;
    position: fixed;
    left: 0;
    top: 0;
  }

  .title i {
    display: inline-block;
    width: 40/46.875rem;
	  height: 40/46.875rem;
    background: url('@{public_img}/images/backing_out.png') no-repeat center center;
    position: absolute;
    left: 0.5rem;
    top: 0.5rem;
  }
  .content p{
    font-size: 28/46.875rem;
  }
  .content{
    width: 100%;
    padding: 0 20/46.875rem;
    margin-top:110/46.875rem;
  }
  .content h2{
    font-size: 32/46.875rem;
    border-bottom: 1px solid #ccc;
    padding-bottom: 20/46.875rem;
    margin-top: 0;
  }
  .content h4 {
    font-size: 30/46.875rem;
    margin: 20/46.875rem 0;
  }
  .time{
    font-size: 24/46.875rem;
    color: #999;
  }

  p {
    font-size: 14/46.875rem;;
  }
</style>
