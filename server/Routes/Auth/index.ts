import { Router } from 'express';
import API from '../../API';
import passportLocal from 'passport-local';
import bCrypt from 'bcrypt-nodejs';
import Models from '../../Models';

const router = Router();

router.get('/api/oauth/vk', (req, res, next) => {
  new API().OAuth.VK.login(req, res, next);
});

router.get('/api/oauth/vk/callback', (req, res, next) => {
  new API().OAuth.VK.callback(req, res, next);
});

router.get('/api/oauth/ok', (req, res, next) => {
  new API().OAuth.OK.login(req, res, next);
});

router.get('/api/oauth/ok/callback', (req, res, next) => {
  new API().OAuth.OK.callback(req, res, next);
});

// // Локальная авторизация
// router.post('/api/auth/login', (req, res, next) => {
//   passport.authenticate('local', (err, user, info) => {
//     if (err) return next(err);

//     if (!user) {
//       return res.json({
//         result: false,
//         error_code: parseInt(info.message, 10),
//         error_text: 'Неверный логин и/или пароль!'
//       }); 
//     }

//     req.logIn(user, (err) => {
//       if (err) return next(err);
//       return res.json({
//         result: true
//       });
//     });
//   })(req, res, next);
// });

// // Проверка авторизации
// router.post('/api/auth/check', (req, res) => {
//   if (req.user) {
//     return res.json({
//       result: true,
//       data: req.user
//     });
//   } else {
//     return res.json({
//       result: false 
//     });
//   }
// });

// // Роут для выхода
// router.post('/api/auth/logout', (req, res) => {
//   req.logout();
//   res.clearCookie('connect.sid');
//   return res.json({
//     result: true
//   });
// });

// // Локальная стратегия
// passport.use('local', new LocalStrategy({
//   usernameField: 'phone',
//   passwordField: 'password'
// }, (phone, password, done) => {

//   User.findOne({
//     where: { phone }
//   }).then((user: any) => {
//     if (user) {
//       if (bCrypt.compareSync(password, user.password)) {
//         return done(null, user);
//       } else {
//         return done(null, false, { message: '2' });
//       }
//     } else {
//       return done(null, false, { message: '1' });
//     }
//   });

// }));

// // Стратегия для одноклассников
// passport.use('ok', new OKStrategy({
//   clientID: process.env.OK_APP_ID,
//   clientPublic: process.env.OK_APP_PUBLIC,
//   clientSecret: process.env.OK_APP_SECRET,
//   callbackURL: '/api/oauth/ok/callback'
// }, (accessToken, refreshToken, params, profile, done) => {
//   User.findOrCreate({
//     where: {
//       ok_id: profile.id
//     },
//     defaults: {
//       idusertype: 1,
//       name: profile.name.givenName,
//       avatar: profile.photos[1].value,
//       ok_url: profile.profileUrl
//     }
//   }).spread((user: any, created: any) => {
//     if (user) {
//       if (!created) {
//         user.update({
//           name: profile.name.givenName,
//           avatar: profile.photos[1].value,
//           ok_url: profile.profileUrl
//         }).then(() => {
//           return done(null, user);
//         });
//       } else {
//         return done(null, user);
//       }
//     } else {
//       return done(null, false);
//     }
//   });
// }));

// passport.serializeUser((user: any, done: any) => {
//   done(null, user.iduser);
// });

// passport.deserializeUser((id: number, done: any) => {
//   User.findById(id).then((user: any) => {
//     if (user) {
//       return done(null, user.get());
//     } else {
//       return done(null, null);
//     }
//   });
// });

export default router;