import _ from "lodash";
import filterHttpStatusCode from "../utils/filterHttpStatusCode";
// 需要缓存到session当中数据
let state = {
  swiperData: {},
  lotteryTypeListData: {},
  activityData: {},
  announceData: {},
  website:{}
};

let mutations = {};
Object.keys(state).forEach(key => {
  mutations["set" + [_.upperFirst(key)]] = (state, data) => {
    state[key] = data;
  };
});

export async function cacheDataToSessionStorage({
  commit,
  state,
  params,
  cacheKey,
  request
}) {
  //根据cacheKey拼接mutation
  let mutation = "set" + [_.upperFirst(cacheKey)];
  let data = JSON.parse(sessionStorage.getItem(cacheKey)) || state[cacheKey];

  if (data.response) {
    commit(mutation, data);
    return data;
  } else {
    // store中无数据时需要重新请求
    let res = filterHttpStatusCode(await request(params));
    // 存到sessionStorage中
    sessionStorage.setItem(cacheKey, JSON.stringify(res.data));
    // 存到store中
    commit(mutation, res.data);
    return res.data;
  }
}

export default {
  state,
  mutations
};
