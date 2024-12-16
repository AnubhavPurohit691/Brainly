"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercontroller_1 = require("../controller/usercontroller");
const userrouter = (0, express_1.Router)();
userrouter.get("/signup", usercontroller_1.Signup);
exports.default = userrouter;
