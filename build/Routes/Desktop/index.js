"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = express_1.Router();
router.get('*', (req, res, next) => {
    res.sendFile(process.cwd() + "\\static\\desktop\\index.html");
});
exports.default = router;
//# sourceMappingURL=index.js.map