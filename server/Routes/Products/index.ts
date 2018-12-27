import { Router, Request, Response, NextFunction } from "express";
import API from "../../API";

export default (router: Router) => {
  router.all(
    "/products/getItems",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log("rout getItems");
        // return res.json(await new API().Products.getItems());
      } catch (err) {
        return res.json({
          result: false,
          error_text: err.message
        });
      }
    }
  );
};
