import Joi from "joi";

class BaseDto {
  static schema = Joi.object({});

  static validate(data) {
    const { errors, value } = this.schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (errors) {
      const error = errors.details.map((d) => d.message);
      return { error, value: null };
    }

    return {error: null, value };
  }
}


export default BaseDto