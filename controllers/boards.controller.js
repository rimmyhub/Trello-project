const BoardsService = require('../services/boards.service');
const color = require('../models/board');

class BoardsController {
  boardsService = new BoardsService();

  handleError(res, error) {
    if (error.code) {
      return res.status(error.code).json({ message: error.message });
    }
    console.error(error);
    return res.status(500).send('알 수 없는 에러가 발생');
  }

  // 보드 전체
  getAllBoard = async (req, res) => {
    try {
      const { code, data } = await this.boardsService.findAllBoard();
      // const { code, message } = { code: 200, message: data };
      // const code = 200
      // const message = error
      return res.status(code).json({ data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 보드 상세 조회
  getBoard = async (req, res) => {
    const { boardId } = req.params;
    try {
      const { code, data } = await this.boardsService.findBoard({ boardId });
      return res.status(code).json({ data });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 보드 생성
  createBoard = async (req, res, next) => {
    try {
      const { name, description, color } = req.body;
      const { userId } = res.locals.user;
      const { code, message } = await this.boardsService.createBoard({
        userId,
        name,
        color,
        description,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 아이디 찾기
  // findBoardById = async (req, res, next) => {
  //   const { boardId } = req.params;

  //   const { code, message } = await this.boardsService.findBoardById({
  //     boardId,
  //   });
  // };

  // 보드 수정
  updateBoard = async (req, res, next) => {
    try {
      const { name, color, description } = req.body;
      const { boardId } = req.params;
      const { userId } = res.locals.user;
      const { code, message } = await this.boardsService.updateBoard({
        userId,
        boardId,
        name,
        color,
        description,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 보드 삭제
  deleteBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { userId } = res.locals.user;
      const { code, message } = await this.boardsService.deleteBoard({
        boardId,
        userId,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 보드 초대
  inviteBoard = async (req, res, next) => {
    console.log(req.body);
    try {
      const { name } = req.body;
      const { boardId } = req.params;
      const { code, message } = await this.boardsService.inviteBoard({
        name,
        boardId,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };

  // 보드 초대 조회
  inviteShareBoard = async (req, res, next) => {
    try {
      const { boardId } = req.params;
      const { code, message } = await this.boardsService.inviteShareBoard({
        boardId,
      });
      return res.status(code).json({ message });
    } catch (error) {
      return this.handleError(res, error);
    }
  };
}
module.exports = BoardsController;
