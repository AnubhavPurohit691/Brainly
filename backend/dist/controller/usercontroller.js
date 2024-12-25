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
exports.Signin = exports.Signup = void 0;
const usermodel_1 = __importDefault(require("../model/usermodel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const zodschema_1 = require("../zodschema");
// signup controller
const Signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const vadiateschema = zodschema_1.signschema.safeParse({ email, password });
        if (!vadiateschema) {
            res.status(411).json({
                message: "schema invalidate"
            });
        }
        const existinguser = yield usermodel_1.default.findOne({
            email: email,
        });
        if (existinguser) {
            res.status(403).json({ message: "user already exist" });
            return;
        }
        const hashedpassword = yield bcrypt_1.default.hash(password, 10);
        const user = yield usermodel_1.default.create({
            email: email,
            password: hashedpassword
        });
        const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.JWT_PASSWORD);
        res.json({ token, user: Object.assign(Object.assign({}, user.toObject()), { password: undefined }) });
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
        });
    }
});
exports.Signup = Signup;
// signin controller
const Signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const validateuser = zodschema_1.signschema.safeParse({ email, password });
        if (!validateuser) {
            res.status(411).json({
                message: "validation error"
            });
        }
        const existinguser = yield usermodel_1.default.findOne({
            email: email,
        });
        if (!existinguser) {
            res.status(403).json({ message: "user not found" });
            return;
        }
        if (!existinguser.password) {
            res.status(403).json({
                message: "Invalid Password",
            });
            return;
        }
        const validateuserfromdb = yield bcrypt_1.default.compare(password, existinguser.password);
        if (!validateuserfromdb) {
            res.status(403).json({
                message: "validation error"
            });
        }
        const token = jsonwebtoken_1.default.sign({ id: existinguser._id }, config_1.JWT_PASSWORD);
        res.json({ token, user: Object.assign(Object.assign({}, existinguser.toObject()), { password: undefined }) });
    }
    catch (error) {
        res.status(500).json({
            message: 'Internal server error'
        });
    }
});
exports.Signin = Signin;
