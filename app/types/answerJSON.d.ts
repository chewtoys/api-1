declare type answerJSON = {
  data?: any[] | undefined;
  err?: { message: string; stack: Error["stack"] } | undefined;
  meta?: {} | undefined;
};
