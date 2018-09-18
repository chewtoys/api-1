import { Router } from "express";

const router = Router();

router.get('*', (req, res, next) => {
    // console.log(process.cwd())
    res.sendFile(process.cwd() + "\\static\\desktop\\index.html");
});

export default router;