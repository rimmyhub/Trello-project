const express = require('express');
const UserRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const UsersController = require('../controllers/users.controller');
const usersController = new UsersController();

// 회원가입
UserRouter.post('/signup', usersController.signUp);

//로그인
UserRouter.post('/login', usersController.logIn);

//회원 정보 수정
UserRouter.put('/users', auth.verifyAccessToken, usersController.modifyUser);

//회원 탈퇴
UserRouter.delete('/leave', auth.verifyAccessToken, usersController.deleteUser);

module.exports = UserRouter;
