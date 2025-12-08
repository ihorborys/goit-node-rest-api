import Joi from "joi";
import {emailRegExp} from "../db/constants/authConstants.js";

export const registerSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegExp).required(),
    subscription: Joi.string()
        .valid("starter", "pro", "business") // Дозволяємо тільки ці значення
        .default("starter"), // Якщо поле не прийшло, Joi підставить "starter"
});

export const emailSchema = Joi.object({
    email: Joi.string().pattern(emailRegExp).required(),
});

export const loginSchema = Joi.object({
    password: Joi.string().min(6).required(),
    email: Joi.string().pattern(emailRegExp).required()
});