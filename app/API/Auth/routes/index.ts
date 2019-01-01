import { route, routeExport } from "../../../utils";
import Auth from "../";

const getCode = route("/auth/code/get", (e) => new Auth().getСode(e));
const setCode = route("/auth/code/set", (e) => new Auth().getСode(e));

const exportRout = {
  getCode,
  setCode,
};

export default routeExport({
  getCode,
  setCode,
});
