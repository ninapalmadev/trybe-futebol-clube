import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';
import tokenValidation from '../middlewares/tokenValidation';

const router = Router();
const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));
router.patch(
  '/:id/finish',
  tokenValidation.validateToken,
  (req: Request, res: Response) => matchesController.finishedMatches(req, res),
);

export default router;
