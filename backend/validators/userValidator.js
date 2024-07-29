import Joi from 'joi';

export const validateUser = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    mobileNo: Joi.number().min(1000000000).max(9999999999).required(),
    password: Joi.string().min(6).required()
  });

  return schema.validate(data);
}
