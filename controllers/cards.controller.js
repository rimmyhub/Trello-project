const CardService = require('../services/cards.service');

class CardController {
  cardService = new CardService();

  getCard = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { code, result } = await this.cardService.findCard({ columnId, cardId });
      return res.status(code).json({ cards: result });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };

  createCard = async (req, res) => {
    try {
      const { columnId, name, color, description, startDate, dueDate } = req.body;
      const { userId } = res.locals.user;
      if (!['red', 'blue', 'green', 'yellow'].includes(type)) {
        return res.status(400).json({ message: '알맞은 타입을 지정해주세요' });
      }
      const { code, message } = await this.cardService.createCard({
        columnId,
        userId,
        name,
        color,
        description,
        startDate,
        dueDate,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };

  updateCard = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { name, color, description, dueDate } = req.body;
      const { userId } = res.locals.user;
      const { code, message } = await this.cardService.updateCard({
        columnId: columnId,
        cardId: cardId,
        userId: userId,
        name,
        color,
        description,
        startDate,
        dueDate,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };

  deleteCard = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { userId } = res.locals.user;
      const { code, message } = await this.cardService.deleteCard({ columnId, cardId, userId });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };

  column = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { code, message } = await this.cardService.updateColumn({
        columnId,
        cardId: cardId,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };
}

module.exports = CardController;
