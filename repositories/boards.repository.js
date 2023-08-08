const { Board } = require('../models');
const { Op, Sequelize } = require('sequelize');
class BoardsRepository {
  createOne = async (data) => {
    return await Board.create(data);
  };

  updateOne = async (data, target) => {
    return await Board.update(data, { where: { [Op.and]: target } });
  };

  deleteOne = async (target) => {
    return await Board.destroy({ where: { [Op.and]: target } });
  };
}
module.exports = BoardsRepository;
