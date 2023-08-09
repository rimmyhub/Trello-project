const express = require('express');
const cookieParser = require('cookie-parser');
<<<<<<< HEAD
=======
const userRouter = require('./routes/users.router');
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a
const boardRouter = require('./routes/boards.router');

const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cookieParser());

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(express.static('assets'));

<<<<<<< HEAD
app.use('/', [boardRouter]);
=======
app.use('/', [boardRouter, userRouter]);
>>>>>>> f747e1ce018222c019e478fc48166ba9ced9fc2a

app.listen(PORT, () => {
  console.log(PORT, '포트 번호로 서버가 실행되었습니다.');
});
