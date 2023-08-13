const { Board, User, BoardShare } = require('../models');
const { Op, Sequelize } = require('sequelize');
class BoardsRepository {
  findAllBoard = async () => {
    return await Board.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
  };

  // 보드 상세 조회
  findBoardById = async ({ boardId }) => {
    return await Board.findOne({ where: { boardId } });
  };

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

  // 보드 초대
  findName = async ({ name }) => {
    return await User.findOne({ where: { name } });
  };

  inviteBoard = async ({ userId, boardId }) => {
    return await BoardShare.create({ userId, boardId });
  };

  // 보드 초대 조회
  shareBoard = async ({ boardId }) => {
    console.log(boardId);
    return await BoardShare.findAll({
      where: { boardId: +boardId },
      include: [
        {
          model: User,
        },
      ],
    });
  };
}
module.exports = BoardsRepository;
