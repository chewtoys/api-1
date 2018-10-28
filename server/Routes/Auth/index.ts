import { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt-nodejs';
import Models from '../../Models';

const router = Router();
const LocalStrategy = passportLocal.Strategy;
const { User } = Models;

// Роут для авторизации
router.post('/api/auth/login', async (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) return res.json({
      result: false,
      error_text: 'Неверный логин и/или пароль!'
    });

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.json({
        result: true
      });
    });
  })(req, res, next);
});

// Роут для проверки авторизации
router.post('/api/auth/check', (req, res) => {
  if (req.user) {
    return res.json({
      result: true,
      data: req.user
    });
  } else {
    return res.json({
      result: false 
    });
  }
});

// Роут для выхода
router.post('/api/auth/logout', (req, res) => {
  req.logout();
  res.clearCookie('connect.sid');
  return res.json({
    result: true
  });
});

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