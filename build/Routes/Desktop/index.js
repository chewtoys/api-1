"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const path_1 = __importDefault(require("path"));
const API_1 = __importDefault(require("../../API"));
const router = express_1.Router();
router.all('/api/:classname.:method', (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    let classname = req.params.classname[0].toUpperCase() + req.params.classname.slice(1);
    let method = req.params.method;
    let params = req.query;
    try {
        res.json(yield API_1.default.call({ classname, method, params }));
    }
    catch (e) {
        res.json({
            result: false,
            error_text: e.message,
            error_stack: e.stack
        });
    }
}));
router.get('*', (req, res, next) => {
    res.sendFile(path_1.default.resolve(process.cwd(), "static/desktop/index.html"));
});
exports.default = router;
//# sourceMappingURL=index.js.map