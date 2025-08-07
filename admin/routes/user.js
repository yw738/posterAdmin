/**
 * Created by 杨非凡
 */
const express = require("express");
const api = require("../controller/user/index.js");
const Route = express.Router();

// Route.route("/sApi/getOpenId").get(api.getOpenId);
Route.route("/api/user/getList").get(api.getList);

Route.route("/api/user/getDetail").get(api.getDetail);
// Route.route("/api/updateUser").post(api.updateUser);

// Route.route("/api/getAllCollection").get(api.getAllCollection);
// Route.route("/api/addCollection").get(api.addCollection);
// Route.route("/api/delCollection").get(api.delCollection);
// Route.route("/api/isCollection").get(api.shopIsCollection);

module.exports = Route;
