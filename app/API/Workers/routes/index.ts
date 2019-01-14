import { route, routeExport } from "../../../utils";
import { Workers } from "../../";

const createIfNotExist = route("/workers/createIfNotExist", (e) => Workers.createIfNotExist(e), [
  "first_name",
  "id"
]);

export default routeExport({
  createIfNotExist
});