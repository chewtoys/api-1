import { Router } from "express";
import path from "path";
import API from '../../API';

const router = Router();

router.all('/api/:classname/:method', async (req, res, next) => {
  const classname = req.params.classname[0].toUpperCase() + req.params.classname.slice(1);
  const method = req.params.method;
  const params = req.query;
  // console.log(process)

  try {
    res.json(await new API()[classname][method](params));
  } catch (e) {
    res.json({
      result: false,
      error_text: e.message,
      error_stack: e.stack
    });
  }
});

router.get('*', (req, res, next) => {
    res.sendFile(path.resolve(process.cwd(), "static/desktop/index.html"));
});

export default router;