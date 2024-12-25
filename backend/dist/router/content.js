"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const contentcontroller_1 = require("../controller/contentcontroller");
const authmiddleware_1 = require("../middleware/authmiddleware");
const contentrouter = (0, express_1.Router)();
contentrouter.post("/create", authmiddleware_1.authmiddleware, contentcontroller_1.createcontent);
contentrouter.post("/get", authmiddleware_1.authmiddleware, contentcontroller_1.getcontent);
exports.default = contentrouter;
