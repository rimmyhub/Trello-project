const { Board, User } = require('../models');
const { Op, Sequelize } = require('sequelize');
const BoardShare = require('../models');
class BoardsRepository {
  createBoard = async ({ userId, name, color, description }) => {
    return await Board.create({
      userId,
      name,
      color,
      description,
    });
  };

  // 공유자는 수정 불가
  updateBoard = async ({ userId, boardId, name, color, description }) => {
    return await Board.update(
      { name, color, description },
      { where: { [Op.and]: [{ userId }, { boardId }] } },
    );
  };

  // 아이디 찾기
  findBoardById = async ({ boardId }) => {
    return await Board.findOne({ where: { boardId } });
  };

  // 삭제
  deleteBoard = async ({ userId, boardId }) => {
    return await Board.destroy({
      where: { [Op.and]: [{ userId }, { boardId }] },
    });
  };

  // // 보드 초대
  // findByEmail = async (email) => {
  //   return await User.findOne({ where: { email } });
  // };

  // createBoardShare = async (userId, boardId) => {
  //   return await BoardShare.create({ userId, boardId });
  // };
}
module.exports = BoardsRepository;
