/**
 * 用户模块
 */
// const db = require("../../utils/mysql.js");
const publicJs = require("../../utils/index.js");
const request = require("request");
const axios = require("./../../model/axios.js");
const jwt = require("jsonwebtoken");
const { getLogger } = require("log4js");
const { dev } = require("../../utils/config.js");

// 方法一：使用正则表达式替换空格字符
function filterSpaces(str) {
  return str.replace(/\s/g, "");
}
// 初始化
const SimpleDB = require("../../utils/sqlite.js");
const sqliteDb = new SimpleDB();

/**
 * jwt 生成token
 */
let getJwt = (obj) => {
  return jwt.sign(obj, global.globalData.secretKey, {
    expiresIn: "1d",
  });
};

// let id = snid.generate();
class User {
  // 获取用户openId
  getOpenId(req, res) {
    // 测试 jwt 鉴权
    // let token = jwt.sign({ id: 96110 }, global.globalData.secretKey, {
    //   expiresIn: "1H",
    // });
    // res.send({ token });
  }

  // 查询用户信息
  async getList(req, res) {
    res.send({ data: [], code: 0 });
    return;
  }

  // 查找用户 的关联关系
  async getDetail(req, res) {
    try {
      let { id } = req.query; //userId,
      const user = sqliteDb.get("SELECT * FROM users WHERE id = ?", [id]);
      if (user) {
        let obj = await db.query(`SELECT * FROM  "AspNetUsers" WHERE id = ?`, [
          user[0].online_id,
        ]);
        res.send({ data: { ...obj }, code: 0 });
      } else {
        sqliteDb.run(
          "INSERT INTO users (id, online_id, other_id) VALUES (?, ?, ?)",
          [id, null, null]
        );
        res.send({ data: { id }, code: 0 });
      }
    } catch (err) {
      res.send({ code: 1, data: [], message: "系统异常" });
    }
  }

  // 更新用户信息 最后登录信息
  updateUser(req, res) {
    try {
      let { id: userId } = req.auth;
      if (!userId) {
        res.send({ code: 1, message: "没有id" });
        return;
      }
      userId = userId && filterSpaces(userId);
      let json = {
        last_visit: publicJs.getTime(true),
      };
      db.update("user", json, { user_id: userId }).then(() => {
        res.send({ code: 0, message: "更新成功" });
      });
    } catch (err) {
      res.send({ code: 1, data: [], message: "系统异常" });
    }
  }

  // 新增收藏
  addCollection(req, res) {}

  // 取消收藏
  delCollection(req, res) {}

  // 获取当前用户的收藏
  getAllCollection(req, res) {}

  // 判断 店铺是否被用户收藏
  shopIsCollection(req, res) {}
}

module.exports = new User();
