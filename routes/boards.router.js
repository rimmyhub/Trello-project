const express = require('express');
// const auth = require('../middlewares/auth');

const BoardsController = require('../controllers/boards.controller');
const BoardsRouter = express.Router();

const boardsController = new BoardsController();

// 보드 생성
router.post('/board', boardsController.createBoard);

// 보드 수정
router.put('/board/:boardId', boardsController.updateBoard);

// 보드 삭제
router.delete('/board/:boardId', boardsController.deleteBoard);

// 보드 초대
// router.post('/board/:userId', boardsController.createBoard);

module.exports = BoardsRouter;
