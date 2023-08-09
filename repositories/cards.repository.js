const { Cards } = require('../models');

class CardRepository {
  findOne = async (cardId) => {
    return await Cards.findOne({
      attributes: ['cardId', 'columnId', 'name', 'description', 'startDate', 'dueDate'],
      where: { cardId: cardId },
    });
  };

  createOne = async (columnId, name, color, description, startDate, dueDate) => {
    return await Cards.create({ columnId, name, color, description, startDate, dueDate });
  };

  updateOne = async (name, color, description, startDate, dueDate, cardId) => {
    return await Cards.update(
      { name, color, description, startDate, dueDate },
      { where: { cardId } }
    );
  };

  deleteOne = async (cardId) => {
    return await Cards.destroy({ where: { cardId } });
  };

  updateColumn = async (columnId, cardId) => {
    return await Cards.update(columnId, { where: { cardId } });
  };
}

module.exports = CardRepository;
