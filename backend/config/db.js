import mysql from "mysql2/promise"; // MySQL 연결을 위한 promise 기반 모듈 임포트
import dotenv from "dotenv"; // 환경 변수(.env 파일) 로드를 위한 dotenv 모듈

dotenv.config(); // .env 파일의 환경 변수들을 process.env로 로드

// 데이터베이스 연결 풀 생성
const db = mysql.createPool({
  host: process.env.DB_HOST, // 데이터베이스 호스트 주소
  user: process.env.DB_USER, // 데이터베이스 사용자 이름
  password: process.env.DB_PASSWORD, // 데이터베이스 비밀번호
  database: process.env.DB_NAME, // 데이터베이스 이름
  port: process.env.DB_PORT, // 데이터베이스 포트 번호
  ssl: {
    // SSL 인증서 설정 (보안 연결)
    ca: process.env.SSL_CERT.replace(/\\n/g, "\n"), // .env에서 가져온 인증서 내용 처리
    rejectUnauthorized: true, // 인증되지 않은 SSL 거부 설정
  },
});

// 데이터베이스 연결 및 테스트 쿼리 실행
(async () => {
  try {
    const connection = await db.getConnection(); // 데이터베이스 연결 획득
    console.log("Database connection successful!"); // 연결 성공 로그

    const [rows] = await connection.query("SELECT 1 + 1 AS result"); // 테스트 쿼리 실행
    console.log("Test query result:", rows); // 쿼리 결과 출력

    connection.release(); // 연결 반환 (풀에 반환)
  } catch (err) {
    console.error("Database connection test failed:", err.message); // 연결 실패 시 에러 로그
  }
})();

export default db; // 데이터베이스 풀 객체를 외부로 내보냄
