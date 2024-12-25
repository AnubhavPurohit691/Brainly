"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const linkcontroller_1 = require("../controller/linkcontroller");
const authmiddleware_1 = require("../middleware/authmiddleware");
const linkrouter = (0, express_1.Router)();
linkrouter.post("/link", authmiddleware_1.authmiddleware, linkcontroller_1.generatelink);
exports.default = linkrouter;
