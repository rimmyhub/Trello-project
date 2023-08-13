const UsersRepository = require('../repositories/users.repository');
const { User } = require('../models');
class UsersService {
  usersRepository = new UsersRepository();

  createUser = async (email, password, name, introduction) => {
    const createUser = await this.usersRepository.createUser(email, password, name, introduction);
    return createUser;
  };

  //아이디를 먼저 검색하고 결과가 없을 경우 이메일을 찾음
  findUserAllData = async (userInfo) => {
    const findUserData =
      (await this.usersRepository.findUserById(userInfo)) ??
      (await this.usersRepository.findUserByEmail(userInfo));

    if (findUserData === null) return false; // 조회 결과 없으면 false
    return findUserData;
  };

  modifyUserInfo = async (userId, name, introduction) => {
    const modifiedUserData = await this.usersRepository.modifyUserInfo(userId, name, introduction);
    return modifiedUserData;
  };

  // 회원 탈퇴
  deleteUser = async (userId) => {
    const deleteUser = await this.usersRepository.deleteUser(userId);
    return deleteUser;
  };

  //리프레쉬 토큰 db 저장
  createRefreshToken = async (refreshToken, userId) => {
    const findRefreshToken = await this.usersRepository.findRefreshTokenByUser(userId);

    // 리프레쉬 토큰이 있으면 삭제
    if (findRefreshToken) {
      await this.usersRepository.deleteRefreshToken(userId);
    }
    // 리프레쉬 토큰 생성
    const createRefreshToken = await this.usersRepository.createRefreshToken(refreshToken, userId);
  };

  // 사용자 정보 메인에 불러오기
  getUserById = async (userId) => {
    try {
      console.log(userId);

      return await this.usersRepository.getUserById(userId);
    } catch (error) {
      throw error;
    }
  };
}

module.exports = UsersService;
