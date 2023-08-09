const express = require('express');
const router = express.Router();

const CardsController = require('../controllers/cards.controller');
const cardsController = new CardsController();

router.get('/:columnId/cards/:cardId', cardsController.getCard);
router.post('/cards', cardsController.createCard);
router.put('/:columnId/cards/:cardId', cardsController.updateCard);
router.delete('/:columnId/cards/:cardId', cardsController.deleteCard);
router.fetch('/:columnId/cards/:cardId', cardsController.column);

module.exports = router;
