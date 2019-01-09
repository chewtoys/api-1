import { route } from "../../../utils";
import Products from "../";

export const productsRoute = route("/products/get", async (e) => await new Products().get(e), ["project_id"]);
