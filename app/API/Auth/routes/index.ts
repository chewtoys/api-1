import { route, routeExport } from "../../../utils";
import { Auth } from "../../";

const getCode = route("/auth/code/get", (e) => Auth.getСode(e), [
  "type_id",
  "operation_id",
  "recipient"
]);

const checkCode = route("/auth/code/check", (e) => Auth.checkCode(e), [
  "recipient",
  "operation_id",
  "code"
]);

export default routeExport({
  getCode,
  checkCode,
});
