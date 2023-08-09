const express = require('express');
const router = express.Router();

const AuthMiddleware = require('../middleware/auth.middleware');
const auth = new AuthMiddleware();

const CardsController = require('../controllers/cards.controller');
const cardsController = new CardsController();

router.get('/:columnId/cards/:cardId', cardsController.getCard);

router.post('/cards',auth.verifyAccessToken, cardsController.createCard);

router.put('/:columnId/cards/:cardId',auth.verifyAccessToken, cardsController.updateCard);

router.delete('/:columnId/cards/:cardId',auth.verifyAccessToken, cardsController.deleteCard);

router.fetch('/:columnId/cards/:cardId',auth.verifyAccessToken, cardsController.column);

module.exports = router;
