import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import actions from "./actions";
import cachedStore from "./cacheDataToSessionStorage";
import createLogger from "vuex/dist/logger";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createLogger()],
  state: {
    ...cachedStore.state,
    userData: JSON.parse(sessionStorage.getItem("userData") || "{}"),
    alertNotifications: false,
    oddsData: {},
    lotteryResult: {},
    dewData: [],
    stationLetter: [],
    showRechargeBox: false
  },
  mutations: {
    ...cachedStore.mutations,
    setUserData(state, data) {
      sessionStorage.setItem("userData", JSON.stringify(data));
      state.userData = data;
    },
    alertNotifications(state, bool) {
      state.alertNotifications = bool;
    },
    setOddsData(state, { params, data }) {
      let { game_code, type_code } = params;
      state.oddsData = {
        ...state.oddsData,
        [`odds_${game_code}_${type_code}`]: data
      };
    },
    setLotteryResult(state, { params, data }) {
      let { gameCode } = params;
      state.lotteryResult = {
        ...state.lotteryResult,
        [`lottery_result_${gameCode}`]: data
      };
    },
    setDewData(state, { params, data }) {
      let { lotteryGamesId, lotteryGamesType } = params;
      state.dewData = {
        ...state.dewData,
        [`dew_${lotteryGamesId}_${lotteryGamesType}`]: data
      };
    },
    setStationLetter(state, data) {
      state.stationLetter = data;
    },
    toggleRechageBox(state, bool) {
      state.showRechargeBox = bool;
    }
  },
  actions
});
