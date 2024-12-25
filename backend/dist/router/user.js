"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controller/usercontroller");
const userrouter = (0, express_1.Router)();
userrouter.post("/signup", usercontroller_1.Signup);
userrouter.post("/signup", usercontroller_1.Signin);
exports.default = userrouter;
