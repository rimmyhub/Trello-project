const { BoardShare, User } = require('../models');

class BoardSharesRepository {
  // // 유저 아이디 찾기
  // findAllUser = async () => {
  //   const findUser = await User.findAll();
  //   return findUser;
  // };

  // findInvitedUser = async (invitedUser) => {
  //   const invite = await BoardShare.findOne({
  //     where: {
  //       invitedUser,
  //     },
  //   });
  //   return invite;
  // };

  // // 이미 초대된 사용자 조회
  // existingShareUser = async (userId, boardId) => {
  //   const shareUser = await BoardShare.findOne({
  //     where: {
  //       userId,
  //       boardId,
  //     },
  //   });
  //   return shareUser;
  // };

  // // 공유 사용자 초대
  // shareUserCreate = async (userId, boardId, status, invitedUser) => {
  //   const shareUser = await BoardShare.create({
  //     userId,
  //     boardId,
  //     status,
  //     invitedUser,
  //   });
  //   return shareUser;
  // };

  shareStatusModify = async (userId, status) => {
    const shareStatusModify = await BoardShare.update(
      {
        status,
      },
      { where: { userId } },
    );
    return shareStatusModify;
  };
}

module.exports = BoardSharesRepository;
