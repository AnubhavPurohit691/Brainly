"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contentschema = exports.signschema = void 0;
const zod_1 = require("zod");
exports.signschema = zod_1.z.object({
    email: zod_1.z.string().min(3).max(10).email(),
    password: zod_1.z.string().min(8)
});
exports.contentschema = zod_1.z.object({
    title: zod_1.z.string(),
    type: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    link: zod_1.z.string().optional(),
    userId: zod_1.z.string().optional()
});
