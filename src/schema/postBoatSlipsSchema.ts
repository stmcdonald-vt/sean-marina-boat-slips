import Joi from "joi";

export const postBoatSlipsSchema = Joi.object({
  vesselName: Joi.string().min(1).required(),
});
