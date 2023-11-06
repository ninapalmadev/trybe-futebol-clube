import { Request, Response, NextFunction } from 'express';
import JWT from '../utils/JWT';

export default class tokenValidation {
  static validateToken(req: Request, res: Response, next: NextFunction): Response | void {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const token = JWT.verify(authorization);
      res.locals.user = token;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  }
}
