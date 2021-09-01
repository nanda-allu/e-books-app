import { NextFunction, Request, Response } from "express";
import { BadRequest, Unauthorized } from "http-errors";
import OktaJwtVerifier from "@okta/jwt-verifier";

import config from "../../config/config";
import { logger } from "../../loaders/logger";
import { ErrorHandlerInstance } from "./error-handler";


export const jwtVerifier = new OktaJwtVerifier({ issuer: config.oktaConfig.issuer });

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        logger.logAsDebug("Auth verification started");
        if (!req.headers || !req.headers.authorization) {
            const unauthorized = new Unauthorized("Authorization header is missing");
            ErrorHandlerInstance.raiseError(unauthorized, req, res);
        }
        await verifyAuthTokenIfExists(req, res, next);
    } catch (error) {
        const badRequest = new BadRequest(error?.message || "Access header is missing");
        logger.logAsError(badRequest);
        next(badRequest);
    }
}

async function verifyAuthTokenIfExists(req, res: Response<any, Record<string, any>>, next: NextFunction) {
    const { authorization } = req.headers;
    const [authType, token] = authorization.split(" ");
    if (authType !== "Bearer") {
        const unauthorized = new Unauthorized('"Bearer" is missing in auth token');
        ErrorHandlerInstance.raiseError(unauthorized, req, res);
    } else {
        logger.logAsDebug("Auth middleware token created");
        await jwtVerifier.verifyAccessToken(token, "api://default");
        next();
    }
}
