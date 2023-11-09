import { Router, Request, Response } from 'express';
import LeaderboardController from '../controllers/leaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

// router.get(
//   '/',
//   (req: Request, res: Response) => leaderboardController.leaderBoard(req, res),
// );

router.get(
  '/home',
  (req: Request, res: Response) => leaderboardController.leaderBoard(req, res),
);

router.get(
  '/away',
  (req: Request, res: Response) => leaderboardController.leaderBoard(req, res),
);

export default router;
