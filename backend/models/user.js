import db from "../config/db.js"; // 데이터베이스 연결 객체 가져오기

// 이메일로 사용자 찾기 함수
export const findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?"; // 이메일 조건으로 사용자 검색 쿼리
    const [rows] = await db.query(query, [email]); // 쿼리 실행 및 결과 저장
    return rows[0]; // 첫 번째 결과 반환 (사용자 정보)
  } catch (err) {
    console.error("Error in findUserByEmail query:", err.message); // 에러 메시지 로그
    throw err; // 에러를 상위로 전달
  }
};

// 새로운 사용자 생성 함수
export const createUser = async (username, email, passwordHash) => {
  try {
    const query =
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)"; // 사용자 추가 쿼리
    const [result] = await db.query(query, [username, email, passwordHash]); // 쿼리 실행 및 결과 저장
    return result; // 삽입 결과 반환 (생성된 ID 등 포함)
  } catch (err) {
    console.error("Error in createUser query:", err.message); // 에러 메시지 로그
    throw err; // 에러를 상위로 전달
  }
};
