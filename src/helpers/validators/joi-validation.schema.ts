import Joi from 'joi';


export const bookSchema = Joi.object({
    name: Joi.string().required(),
    author: Joi.array().items(Joi.string()).required(),
    price: Joi.string().required(),
    reviews: Joi.array().optional(),
    publisher: Joi.object({
        publisher_id: Joi.string().required(),
        name: Joi.string().required(),
        location: Joi.string().required(),
    }).required()
})
export const reviewSchema = Joi.object({
    reviwer: Joi.string().required(),
    message: Joi.string().required()
})