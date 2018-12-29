/**
 * Класс для работы с аутентификацией через сторонние сервисы
 * @author Nikita Bersenev
 */

import Main from "../../Main";
import VK from "./VK";
import OK from "./OK";

export default class OAuth extends Main {
  VK: VK;
  OK: OK;

  constructor() {
    super();

    this.VK = new VK();
    this.OK = new OK();
  }
}
