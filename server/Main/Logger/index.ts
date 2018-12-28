/**
 * @todo Погонять и дописать необходтиое
 */

import { createLogger, format, transports, addColors } from "winston";
const { combine, timestamp, printf } = format;

// Стандартный вывод для всех уровней логов
const myFormat = printf(info => {
  return `${info.timestamp} [${info.label}]: ${info.message}`;
});

// Уровни логов, число = приоритет
// Цвета у меня не работают, хотя должны
const myCustomLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    verbose: 3,
    debug: 4,
    silly: 5
  },
  colors: {
    error: "red",
    warn: "yellow",
    info: "bold blue whiteBG",
    verbose: "green",
    debug: "green",
    silly: "green"
  }
};

// Инициализация логгера за пределами класса
const logger = createLogger({
  format: combine(format.colorize(), timestamp(), myFormat),
  levels: myCustomLevels.levels,
  transports: [new transports.Console()]
});

addColors(myCustomLevels.colors);

class Logger {
  /**
   * @description Лог с любой информцией
   * @param {string} msg Сообщение
   */
  info = (msg: string) =>
    logger.log({
      label: "info",
      message: `${msg}`,
      level: "info"
    });
  /**
   * @description Лог для вывода ошибок
   * @param {string} msg Сообщение
   */
  error = (msg: string) =>
    logger.log({
      label: "error",
      message: `${msg}`,
      level: "error"
    });
  /**
   * @description Лог для роутинга
   * @param {string} msg Сообщение
   * @param {string} path Путь роута
   * @param {number} time Время за которое отработал роут
   * @param {string} err Если ест ошибка, то показать ее
   */
  route = (msg: string, path: string, time: number, err?: string) =>
    logger.log({
      label: "route",
      message: `[${path}] ${msg} - ${time} ms ${err ? " - " + err : ""}`,
      level: "info"
    });
}

export default Logger;
