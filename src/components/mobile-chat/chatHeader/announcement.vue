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
        this.$http.get(`${this.data.linkInfo[this.data.logInDetails.chat_websiteType].url}/user/getPicturesAndAnnouncements`).then(
          response => {
            // console.log(response);
            this.announcement = response.data.alertShow.join('. ');
          },
          error => {
            console.log(error);
          }
        );
      }
    },
    mounted() {
      this.initiate();
    }
  }
</script>

<style lang="scss" scoped>
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