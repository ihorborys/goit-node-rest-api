import Joi from "joi";

export const createContactSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "name is required",
        "string.base": "name must be a string"
    }),
    email: Joi.string().required().messages({
        "any.required": "email is required",
        "string.base": "email must be a string"
    }),
    phone: Joi.string().required().messages({
        "any.required": "phone is required",
        "string.base": "phone must be a string"
    }),
    favorite: Joi.boolean()
});

export const updateContactSchema = Joi.object({
    name: Joi.string().messages({
        "string.base": "name must be a string"
    }),
    email: Joi.string().messages({
        "string.base": "email must be a string"
    }),
    phone: Joi.string().messages({
        "string.base": "phone must be a string"
    }),
    favorite: Joi.boolean().messages({
        "boolean.base": "favorite must be a boolean (true or false)"
    }),
}).min(1);

export const updateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required().messages({
        "any.required": "missing field favorite",
        "boolean.base": "favorite must be a boolean"
    })
});