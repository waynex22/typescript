import express, { Router } from 'express';
import GameController from "../controller/Game.Controller";


const gameRouter: Router = express.Router();

gameRouter.get('/play', GameController.main);

export default gameRouter;