<template>
  <div>

  </div>
</template>

<script>
import { getSwiperData } from "../api/index";
export default {
  created() {
    this.$store.dispatch('GET_SWIPER_DATA',{type:1}).then(data=>{
      console.log(data)
    })
  }
};
</script>

<style>
</style>
