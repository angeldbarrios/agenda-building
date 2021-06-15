import Joi from 'joi';

export default {
  firstName: Joi.string()
    .max(50)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .required(),

  lastName: Joi.string()
    .max(50)
    .regex(/^[A-Za-zÑñÁáÉéÍíÓóÚúÜü ]+$/)
    .required(),

  phoneNumber: Joi.string()
    .max(50)
    .required(),

  email: Joi.string()
    .max(100)
    .email()
    .required(),

  address: Joi.string()
    .max(255)
    .required(),
};
