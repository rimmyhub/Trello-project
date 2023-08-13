const { Card, CardShare, User, Column, Board } = require('../models');

class CardRepository {
  getColum = async (columnId) => {
    return await Card.findOne({ where: { columnId } });
  };

  // 카드 단일 조회
  findAllCard = async (cardId) => {
    return await Card.findOne({
      where: { cardId },
      include: [
        {
          model: Column,
          include: [
            {
              model: Board,
            },
          ],
        },
      ],
    });
  };

  // 카드 조회
  findCard = async (columnId, cardId) => {
    return await Card.findOne({ where: { columnId, cardId } });
  };

  //카드 생성
  createOne = async ({ columnId, userId, name, color, description, startDate, dueDate }) => {
    return await Card.create({ columnId, userId, name, color, description, startDate, dueDate });
  };

  // 카드 수정
  updateOne = async ({ userId, cardId, name, color, description, startDate, dueDate }) => {
    return await Card.update(
      { userId, name, color, description, startDate, dueDate },
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

  // 유저 이름
  findName = async ({ name }) => {
    return await User.findOne({ where: { name } });
  };

  // 카드 초대
  inviteCard = async ({ cardId, userId }) => {
    return await CardShare.create({ userId, cardId });
  };
}

module.exports = CardRepository;
