import Joi from 'joi';

export default {
  username: Joi.string().alphanum().max(50).required(),

  firstName: Joi.string()
    .max(50)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .required(),

  lastName: Joi.string()
    .max(50)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .required(),

  email: Joi.string().max(100).email().required(),

  password: Joi.string().max(60).required(),
};
