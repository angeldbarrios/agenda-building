export default (schema, input: any) => {
  const { error, value } = schema.validate(input);
  if (error !== undefined) {
    throw new Error('Error at schema');
  }
  return value;
};
