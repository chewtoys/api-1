import { Router, Request, Response, NextFunction } from "express";
import API from "../../API";

export default (router: Router) => {
  router.all(
    "/settings/get",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.json(await new API().Settings.get(req.query));
      } catch (err) {
        return res.json({
          result: false,
          error_text: err.message
        });
      }
    }
  );
};
