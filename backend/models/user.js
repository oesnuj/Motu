import db from '../config/db.js';

export const findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

export const createUser = (username, email, passwordHash) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)';
    db.query(query, [username, email, passwordHash], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};
