const express = require('express');
const route = express.Router();

const controller = require("../Controllers/controller");

route.get("/", controller.home);
route.get("/register", controller.register);

module.exports = route;