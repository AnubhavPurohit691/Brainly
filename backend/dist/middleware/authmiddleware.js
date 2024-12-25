"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authmiddleware = authmiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function authmiddleware(req, res, next) {
    var _a;
    try {
        const token = String((_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.split(' ')[1]);
        if (!token) {
            res.status(403).json({
                message: "No token provided"
            });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secret");
        req.userId = decoded.id;
        next();
    }
    catch (error) {
        res.status(411).json({
            message: "server error"
        });
    }
}
