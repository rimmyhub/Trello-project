const { User, RefreshToken } = require('../models');

class UsersRepository {
  //유저 생성
  createUser = async (email, password, name, introduction) => {
    const createUser = await User.create({ email, password, name, introduction });
    return createUser;
  };

  // 유저 아이디 찾기
  findUserById = async (userId) => {
    const findUser = await User.findByPk(userId);
    return findUser;
  };

  findUserByEmail = async (email) => {
    const findUserData = await User.findOne({ where: { email } });
    return findUserData;
  };

  // 전체 조회
  fideAllUser = async () => {
    const findAllUser = await User.findAll();
    return findAllUser;
  };

  //회원 정보 수정
  modifyUserInfo = async (userId, name, introduction) => {
    const modifiedUserData = await User.update(
      {
        name,
        introduction,
      },
      { where: { userId } },
    );
    return modifiedUserData;
  };

  // 회원 탈퇴
  deleteUser = async (userId) => {
    const deleteUser = await User.destroy({ where: { userId } });
    return deleteUser;
  };

  // 리프레쉬토큰 찾기
  findRefreshTokenByUser = async (userId) => {
    const findRefreshToken = await RefreshToken.findOne({ userId });
    return findRefreshToken;
  };

  // 리프레쉬 토큰 삭제
  deleteRefreshToken = async (userId) => {
    const deleteRefreshToken = await RefreshToken.destroy({ where: { userId } });
    return deleteRefreshToken;
  };

  // 리프레쉬 토근 생성
  createRefreshToken = async (refreshToken, userId) => {
    const createdRefreshToken = await RefreshToken.create({ refreshToken, userId });
    return createdRefreshToken;
  };

  // 회원정보 불러오기
  getUserById = async (userId) => {
    return await User.findByPk(userId);
  };
}

module.exports = UsersRepository;
