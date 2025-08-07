// const { Pool } = require("pg");

// class PostgreSQLClient {
//   constructor(config) {
//     this.pool = new Pool(config);

//     // 监听连接错误
//     this.pool.on("error", (err) => {
//       console.error("Unexpected error on idle client", err);
//       process.exit(-1);
//     });
//   }

//   /**
//    * 执行查询
//    * @param {string} text SQL 查询语句
//    * @param {Array} params 查询参数
//    * @returns {Promise<Array>} 查询结果
//    */
//   async query(text, params) {
//     try {
//       const start = Date.now();
//       const res = await this.pool.query(text, params);
//       const duration = Date.now() - start;
//       console.log("Executed query", { text, duration, rows: res.rowCount });
//       return res.rows;
//     } catch (err) {
//       console.error("Error executing query", { text, params });
//       throw err;
//     }
//   }

//   /**
//    * 获取单个客户端（用于事务）
//    * @returns {Promise<Object>} 客户端对象
//    */
//   async getClient() {
//     const client = await this.pool.connect();

//     const query = client.query;
//     const release = client.release;

//     // 设置超时
//     const timeout = setTimeout(() => {
//       console.error("A client has been checked out for more than 5 seconds!");
//       console.error(
//         `The last executed query on this client was: ${client.lastQuery}`
//       );
//     }, 5000);

//     // 重写 query 方法以追踪最后一个查询
//     client.query = (...args) => {
//       client.lastQuery = args;
//       return query.apply(client, args);
//     };

//     // 重写 release 方法
//     client.release = () => {
//       clearTimeout(timeout);

//       // 将 client.query 和 client.release 重置为原始方法
//       client.query = query;
//       client.release = release;

//       return release.apply(client);
//     };

//     return client;
//   }

//   /**
//    * 执行事务
//    * @param {Function} callback 包含事务操作的异步函数
//    * @returns {Promise} 事务结果
//    */
//   async transaction(callback) {
//     const client = await this.getClient();

//     try {
//       await client.query("BEGIN");
//       const result = await callback(client);
//       await client.query("COMMIT");
//       return result;
//     } catch (err) {
//       await client.query("ROLLBACK");
//       throw err;
//     } finally {
//       client.release();
//     }
//   }

//   /**
//    * 关闭连接池
//    */
//   async close() {
//     await this.pool.end();
//   }
// }

// module.exports = PostgreSQLClient;
