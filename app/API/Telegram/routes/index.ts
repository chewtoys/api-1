import { route, routeExport } from "../../../utils";
import { Telegram } from "../../";

const deleteMessages = route("/telegram/deleteMessages", (e) => Telegram.deleteMessages(e));

const saveMessage = route("/telegram/saveMessage", (e) => Telegram.saveMessage(e), [
  "telegram_id",
  "message_id",
  "text",
  "type_id"
]);

export default routeExport({
  deleteMessages,
  saveMessage
});