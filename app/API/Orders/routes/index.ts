import { route } from "../../../utils";
import Orders from "../";

export const ordersRoute = route("/orders/create", (e) => new Orders().create(e), [
  "phone",
  "lat",
  "lon",
  "address",
  "entrance",
  "apartment",
  "order_datetime",
  "items",
]);
