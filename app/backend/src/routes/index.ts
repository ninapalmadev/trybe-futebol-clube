import { Router } from 'express';
import teamsRouter from './teamRouter';
import userRouter from './userRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', userRouter);

export default router;
