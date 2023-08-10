const { Card } = require('../models');
console.log(Card);

class CardRepository {
  findOne = async ({ columnId, cardId }) => {
    return await Card.findOne({
      where: { columnId, cardId },
    });
  };

  createOne = async ({ columnId, userId, name, color, description, startDate, dueDate }) => {
    return await Card.create({ columnId, userId, name, color, description, startDate, dueDate });
  };

  updateOne = async (columnId, userId, name, color, description, startDate, dueDate, cardId) => {
    return await Card.update(
      { columnId, userId, name, color, description, startDate, dueDate },
      { where: { cardId } },
    );
  };

  deleteOne = async (cardId) => {
    return await Card.destroy({ where: { cardId } });
  };

  updateColumn = async (columnId, cardId) => {
    return await Card.update(columnId, { where: { cardId } });
  };
}

module.exports = CardRepository;
