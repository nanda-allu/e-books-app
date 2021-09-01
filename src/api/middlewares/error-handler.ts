import { Request, Response } from "express";
import { HttpError } from "http-errors";

export class ErrorHandler {

    public raiseError(error: HttpError, req: Request, res: Response): void {
        res.status(error.status || 500);
        res.json({
            name: error.name,
            message: error.message
        })
    }
}

export const ErrorHandlerInstance = new ErrorHandler();