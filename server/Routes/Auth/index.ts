import { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt-nodejs';
import Models from '../../Models';

const router = Router();

router.post('/api/auth/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.json({
      result: false
    });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        result: true
      });
    });
  })(req, res, next);
});

const LocalStrategy = passportLocal.Strategy;

const { User } = Models;

passport.use('local', new LocalStrategy({
  usernameField: 'login',
  passwordField: 'password'
}, (login, password, done) => {

  User.findOne({
    where: { login }
  }).then((user: any) => {
    if (user) {
      if (bCrypt.compareSync(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } else {
      return done(null, false);
    }
  });

}));

passport.serializeUser((user: any, done: any) => {
  done(null, user.iduser);
});

passport.deserializeUser((id: number, done: any) => {
  User.findById(id).then((user: any) => {
    if (user) {
      done(null, user.get());
    } else {
      done(user.errors, null);
    }
  });
});

export default router;