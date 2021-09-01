import { Request, NextFunction, Response } from "express";
import { BadRequest } from "http-errors";
import Joi from "joi";

export const validateRequest = (joiSchema: Joi.ObjectSchema) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const { error } = await joiSchema.validate(req.body);
        if (error) {
            // on fail return comma separated errors
            next(new BadRequest(`Validation error: ${error.details.map(x => x.message).join(', ')}`));
        } else {
            // on success replace req.body with validated value and trigger next middleware function
            next();
        }
    }