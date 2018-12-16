import { Router, Request, Response, NextFunction } from 'express';
import API from '../../API';

export default (router: Router) => {

  router.get('/api/oauth/vk', (req: Request, res: Response, next: NextFunction) => {
    new API().OAuth.VK.login(req, res, next);
  });
  
  router.get('/api/oauth/vk/callback', (req: Request, res: Response, next: NextFunction) => {
    new API().OAuth.VK.callback(req, res, next);
  });
  
  router.get('/api/oauth/ok', (req: Request, res: Response, next: NextFunction) => {
    new API().OAuth.OK.login(req, res, next);
  });
  
  router.get('/api/oauth/ok/callback', (req: Request, res: Response, next: NextFunction) => {
    new API().OAuth.OK.callback(req, res, next);
  });
  

}