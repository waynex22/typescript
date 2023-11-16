// index.ts
import express from 'express';
import path from 'path';
import gameController from './controller/Game.Controller';

const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/game/play', gameController.main.bind(gameController));

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
