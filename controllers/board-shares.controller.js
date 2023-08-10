const BoardSharesService = require('../services/board-shares.service');

class BoardSharesController {
  boardSharesService = new BoardSharesService();

  // boardShareUser = async (req, res) => {
  //   try {
  //     const { userId } = res.locals.user;
  //     const { boardId } = req.params;
  //     const { status, invitedUser } = req.body;

  //     const findUser = await this.boardSharesService.findAllUser();
  //     if (!findUser)
  //       return res.status(404).json({ message: '회원이 아닙니다. 회원가입을 진행해주세요' });

  //     const existingShareUser = await this.boardSharesService.existingShareUser(userId, boardId);
  //     if (existingShareUser) return res.status(404).json({ message: '이미 초대된 사용자입니다' });

  //     const shareUserCreate = await this.boardSharesService.shareUserCreate(
  //       userId,
  //       boardId,
  //       status,
  //       invitedUser,
  //     );
  //   } catch (err) {
  //     console.error(err.name, ':', err.message);
  //     return res.status(400).json({ message: `${err.message}` });
  //   }
  // };

  // 보드 공유자 생성
  boardShareUser = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { boardId } = req.params;
      const { status, invitedUser } = req.body;

      const findUser = await this.boardSharesService.findAllUser();
      if (!findUser)
        return res.status(404).json({ message: '회원이 아닙니다. 회원가입을 진행해주세요' });

      if (invitedUser) {
        return res.status(404).json({ message: '이미 초대된 사용자 입니다' });
      }

      // 초대 기능 수행
      const shareUserCreate = await this.boardSharesService.shareUserCreate(
        userId,
        boardId,
        status,
        invitedUser,
      );

      return res.json({ message: '초대가 완료되었습니다.' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 보드 공유 상태 수정
  boardShareStatus = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { status } = req.body;

      const shareStatusModify = await this.boardSharesService.shareStatusModify(userId, status);
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}

module.exports = BoardSharesController;
