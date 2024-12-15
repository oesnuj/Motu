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

  const { error } = validateRegister({ username, email, password });
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }
  try {
    const existingUser = await findUserByEmail(email);
    console.log("Checking if user already exists:", existingUser);
    if (existingUser) {
      return res.status(409).json({ message: "Email already in use." });
    }

    const hashedPassword = await makeHashPassword(password);
    console.log("Generated hashed password:", hashedPassword);

    await createUser(username, email, hashedPassword);
    console.log("User created successfully");

    return res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error during registration:", err);
    return res.status(500).json({ message: "Internal server error." });
  }
};

const login = async (req, res) => {
  console.log("Incoming login request:", req.body); // 요청 데이터 확인
  const { email, password } = req.body;

  const { error } = validateLogin({ email, password });
  if (error) {
    console.log("Validation error:", error.details[0].message);
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const user = await findUserByEmail(email);
    console.log("User fetched from DB:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isPasswordValid = await verifyHashPassword(
      user.password_hash,
      password,
    );
    console.log("Password validation result:", isPasswordValid);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password." });
    }

    const accessToken = generateAccessToken({ id: user.user_id });
    console.log("Generated access token:", accessToken);

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
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logged out successfully." });
};

const extendSession = (req, res) => {
  const userId = req.user.id;
  console.log("Extend session request for user ID:", userId);
  const maxTotalDuration = 24 * 60 * 60; // 최대 연장 시간: 24시간 (초 단위)
  const duration = req.body.duration; // 요청된 연장 시간 (초 단위)

  const validDurations = [15 * 60, 30 * 60, 60 * 60];
  console.log("Requested session duration:", duration);

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

    if (totalExtendedTime + duration > maxTotalDuration) {
      console.log(
        "Maximum session duration exceeded:",
        totalExtendedTime + duration,
      );
      return res
        .status(403)
        .json({ message: "Maximum session duration exceeded." });
    }

    const newToken = generateAccessToken(
      { id: userId },
      { expiresIn: `${duration / 60}m` },
    );

    console.log("Generated new token for session extension:", newToken);

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
