const express = require('express');
const route = express.Router();
const path = require('path');


const controller = require("../Controllers/controller");

//route call
route.get("/", controller.home);
route.get("/registration", (req, resp) => {
    resp.sendFile(path.join(__dirname, '../views/registration.html'));
});
route.get("/signin", (req, resp) => {
    resp.sendFile(path.join(__dirname, '../views/login.html'));
});


//api call
route.post("/register",controller.register)
route.post("/verify", controller.otpverify);
route.post("/login", controller.login);

module.exports = route;