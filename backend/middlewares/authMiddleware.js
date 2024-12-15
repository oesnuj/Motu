import jwt from "jsonwebtoken";

// 환경 변수에서 JWT 비밀키 가져오기
const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

/**
 * JWT 인증 미들웨어
 * @param {Object} req - HTTP 요청 객체
 * @param {Object} res - HTTP 응답 객체
 * @param {Function} next - 다음 미들웨어 호출 함수
 */
export const authenticateToken = (req, res, next) => {
  // Authorization 헤더에서 토큰 추출
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Bearer <Token>

  // 토큰이 없는 경우
  if (!token) {
    return res.status(401).json({ message: "Access token required." });
  }

  try {
    // 토큰 검증 및 디코딩
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET); // 서명 검증
    req.user = decoded; // 디코딩된 사용자 정보를 요청 객체에 추가
    next(); // 다음 미들웨어로 이동
  } catch (err) {
    // 토큰이 유효하지 않거나 만료된 경우
    return res
      .status(403)
      .json({ message: "Invalid or expired access token." });
  }
};
