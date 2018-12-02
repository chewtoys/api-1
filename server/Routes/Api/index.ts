import { Router } from "express";
import API from "../../API";

const router = Router();

router.all('/api/orders/create', async (req, res, next) => {
  try {
    res.json(await new API().Orders.create(req.body));
  } catch (e) {
    res.json({
        result: false,
        error_text: e.message,
        error_stack: e.stack
    });
  };
});

router.all("/api/:classname/:method", async (req, res, next) => {
    const classname = req.params.classname[0].toUpperCase() + req.params.classname.slice(1);
    const method = req.params.method;
    const params = req.query;

    try {
        res.json(await new API()[classname][method](params));
    } catch (e) {
        res.json({
            result: false,
            error_text: e.message,
            error_stack: e.stack
        });
    };
});

export default router;