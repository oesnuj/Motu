import jwt from "jsonwebtoken";

// 환경 변수에서 JWT 비밀키와 만료 시간 가져오기
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_TOKEN_EXPIRATION;

/**
 * 액세스 토큰 생성 함수
 * @param {Object} payload - JWT에 포함될 사용자 데이터 (예: user ID)
 * @param {string|number} expiresIn - 토큰 만료 시간 (기본값: 환경 변수에서 설정된 값)
 * @returns {string} - 생성된 JWT 액세스 토큰
 */
export const generateAccessToken = (
  payload,
  expiresIn = JWT_ACCESS_TOKEN_EXPIRATION,
) => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn });
};
