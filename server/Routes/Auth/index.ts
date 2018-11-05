import { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportVK from 'passport-vkontakte';
import bCrypt from 'bcrypt-nodejs';
import Models from '../../Models';

const router = Router();
const LocalStrategy = passportLocal.Strategy;
const VKStrategy = passportVK.Strategy;
const { User } = Models;

// Авторизация через ВК
router.get('/api/auth/vk', (req, res, next) => {
  passport.authenticate('vk')(req, res, next);
});

// Колбек для авторизации через ВК
router.get('/api/auth/vk/callback/', (req, res, next) => {
  passport.authenticate('vk', (err, user) => {
    if (err) return next(err);

    if (!user) {
      return res.redirect('/?error=1');
    }

    req.logIn(user, (err) => {
      if (err) return next(err);
      return res.redirect('/');
    });
  })(req, res, next);
});

// Роут для локальной авторизации
router.post('/api/auth/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res.json({
        result: false,
        error_code: parseInt(info.message, 10),
        error_text: 'Неверный логин и/или пароль!'
      }); 
    }

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

// Локальная стратегия
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
        return done(null, false, { message: '2' });
      }
    } else {
      return done(null, false, { message: '1' });
    }
  });

}));

// Стратегия ВК
passport.use('vk', new VKStrategy({
  clientID: process.env.VK_APP_ID,
  clientSecret: process.env.VK_APP_SECRET,
  callbackURL: '/api/auth/vk/callback'
}, (accessToken: any, refreshToken: any, params: any, profile: any, done: any) => {
  User.findOrCreate({
    where: {
      vk_id: profile.id
    },
    defaults: {
      idusertype: 1,
      name: profile.name.givenName
    }
  }).spread((user: any, created: any) => {
    if (user) {
      return done(null, user);
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