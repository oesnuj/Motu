import { validateRegister, validateLogin } from "../utils/validation.js";
import { createUser, findUserByEmail } from "../models/user.js";
import {
  makeHashPassword,
  verifyHashPassword,
} from "../utils/passwordUtils.js";
import { generateAccessToken } from "../config/jwt.js";
import db from "../config/db.js";

const register = async (req, res) => {
  console.log("Incoming register request:", req.body); // 요청 데이터 확인
  const { username, email, password } = req.body;

  // 입력값 검증
  const { error } = validateRegister({ username, email, password });
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    // 기존 이메일 존재 여부 확인
    const existingUser = await findUserByEmail(email);
    console.log("Checking if user already exists:", existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // 비밀번호 해싱
    const hashedPassword = await makeHashPassword(password);
    console.log("Generated hashed password:", hashedPassword);

    // 새 사용자 생성
    await createUser(username, email, hashedPassword);
    console.log("User created successfully");

    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  console.log("Incoming login request:", req.body);
  const { email, password } = req.body;

  // 로그인 입력값 검증
  const { error } = validateLogin({ email, password });
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    // 사용자 이메일 확인
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // 비밀번호 확인
    const isPasswordValid = await verifyHashPassword(
      user.password_hash,
      password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    // 클라이언트 IP 확인
    const clientIp = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    console.log("Client IP address:", clientIp);

    // 사용자의 마지막 로그인 IP 확인
    const ipCheckQuery = `
      SELECT last_login_ip 
      FROM user_login_logs 
      WHERE user_id = ? 
      ORDER BY login_time DESC 
      LIMIT 1
    `;
    const [ipResults] = await db.query(ipCheckQuery, [user.user_id]);
    const lastLoginIp = ipResults[0]?.last_login_ip;

    // IP 불일치 시 처리
    if (lastLoginIp && lastLoginIp !== clientIp) {
      console.log(
        `IP mismatch detected. Last IP: ${lastLoginIp}, Current IP: ${clientIp}`,
      );
      return res.status(403).json({
        message: "Unrecognized device or location. Please verify your login.",
      });
    }

    // 로그인 성공 시 IP 기록
    const logIpQuery = `
      INSERT INTO user_login_logs (user_id, ip_address, login_time)
      VALUES (?, ?, NOW())
    `;
    await db.query(logIpQuery, [user.user_id, clientIp]);

    // 액세스 토큰 생성 및 쿠키 설정
    const accessToken = generateAccessToken({ id: user.user_id });
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({ message: "Login successful.", accessToken });
  } catch (err) {
    console.error("Error during login:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const logout = (req, res) => {
  console.log("Logging out user");
  res.clearCookie("accessToken"); // 쿠키에서 액세스 토큰 제거
  res.status(200).json({ message: "Logged out successfully." });
};

const extendSession = (req, res) => {
  const userId = req.user.id;
  console.log("Extend session request for user ID:", userId);
  const maxTotalDuration = 24 * 60 * 60; // 최대 연장 시간: 24시간 (초 단위)
  const duration = req.body.duration; // 요청된 연장 시간 (초 단위)

  // 허용된 연장 시간 목록
  const validDurations = [15 * 60, 30 * 60, 60 * 60];
  console.log("Requested session duration:", duration);

  // 요청된 연장 시간이 유효한지 확인
  if (!validDurations.includes(duration)) {
    console.log("Invalid duration requested:", duration);
    return res.status(400).json({ message: "Invalid duration." });
  }

  const query =
    "SELECT total_extended_time FROM user_sessions WHERE user_id = ?";
  db.query(query, [userId], (err, results) => {
    if (err) {
      console.error("Error fetching session data:", err);
      return res.status(500).json({ message: "Internal server error." });
    }

    console.log("Fetched session data:", results);
    const totalExtendedTime = results[0]?.total_extended_time || 0;

    // 최대 연장 시간 초과 확인
    if (totalExtendedTime + duration > maxTotalDuration) {
      console.log(
        "Maximum session duration exceeded:",
        totalExtendedTime + duration,
      );
      return res
        .status(403)
        .json({ message: "Maximum session duration exceeded." });
    }

    // 새로운 토큰 생성
    const newToken = generateAccessToken(
      { id: userId },
      { expiresIn: `${duration / 60}m` },
    );

    console.log("Generated new token for session extension:", newToken);

    // 세션 연장 시간 업데이트
    const updateQuery = `
      UPDATE user_sessions 
      SET total_extended_time = total_extended_time + ? 
      WHERE user_id = ?
    `;
    db.query(updateQuery, [duration, userId], (updateErr) => {
      if (updateErr) {
        console.error("Error updating session data:", updateErr);
        return res.status(500).json({ message: "Internal server error." });
      }

      res
        .status(200)
        .json({ message: "Session extended.", accessToken: newToken });
    });
  });
};

const getCurrentUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Fetching current user data for user ID:", userId);

    // 현재 사용자 정보 가져오기
    const query = "SELECT username, email FROM users WHERE user_id = ?";
    db.query(query, [userId], (err, results) => {
      if (err || results.length === 0) {
        console.error("Error fetching user data:", err);
        return res.status(404).json({ message: "User not found." });
      }
      console.log("Fetched user data:", results[0]);
      res.status(200).json(results[0]);
    });
  } catch (error) {
    console.error("Error in getCurrentUser:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

export { register, login, logout, extendSession, getCurrentUser };
