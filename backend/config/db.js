import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  ssl: {
    ca: process.env.SSL_CERT.replace(/\\n/g, "\n"),
    rejectUnauthorized: true,
  },
});

(async () => {
  try {
    const connection = await db.getConnection();
    console.log("Database connection successful!");
    const [rows] = await connection.query("SELECT 1 + 1 AS result");
    console.log("Test query result:", rows);
    connection.release();
  } catch (err) {
    console.error("Database connection test failed:", err.message);
  }
})();

export default db;
