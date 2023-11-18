import express, { Router } from 'express';
import gamePlayRouter from './gamePlay.router';
import siteRouter from './site.router';
const router: Router = express.Router();

router.use('/game', gamePlayRouter);
router.use('/', siteRouter);

export default router;
