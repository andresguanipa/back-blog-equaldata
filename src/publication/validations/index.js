const Joi = require('joi');

module.exports.Content = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    idUser: Joi.number().integer().required(),
    img: Joi.string().trim().required(),
    categories: Joi.string().trim().required(),
    imgAuthor: Joi.string().trim().required()
});

module.exports.Email = Joi.object({
    name: Joi.string().trim().required(),
    email: Joi.string().trim().email().required(),
    message: Joi.string().trim().required()
});