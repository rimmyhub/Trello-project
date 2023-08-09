const BoardsRepository = require('../repositories/boards.repository');
// const color = require('../models/board');
// boardShare model에 userId가 있으니 user model은 필요 없는게 맞나?
const { Board, BoardShare } = require('../models');

class BoardsService {
  boardsRepository = new BoardsRepository();

  // 보드 생성
  createBoard = async ({ userId, name, color, description }) => {
    try {
      await this.boardsRepository.createBoard({
        userId,
        name,
        color,
        description,
      });
      return { code: 200, message: '보드 작성이 완료되었습니다.' };
    } catch (err) {
      throw { code: 500, message: '예기치 못한 에러가 발생했습니다.' };
    }
  };

  // 보드 수정
  updateBoard = async ({ userId, boardId, name, color, description }) => {
    const targetBoard = await this.boardsRepository.findBoardById({ boardId });

    if (!targetBoard) throw { code: 400, message: '보드가 존재하지 않습니다.' };

    try {
      await this.boardsRepository.updateBoard({
        userId,
        boardId,
        name,
        color,
        description,
      });

      return { code: 200, message: '보드 수정이 완료되었습니다.' };
    } catch (error) {
      throw { code: 400, message: '데이터 형식이 올바르지 않습니다.' };
    }
  };

  // 보드 삭제
  deleteBoard = async ({ boardId, userId }) => {
    const board = await this.boardsRepository.findBoardById({ boardId });

    if (!boardId) {
      throw { code: 400, message: '보드가 존재하지 않습니다.' };
    }
    console.log(board);

    if (board.userId !== userId) {
      throw { code: 403, message: '권한이 없습니다.' };
    }

    try {
      await this.boardsRepository.deleteBoard({ boardId, userId });
      return { code: 200, message: '보드를 삭제하였습니다.' };
    } catch (error) {
      throw { code: 400, message: '데이터 형식이 올바르지 않습니다.' };
    }
  };

  inviteBoard = async ({ email, boardId }) => {
    const invitedUser = await this.boardsRepository.findByEmail({ email });

    if (!invitedUser) {
      throw { code: 400, message: '초대할 유저가 존재하지 않습니다.' };
    }
    if (!boardId) {
      throw { code: 400, message: '보드가 존재하지 않습니다.' };
    }

    const inviteData = await this.boardsRepository.createBoardUser(invitedUser.userId, boardId);

    return inviteData;
  };
}

module.exports = BoardsService;
