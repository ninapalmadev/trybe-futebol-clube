import { Router } from 'express';
import teamsRouter from './teamRouter';
import loginRouter from './loginRouter';
import matchRouter from './matchesRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/matches', matchRouter);

export default router;
