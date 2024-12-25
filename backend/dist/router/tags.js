"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tagcontroller_1 = require("../controller/tagcontroller");
const authmiddleware_1 = require("../middleware/authmiddleware");
const tagrouter = (0, express_1.Router)();
tagrouter.get("/", authmiddleware_1.authmiddleware, tagcontroller_1.gettags);
exports.default = tagrouter;
