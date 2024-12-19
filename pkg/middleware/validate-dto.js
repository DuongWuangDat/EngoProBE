const { validate } = require('class-validator');
const { plainToClass } = require('class-transformer');
const httpStatus = require('http-status');

const validateDto = (dtoClass) => {
  return async (req, res, next) => {
    try {
      // Transform plain object to class instance
      const dtoObject = plainToClass(dtoClass, req.body);
      
      // Validate the object
      const errors = await validate(dtoObject, {
        whitelist: true,
        forbidNonWhitelisted: true,
      });
      
      if (errors.length > 0) {
        const formattedErrors = errors.map(error => ({
          field: error.property,
          constraints: Object.values(error.constraints || {}),
          children: error.children?.map(child => ({
            field: child.property,
            constraints: Object.values(child.constraints || {})
          }))
        }));

        return res.status(httpStatus.BAD_REQUEST).json({
          code: httpStatus.BAD_REQUEST,
          message: 'Validation failed',
          errors: formattedErrors
        });
      }
      
      // Add validated and transformed object to request
      req.validatedBody = dtoObject;
      next();
    } catch (error) {
      next(error);
    }
  };
};

module.exports = validateDto;
