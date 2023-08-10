const express = require('express');
const boardRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const BoardsController = require('../controllers/boards.controller');
const boardsController = new BoardsController();

boardRouter.get('/boards', boardsController.getAllBoard);

// 보드 생성
boardRouter.post('/boards', auth.verifyAccessToken, boardsController.createBoard);

// 보드 수정
boardRouter.put('/boards/:boardId', auth.verifyAccessToken, boardsController.updateBoard);

// 보드 삭제
boardRouter.delete('/boards/:boardId', auth.verifyAccessToken, boardsController.deleteBoard);

module.exports = boardRouter;
