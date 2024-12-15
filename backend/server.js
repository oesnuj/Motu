import express from "express"; // Express 모듈 임포트
import dotenv from "dotenv"; // 환경 변수(.env 파일) 로드
import cors from "cors"; // Cross-Origin Resource Sharing(CORS) 지원
import healthRouter from "./routes/healthRoute.js"; // 헬스체크 라우터
import authRouter from "./routes/authRoutes.js";
import stockRoutes from "./routes/stockRoutes.js"; // 인증 관련 라우터

// 환경 변수 설정
dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development"; // 현재 실행 환경 설정
const CLIENT_URL =
  NODE_ENV === "production"
    ? process.env.PROD_CLIENT_URL // 프로덕션 환경의 클라이언트 URL
    : process.env.DEV_CLIENT_URL; // 개발 환경의 클라이언트 URL

// CLIENT_URL 미설정 시 경고 출력
if (!CLIENT_URL) {
  console.error(
    "CLIENT_URL is not defined in environment variables. Check your .env file.",
  );
}

// 환경 및 클라이언트 URL 로깅
console.log(`Running in ${NODE_ENV} mode`); // 실행 모드 출력
console.log(`Client URL: ${CLIENT_URL || "Not defined"}`); // 클라이언트 URL 출력

const app = express();

// CORS 설정
const corsOptions = {
  origin: CLIENT_URL || "*", // CLIENT_URL이 없을 경우 모든 도메인 허용 (임시)
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 허용 HTTP 메서드
  credentials: true, // 자격 증명 포함 허용 (쿠키 등)
};
app.use(cors(corsOptions)); // CORS 미들웨어 등록

// JSON 요청 본문 파싱 미들웨어
app.use(express.json());

// 요청 로깅 미들웨어
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`); // 요청 메서드와 URL 로그
  next();
});

// 라우터 연결
app.use("/health", healthRouter); // 헬스체크 엔드포인트
app.use("/auth", authRouter); // 인증 관련 엔드포인트
app.use("/api/stocks", stockRoutes); //주식 관련 엔드포인트

// 프리플라이트 요청(OPTIONS) 처리
app.options("*", (req, res) => {
  res.set("Access-Control-Allow-Origin", CLIENT_URL || "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, Origin, X-Requested-With, Accept",
  );
  res.set("Access-Control-Allow-Credentials", "true");
  res.status(200).end(); // 프리플라이트 요청에 응답
});

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" }); // 리소스가 없을 경우 응답
});

// 전역 오류 핸들러
app.use((err, req, res, next) => {
  console.error(`Error occurred: ${err.stack}`); // 오류 스택 출력
  res.status(500).json({ message: "Internal server error" }); // 500 상태로 응답
});

// 서버 실행
const PORT = process.env.PORT || 3000; // 서버 실행 포트 설정
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // 서버 실행 로그
});
