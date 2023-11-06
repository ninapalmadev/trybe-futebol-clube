import { Router, Request, Response } from 'express';
import TeamsController from '../controllers/teamsController';

const router = Router();
const teamsController = new TeamsController();

router.get('/', (req: Request, res: Response) => teamsController.getAllTeams(req, res));
router.get('/:id', (req: Request, res: Response) => teamsController.getIdTeam(req, res));

export default router;
