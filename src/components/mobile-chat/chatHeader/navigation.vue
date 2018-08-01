<template>
  <div id="navigation">
    <div id="mainNavigation" v-if="deactivateMainNavigation">
      <router-link id="return" to="/" v-if="!data.chat_isTest"></router-link>
      <div id="return" v-on:click="logout" v-if="data.chat_isTest"></div>

      <div id="title">
        <span v-if="!deactivateSubNavigation">北京赛车</span>
        <span v-else-if="deactivateSubNavigation">聊天室</span>
      </div>

      <div id="navigationList">
        <!-- <router-link class="navigationItem" v-for="(value, key) in navigation" v-bind:key="key" v-bind:to="value.to">{{value.name}}</router-link> -->
      </div>
    </div>
    
    <div id="subNavigation" v-if="deactivateSubNavigation">
      <div class="subNav">投注区</div>
      <div class="subNav active">聊天室</div>
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
        deactivateMainNavigation: !(this.$route.query.type_load == 'app'),
        deactivateSubNavigation: !((/mobile-chat/gi.test(this.$route.fullPath)) || (/mobile-chat/gi.test(this.$route.name))),
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
      logout() {
        eventBus.$emit('logout');
      }
    },
    mounted() {

    }
  }
</script>

<style lang="scss" scoped>
  #navigation {

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
        background-image: url("../assets/images/return.png");
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
        background-image: url("../assets/images/navigation.png");
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

      .subNav.active {
        background-color: #56bafe;
      }
    }
  }
</style>