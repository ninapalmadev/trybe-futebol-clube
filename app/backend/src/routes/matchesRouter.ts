import { Router, Request, Response } from 'express';
import MatchesController from '../controllers/matchesController';

const router = Router();
const matchesController = new MatchesController();

router.get('/', (req: Request, res: Response) => matchesController.findAll(req, res));

export default router;
