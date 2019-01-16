import { Router, Request, Response, NextFunction } from "express";
import Logger from "../Main/Logger";

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
 * @description Проверка обязательных параметров
 * @param param Что проверять
 * @param query То что прилетело в запросе
 * @param body То что прилетело в запросе
 */
const reqParams = (param: string[], query: { [key: string]: any }, body: { [key: string]: any }) => {
  if (!emptyObject(query) && !emptyObject(body)) {
    throw new Error("Параметры могут приходить в query или body, но не там и там одновременно");
  }

  const notTransmitted: string[] = [];

  if (!emptyObject(query)) {
    param.forEach((item) => {
      if (typeof query[item] === "undefined" || !String(query[item]).length) {
        notTransmitted.push(item);
      }
    });
  } else if (!emptyObject(body)) {
    param.forEach((item) => {
      if (typeof body[item] === "undefined" || !String(body[item]).length) {
        notTransmitted.push(item);
      }
    });
  } else {
    throw new Error(`Не передан(ы) параметр(ы): ${param.join(", ")}`);
  }
  if (notTransmitted.length) {
    throw new Error(`Не передан(ы) параметр(ы): ${notTransmitted.join(", ")}`);
  }
};

/**
 * @description Генерация роута
 * @param {string} path Путь по которому сработает роут
 * @param {() => Promise<any[]>} fn Функция которая выполняет основную задачу роута. Всегда асинхроная, если синхроная, то нужно обернуть ее в Promise
 * @param {string[]} [param] Массив обязательных параметров необходимых для работы fn
 */
const routeGenerate = (path: string, fn: (queryOrBody: any) => Promise<any[]> | any, param?: string[]) => {
  if (typeof param === "undefined") {
    param = ["project_id"];
  } else {
    param.push("project_id");
  }
  const router = Router();
  let answer: answerJSON;
  let reqTime: number;

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
      reqParams(param, req.query, req.body);

      answer.data = await fn({ ...req.query, ...req.body });
      next();
    } catch (err) {
      answer.err = {
        message: err.message,
        stack: process.env.NODE_ENV === "development" ? err.stack.split("\n    ") : undefined,
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
      Logger.route("ERROR", path, time, answer.err.message);
      res.status(500).json(answer);
    } else {
      Logger.route("OK", path, time);
      res.status(200).json(answer);
    }
  };

  router.post(path, preRoute, middleRoute, postRoute);

  return router;
};

export default routeGenerate;
