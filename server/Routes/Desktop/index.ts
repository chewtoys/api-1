import { Router } from "express";
import path from "path";
import API from '../../API';

const router = Router();

router.get('*', (req, res, next) => {
    res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
});

export default router;