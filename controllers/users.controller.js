const bcrypt = require('bcrypt');
const UsersService = require('../services/users.service');
const AuthMiddleware = require('../middleware/auth.middleware');

class UsersController {
  usersService = new UsersService();
  authMiddleware = new AuthMiddleware();

  signUp = async (req, res) => {
    try {
      const { email, password, confirm, name, introduction } = req.body;

      // 비밀번호 확인 비밀번호 일치 확인
      if (password !== confirm)
        return res.status(412).json({ message: '암호가 일치하지 않습니다' });

      //해시화 및 생성
      const hashedPassword = await bcrypt.hash(password, 10);
      await this.usersService.createUser(email, hashedPassword, name, introduction);

      res.status(200).json({ message: '회원가입을 완료하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 관리자 로그인
  logIn = async (req, res) => {
    try {
      const { email, password } = req.body;

      // 관리자 회원가입 확인
      const findUser = await this.usersService.findUserAllData(email);

      if (!findUser)
        return res.status(404).json({ message: '회원이 아닙니다. 회원가입을 진행해주세요.' });

      // 비밀번호 입력 실패
      const findUserPassword = await bcrypt.compare(password, findUser.password);
      if (!findUserPassword)
        return res.status(412).json({ message: '비밀번호를 잘못 입력하셨습니다' });

      // 토큰 생성
      const userId = findUser.userId;
      const accessToken = this.authMiddleware.createAccessToken(userId);
      const refreshToken = this.authMiddleware.createRefreshToken();

      //리프레시 토큰을 DB 저장
      await this.usersService.createRefreshToken(refreshToken, userId);

      // 쿠키 저장
      res.cookie('accessToken', accessToken);
      res.cookie('refreshToken', refreshToken);

      res.status(200).json({ message: '로그인 되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };

  // 회원 정보 수정
  modifyUser = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      const { name, introduction } = req.body;

      await this.usersService.modifyUserInfo(userId, name, introduction);
      res.status(200).send({ message: '개인정보를 수정하였습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).send({ message: `${err.message}` });
    }
  };

  //회원 탈퇴
  deleteUser = async (req, res) => {
    try {
      const { userId } = res.locals.user;
      await this.usersService.deleteUser(userId);
      res.status(200).json({ message: '회원 탈퇴가 완료 되었습니다' });
    } catch (err) {
      console.error(err.name, ':', err.message);
      return res.status(400).json({ message: `${err.message}` });
    }
  };
}
module.exports = UsersController;
