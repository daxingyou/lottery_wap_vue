import {
  getSwiperData,
  getAnnouncementData,
  getLotteryTypeList,
  getActivityData,
  loginAsTourist,
  register,
  login,
  getAnnounceDetail,
  updateLoginPassword,
  updatePayPassword,
  getLotteryResult,
  getLotteryOdds,
  newBetting,
  continuousCode,
  getDewdropData,
  getstationLetter,
  getSiteBasicInfo,
  getGameBalance,
  doGameTransfer,
  agLogin,
  zodiacBetting,
  summary,
  todayend,
  findlotteyBill,
  getopenselet,
  bindBank,
  userBank,
  withdrawAmount,
  withdrawalsAndSaveDetail,
  getwebsite,
  payType
} from "../api/index";

import { initWebsocket } from "../api/websocket";

import filterHttpStatusCode from "../utils/filterHttpStatusCode";
import { cacheDataToSessionStorage } from "./cacheDataToSessionStorage";
export default {
  GET_SWIPER_DATA: async ({ commit, state }, params) => {
    // 缓存轮播图数据
    return cacheDataToSessionStorage({
      commit,
      state,
      params,
      cacheKey: "swiperData",
      request: getSwiperData
    });
  },
  GET_ANNOUNCEMENT_DATA: async ({ commit, state }, params) => {
    // 缓存公告通知数据
    return cacheDataToSessionStorage({
      commit,
      state,
      params,
      cacheKey: "announceData",
      request: getAnnouncementData
    });
  },
  GET_LOTTERYTYPELIST_DATA: async ({ commit, state }, params) => {
    // 缓存彩票游戏列表数据
    return cacheDataToSessionStorage({
      commit,
      state,
      params,
      cacheKey: "lotteryTypeListData",
      request: getLotteryTypeList
    });
  },
  GET_ACTIVITY_DATA: async ({ commit, state }, params) => {
    // 缓存优惠活动列表数据
    return cacheDataToSessionStorage({
      commit,
      state,
      params,
      cacheKey: "activityData",
      request: getActivityData
    });
  },
  LOGIN_AS_TOURIST: async ({ commit, state }, params) => {
    const res = filterHttpStatusCode(await loginAsTourist(params, state), [
      {
        code: 515,
        msg: "试玩账号登陆成功",
        type: "success",
        alert: true
      }
    ]);
    commit("setUserData", res.data.response[0]);
    // 开启websocket连接
    initWebsocket({ state, commit });
    return res;
  },
  REGISTER: async ({ commit, state, dispatch }, params) => {
    filterHttpStatusCode(await register(params), [
      {
        code: 521,
        msg: "该账号已存在",
        type: "error"
      }
    ]);
    /* 
    *dontCheckStatusCode: true
    *避免经过状态码检查之后弹出登陆提示
    */
    const res = await dispatch("LOGIN", {
      username: params.username,
      password: params.password,
      dontCheckStatusCode: true
    });
    commit("setUserData", res.data.response[0]);
    return res;
  },
  LOGIN: async ({ commit, state }, params) => {
    let res;
    if (params.dontCheckStatusCode) {
      res = await login({
        username: params.username,
        password: params.password
      });
    } else {
      res = filterHttpStatusCode(await login(params), [
        {
          code: 554,
          msg: "用户不存在",
          type: "error"
        },
        {
          code: 553,
          msg: "用户已在线",
          type: "error"
        },
        {
          code: 552,
          msg: "账号或密码错误",
          type: "error"
        }
      ]);
    }
    // 登陆之后返回的用户数据存在store中
    commit("setUserData", res.data.response[0]);
    // 弹出公告信息
    commit("alertNotifications", true);
    // 开启websocket连接
    initWebsocket({ state, commit });
    return res;
  },
  GET_ANNOUNCEMENT_DETAIL: async ({ commit, state }, params) => {
    // 新闻详情
    return filterHttpStatusCode(await getAnnounceDetail(params));
  },
  UPDATA_PAY_PASSWORD: async ({ commit, state }, params) => {
    // 修改支付密码
    return filterHttpStatusCode(
      await updatePayPassword(params, { userData: state.userData })
    );
  },
  UPDATA_LOGIN_PASSWORD: async ({ commit, state }, params) => {
    // 修改登陆密码
    return filterHttpStatusCode(
      await updateLoginPassword(params, { userData: state.userData })
    );
  },
  GET_LOTTERY_RESULT: async ({ commit, state }, params) => {
    // 缓存开奖结果
    let { gameCode, update } = params;
    if (state.lotteryResult[`lottery_result_${gameCode}`] && !update) {
      return state.lotteryResult[`lottery_result_${gameCode}`];
    } else {
      let lotteryResult = filterHttpStatusCode(
        await getLotteryResult({ gameCode })
      );
      commit("setLotteryResult", {
        params,
        data: lotteryResult.data.response
      });
      return lotteryResult.data.response;
    }
  },
  GET_LOTTERY_ODDS: async ({ commit, state }, params) => {
    // 缓存开奖赔率接口信息
    let { game_code, type_code } = params;
    if (state.oddsData[`odds_${game_code}_${type_code}`]) {
      return state.oddsData[`odds_${game_code}_${type_code}`];
    } else {
      let oddsData = filterHttpStatusCode(
        await getLotteryOdds(params, { userData: state.userData })
      );
      commit("setOddsData", { params, data: oddsData.data.response });
      return oddsData.data.response;
    }
  },
  NEW_BETTING: async ({ commit, state }, params) => {
    // 下注接口
    return filterHttpStatusCode(
      await newBetting(params, { userData: state.userData })
    );
  },
  CONTINUOUS_CODE: async ({ commit, state }, params) => {
    // 连码下注接口
    return filterHttpStatusCode(
      await continuousCode(params, { userData: state.userData })
    );
  },
  ZODIAC_BETTING: async ({ commit, state }, params) => {
    // 生肖下注接口
    return filterHttpStatusCode(
      await zodiacBetting(params, { userData: state.userData })
    );
  },
  GET_DEWDROP_DATA: async ({ commit, state }, params) => {
    // 缓存露珠接口
    let { lotteryGamesId, lotteryGamesType } = params;
    if (state.dewData[`dew_${lotteryGamesId}_${lotteryGamesType}`]) {
      return state.dewData[`dew_${lotteryGamesId}_${lotteryGamesType}`];
    } else {
      let dewData = filterHttpStatusCode(
        await getDewdropData(params, { userData: state.userData })
      );
      commit("setDewData", { params, data: dewData.data.response });
      return dewData.data.response;
    }
    return filterHttpStatusCode(
      await getDewdropData(params, { userData: state.userData })
    );
  },
  STATION_LETTER: async ({ commit, state }, params) => {
    // 站内信
    if (state.stationLetter.data) {
      return state.stationLetter;
    } else {
      // store中无数据时需要重新请求
      let stationLetter = filterHttpStatusCode(
        await getstationLetter(params, { userData: state.userData })
      );
      commit("setStationLetter", stationLetter);
      return stationLetter;
    }
  },
  SITEBASIC_INFO: async ({ commit, state }, params) => {
    // 站点配置
    return filterHttpStatusCode(await getSiteBasicInfo(params));
  },
  GAME_BALANCE: async ({ commit, state }, params) => {
    // 获取用户金额和AG金额
    const data = filterHttpStatusCode(
      await getGameBalance(params, { userData: state.userData })
    );
  },
  GAME_TRANSFER: async ({ commit, state, dispatch }, params) => {
    // AG彩票额度转换
    data = filterHttpStatusCode(
      await doGameTransfer(params, { userData: state.userData })
    );
    let userData = {
      ...state.userData,
      money: data.response[0].balance
    };
    dispatch("GAME_BALANCE").then(data => {
      sessionStorage.setItem("setUserData", JSON.stringify(userData));
      commit("setUserData", userData);
    });
  },
  GAME_AGLOGIN: async ({ commit, state }, params) => {
    // AG彩票额度转换
    return filterHttpStatusCode(
      await agLogin(params, { userData: state.userData })
    );
  },
  SUMMARY: async ({ commit, state }, params) => {
    // 下注汇总
    return filterHttpStatusCode(
      await summary(params, { userData: state.userData })
    );
  },
  TODAY_END: async ({ commit, state }, params) => {
    // 今日已结
    return filterHttpStatusCode(
      await todayend(params, { userData: state.userData })
    );
  },
  FIND_LOTTERYBILL: async ({ commit, state }, params) => {
    // 未结记录
    return filterHttpStatusCode(
      await findlotteyBill(params, { userData: state.userData })
    );
  },
  OPEN_SELET: async ({ commit, state }, params) => {
    //开奖记录/开奖大厅接口
    return filterHttpStatusCode(
      await getopenselet(params, { userData: state.userData })
    );
  },
  BIND_BANK: async ({ commit, state }, params) => {
    //绑定银行卡
    return filterHttpStatusCode(
      await bindBank(params, { userData: state.userData })
    );
  },
  USER_BANK: async ({ commit, state }, params) => {
    //查看银行卡信息
    return filterHttpStatusCode(
      await userBank(params, { userData: state.userData })
    );
  },
  RAW_AMOUNT: async ({ commit, state }, params) => {
    //提现
    return filterHttpStatusCode(
      await withdrawAmount(params, { userData: state.userData })
    );
  },
  RAWAL_SAVEDETAIL: async ({ commit, state }, params) => {
    //存取记录
    return filterHttpStatusCode(
      await withdrawalsAndSaveDetail(params, { userData: state.userData })
    );
  },
  GET_WEBSITE_CONFIG: async ({ commit, state }, params) => {
    //站点配置
    return cacheDataToSessionStorage({
      commit,
      state,
      params,
      cacheKey: "website",
      request: getwebsite
    });
  },
  PAY_TYPE: async ({ commit, state }, params) => {
    //支付方式
    return filterHttpStatusCode(await payType(params, { userData: state.userData }));
  }
};
