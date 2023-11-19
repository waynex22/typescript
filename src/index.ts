import express from 'express';
import path from 'path';
import { router } from './router/index';

const app = express();
const port = 3000;
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

router(app)
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
