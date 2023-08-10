const BoardSharesRepository = require('../repositories/board-shares.repository');

class BoardSharesService {
  boardSharesRepository = new BoardSharesRepository();

  // // 전체 유저 찾기
  // findAllUser = async () => {
  //   const findUser = await this.boardSharesRepository.findAllUser();
  //   return findUser;
  // };

  // invitedUser = async (invitedUser) => {
  //   const foundInvitedUser = await this.boardSharesRepository.findInvitedUser(invitedUser);
  //   return foundInvitedUser;
  // };

  // // 이미 초대된 사용자 찾기
  // existingShareUser = async (userId, boardId) => {
  //   const boardShareUser = await this.boardSharesRepository.existingShareUser(userId, boardId);
  //   return boardShareUser;
  // };

  // // 사용자 초대하기
  // shareUserCreate = async (userId, boardId, status, invitedUser) => {
  //   const shareUser = await this.boardSharesRepository.shareUserCreate(
  //     userId,
  //     boardId,
  //     status,
  //     invitedUser,
  //   );
  //   return shareUser;
  // };

  // 공유 상태 변경하기
  shareStatusModify = async (userId, status) => {
    const shareStatusModify = await this.boardSharesRepository.shareStatusModify(userId, status);
    return shareStatusModify;
  };
}

module.exports = BoardSharesService;
