import db from "../config/db.js";

export const findUserByEmail = async (email) => {
  try {
    const query = "SELECT * FROM users WHERE email = ?";
    const [rows] = await db.query(query, [email]);
    console.log("findUserByEmail results:", rows);
    return rows[0];
  } catch (err) {
    console.error("Error in findUserByEmail query:", err.message);
    throw err;
  }
};

export const createUser = async (username, email, passwordHash) => {
  try {
    const query =
      "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)";
    const [result] = await db.query(query, [username, email, passwordHash]);
    console.log("createUser results:", result);
    return result;
  } catch (err) {
    console.error("Error in createUser query:", err.message);
    throw err;
  }
};
