import db from "../config/db.js";

// 마켓 요약 정보 가져오기
export const getMarketSummary = (req, res) => {
  db.query("SELECT * FROM market_summary", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching market summary.");
    }
    res.json(results);
  });
};

// 주식 정보 가져오기
export const getStocks = (req, res) => {
  db.query("SELECT * FROM stocks", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching stocks.");
    }
    res.json(results);
  });
};

// 거래 처리
export const processTrade = (req, res) => {
  const { userId, stockId, type, quantity } = req.body;

  // 요청 값 검증
  if (!userId || !stockId || !type || !quantity) {
    return res.status(400).send("Missing required fields.");
  }

  const tradeQuery =
    type === "buy"
      ? "INSERT INTO trades (user_id, stock_id, quantity, type) VALUES (?, ?, ?, ?)" // 매수
      : "DELETE FROM trades WHERE user_id = ? AND stock_id = ? LIMIT 1"; // 매도

  db.query(
    tradeQuery,
    type === "buy" ? [userId, stockId, quantity, type] : [userId, stockId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error processing trade.");
      }
      res.json({ message: "Trade processed successfully.", results });
    },
  );
};

// 사용자 포트폴리오 가져오기
export const getPortfolio = (req, res) => {
  const { userId } = req.params;

  db.query(
    "SELECT * FROM portfolio WHERE user_id = ?",
    [userId],
    (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Error fetching portfolio.");
      }
      res.json(results);
    },
  );
};
