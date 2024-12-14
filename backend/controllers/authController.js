import { validateRegister, validateLogin } from '../utils/validation.js';
import { createUser, findUserByEmail } from '../models/user.js';
import { makeHashPassword, verifyHashPassword } from '../utils/passwordUtils.js';
import { generateAccessToken } from '../config/jwt.js';
import { validateRegister, validateLogin } from "../utils/validation.js";
import {
  makeHashPassword,
  verifyHashPassword,
} from "../utils/passwordUtils.js";
import { generateAccessToken } from "../config/jwt.js";

const register = async (req, res) => {
  const { username, email, password } = req.body;

  const { error } = validateRegister({ username, email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: 'Email already in use.' });
    }

    const hashedPassword = makeHashPassword(password);
    await createUser(username, email, hashedPassword);
  } catch{
    res.status(500).json({ message: 'Internal server error.' });
  }
}


const login = async (req, res) => {
  const { email, password } = req.body;

  const { error } = validateLogin({ email, password });
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
  const user = await findUserByEmail(email);
  if (!user) {
    return res.status(404).json({ message: 'User not found.' });
  }
    const isPasswordValid  = verifyHashPassword(user.password_hash, password);


      if (!isPasswordValid ) {
        res.status(401).json({ message: '비밀번호가 일치하지 않습니다.' });
      }

    const accessToken = generateAccessToken({ id: user.user_id });
    res.cookie("accessToken", accessToken, {
      httpOnly: true, // 클라이언트에서 JavaScript로 쿠키 접근 방지
      secure: process.env.NODE_ENV === "production", // HTTPS 환경에서만 쿠키 전송
      sameSite: "strict", // 동일한 도메인 요청만 허용
      maxAge: 60 * 60 * 1000, // 쿠키 수명: 1시간
    });
    res.status(200).json({ message: "Login successful.", accessToken });
  } catch {
    res.status(500).json({ message: "Internal server error" });
  }
};

  const logout = (req, res) => {
    res.clearCookie('accessToken');
    res.status(200).json({ message: 'Logged out successfully.' });
  };


const extendSession = (req, res) => {
  const userId = req.user.id;
  const maxTotalDuration = 24 * 60 * 60; // 최대 연장 시간: 24시간 (초 단위)
  const duration = req.body.duration; // 요청된 연장 시간 (초 단위)

  // 허용된 연장 시간 검증 (예: 15분, 30분, 1시간)
  const validDurations = [15 * 60, 30 * 60, 60 * 60]; // 15분, 30분, 1시간
  if (!validDurations.includes(duration)) {
    return res.status(400).json({ message: 'Invalid duration.' });
  }

  // 사용자 세션 데이터 가져오기
  const query = 'SELECT total_extended_time FROM user_sessions WHERE user_id = ?';
  db.query(query, [userId], (err, results) => {
    if (err || results.length === 0) {
      console.error('Error fetching session data:', err);
      return res.status(500).json({ message: 'Internal server error.' });
    }

    const totalExtendedTime = results[0]?.total_extended_time || 0;

    // 최대 연장 시간 초과 여부 확인
    if (totalExtendedTime + duration > maxTotalDuration) {
      return res.status(403).json({ message: 'Maximum session duration exceeded.' });
    }

    // 새로운 Access Token 생성
    const newToken = generateAccessToken({ id: userId }, { expiresIn: `${duration / 60}m` });

    // 세션 연장 시간 업데이트
    const updateQuery = `
      UPDATE user_sessions 
      SET total_extended_time = total_extended_time + ? 
      WHERE user_id = ?
    `;
    db.query(updateQuery, [duration, userId], (updateErr) => {
      if (updateErr) {
        console.error('Error updating session data:', updateErr);
        return res.status(500).json({ message: 'Internal server error.' });
      }

      res.status(200).json({ message: 'Session extended.', accessToken: newToken });
    });
  });
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id; // authenticateToken 미들웨어에서 설정된 user 정보
    const query = 'SELECT username, email FROM users WHERE user_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err || results.length === 0) {
        console.error('Error fetching user data:', err);
        return res.status(404).json({ message: 'User not found.' });
      }
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
};




export { register, login, logout, extendSession, getCurrentUser};