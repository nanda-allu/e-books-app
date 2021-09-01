import { Application, NextFunction, Request, Response, Router } from 'express';
import { HttpError, NotFound } from 'http-errors';

import { logger } from "../../loaders/logger";
import booksRoutes from './books-routes';
import { authMiddleware } from '../middlewares/auth-middleware';


export default async (app: Application) => {
    logger.logAsInfo("Start loading the routes");

    // Book Route handler
    app.use('/books', authMiddleware, booksRoutes());

    // Invalid Route URL Handler
    app.use((req: Request, res: Response, next: NextFunction) => {
        next(new NotFound("URL not found"));
    })

     // Error Handler
    app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
        logger.logAsError(err);
        res.send({
            statusCode: err.status || 500,
            message: err.message
        })
    })
}


