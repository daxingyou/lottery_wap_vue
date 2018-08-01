<template>
  <div id="gameChat">
    <gameChatHeader v-if="showChatroom" v-bind:view="view" />

    <div id="game" v-if="(this.view == 'game')">
      <slot/>
    </div>

    <chatMobile v-if="(this.view == 'chat')" />
  </div>
</template>

<script>
  import eventBus from '@/assets/js/event-bus';
  import gameChatHeader from './gameChatHeader/index';
  import chatMobile from '@/components/mobile-chat/index';

  export default {
    name: 'gameChat',
    components: {
      gameChatHeader,
      chatMobile
    },
    data() {
      return {
        view: 'game',
        showChatroom: ['uc'].indexOf(is_gd_ali()) > -1,
      }
    },
    methods: {
      initiate() {
        this.events();
      },
      events() {
        eventBus.$on('viewSelector', (data) => {
          this.view = data;
        });
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
  // * {
  //   margin: 0;
  //   padding: 0;
  //   box-sizing: initial;
  //   line-height: normal;
  //   font-size: initial;
  //   font-weight: normal;
  //   font-family: "Microsoft YaHei";
  //   -webkit-touch-callout: none;
  //   -webkit-user-select: none;
  //   -khtml-user-select: none;
  //   -moz-user-select: none;
  //   -ms-user-select: none;
  //   user-select: none;
  //   outline: none;
  //   -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  //   -moz-tap-highlight-color: rgba(255, 255, 255, 0);
  //   -ms-tap-highlight-color: rgba(255, 255, 255, 0);
  //   tap-highlight-color: rgba(255, 255, 255, 0);
  // }

  #gameChat {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    #game {
      width: 100%;
      height: 100%;
      text-align: center;
    }
  }
</style>
