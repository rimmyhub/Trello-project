const { Card } = require('../models');

class CardRepository {
  // 카드 전체 조회
  findAllCard = async (cardId) => {
    return await Card.findOne({ where: { cardId } });
  };

  // 카드 조회
  findCard = async (columnId, cardId) => {
    return await Card.findOne({ where: { columnId, cardId } });
  };

  // 카드 조회
  findCardId = async ({ cardId }) => {
    return await Card.findOne({ where: { cardId } });
  };

  //카드 생성
  createOne = async ({ columnId, userId, name, color, description, startDate, dueDate }) => {
    return await Card.create({ columnId, userId, name, color, description, startDate, dueDate });
  };

  // 카드 수정
  updateOne = async ({
    columnId,
    userId,
    cardId,
    name,
    color,
    description,
    startDate,
    dueDate,
  }) => {
    return await Card.update(
      { columnId, userId, name, color, description, startDate, dueDate },
      { where: { cardId, userId } },
    );
  };

  // 카드 삭제
  deleteOne = async ({ columnId, cardId, userId }) => {
    return await Card.destroy({ where: { columnId, cardId, userId } });
  };

  // 카드 수정
  updateColumn = async ({ columnId, userId, cardId }) => {
    return await Card.update({ columnId }, { where: { userId, cardId } });
  };
}

module.exports = CardRepository;
