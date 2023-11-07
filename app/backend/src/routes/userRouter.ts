import { Request, Response, Router } from 'express';
import UsersController from '../controllers/usersController';
import loginValidation from '../middlewares/loginValidation';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const usersController = new UsersController();

router.post(
  '/',
  loginValidation.validateLogin,
  (req: Request, res: Response) => usersController.login(req, res),
);
router.get(
  '/role',
  tokenValidation.validateToken,
  (req: Request, res: Response) => usersController.user(req, res),
);

export default router;
