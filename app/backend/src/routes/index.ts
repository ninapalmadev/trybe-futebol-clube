import { Router } from 'express';
import teamsRouter from './teamRouter';

const router = Router();

router.use('/teams', teamsRouter);

export default router;
