declare module 'passport-odnoklassniki' {

  import * as passport from 'passport';
  import * as express from 'express';

  export interface StrategyOptions {
    clientID: string;
    clientPublic: string;
    clientSecret: string;
    callbackURL: string;
  }

  export interface Profile extends passport.Profile {
    gender?: string;
    profileUrl?: string;

    _raw: string;
    _json: any;
  }

  export type VerifyCallback = (error: any, user?: any, info?: any) => void;

  export type VerifyFunctionWithParams = (
    accessToken: string,
    refreshToken: string,
    params: any,
    profile: Profile,
    done: VerifyCallback
) => void;

  export type VerifyFunction = (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback
  ) => void;

  export class Strategy implements passport.Strategy {
      constructor(
          options: StrategyOptions,
          verify: VerifyFunctionWithParams | VerifyFunction
      );

      name: string;
      authenticate: (req: express.Request, options?: object) => void;
  }

}