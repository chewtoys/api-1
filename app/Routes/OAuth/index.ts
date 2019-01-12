import { Router, Request, Response, NextFunction } from "express";
import { OAuth } from "../../API";

export default (router: Router) => {
  router.get("/oauth/vk", (req: Request, res: Response, next: NextFunction) => {
    OAuth.VK.login(req, res, next);
  });

  router.get(
    "/oauth/vk/callback",
    (req: Request, res: Response, next: NextFunction) => {
      OAuth.VK.callback(req, res, next);
    }
  );

  router.get("/oauth/ok", (req: Request, res: Response, next: NextFunction) => {
    OAuth.OK.login(req, res, next);
  });

  router.get(
    "/oauth/ok/callback",
    (req: Request, res: Response, next: NextFunction) => {
      OAuth.OK.callback(req, res, next);
    }
  );
};
