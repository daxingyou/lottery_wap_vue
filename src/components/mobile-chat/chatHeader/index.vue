<template>
  <div id="chatHeader">
    <navigation v-bind:data="data"/>
    <announcement v-bind:data="data"/>
  </div>
</template>

<script>
  import navigation from './navigation';
  import announcement from './announcement';

  export default {
    name: 'chatHeader',
    props: [
      'data'
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
      // console.log(this.data);
    }
  }
</script>

<style lang="scss" scoped>
  #chatHeader {
    width: 100%;
    height: auto;
    background-color: #0086e1;
    font-size: 16px;
    box-shadow: 0 0 10px #0086e180;
    z-index: 1;
  }
</style>