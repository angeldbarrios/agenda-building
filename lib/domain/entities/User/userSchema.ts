const Joi = require('joi');
const userSchema = Joi.object({
  username: Joi.string().max(70).required(),

  password: Joi.string().max(50).required(),

  firstName: Joi.string().max(50).required(),

  lastName: Joi.string().max(50).required(),

  email: Joi.string().max(50).email().required(),
});

export default userSchema;
