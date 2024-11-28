import Joi from 'joi';

const registerSchema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const validateRegister = (data) => registerSchema.validate(data);
export const validateLogin = (data) => loginSchema.validate(data);
