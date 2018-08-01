<template>
  <div id="gameChatHeader">
    <navigation />
    <!-- <announcement v-if="this.view == 'chat'" /> -->
  </div>
</template>

<script>
  import navigation from './navigation';
  import announcement from './announcement';

  export default {
    name: 'gameChatHeader',
    props: [
      'view'
    ],
    components: {
      navigation,
      announcement
    },
    data() {
      return {
      }
    },
    methods: {
    },
    mounted() {
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
  
  #gameChatHeader {
    width: 100%;
    height: auto;
    background-color: #0086e1;
    font-size: 16px;
    box-shadow: 0 0 10px #0086e180;
    z-index: 1;
  }
</style>