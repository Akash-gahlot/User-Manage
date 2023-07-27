const express = require('express');
const route = express.Router();

const controller = require("../Controllers/controller");

route.get("/", controller.home);
route.post("/register",controller.register)
route.post("/verify", controller.otpverify);
route.get("/login", controller.login);

module.exports = route;