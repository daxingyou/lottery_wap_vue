import Lottery from "./index";
import _ from "lodash";
const classLy = new Lottery({ type: "tt" });
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
