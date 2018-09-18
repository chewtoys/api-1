"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const router = express_1.Router();
router.get('*', (req, res, next) => {
    res.sendFile(path_1.default.resolve(process.cwd(), "/static/desktop/index.html"));
});
exports.default = router;
//# sourceMappingURL=index.js.map