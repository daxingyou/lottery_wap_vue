import swal from "sweetalert2";
import _ from "lodash";
let httpStatusArr;
if (localStorage) {
  if (localStorage.getItem("httpStatus")) {
    httpStatusArr = JSON.parse(localStorage.getItem("httpStatus"));
  } else {
    //用户手动清除localStorage
    import("../utils/httpStatusCode.json").then(data => {
      httpStatusArr = data;
      //将数据重新存在localStorage里面
      localStorage.setItem("httpStatus", JSON.stringify(data));
    });
  }
} else {
  //不支持localStorage的时候，从utils/httpStatus.json文件里面取
  import("../utils/httpStatusCode.json").then(data => {
    httpStatusArr = data;
  });
}

function combineHttpStatusArr(httpStatusArr, additionalHttpStatusCode) {
  let combined = [...additionalHttpStatusCode, ...httpStatusArr];
  // 保留additionalHttpStatusCode，去除重复
  return _.uniqBy(combined, "code");
}

export default function filterHttpStatusCode(
  res,
  additionalHttpStatusCode = []
) {
  /* 
  *res请求返回的数据
  * additionalHttpStatusCode一些接口特有的状态码和特别的提示
  */
  //  把固定的状态码和一些接口特有的状态码联合起来，并且优先以传入的状态码去掉重复的code
  let combinedHttpStatusArr = combineHttpStatusArr(
    httpStatusArr,
    additionalHttpStatusCode
  );
  let code = res.data.httpCode;
  combinedHttpStatusArr.forEach(item => {
    if (item.code === code) {
      if (item.code === 4001 || item.code === 535) {
        // 强制下线用户
        swal({
          type: "error",
          text: item.msg,
          timer: 1500,
          onClose: () => {
            sessionStorage.setItem("userData", "{}");
            setTimeout(() => {
              window.location.href = '/index';
            }, 200);
          }
        });
        return;
      }
      if (item.type === "error") {
        swal({
          type: "error",
          text: item.msg,
          timer: 1500
        });
        throw new Error(item.msg);
      }
      if (item.type === "success" && item.alert) {
        swal({
          type: "success",
          text: item.msg,
          timer: 1500,
          showConfirmButton: false
        });
      }
    }
  });
  return res;
}
