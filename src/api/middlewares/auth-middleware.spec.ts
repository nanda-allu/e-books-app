import { NextFunction, Request, Response } from 'express';
import { Unauthorized } from 'http-errors';
import { logger } from '../../loaders/logger';
import { authMiddleware, jwtVerifier } from './auth-middleware';
import { ErrorHandler, ErrorHandlerInstance } from './error-handler';

describe('Authorization middleware', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let errorHandler: ErrorHandler;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        errorHandler = ErrorHandlerInstance;
        mockResponse = {
            json: jest.fn(),
            status: jest.fn()
        };
    });

    it('without headers', async () => {
        const debugSpy = jest.spyOn(logger, 'logAsDebug');
        const unauthorized = new Unauthorized("Authorization header is missing");
        const errorSpy = jest.spyOn(errorHandler, 'raiseError');
        mockRequest = { headers: null };

        authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy).toBeCalledWith(unauthorized, mockRequest, mockResponse);
        expect(debugSpy).toHaveBeenCalled();
    });
    it('without "authorization" in headers', async () => {
        const debugSpy = jest.spyOn(logger, 'logAsDebug');

        const unauthorized = new Unauthorized("Authorization header is missing");
        const errorSpy = jest.spyOn(errorHandler, 'raiseError');
        mockRequest = { headers: { authorization: null } };

        authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy).toBeCalledWith(unauthorized, mockRequest, mockResponse);
        expect(debugSpy).toHaveBeenCalled();
    });

    it('throw error when, token without "Bearer" keyword', async () => {
        const unauthorized = new Unauthorized('"Bearer" is missing in auth token');
        mockRequest = { headers: { authorization: "aasdfasdf 12345" } };
        const errorSpy = jest.spyOn(errorHandler, 'raiseError');
        await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction)

        expect(errorSpy).toHaveBeenCalled();
        expect(errorSpy).toBeCalledWith(unauthorized, mockRequest, mockResponse);

    });

    it('with "authorization" header', async () => {
        nextFunction = jest.fn();
        mockRequest = { headers: { authorization: "Bearer 12345" } };
        jest.spyOn(jwtVerifier, 'verifyAccessToken').mockImplementationOnce(() => Promise.resolve({} as any));
        await authMiddleware(mockRequest as Request, mockResponse as Response, nextFunction);
        expect(nextFunction).toBeCalledTimes(1);
    });
});