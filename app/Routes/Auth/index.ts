import { Router, Request, Response, NextFunction } from "express";
import API from "../../API";

export default (router: Router) => {
  router.post("/auth/get_code", async (req: Request, res: Response, next: NextFunction) => {
    try {
      // return res.json(await new API().Auth.get_code(req.query));
    } catch (e) {
      return res.json({
        result: false,
        error_text: e.message,
      });
    }
  });

  router.post("/auth/check_code", async (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.json(await new API().Auth.check_code(req.query));
    } catch (e) {
      return res.json({
        result: false,
        error_text: e.message,
      });
    }
  });

  router.post("/auth/logout", (req: Request, res: Response, next: NextFunction) => {
    new API().Auth.logout(req, res);
  });
};

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
