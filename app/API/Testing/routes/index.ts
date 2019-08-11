import { route, routeExport } from "../../../utils";
import { Testing } from "../../";

const sendOrder = route("/testing/orders/send", (e) => Testing.sendOrder(e), ["order_id"]);

const testESP = route("/testing/esp8266", (params) => {
  console.log("/testing/esp8266");
  console.log(params);

  return [true];
});

export default routeExport({
  sendOrder,
  testESP
});