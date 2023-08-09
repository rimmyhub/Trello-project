const { Board, User } = require('../models');
const { Op, Sequelize } = require('sequelize');
const BoardShare = require('../models');
class BoardsRepository {
  createBoard = async (userId, name, color, description) => {
    return await Board.create({
      userId,
      name,
      color,
      description,
    });
  };

  updateBoard = async (userId, boardId, name, color, description) => {
    return await Board.update(
      { name, color, description },
      { where: { [Op.and]: [{ userId: BoardShare.userId }, { boardId: BoardShare.boardId }] } },
    );
  };

  deleteBoard = async (userId, boardId) => {
    return await Board.destroy({
      where: { [Op.and]: [{ userId: BoardShare.userId }, { boardId: BoardShare.boardId }] },
    });
  };

  // 보드 초대
  findByEmail = async (email) => {
    return await User.findOne({ where: { email } });
  };

  createBoardShare = async (userId, boardId) => {
    return await BoardShare.create({ userId, boardId });
  };
}
module.exports = BoardsRepository;
