const { validate } = require("class-validator");

const validateDto = (dtoClass) => {
  return async (req, res, next) => {
    const dtoObject = plainToClass(dtoClass, req.body);
    const errors = await validate(dtoObject);
    
    if (errors.length > 0) {
      const errorMessages = errors.map(error => ({
        property: error.property,
        constraints: error.constraints,
      }));
      return res.status(400).json({ errors: errorMessages });
    }
    
    req.validatedBody = dtoObject;
    next();
  };
};

module.exports = validateDto;
