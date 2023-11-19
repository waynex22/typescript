import { Express, Request, Response } from 'express';
import gamePlayRouter from './gamePlay.router';
const LocalStorage = require('node-localstorage').LocalStorage;
const localStorage = new LocalStorage('./user');
export const router = (app: Express) => {
    app.get('/', (req: Request, res: Response) => {
        res.render('index');
    });
    app.post('/login', (req,res)=>{
        let name = req.body.name
        localStorage.setItem('name.txt', name);
        res.render('client')
    })
    app.use('/play',gamePlayRouter);
};