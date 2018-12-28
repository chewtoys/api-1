/**
 * Базовый класс для работы с аутентификацией 
 * @author Nikita Bersenev
 */

import Models from '../Models';
import passport from 'passport';

export default class Passport {
  passport: passport.PassportStatic;
  user: any;

  constructor() {
    this.passport = passport;
    this.user = Models.User;

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


}