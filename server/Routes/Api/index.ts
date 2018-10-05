import { Router } from "express";
import API from "../../API";

const router = Router();

router.use((req, res, next) => {
    console.log(req.subdomains);
    console.log(req.hostname);
    next()
})

router.all("/api/:classname/:method", async (req, res, next) => {
    const classname = req.params.classname[0].toUpperCase() + req.params.classname.slice(1);
    const method = req.params.method;
    const params = req.query;

    try {
        res.json(await new API("test")[classname][method](params));
    } catch (e) {
        res.json({
            result: false,
            error_text: e.message,
            error_stack: e.stack
        });
    };
});

export default router;