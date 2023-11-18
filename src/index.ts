// index.ts
import express from 'express';
import path from 'path';
import gameController from './controller/Game.Controller';
import router from './router';
const app = express();
const port = 3000;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(router)
app.get('/', gameController.main.bind(gameController));
app.use(express.static(path.join(__dirname, 'public')))
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
