import express from 'express';
import {
  register,
  login,
  logout,
  extendSession,
  getCurrentUser,
} from '../controllers/authController.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const authRouter  = express.Router();

// 회원가입
authRouter.post('/register', register);

// 로그인
authRouter.post('/login', login);

// 로그아웃
authRouter.post('/logout', authenticateToken, logout);

//사용자 정보 받기
authRouter.get('/me', authenticateToken ,getCurrentUser);

//로그인 세션 연장하기
authRouter.post('/extend', authenticateToken, extendSession);

export default authRouter ;
