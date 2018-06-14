import _ from "lodash";
let state = {
  swiperData: {},
  lotteryTypeListData: {},
  activityData: {},
  announceData:{}
};

let mutations = {};
Object.keys(state).forEach(key => {
  mutations["set" + [_.upperFirst(key)]] = (state, data) => {
    state[key] = data;
  };
});

export default {
  state,
  mutations
};

