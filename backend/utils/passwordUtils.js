import argon2 from 'argon2';

export const makeHashPassword = async (password) => {
  return await argon2.hash(password);
};

export const verifyHashPassword = async (hashedPassword, password) => {
  return await argon2.verify(hashedPassword, password);
};
