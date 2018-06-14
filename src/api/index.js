import axios from "../utils/diyaxios";
// 首页轮播图
export const getSwiperData = params =>
  axios.post("/userBetting/imageupload/carousel", { type: 0, ...params });

// 滚动消息和弹出提示
export const getAnnouncementData = params =>
  axios.post("/userBetting/announcement/findall", {
    pageSize: -1,
    pageNo: 1,
    ...params
  });

// 彩票分类数据
export const getLotteryTypeList = params =>
  axios.post("/userBetting/lotterytype/lotteryTypeList", {
    type: 0,
    ...params
  });

// 优惠活动数据
export const getActivityData = params =>
  axios.post("/userBetting/activityUrl/activityQuery", {
    pageSize: 3,
    pageNo: 1,
    ...params
  });

// 以游客身份登陆
export const loginAsTourist = params =>
  axios.post("/userBetting/user/touristslogin");

// 用户注册
export const register = params =>
  axios.post("/userBetting/user/register", params);

// 用户登陆
export const login = params => axios.post("/userBetting/user/login", params);

// 新闻详情
export const getAnnounceDetail = params =>
  axios.post("/userBetting/announcement/details", params);

// 修改密码
export const updateLoginPassword = (params, { userData }) =>
  axios.post("/userBetting/user/updatepwd", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });

// 修改支付密码
export const updatePayPassword = (params, { userData }) =>
  axios.post("/userBetting/user/updateplypwd", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 开奖结果
export const getLotteryResult = params =>
  axios.post("/userBetting/lotterOpen/getinfo/periods", params);

// 游戏赔率
export const getLotteryOdds = (params, { userData }) =>
  axios.post("/userBetting/newBetting/newBettingQuery", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });

// 下注
export const newBetting = (params, { userData }) =>
  axios.post("/userBetting/newBetting/newbetting1", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 连码下注
export const continuousCode = (params, { userData }) =>
  axios.post("/userBetting/newBetting/newbetting2", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 连码下注
export const zodiacBetting = params =>
  axios.post("/userBetting/newBetting/newbetting3", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });

// 露珠
export const getDewdropData = (params, { userData }) =>
  axios.post("/userBetting/lotterOpen/dewdrop", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 下注记录（汇总）
export const summary = (params, { userData }) =>
  axios.post("/userBetting/lotterybill/summary", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 今日已结
export const todayend = (params, { userData }) =>
  axios.post("/userBetting/lotterybill/todayend", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 未结明细
export const findlotteyBill = (params, { userData }) =>
  axios.post("/userBetting/lotterybill/findlotteyBill", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 我的消息
export const getstationLetter = (params, { userData }) =>
  axios.post("/userBetting/stationLetter/allStationLetter", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    pageSize: 100,
    pageNo: 1,
    read: 0,
    ...params
  });
// 站点配置
export const getSiteBasicInfo = params =>
  axios.post("/userBetting/Systems/getSiteBasicInfo");
// 添加银行卡或修改银行卡
export const bindBank = (params, { userData }) =>
  axios.post("/userBetting/userdeposit/bindBank", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 获取用户银行卡信息
export const userBank = (params, { userData }) =>
  axios.post("/userBetting/userdeposit/userBank", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 查询会员存取款记录
export const withdrawalsAndSaveDetail = (params, { userData }) =>
  axios.post("/userBetting/userdeposit/withdrawalsAndSaveDetail", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    pageSize: -1,
    pageNo: 1,
    ...params
  });
// 用户提现
export const withdrawAmount = (params, { userData }) =>
  axios.post("/userBetting/userdeposit/withdrawAmount", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 线上和线下支付方式查询
export const payType = (params, { userData }) =>
  axios.post("/userBetting/onlinePay/payType", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    pageSize: -1,
    pageNo: 1,
    ...params
  });
// 线下支付
export const TransactionRecord = (params, { userData }) =>
  axios.post("/userBetting/offlinePay/TransactionRecord", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// 第三方支付接口
export const zhiTongBaoPay = (params, { userData }) =>
  axios.post("/userBetting/onlinePay/zhiTongBaoPay", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// ag游戏链接获取
export const agLogin = (params, { userData }) =>
  axios.post("/userBetting/game/agLogin", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// ag额度查询
export const getGameBalance = (params, { userData }) =>
  axios.post("/userBetting/game/getGameBalance", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// AG额度转换
export const doGameTransfer = (params, { userData }) =>
  axios.post("/userBetting/game/doGameTransfer", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    ...params
  });
// AG额度交易记录
export const getGameTransferLog = (params, { userData }) =>
  axios.post("/userBetting/game/getGameTransferLog", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    pageSize: -1,
    pageNo: 1,
    ...params
  });
  //开奖记录/开奖大厅接口
export const getopenselet = (params, { userData }) =>
  axios.post("/userBetting/lotterOpen/openselet", {
    sessionId: userData.sessionId,
    usersId: userData.id,
    pageSize: -1,
    pageNo: 1,
    ...params
  });
  //站点配置
export const getwebsite = (params) =>
  axios.post("/userBetting/siteSetting/getSiteSettingInfo", {
    ...params
  });
