const express = require('express');
const cookieParser = require('cookie-parser');

const userRouter = require('./routes/users.router');
const boardRouter = require('./routes/boards.router');
const columnRouter = require('./routes/columns.router');
const viewRouter = require('./views/router/index');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));


app.set('view engine', 'ejs');
app.set('view', __dirname + '/views');
app.use(express.static(__dirname + '/views/static'));
app.use('/', viewRouter);

app.use('/', [boardRouter, userRouter]);
app.use('/column', [columnRouter]);

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
