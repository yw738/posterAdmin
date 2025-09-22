const path = require("path");
// const dbPath = path.resolve(__dirname, "node_sqllite.db");
// const dbPath = path.resolve("./data", "node_sqllite.db");
const dbPath = './data/node_sqllite.db';
// db.js
const Database = require("better-sqlite3");

class SimpleDB {
  /**
   * 初始化数据库
   */
  constructor() {
    this.db = new Database(dbPath);
    console.log(`Connected to SQLite: ${dbPath}`);
  }

  /**
   * 关闭数据库连接
   */
  close() {
    this.db.close();
    console.log("Database connection closed");
  }

  /**
   * 执行SQL（增删改）
   * @param {string} sql SQL语句
   * @param {array} [params=[]] 参数
   * @returns {object} 执行结果
   */
  run(sql, params = []) {
    return this.db.prepare(sql).run(...params);
  }

  /**
   * 查询单条数据
   * @param {string} sql SQL语句
   * @param {array} [params=[]] 参数
   * @returns {object|null} 查询结果
   */
  get(sql, params = []) {
    return this.db.prepare(sql).get(...params);
  }

  /**
   * 查询多条数据
   * @param {string} sql SQL语句
   * @param {array} [params=[]] 参数
   * @returns {array} 查询结果数组
   */
  all(sql, params = []) {
    return this.db.prepare(sql).all(...params);
  }
}

module.exports = SimpleDB;
