const express = require('express');
const BoardSharesRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const BoardSharesController = require('../controllers/board-shares.controller');
const auth = new AuthMiddleware();

const boardSharesController = new BoardSharesController();

// // 카드 공유 사용자 추가
// BoardSharesRouter.post(
//   '/board-shares/:boardId',
//   auth.verifyAccessToken,
//   boardSharesController.boardShareUser,
// );

// 상태 수정
BoardSharesRouter.patch(
  '/board-shares/:boardId',
  auth.verifyAccessToken,
  boardSharesController.boardShareStatus,
);

module.exports = BoardSharesRouter;
