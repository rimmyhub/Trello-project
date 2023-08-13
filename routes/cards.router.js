const express = require('express');
const CardRouter = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const CardsController = require('../controllers/cards.controller');
const cardsController = new CardsController();

// 카드 전체 조회
CardRouter.get('/cards/:cardId', cardsController.getAllCard);

// 카드 상세 조회
CardRouter.get('/cards/:columnId/cards/:cardId', cardsController.getCard);

// 카드 작성
CardRouter.post('/cards/:columnId', auth.verifyAccessToken, cardsController.createCard);

// 카드 수정
CardRouter.put('/cards/:cardId', auth.verifyAccessToken, cardsController.updateCard);

// 카드 삭제
CardRouter.delete(
  '/cards/:columnId/cards/:cardId',
  auth.verifyAccessToken,
  cardsController.deleteCard,
);

// 칼럼 아이디 수정
// 팀원들에게 여쭤보기
CardRouter.patch(
  '/:columnId/cards/:cardId',
  auth.verifyAccessToken,
  cardsController.columnIdModify,
);

// 순서 바꾸고 디비 저장하는 법

module.exports = CardRouter;
