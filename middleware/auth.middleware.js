const jwt = require('jsonwebtoken');
const { RefreshToken } = require('../models');

class AuthMiddleware {
  //엑세스토큰 생성
  createAccessToken = (userId) => {
    const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_KEY, { expiresIn: '30m' });
    return accessToken;
  };

  // 리프레쉬 토큰 생성
  createRefreshToken = () => {
    const refreshToken = jwt.sign({}, process.env.REFRESH_TOKEN_KEY, { expiresIn: '1d' });
    return refreshToken;
  };

  //엑세스 토큰 검증
  validAccessToken = (accessToken) => {
    try {
      jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return true;
    } catch (err) {
      return false;
    }
  };

  // 리프레쉬 토큰 검증
  validRefreshToken = (refreshToken) => {
    try {
      jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);
      return true;
    } catch (err) {
      return false;
    }
  };

  //엑세스 토큰에서 payload 불러오기
  getAccessTokenPayload = (accessToken) => {
    try {
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_KEY);
      return payload;
    } catch (err) {
      return null;
    }
  };

  // 엑세스 토큰 확인
  verifyAccessToken = async (req, res, next) => {
    let { accessToken, refreshToken } = req.cookies;
    console.log(accessToken);
    console.log(refreshToken);
    if (!refreshToken)
      return res.status(400).json({ message: 'Refresh Token이 존재하지 않습니다' });
    if (!accessToken) return res.status(400).json({ message: 'Access Token이 존재하지 않습니다' });

    // 엑세스 토큰이 유효한가?
    const isAccessTokenValid = this.validAccessToken(accessToken);
    // 리프레쉬 토큰이 유효한가?
    const isRefreshTokenValid = this.validRefreshToken(refreshToken);

    if (!isRefreshTokenValid)
      return res.status(419).json({ message: 'Refresh Token이 만료되었습니다' });

    if (!isAccessTokenValid) {
      const tokenInfo = await RefreshToken.findOne({ where: { refreshToken } });
      if (tokenInfo) return res.status(419).json({ message: '서버에 Refresh Token이 없습니다' });

      // 재발급
      accessToken = this.createAccessToken(tokenInfo.userId);
      res.cookie('accessToken', accessToken);
      console.log('Access Token 재발급 성공');
    }
    res.locals.user = this.getAccessTokenPayload(accessToken);
    next();
  };
}

module.exports = AuthMiddleware;
