import { route } from "../../../utils";

import { Settings } from "../../";

export const settingsRoute = route("/settings/get", async (e) => Settings.get(e));
