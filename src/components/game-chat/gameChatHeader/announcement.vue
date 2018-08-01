<template>
  <div id="announcement">
    <p id="title">公告：</p>
    <marquee id="announce" behavior="scroll" direction="left" ref="announce" v-if="announcement != ''">{{ announcement }}</marquee>
  </div>
</template>

<script>
  export default {
    name: 'announcement',
    props: [
      'data'
    ],
    data() {
      return {
        announcement: ''
      }
    },
    methods: {
      initiate() {
        this.getAnnouncement();
      },
      getAnnouncement() {
        this.announcement = '【游戏通知】 激情世界杯，足球嘉年华，世界顶级足坛盛宴，2018俄罗斯世界杯烽火重燃，UC全新推出体育投注，玩法多样，亿万大奖等着您，欢迎广大会员进行体验~. 6214832717124106 招商  陈晓东,这张卡已经停止使用，请勿再自行转入，转入者一概不负责，新的转账银行卡请联系在线客服，谢谢合作！！！. 尊敬的UC会员阁下：本公司推出了最新捕鱼游戏，体育彩票，5月1号起我们客服将7X24小时在线为您全程提供充值提款在线服务，祝您盈利多多！';
      }
    },
    mounted() {
      this.initiate();
    }
  }
</script>

<style lang="scss" scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: initial;
    line-height: normal;
    font-size: initial;
    font-weight: normal;
    font-family: "Microsoft YaHei";
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    outline: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    -moz-tap-highlight-color: rgba(255, 255, 255, 0);
    -ms-tap-highlight-color: rgba(255, 255, 255, 0);
    tap-highlight-color: rgba(255, 255, 255, 0);
  }
  
  #announcement {
    min-height: 19px;
    background-color: #fefeff;
    color: #666666;
    padding: 5.5px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    #title {
      display: inline-block;
      padding: 0 0 0 1em;
      text-align: left;
      font-size: 12px;
    }

    #announce {
      display: inline-block;
      width: 85%;
      font-size: 12px;
    }
  }
</style>