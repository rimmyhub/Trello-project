const BoardsRepository = require('../repositories/boards.repository');
// const color = require('../models/board');
// boardShare model에 userId가 있으니 user model은 필요 없는게 맞나?
const { Board, BoardShare } = require('../models');

class BoardsService {
  boardsRepository = new BoardsRepository();

  findAllBoard = async () => {
    try {
      const data = await this.boardsRepository.findAllBoard();
      return { code: 200, data };
    } catch (err) {
      throw { code: 500, message: '예기치 못한 에러가 발생했습니다.' };
    }
  };

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

  inviteBoard = async ({ name, boardId }) => {
    try {
      const invitedUser = await this.boardsRepository.findName({ name });
      console.log(invitedUser);
      if (!invitedUser) {
        return { code: 404, message: '초대할 유저가 존재하지 않습니다.' };
      }
      if (!boardId) {
        return { code: 404, message: '보드가 존재하지 않습니다.' };
      }
      const userId = invitedUser.userId;
      await this.boardsRepository.inviteBoard({ userId, boardId });

      return { code: 201, message: '보드초대가 완료되었습니다.' };
    } catch (error) {
      console.log(error);
      return { code: 500, message: '서버에러' };
    }
  };

  // 보드 초대 조회
  inviteShareBoard = async ({ boardId }) => {
    try {
      const invitedShare = await this.boardsRepository.shareBoard({ boardId });
      return { code: 200, message: invitedShare };
    } catch (error) {
      console.log(error);
      throw { code: 400, message: '데이터 형식이 올바르지 않습니다.' };
    }
  };
}

module.exports = BoardsService;
