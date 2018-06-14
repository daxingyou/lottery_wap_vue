<template>
  <div class="container" id="contain">

    <div class="title"  v-if="!isAndroidWebview">
      <i @click="goBack()"></i> 每日投注赢大奖
    </div>
    <div class="content" ref="content"  :style="{'margin-top':isAndroidWebview ? '0rem':'1.92rem'}">
      <div class="time">2017-12-20</div>
      <h2 class="ctitle">每日投注赢大奖</h2>
      <div>
        <img src="../../../wap/images/a1.jpg" width="100%" height="auto"/>
      </div>
      <div>
        <h4>活动形式</h4>
        <p>抽奖活动</p>
      </div>
      <div>
        <h4>奖品</h4>
        <p>2彩金</p>
        <p>8彩金</p>
        <p>38彩金</p>
        <p>88彩金</p>
        <p>188彩金</p>
        <p>588彩金</p>
        <p>Iphone 8</p>
        <p>抽到彩金奖项会自动派奖到会员账户</p>
      </div>
      <div style="margin-bottom: 20px">
        <h4>活动说明</h4>
        <p>1.活动仅限APP用户可参与。</p>
        <p>2.当天投注100流水以上可参与抽奖，每日一次，中奖几率100%。</p>
        <p>3.每日凌晨05:00充值本活动。</p>
        <p>4.奖品iphoneX，颜色随机，奖品将在抽奖后一周内送出。</p>
        <p>5.若存在任何形式套利【彩投彩票】有权没收获得奖励并取消活动资格。</p>
        <p>6.活动将于2018年1月1日开放，截止时间2018年1月31日。</p><

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'activity1',
    mounted(){
    },
    data(){
      return {
         isAndroidWebview: location.href.indexOf('?') > -1 ? true : false,
         
      }
    },
    methods: {
      goBack(){
        history.go(-1);
      }
    }
  }
</script>

<style lang='less' rel="stylesheet/less" scoped>
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
  }

  .title i {
    display: inline-block;
    width: 90/46.875rem;
    height: 90/46.875rem;
    background: url('@{public_img}/images/backing_out.png') no-repeat center center;
    position: absolute;
    left: 0;
    top: 0;
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
    font-size: 14/46.875rem;
  }
</style>
