/**
 * Класс для работы с аутентификацией через ВКонтакте
 * @author Nikita Bersenev
 */

import Passport from '../../../Main/Passport';
import passportVK from 'passport-vkontakte';
import { Request, Response, NextFunction } from 'express';

export default class VK extends Passport {
  strategy: passportVK.Strategy;
  [propName: string]: any;

  constructor() {
    super();

    this.strategy = new passportVK.Strategy({
      clientID: process.env.VK_APP_ID,
      clientSecret: process.env.VK_APP_SECRET,
      profileFields: ['photo_100'],
      callbackURL: '/api/oauth/vk/callback'
    }, (accessToken, refreshToken, params, profile, done) => {
      this.user.findOrCreate({
        where: {
          vk_id: profile.id
        },
        defaults: {
          name: profile.name.givenName,
          avatar: profile.photos[1].value,
          vk_url: profile.profileUrl
        }
      }).spread((user: any, created: boolean) => {
        if (user) {
          if (!created) {
            user.update({
              name: profile.name.givenName,
              avatar: profile.photos[0].value,
              vk_url: profile.profileUrl
            }).then(() => {
              return done(null, user);
            });
          } else {
            return done(null, user);
          }
        } else {
          return done(null, false);
        }
      });
    });

    this.passport.use('vk', this.strategy);
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    this.passport.authenticate('vk')(req, res, next);
  }

  public async callback(req: Request, res: Response, next: NextFunction) {
    this.passport.authenticate('vk', (err: any, user: any) => {
      if (err) return next(err);
  
      if (!user) {
        return res.redirect('/?error=1');
      }
  
      req.logIn(user, (err: any) => {
        if (err) return next(err);
        return res.redirect('/');
      });
    })(req, res, next);
  }

}