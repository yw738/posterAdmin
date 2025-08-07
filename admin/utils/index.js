/**
 * 公共方法
 */

const getTime = (isHasHMS = false) => {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1; //月份是从0开始的
  let day = time.getDate();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  month = month.toString().padStart(2, "00"); //补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  if (isHasHMS) {
    return `${year}-${month}-${day} ${h}:${m}:${s}`;
  } else {
    return `${year}-${month}-${day}`;
  }
};
const getUserTime = (isHasHMS = false) => {
  const time = new Date();
  const year = time.getFullYear();
  let month = time.getMonth() + 1; //月份是从0开始的
  let day = time.getDate();
  let h = time.getHours();
  let m = time.getMinutes();
  let s = time.getSeconds();
  month = month.toString().padStart(2, "00"); //补0
  day = day.toString().padStart(2, "00");
  h = h.toString().padStart(2, "00");
  m = m.toString().padStart(2, "00");
  s = s.toString().padStart(2, "00");
  return `_${year}${month}${day}${h}${m}`;
};

/**
 * token 解析 为参数
 */
function parseJwt(token) {
  const base64Url = token.split(".")[1]; // 获取Payload部分
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/"); // 替换URL安全字符为标准Base64字符
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload); // 解析为JSON对象
}

exports.getTime = getTime;
