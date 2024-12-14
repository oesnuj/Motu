import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/healthRoute.js";
import authRouter from "./routes/authRoutes.js";

// 환경 변수 설정
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const CLIENT_URL =
  NODE_ENV === "production"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;

if (!CLIENT_URL) {
  console.error(
    "CLIENT_URL is not defined in environment variables. Check your .env file.",
  );
}

// 로깅
console.log(`Running in ${NODE_ENV} mode`);
console.log(`Client URL: ${CLIENT_URL || "Not defined"}`);

const app = express();

// CORS 설정
const corsOptions = {
  origin: CLIENT_URL || "*", // CLIENT_URL이 없을 경우 모든 도메인 허용 (임시)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};

app.use(cors(corsOptions));

// JSON 파싱 미들웨어
app.use(express.json());

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// 라우터 연결
app.use("/health", healthRouter);
app.use("/auth", authRouter);

// 프리플라이트 요청(OPTIONS) 처리
app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", CLIENT_URL || "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  );
  res.set("Access-Control-Allow-Credentials", "true");
  res.status(200).end();
});

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// 전역 오류 핸들러
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.stack}`);
  res.status(500).json({ message: "Internal server error" });
});

// 서버 실행
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
