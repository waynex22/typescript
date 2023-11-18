import express, { Router } from 'express';
import GameController from "../controller/Game.Controller";


const router: Router = express.Router();

router.get('/play', GameController.main);

export default router;