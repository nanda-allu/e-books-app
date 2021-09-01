import { HttpError, NotFound } from "http-errors";
import { ErrorHandlerInstance } from "./error-handler";

describe("Error handler", () => {
    let mockRequest: Request;
    let mockResponse: any;
    let mockError: HttpError;
    beforeEach(() => {
        mockResponse = {
            json: jest.fn(),
            status: () => 500
        };
        mockError = new NotFound("Error");
    })
    it("response status,json methods to be called on call of raiseError", () => {
        const jsonSpy = jest.spyOn(mockResponse, 'json');
        const statusSpy = jest.spyOn(mockResponse, 'status');
        ErrorHandlerInstance.raiseError(mockError, mockRequest as any, mockResponse as any);
        expect(jsonSpy).toBeCalled()
        expect(jsonSpy).toBeCalledTimes(1)
        expect(statusSpy).toBeCalled()
        expect(statusSpy).toBeCalledTimes(1)
    })
    it("set default status to 500,when no status found", () => {
        mockError.status = null;
        ErrorHandlerInstance.raiseError(mockError, mockRequest as any, mockResponse as any);
        expect(mockResponse.status()).toBe(500)
    })
})