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
exports.Signup = void 0;
const usermodel_1 = __importDefault(require("../model/usermodel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const existinguser = yield usermodel_1.default.findOne({
        email: email,
    });
    if (existinguser) {
        res.status(403).json({ message: "user already exist" });
        return;
    }
    const hashedpassword = bcrypt_1.default.hash(password, 10);
    const user = yield usermodel_1.default.create({
        email: email,
        password: hashedpassword
    });
    const token = jsonwebtoken_1.default.sign(user._id, config_1.JWT_PASSWORD);
    res.json({ token, user: Object.assign(Object.assign({}, user.toObject()), { password: undefined }) });
});
exports.Signup = Signup;
