/**
 * 用户模块
 */
const jwt = require("jsonwebtoken");

// 初始化
const SimpleDB = require("../../sqlite.js");
const sqliteDb = new SimpleDB();

/**
 * jwt 生成token
 */
let getJwt = (obj) => {
  return jwt.sign(obj, global.globalData.secretKey, {
    expiresIn: "1d",
  });
};

const dto = { username: "admin", password: "Aa123456" };

// let id = snid.generate();
class User {
  // 获取用户openId
  login(req, res) {
    // 测试 jwt 鉴权
    // let token = jwt.sign({ id: 96110 }, global.globalData.secretKey, {
    //   expiresIn: "24H",
    // });
    let { username, password } = req.body;
    // 模拟登录并生成 JWT
    if (username === dto.username && password === dto.password) {
      let token = getJwt(req.params);
      res.send({ success: true, token, message: "登录成功" });
    } else {
      res.send({ success: false, message: "用户名或密码错误" });
    }
  }

  // sites 列表接口
  async getSites(req, res) {
    const data = sqliteDb.get("SELECT * FROM home_set");
    res.send({ data: data, success: true });
  }

  // 查询用户信息
  async update(req, res) {
    const {
      title_cn,
      title_en,
      is_welcome,
      welcome_cn,
      welcome_en = "",
      title_cn_size = "",
      welcome_cn_size = "",
      welcome_en_size,
    } = req.body;
    sqliteDb.run(
      `UPDATE home_set SET title_cn = ?, title_en = ?, is_welcome = ?, welcome_cn = ?, welcome_en = ?, title_cn_size = ?, welcome_cn_size = ?, welcome_en_size = ? WHERE id = 1;`,
      [
        title_cn,
        title_en,
        is_welcome,
        welcome_cn,
        welcome_en,
        title_cn_size,
        welcome_cn_size,
        welcome_en_size,
      ]
    );
    res.send({ success: true });
    return;
  }
}

module.exports = new User();
