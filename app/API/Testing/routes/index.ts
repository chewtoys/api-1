import { route, routeExport } from "../../../utils";
import { Testing } from "../../";

const sendOrder = route("/testing/orders/send", (e) => Testing.sendOrder(e), ["order_id"]);

export default routeExport({
  sendOrder
});