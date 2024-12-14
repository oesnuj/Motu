import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import healthRouter from "./routes/healthRoute.js";
import authRouter from "./routes/authRoutes.js";

dotenv.config();

const NODE_ENV = process.env.NODE_ENV || "development";
const CLIENT_URL =
  NODE_ENV === "production"
    ? process.env.PROD_CLIENT_URL
    : process.env.DEV_CLIENT_URL;

if (!CLIENT_URL) {
  console.error("CLIENT_URL is not defined in environment variables.");
  process.exit(1);
}

console.log(`Running in ${NODE_ENV} mode`);
console.log(`Client URL: ${CLIENT_URL}`);

const app = express();

const corsOptions = {
  origin: [process.env.PROD_CLIENT_URL, process.env.DEV_CLIENT_URL],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // 쿠키 허용
};

app.options("*", cors(corsOptions));

app.use(express.json());

app.use("/health", healthRouter);
app.use("/auth", authRouter);

// 요청확인 핸들러
app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.url}`);
  next();
});

// 404 핸들러
app.use((req, res, next) => {
  res.status(404).json({ message: "Resource not found" });
});

// 전역 오류 핸들러
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
