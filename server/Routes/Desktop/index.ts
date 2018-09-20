import { Router } from "express";
import path from "path";

const router = Router();

// Тестовый коммит

router.get('*', (req, res, next) => {
    // console.log(process.cwd())
    res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
});

export default router;