import jwt from 'jsonwebtoken';

const JWT_ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_TOKEN_SECRET;
const JWT_ACCESS_TOKEN_EXPIRATION = process.env.JWT_ACCESS_TOKEN_EXPIRATION

export const generateAccessToken = (payload, expiresIn = JWT_ACCESS_TOKEN_EXPIRATION) => {
  return jwt.sign(payload, JWT_ACCESS_TOKEN_SECRET, { expiresIn });
}

