/**
 * Методы для работы с аутентификацией через сторонние сервисы
 * @author Nikita Bersenev
 */

import Main from '../../Main';
import Functions from '../../Main/Functions';
import Models from '../../Models';
import passport from 'passport';
import passportVK from 'passport-vkontakte';
import passportOK from 'passport-odnoklassniki';

export default class OAuth extends Main {

  response: responseAPI;
  functions: Functions;
  VKStrategy: passportVK.Strategy;
  OKStrategy: passportOK.Strategy;
  [propName: string]: any;

  constructor() {
    super();

    this.response = { result: false };
    this.functions = new Functions;
    this.passport = passport;
    this.user = Models.User;

    // Стратегия аутентификации через ВКонтакте
    this.VKStrategy = new passportVK.Strategy({
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
          idusertype: 1,
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

    // Стратегия аутентификации через Одноклассники
    this.OKStrategy = new passportOK.Strategy({
      clientID: process.env.OK_APP_ID,
      clientPublic: process.env.OK_APP_PUBLIC,
      clientSecret: process.env.OK_APP_SECRET,
      callbackURL: '/api/oauth/ok/callback'
    }, (accessToken, refreshToken, params, profile, done) => {
      this.user.findOrCreate({
        where: {
          ok_id: profile.id
        },
        defaults: {
          idusertype: 1,
          name: profile.name.givenName,
          avatar: profile.photos[1].value,
          ok_url: profile.profileUrl
        }
      }).spread((user: any, created: any) => {
        if (user) {
          if (!created) {
            user.update({
              name: profile.name.givenName,
              avatar: profile.photos[1].value,
              ok_url: profile.profileUrl
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

    this.passport.use('vk', this.VKStrategy);
    this.passport.use('ok', this.OKStrategy);

    this.passport.serializeUser((user: any, done: any) => {
      done(null, user.iduser);
    });
    
    this.passport.deserializeUser((id: number, done: any) => {
      this.user.findById(id).then((user: any) => {
        if (user) {
          return done(null, user.get());
        } else {
          return done(null, null);
        }
      });
    });

  }

  // Аутентификации через ВКонтакте
  public async vk(req: any, res: any, next: any) {
    this.passport.authenticate('vk')(req, res, next);
  }

  // Аутентификации через Одноклассники
  public async ok(req: any, res: any, next: any) {
    this.passport.authenticate('ok')(req, res, next);
  }

}