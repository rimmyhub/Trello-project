const express = require('express');
const auth = require('../middleware/auth.middleware');

const BoardsController = require('../controllers/boards.controller');
const BoardsRouter = express.Router();

const boardsController = new BoardsController();

// 보드 생성
router.post('/board', auth, boardsController.createBoard);

// 보드 수정
router.put('/board/:boardId', auth, boardsController.updateBoard);

// 보드 삭제
router.delete('/board/:boardId', auth, boardsController.deleteBoard);

// 보드 초대
router.post('/board/:boardId/invite', auth, boardsController.inviteBoard);

module.exports = BoardsRouter;
