const CardService = require('../services/cards.service');

class CardController {
  cardService = new CardService();

  // getColumCard = async (req, res) => {
  //   try {
  //     const { columnId } = req.params;
  //     const findCard = await this.cardService.getColum(columnId);
  //     res.status(200).json({ findCard });
  //   } catch (err) {
  //     console.error(err.name, ':', err.message);
  //   }
  // };

  // 카드 단일 조회
  getAllCard = async (req, res) => {
    try {
      const { cardId } = req.params;
      const findCard = await this.cardService.findAllCard(cardId);
      res.status(200).json({ findCard });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ massage: `${err.message}` });
    }
  };

  // 특정 카드 조회
  getCard = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const findCard = await this.cardService.findCard(columnId, cardId);
      res.status(200).json({ findCard });
    } catch (error) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ massage: `${err.message}` });
    }
  };

  // 카드 생성
  createCard = async (req, res) => {
    try {
      const { columnId } = req.params;
      const { name, color, description, startDate, dueDate } = req.body;
      const { userId } = res.locals.user;

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

  // 카드 수정
  updateCard = async (req, res) => {
    try {
      const { cardId } = req.params;
      const { name, color, description, startDate, dueDate } = req.body;
      const { userId } = res.locals.user;
      const { code, message } = await this.cardService.updateCard({
        cardId,
        userId,
        name,
        color,
        description,
        startDate,
        dueDate,
      });
      return res.status(code).json({ message });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ massage: `${err.message}` });
    }
  };

  // 카드 삭제
  deleteCard = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { userId } = res.locals.user;
      const { code, message } = await this.cardService.deleteCard({ columnId, cardId, userId });
      return res.status(code).json({ message });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ massage: `${err.message}` });
    }
  };

  // 칼럼 수정
  columnIdModify = async (req, res) => {
    try {
      const { columnId, cardId } = req.params;
      const { userId } = res.locals.user;
      const { code, message } = await this.cardService.updateColumn({
        columnId,
        userId,
        cardId,
      });
      return res.status(code).json({ message });
    } catch (err) {
      if (err.code) return res.status(err.code).json({ message: err.message });
      console.error(err);
      res.status(500).send('에러 발생');
    }
  };

  // 보드 초대
  inviteCard = async (req, res, next) => {
    console.log(req.body);
    try {
      const { name } = req.body;
      const { cardId } = req.params;
      const { code, message } = await this.cardService.inviteCard({
        name,
        cardId,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };
}

module.exports = CardController;
