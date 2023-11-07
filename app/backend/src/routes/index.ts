import { Router } from 'express';
import teamsRouter from './teamRouter';
import userRouter from './userRouter';
import matchesRouter from './matchesRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);
router.use('/matches', matchesRouter);

export default router;
