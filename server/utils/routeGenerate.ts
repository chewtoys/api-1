import { Router, Request, Response, NextFunction } from "express";
import Logger from "../Main/Logger";

/**
 * @description Генерация роута
 * @param {string} path Путь по которому сработает роут
 * @param {() => Promise<any[]>} fn Функция которая выполняет основную задачу роута. Всегда асинхроная, если синхроная, то нужно обернуть ее в Promise
 * @param {string[]} [param] Массив обязательных параметров необходимых для работы fn
 */
const routeGenerate = (path: string, fn: (queryOrBody: any) => Promise<any[]>, param?: string[]) => {
  const router = Router();
  let answer: answerJSON;
  let reqTime: number;
  /**
   * @description Проверка обязательных параметров
   * @param param Обязательные параметра из param
   * @param queryOrBody То что прилетело в запросе
   */
  const reqParams = (param: string[], queryOrBody: { [key: string]: any }) => {
    const notTransmitted: string[] = [];
    param.forEach((item) => {
      if (typeof queryOrBody[item] === "undefined") {
        notTransmitted.push(item);
      }
    });
    if (notTransmitted.length) {
      throw new Error(`Не передан(ы) параметр(ы): ${notTransmitted.join(", ")}`);
    }
  };
  /**
   * @description Проверка объекта на пустоту
   * @param obj Проверяемый
   */
  const emptyObject = (obj: object) => {
    if (Object.keys(obj).length === 0) {
      return true;
    } else {
      return false;
    }
  };
  /**
   * @description Проверка на параметры на конкурентность и наличие обязательных из param
   * @param query req.query
   * @param body req.body
   */
  const checkForAvailability = (query: object, body: object) => {
    if (!emptyObject(query) && !emptyObject(body)) {
      throw new Error("Параметры могут приходить в query или body, но не там и там одновременно");
    }
    // Если нет обязательных параметров, то ничего не делаем
    if (typeof param !== "undefined") {
      if (!emptyObject(query)) {
        reqParams(param, query);
      } else if (!emptyObject(body)) {
        reqParams(param, body);
      } else {
        throw new Error(`Не передан(ы) параметр(ы): ${param.join(", ")}`);
      }
    }
  };

  const preRoute = (req: Request, res: Response, next: NextFunction) => {
    answer = {
      data: undefined,
      err: undefined,
      meta: undefined,
    };
    reqTime = Date.now();
    next();
  };

  const middleRoute = async (req: Request, res: Response, next: NextFunction) => {
    try {
      checkForAvailability(req.query, req.body);
      let queryOrBody: object;
      if (!emptyObject(req.query)) {
        queryOrBody = req.query;
      }
      if (!emptyObject(req.body)) {
        queryOrBody = req.body;
      }

      answer.data = await fn(queryOrBody);
      next();
    } catch (err) {
      answer.err = {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
      };
      next();
    }
  };

  const postRoute = (req: Request, res: Response) => {
    const time = Date.now() - reqTime;
    answer.meta = {
      time,
      count: answer.data ? answer.data.length : undefined,
    };
    if (answer.err) {
      new Logger().route("ERROR", path, time, answer.err.message);
      res.status(500).json(answer);
    } else {
      new Logger().route("OK", path, time);
      res.status(200).json(answer);
    }
  };

  router.post(path, preRoute, middleRoute, postRoute);

  return router;
};

export default routeGenerate;
