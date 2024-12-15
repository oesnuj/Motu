import express from "express";
import {
  getMarketSummary,
  getStocks,
  processTrade,
  getPortfolio,
} from "../controllers/stockController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

// 마켓 요약 정보 가져오기
router.get("/market-summary", authenticateToken, getMarketSummary);

// 주식 정보 가져오기
router.get("/stocks", authenticateToken, getStocks);

// 거래 처리
router.post("/trade", authenticateToken, processTrade);

// 사용자 포트폴리오 가져오기
router.get("/portfolio/:userId", authenticateToken, getPortfolio);

export default router;
