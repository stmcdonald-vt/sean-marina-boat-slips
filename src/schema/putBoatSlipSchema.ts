import Joi from "joi";

export const putBoatSlipsSchema = Joi.number().min(1).max(3);
