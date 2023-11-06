import { Request, Response, Router } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();
const teamsController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamsController.getAll(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getById(req, res));

export default router;
