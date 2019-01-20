import { Router, Request, Response } from "express";
import { route, routeExport } from "../../../utils";
import Logger from "../../../Main/Logger";
import { Orders } from "../../";

const router = Router();

const createRoute = route("/orders/create", (e) => Orders.create(e), [
  "project_id",
  "phone",
  "lat",
  "lon",
  "address",
  "entrance",
  "apartment",
  "items",
]);

const notificationsRoute = router.post("/orders/notifications", async (req: Request, res: Response) => {
  const path = "/orders/notifications";
  const reqTime = Date.now();

  try {
    const params = req.body;
    const required = [
      "TerminalKey",
      "OrderId",
      "Success",
      "Status",
      "PaymentId",
      "ErrorCode",
      "Amount",
      "CardId",
      "Pan",
      "Token",
      "ExpDate",
    ];

    for (let key of required) {
      if (typeof params[key] === "undefined") {
        throw new Error("Переданы не все параметры");
      }
    }

    const response = await Orders.notifications(params);
    Logger.route("OK", path, Date.now() - reqTime);
    res.status(200).end(response);
  } catch (err) {
    Logger.route("ERROR", path, Date.now() - reqTime, err.message);
    res.status(500).end("ERROR");
  }
});

export default routeExport({
  createRoute,
  notificationsRoute,
});
