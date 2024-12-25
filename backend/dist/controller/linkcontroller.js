"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatelink = generatelink;
exports.sharelink = sharelink;
const uuid_1 = require("uuid");
const linkmodel_1 = __importDefault(require("../model/linkmodel"));
const contentmodel_1 = __importDefault(require("../model/contentmodel"));
function generatelink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        try {
            const uniqueId = (0, uuid_1.v4)();
            const existinguuid = yield linkmodel_1.default.findOne({
                sharelink: uniqueId
            });
            if (existinguuid) {
                res.status(500).json({
                    message: "uuid already existed"
                });
            }
            const createnewuuid = yield linkmodel_1.default.create({
                sharelink: uniqueId,
                userId: userId
            });
            res.status(200).json({
                message: "link generated ",
                createnewuuid
            });
        }
        catch (error) {
            res.status(500).json({
                message: "server issue"
            });
        }
    });
}
function sharelink(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const sharelink = req.body;
        try {
            const existinguuid = yield linkmodel_1.default.findOne({
                sharelink
            });
            if (!existinguuid) {
                res.status(403).json({
                    message: "sharelink not found"
                });
            }
            const getcontent = yield contentmodel_1.default.findOne({
                userId: existinguuid === null || existinguuid === void 0 ? void 0 : existinguuid.userId
            });
            if (!getcontent) {
                res.status(403).json({
                    message: "no content found"
                });
            }
            res.status(200).json({
                message: "content fetched",
                content: getcontent
            });
        }
        catch (error) {
            res.status(500).json({
                message: "internal server error"
            });
        }
    });
}
