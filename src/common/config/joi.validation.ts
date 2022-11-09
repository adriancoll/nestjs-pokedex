import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  port: Joi.number().default(3005),
  defaultLimit: Joi.number().default(6),
  pokeapiUrl: Joi.string().default('https://pokeapi.co/api/v2/pokemon'),
  MONGODB: Joi.required(),
});
