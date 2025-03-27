function validateSchema(schema, stuff) {
    const { error, value } = schema.validate(stuff);
    if (error) throw new Error(error.details[0].message);
    return value;
  }

module.exports = {
    validateSchema
}