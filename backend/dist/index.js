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
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./router/user"));
const db_1 = require("./db");
const config_1 = require("./config");
const content_1 = __importDefault(require("./router/content"));
const tags_1 = __importDefault(require("./router/tags"));
const link_1 = __importDefault(require("./router/link"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
function dbcall() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, db_1.connectDB)();
    });
}
dbcall();
app.use("/api/user/v1", user_1.default);
app.use("/api/content/v1", content_1.default);
app.use("/api/tags/v1", tags_1.default);
app.use("/api/link/v1", link_1.default);
app.get("/", (req, res) => {
    res.send("checking db");
});
app.listen(config_1.PORT, () => console.log('Port ', process.env.PORT));
