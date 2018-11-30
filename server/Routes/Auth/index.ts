import { Router } from 'express';
import passport from 'passport';
import passportLocal from 'passport-local';
import passportVK from 'passport-vkontakte';
import passportOK from 'passport-odnoklassniki';
import bCrypt from 'bcrypt-nodejs';
import Models from '../../Models';

const router = Router();
const LocalStrategy = passportLocal.Strategy;
const VKStrategy = passportVK.Strategy;
const OKStrategy = passportOK.Strategy;
const { User } = Models;

// Авторизация через ВК
router.get('/api/oauth/vk', (req, res, next) => {
  passport.authenticate('vk')(req, res, next);
});

// Колбек для авторизации через ВК
router.get('/api/oauth/vk/callback/', (req, res, next) => {
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

// Авторизация через Одноклассники
router.get('/api/oauth/ok', (req, res, next) => {
  passport.authenticate('ok')(req, res, next);
});

// Колбек для авторизации через Одноклассники
router.get('/api/oauth/ok/callback', (req, res, next) => {
  passport.authenticate('ok', (err, user) => {
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

// Локальная авторизация
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

// Проверка авторизации
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
  usernameField: 'phone',
  passwordField: 'password'
}, (phone, password, done) => {

  User.findOne({
    where: { phone }
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

// Стратегия для ВК
passport.use('vk', new VKStrategy({
  clientID: process.env.VK_APP_ID,
  clientSecret: process.env.VK_APP_SECRET,
  profileFields: ['photo_100'],
  callbackURL: '/api/oauth/vk/callback'
}, (accessToken, refreshToken, params, profile, done) => {
  User.findOrCreate({
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
}));

// Стратегия для одноклассников
passport.use('ok', new OKStrategy({
  clientID: process.env.OK_APP_ID,
  clientPublic: process.env.OK_APP_PUBLIC,
  clientSecret: process.env.OK_APP_SECRET,
  callbackURL: '/api/oauth/ok/callback'
}, (accessToken, refreshToken, params, profile, done) => {
  User.findOrCreate({
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
}));

passport.serializeUser((user: any, done: any) => {
  done(null, user.iduser);
});

passport.deserializeUser((id: number, done: any) => {
  User.findById(id).then((user: any) => {
    if (user) {
      return done(null, user.get());
    } else {
      return done(null, null);
    }
  });
});

export default router;