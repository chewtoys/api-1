import { Router, Request, Response, NextFunction } from "express";
import API from "../../API";

export default (router: Router, SocketBot: SocketIOClient.Socket) => {
  router.all(
    "/orders/create",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.json(await new API().Orders.create(req.body));
      } catch (err) {
        return res.json({
          result: false,
          error_text: err.message
        });
      }
    }
  );

  router.all(
    "/orders/setState",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.json(await new API().Orders.setState(req.query, SocketBot));
      } catch (err) {
        return res.json({
          result: false,
          error_text: err.message
        });
      }
    }
  );

  router.all(
    "/orders/get",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        return res.json(await new API().Orders.get(req.query));
      } catch (err) {
        return res.json({
          result: false,
          error_text: err.message
        });
      }
    }
  );

<<<<<<< HEAD
  router.all('/api/orders/notifications', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body);
=======
  router.post('/api/orders/notifications', async (req: Request, res: Response, next: NextFunction) => {
    return await new API().Orders.notifications(req, res);
>>>>>>> release/v0.7.0
  });
};
