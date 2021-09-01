import { NextFunction } from "express";
import Joi from "joi";
import { validateRequest } from "./joi-request-validation";
import { bookSchema } from "../../helpers/validators/joi-validation.schema";
import { BadRequest } from "http-errors";
import { book } from "../../tests/mock-data/mock-data";

describe("Error handler", () => {
    let joiSchema: Partial<Joi.ObjectSchema>;
    let mockRequest: any;
    let mockResponse: any;
    let errorObj: any;
    let nextFunction: NextFunction;

    beforeEach(() => {
        nextFunction = jest.fn();
        errorObj = {
            details: [
                {
                    message: '"name" is required',
                    path: [Array],
                    type: 'any.required',
                    context: [Object]
                }
            ]
        };
        mockRequest = { body: {} } as any;
        joiSchema = {
            validate: () => {
                return {
                    error: errorObj
                } as any
            }
        };
    })
    it("throw validation error if error exists on validate() call", async () => {
        const errorSchema = validateRequest(bookSchema);
        await errorSchema(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toBeCalled();
        expect(nextFunction).toBeCalledTimes(1);
        expect(nextFunction).toHaveBeenCalledWith(new BadRequest(`Validation error: ${errorObj.details.map(x => x.message).join(', ')}`));
    })
    it("execute next middleware,when there is no error", async () => {
        mockRequest = { body: book } as any;
        joiSchema = { validate: () => { return {} as any } };
        const errorSchema = validateRequest(bookSchema);
        await errorSchema(mockRequest, mockResponse, nextFunction);
        expect(nextFunction).toBeCalled();
        expect(nextFunction).toBeCalledTimes(1);
        expect(nextFunction).toHaveBeenCalledWith();
    })
})