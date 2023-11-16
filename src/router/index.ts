import express, { Router } from 'express';
import gamePlayRouter from './gamePlay.router';

const router: Router = express.Router();

router.use('/game', gamePlayRouter);

export default router;
