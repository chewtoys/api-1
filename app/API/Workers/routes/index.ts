import { route, routeExport } from "../../../utils";
import { Workers } from "../../";

const createIfNotExist = route("/workers/createIfNotExist", (e) => Workers.createIfNotExist(e), [
  "first_name",
  "id"
]);

const changeStatus = route("/workers/changeStatus", (e) => Workers.changeStatus(e), [
  "telegram_id"
]);

export default routeExport({
  createIfNotExist
});