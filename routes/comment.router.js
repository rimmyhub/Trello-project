const express = require('express');
const commentsRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const CommentsController = require('../controllers/comment.controller');
const commentsController = new CommentsController();

// 댓글 조회
commentsRouter.get('/comments/:commentId', commentsController.findCardComment);

// 댓글 작성
commentsRouter.post('/comments/:cardId', auth.verifyAccessToken, commentsController.cerateComment);

// 댓글 수정
commentsRouter.put(
  '/comments/:commentId',
  auth.verifyAccessToken,
  commentsController.updateComment,
);

//댓글 삭제
commentsRouter.delete(
  '/:cardId/comments/:commentId',
  auth.verifyAccessToken,
  commentsController.deleteComment,
);

module.exports = commentsRouter;
