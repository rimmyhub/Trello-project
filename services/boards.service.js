const BoardsRepository = require('../repositories/boards.repository');
const color = require('../models/board');

class BoardsService {
  boardsRepository = new BoardsRepository();

  // 보드 생성
  createBoard = async ({ name, color, description }) => {
    try {
      await this.boardsRepository.createOne({
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
  updateBoard = async (name, color, description) => {
    try {
      await this.boardsRepository.putOne({
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
  deleteBoard = async (boardId, userId) => {
    await this.boardsRepository.findOneById(boardId);

    if (!boardId) {
      throw { code: 400, message: '보드가 존재하지 않습니다.' };
    }

    if (boardId.userId !== userId) {
      throw { code: 403, message: '권한이 없습니다.' };
    }

    try {
      await this.boardsRepository.deleteBoard(boardId);
      return { code: 200, message: '보드를 삭제하였습니다.' };
    } catch (error) {
      throw { code: 400, message: '데이터 형식이 올바르지 않습니다.' };
    }
  };
}

module.exports = BoardsService;
