<template>
  <div id="navigation">
    <div id="mainNavigation" v-if="enableNavigation">
      <router-link id="return" to="/"></router-link>
      <!-- <div id="return" v-on:click="logout"></div> -->

      <div id="title">北京赛车</div>

      <div id="navigationList">
        <!-- <router-link class="navigationItem" v-for="(value, key) in navigation" v-bind:key="key" v-bind:to="value.to">{{value.name}}</router-link> -->
      </div>
    </div>
    
    <div id="subNavigation">
      <div v-bind:class="{subNavigation: true, active: (view == 'game')}" v-on:click="viewSelect('game')">投注区</div>
      <div v-bind:class="{subNavigation: true, active: (view == 'chat')}" v-on:click="viewSelect('chat')">聊天室</div>
    </div>
  </div>
</template>

<script>
  import eventBus from '@/assets/js/event-bus';

  export default {
    name: 'navigation',
    props: [
      'data'
    ],
    data() {
      return {
        view: 'game',
        enableNavigation: (/game-chat/gi.test(this.$route.fullPath)) || (/game-chat/gi.test(this.$route.name)),
        navigation: [
          {
            name: '聊天室',
            to: '/'
          },
          {
            name: '客t',
            to: '/nav2'
          },
          {
            name: '优惠',
            to: '/nav3'
          },
          {
            name: '开奖',
            to: '/nav4'
          }
        ]
      }
    },
    methods: {
      initiate() {
        this.events();
      },
      events() {
        eventBus.$on('viewSelector', (data) => {
          this.view = data;

          if (data == 'chat') {
            eventBus.$emit('messageScroll:down');
          }
        });
      },
      logout() {
        eventBus.$emit('logout');
      },
      viewSelect(data) {
        eventBus.$emit('viewSelector', data);
      }
    },
    mounted() {
      this.initiate();
    },
    beforeDestroy() {
      eventBus.$off('viewSelector');
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
  
  #navigation {
    margin: 3px 0 0 0;

    #mainNavigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      // padding: 0 10px;

      & * {
        display: inline-block;
      }

      #return {
        width: 20px;
        height: 20px;
        padding: 10px;
        background-image: url("../../../assets/images/return.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-size: 20px;
        cursor: pointer;
      }

      #title {
        color: #FFF;
      }

      #navigationList {
        width: 20px;
        height: 20px;
        padding: 10px 15px;
        background-image: url("../../../assets/images/navigation.png");
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
        background-size: 20px;
        cursor: pointer;

        .navigationItem {
          text-decoration: none;
          color: #FFF;
          padding: 10px 0;

          &.router-link-exact-active {
            color: #fbae19;
            border-bottom: 2px solid #fbae19;
          }
        }
      }
    }

    #subNavigation {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      border-top: 1px solid #56bafe;
      border-bottom: 1px solid #56bafe;

      & * {
        display: inline-block;
        width: 50%;
        color: #FFF;
        padding: 5px 0;
      }

      .subNavigation.active {
        background-color: #56bafe;
      }
    }
  }
</style>