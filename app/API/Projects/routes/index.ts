import { route, routeExport } from "../../../utils";
import { Projects } from "../../";

const getRoute = route("/projects/get", () => Projects.get());

export default routeExport({
  getRoute
});