import { route, routeExport } from "../../../utils";
import Auth from "../";

const getCode = route("/auth/code/get", (e) => new Auth().getСode(e), ["phone"]);
const checkCode = route("/auth/code/check", (e) => new Auth().checkCode(e), ["phone", "code"]);

// Потом для разлогина
// req.logout();
// res.clearCookie("connect.sid")

export default routeExport({
  getCode,
  checkCode,
});
