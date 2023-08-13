const express = require('express');
const CardRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const CardsController = require('../controllers/cards.controller');
const cardsController = new CardsController();

// 칼럼 으로 조회
// CardRouter.get('/cards/:columId', cardsController.getColumCard);

// 카드 단일 조회
CardRouter.get('/cards/:cardId', cardsController.getAllCard);

// 카드 상세 조회
CardRouter.get('/cards/:columnId/cards/:cardId', cardsController.getCard);

// 카드 작성
CardRouter.post('/cards/:columnId', auth.verifyAccessToken, cardsController.createCard);

// 카드 수정
CardRouter.put('/cards/:cardId', auth.verifyAccessToken, cardsController.updateCard);

// 카드 삭제
CardRouter.delete('/cards/:cardId', auth.verifyAccessToken, cardsController.deleteCard);

// 카드 공유
CardRouter.post('/cards/:cardId/share', auth.verifyAccessToken, cardsController.inviteCard);

// 칼럼 아이디 수정
// 팀원들에게 여쭤보기
CardRouter.patch(
  '/:columnId/cards/:cardId',
  auth.verifyAccessToken,
  cardsController.columnIdModify,
);

module.exports = CardRouter;
