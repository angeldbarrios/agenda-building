import Joi from 'joi';


const paginationSchema = Joi.object({
  offset: Joi.number().required(),
  limit: Joi.string().valid('10', '20', '50').required()
});


export default {
  validatePaginationOrFail: (data: any, CustomError) => {
    const { error, value } = paginationSchema.validate(data);
    if (error) {
      if (CustomError) {
        throw new CustomError('Error en datos');
      }
      throw new Error(String(error));
    }
    data.limit = Number(data.limit);
    data.offset = (value - 1) * data.limit;
    return data;
  }
}