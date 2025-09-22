const express = require("express");
const app = express();
app.use(express.json()); //设置json解析
const { expressjwt } = require("express-jwt");
const log4js = require("./utils/logUtil.js");
const cors = require("cors");
// 允许所有来源跨域（不推荐生产环境使用）
app.use(cors());
// const sq = require("./utils/sqlite.js");

// 引入log4js配置，初始化全局对象
const logger = log4js.getLogger("default"); // 使用默认类别
global.logger = logger; // 赋值给全局对象【logger】，也可以直接替换【console】

const MIME = {
  js: "application/javascript",
  json: "application/json",
  html: "text/html",
  css: "text/css",
  gif: "image/gif", //图片 (无损耗压缩方面被PNG所替代)
  jpeg: "image/jpeg", //图片
  png: "image/png", //图片
  svg: "image/svg+xml", //(矢量图)
};
/**
 * express 设置全局响应头
 **/
app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  res.type("html");
  for (let [label, value] of Object.entries(MIME)) {
    if (req.url.endsWith(label)) {
      res.header("Content-Type", value);
      break;
    }
  }
  next();
});

/**
 * 生成 token 的密钥
 */
const secretKey = "tubindaochuchixiaochengxu";
// 注意：只要配置成功了 express-jwt 这个中间件，就可以把解析出来的用户信息，挂载到 `req.user` 属性上
app.use(
  expressjwt({
    secret: secretKey,
    algorithms: ["HS256"],
    getToken: function fromHeaderOrQuerystring(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split("Bearer ")[1];
      }
      return null;
    },
  }).unless({
    // 除去前綴為 /sApi 的請求都有 jwt 鑒權
    path: [
      // /^\//,
      /^\/sApi\//,
      //  /^\/api\//
    ],
  })
);
/**
 * 全局鉴权
 */
app.use((err, req, res, next) => {
  // 这次错误是由 token 解析失败导致的
  if (err.name === "UnauthorizedError") {
    return res.send({
      status: 401,
      message: "无效的token",
    });
  }
  if (err) {
    res.send({
      status: 500,
      message: "未知的错误",
    });
  }

  logger.info(req);
});

/**
 * 加载api
 */
const user = require("./routes/user");
app.use(user);

/**
 * 全局变量
 */
const POST = 8099;
global.globalData = {
  local: `http://localhost:${POST}`, //本项目的ip
  secretKey,
};

/**
 * 全局捕获 未捕获的异常 防止进程退出
 * =============================================================
 */
process.on("uncaughtException", function (err) {
  logger.error("error: " + err);
  console.log("=============================");
});

process.on("unhandledRejection", (err) => {
  logger.error("promise error: " + err);
  console.log("=============================");
});
// ===============================================================
app.listen(POST, function () {
  console.log("启动成功!");
  console.log(global.globalData.local);
});
