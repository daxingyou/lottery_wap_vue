import Vue from "vue";

export default {
  SET_SWIPER_DATA: (state, { response }) => {
    state.swiperData = response;
  }
};
