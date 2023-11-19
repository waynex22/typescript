import express, { Router } from 'express';
import GameController from '../controller/Game.Controller';

const router = Router();
router.get('/', GameController.main);

export default router;
