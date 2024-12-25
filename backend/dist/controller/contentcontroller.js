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
exports.createcontent = void 0;
exports.getcontent = getcontent;
const contentmodel_1 = __importDefault(require("../model/contentmodel"));
const tagmodel_1 = __importDefault(require("../model/tagmodel"));
const zodschema_1 = require("../zodschema");
const createcontent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, type, tags, link } = req.body;
    const userId = req.userId;
    try {
        const validatecontent = zodschema_1.contentschema.safeParse({ title, link, type, tags, userId });
        if (!validatecontent) {
            res.status(403).json({
                message: "validation error"
            });
            return;
        }
        let existingtags = yield tagmodel_1.default.findOne({
            tags
        });
        if (!existingtags) {
            existingtags = yield tagmodel_1.default.create({
                tags
            });
        }
        const newcontent = new contentmodel_1.default({
            tags: existingtags.tags,
            type,
            userId,
            link,
            title
        });
        res.status(200).json({
            message: "content has been created", content: newcontent
        });
    }
    catch (error) {
        res.status(500).json({
            message: "server error"
        });
    }
});
exports.createcontent = createcontent;
function getcontent(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const userId = req.userId;
        try {
            const getcontent = yield contentmodel_1.default.findOne({
                userId
            });
            if (!getcontent) {
                res.status(404).json({
                    message: "content not exists in db"
                });
            }
            res.status(200).json({
                message: "done",
                getcontent
            });
        }
        catch (error) {
            res.status(500).json({
                message: "server error"
            });
        }
    });
}
