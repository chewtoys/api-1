/**
 * Сlass with useful features
 * @author Nikita Bersenev
 */

export default class Functions {

  public paramsError() {
    throw new Error('Переданы не все параметры');
  }

  public unknownError() {
    throw new Error('Неизвестная ошибка');
  }

}