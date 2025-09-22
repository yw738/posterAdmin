/**
 * Created by 杨非凡
 */
const express = require("express");
const api = require("../controller/user/index.js");
const Route = express.Router();

Route.route("/sApi/sites").get(api.getSites);
Route.route("/sApi/login").post(api.login);
Route.route("/api/update").post(api.update);

module.exports = Route;
