import Joi from 'joi';

export const validateUser = (data) => {
  const schema = Joi.object({
    fname: Joi.string().min(3).max(50).required(),
    lname: Joi.string().min(1).max(50).required(),
    email: Joi.string().email().required(),
    mobile: Joi.number().min(1000000000).max(9999999999).required(),
    password: Joi.string().min(6).required(),
    cpassword: Joi.string().min(6).required(),
  });

  return schema.validate(data);
}
