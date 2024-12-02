import jwt from 'jsonwebtoken';

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;

// JWT 검증 미들웨어
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <Token>

  if (!token) {
    return res.status(401).json({ message: 'Access token required.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_ACCESS_TOKEN_SECRET); // 서명 검증
    req.user = decoded; // 사용자 정보를 요청 객체에 추가
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired access token.' });
  }
};
