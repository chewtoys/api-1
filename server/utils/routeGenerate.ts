import { Router } from "express";

/**
 * @description Генерация роута
 * @param {string} path Путь по которому сработает роут
 * @param {() => Promise<any[]>} fn Функция которая выполняет основную задачу роута. Всегда асинхроная, если синхроная, то нужно обернуть ее в Promise
 * @param {string[]} [param] Массив обязательных параметров необходимых для работы fn
 */
const routeGenerate = (
  path: string,
  fn: (queryOrBody: object) => Promise<any[]>,
  param?: string[]
) => {
  const router = Router();
  const answer: answerJSON = {
    data: undefined,
    err: undefined,
    meta: undefined
  };
  let reqTime: number;
  /**
   * @description Проверка обязательных параметров
   * @param param Обязательные параметра из param
   * @param queryOrBody То что прилетело в запросе
   */
  const reqParams = (param: string[], queryOrBody: { [key: string]: any }) => {
    const notTransmitted: string[] = [];
    param.forEach(item => {
      if (typeof queryOrBody[item] === "undefined") {
        notTransmitted.push(item);
      }
    });
    if (notTransmitted.length) {
      throw Error(`Не передан(ы) параметр(ы): ${notTransmitted.join(", ")}`);
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
   * @description Проверка на параметрына конкурентность и наличие обязательных из param
   * @param query req.query
   * @param body req.body
   */
  const checkForAvailability = (query: object, body: object) => {
    if (!emptyObject(query) && !emptyObject(body)) {
      throw new Error(
        "Параметры могут приходить в query или body, но не там и там одновременно"
      );
    }
    // Если нет обязательных параметров, то ничего не делаем
    if (typeof param !== "undefined") {
      if (!emptyObject(query)) {
        reqParams(param, query);
      }
      if (!emptyObject(body)) {
        reqParams(param, body);
      }
    }
  };

  router.use((req, res, next) => {
    reqTime = Date.now();
    next();
  });

  router.post(path, async (req, res, next) => {
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
        stack: process.env.NODE_ENV === "development" ? err.stack : undefined
      };
      next();
    }
  });

  router.use((req, res) => {
    answer.meta = {
      time: Date.now() - reqTime,
      count: answer.data ? answer.data.length : undefined
    };
    if (answer.err) {
      res.status(500).json(answer);
    } else {
      res.status(200).json(answer);
    }
  });

  return router;
};

export default routeGenerate;