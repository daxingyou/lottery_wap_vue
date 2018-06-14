import Lottery from "./index";
import _ from "lodash";
const classLy = new Lottery({ type: "ly" });
// type: 'pn',

// 获取url地址
window.getUrl = () => {
  return classLy.getApiUrl();
};
window.is_gd_ali = () => {
  return classLy.getIsGdAli();
};
window.getIos = () => {
  return classLy.getIosUrl();
};
window.getTitle = () => {
  return classLy.getTitle();
};
window.getAndroid = () => {
  return classLy.getAndroidUrl();
};
// // 获取 pk10 子导航
// window.global_getBjpkClassify = () => {
//   return classLy.getPk10Classify()
// }
// // 获取 六合彩 子导航
// window.global_getMarkSixClassify = () => {
//   return classLy.getMarkSixClassify()
// }
// // 获取pk10赔率
// window.global_getBjpk =  (params) => {
//   return new Promise((resolve, reject) => {
//     classLy.getOddsList(params).then(data => {
//       const current = classLy.parseOddsList(data)
//       return resolve(current)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }
// // 获取六合彩赔率
// window.global_getMarkSix = (params) => {
//   return new Promise((resolve, reject) => {
//     classLy.getOddsList(params).then(data => {
//       const current = classLy.parseOddsList(data)
//       return resolve(current)
//     }).catch(error => {
//       reject(error)
//     })
//   })
// }
