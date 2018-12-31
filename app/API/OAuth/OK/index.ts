/**
 * Класс для работы с аутентификацией через Одноклассники
 * @author Nikita Bersenev
 */

import Passport from "../../../Passport";
import passportOK from "passport-odnoklassniki";
import { Request, Response, NextFunction } from "express";

export default class OK extends Passport {
  strategy: passportOK.Strategy;

  constructor() {
    super();

    this.strategy = new passportOK.Strategy(
      {
        clientID: process.env.OK_APP_ID,
        clientPublic: process.env.OK_APP_PUBLIC,
        clientSecret: process.env.OK_APP_SECRET,
        callbackURL: "/api/oauth/ok/callback",
      },
      (accessToken, refreshToken, params, profile, done) => {
        this.user
          .findOrCreate({
            where: {
              ok_id: profile.id,
            },
            defaults: {
              name: profile.name.givenName,
              avatar: profile.photos[1].value,
              ok_url: profile.profileUrl,
            },
          })
          .spread((user: any, created: any) => {
            if (user) {
              if (!created) {
                user
                  .update({
                    name: profile.name.givenName,
                    avatar: profile.photos[1].value,
                    ok_url: profile.profileUrl,
                  })
                  .then(() => {
                    return done(null, user);
                  });
              } else {
                return done(null, user);
              }
            } else {
              return done(null, false);
            }
          });
      }
    );

    this.passport.use("ok", this.strategy);
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    this.passport.authenticate("ok")(req, res, next);
  }

  public async callback(req: Request, res: Response, next: NextFunction) {
    this.passport.authenticate("ok", (err: any, user: any) => {
      if (err) return next(err);

      if (!user) {
        return res.redirect("/?error=1");
      }

      req.logIn(user, (err) => {
        if (err) return next(err);
        return res.redirect("/");
      });
    })(req, res, next);
  }
}
