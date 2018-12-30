import { route } from "../../../utils";

import Settings from "../";

export const settingsRoute = route("/settings/get", async (e) => new Settings().get(e), ["idproject"]);
