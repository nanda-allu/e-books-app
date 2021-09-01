import "reflect-metadata";

import { LogHandler } from "../../loaders/logger";

import { BookService } from "../../service/books.service";
import { BooksController } from "./books.controller";
import { mockResponse } from "../../tests/mock-data/mock-response";
import { ErrorHandler, ErrorHandlerInstance } from "../middlewares/error-handler";
import { book, booksList, review } from "../../tests/mock-data/mock-data";

describe("BooksController CRUD operations", () => {
    let booksController: BooksController | any, errorHandler: ErrorHandler;
    const BooksServiceMock = <jest.Mock<BookService>>BookService;
    const bookService = new BooksServiceMock();

    beforeEach(() => {
        booksController = new BooksController();
        booksController.booksService = bookService;
        errorHandler = ErrorHandlerInstance;
    });

    it("Should have initialized logger,books-service", () => {
        expect(booksController.booksService).toBeInstanceOf(BookService);
        expect(booksController.logger).toBeInstanceOf(LogHandler);
    });

    describe("success executions", () => {
        it("Should return books on call of getBooks()", async () => {
            jest.spyOn(booksController.booksService, "getBooks").mockReturnValue(Promise.resolve(booksList));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.getBooks({} as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(booksList);
        });
        it("Should insert a book on call of createBook()", async () => {
            jest.spyOn(booksController.booksService, "createBook").mockReturnValue(Promise.resolve([Object.assign(booksList[0], { _id: "123" })] as any));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.createBook({} as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Book created succesfully" });
        });
        it("Should return specific book on call of getBookDetails()", async () => {
            jest.spyOn(booksController.booksService, "getBookDetails").mockReturnValue(Promise.resolve(book));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.getBookDetails({ params: { book_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(book);
        });
        it("Should update a specific book on call of updateBookDetails()", async () => {
            jest.spyOn(booksController.booksService, "updateBook").mockReturnValue(Promise.resolve(book));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.updateBookDetails({ params: { book_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Book updated succesfully" });
        });
        it("Should delete a specific book on call of deleteBook()", async () => {
            jest.spyOn(booksController.booksService, "deleteBook").mockReturnValue(Promise.resolve(book));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.deleteBook({ params: { book_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Book deleted succesfully" });
        });

        it("Should return reviews on call of getReviewsByBook()", async () => {
            jest.spyOn(booksController.booksService, "getReviewsByBook").mockReturnValue(Promise.resolve(book));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.getReviewsByBook({ params: { book_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(book.reviews);
        });
        it("Should insert a review on call of addReviewToBook()", async () => {
            jest.spyOn(booksController.booksService, "createBookReview").mockReturnValue(Promise.resolve(book));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.addReviewToBook({ params: { book_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Review added succesfully" });
        });
        it("Should get a specific review on call of getReviewDetailsByBook()", async () => {
            jest.spyOn(booksController.booksService, "getReviewByBook").mockReturnValue(Promise.resolve(review));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.getReviewDetailsByBook({ params: { review_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith(review);
        });
        it("Should update a specific review on call of updateReviewDetailsByBook()", async () => {
            jest.spyOn(booksController.booksService, "updateReviewByBook").mockReturnValue(Promise.resolve(review));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.updateReviewDetailsByBook({ params: { review_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Review updated succesfully" });
        });
        it("Should delete a specific review on call of deleteReviewByBook()", async () => {
            jest.spyOn(booksController.booksService, "deleteReviewByBook").mockReturnValue(Promise.resolve(review));
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            const response = mockResponse();

            await booksController.deleteReviewByBook({ params: { review_id: "123" } } as any, response);
            expect(debugSpy).toHaveBeenCalledTimes(2);
            expect(response.status).toHaveBeenCalledWith(200);
            expect(response.json).toHaveBeenCalledWith({ statusCode: 200, message: "Review deleted succesfully" });
        });
    })
    describe("failure executions", () => {
        it("Should raise error on call of getBooks()", async () => {
            jest.spyOn(booksController.booksService, "getBooks").mockReturnValue(Promise.reject(new Error()));
            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.getBooks({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on on call of createBook()", async () => {
            jest.spyOn(booksController.booksService, "createBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.createBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of getBookDetails()", async () => {
            jest.spyOn(booksController.booksService, "getBookDetails").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.getBookDetails({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of getBookDetails(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "getBookDetails").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.getBookDetails({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Fetch book details success");

        });
        it("Should raise error on call of updateBookDetails()", async () => {
            jest.spyOn(booksController.booksService, "updateBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();

            try {
                await booksController.updateBookDetails({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of updateBookDetails(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "updateBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.updateBookDetails({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Update book details success");

        });
        it("Should raise error on call of deleteBook()", async () => {
            jest.spyOn(booksController.booksService, "deleteBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.deleteBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of deleteBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "deleteBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.deleteBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Delete book details success");

        });
        it("Should raise error on call of getReviewsByBook()", async () => {
            jest.spyOn(booksController.booksService, "getReviewsByBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.getReviewsByBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of getReviewsByBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "getReviewsByBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.getReviewsByBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Fetch review details success");

        });
        it("Should raise error on call of addReviewToBook()", async () => {
            jest.spyOn(booksController.booksService, "createBookReview").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.addReviewToBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of addReviewToBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "createBookReview").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.addReviewToBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Add review details success");

        });
        it("Should raise error on call of getReviewDetailsByBook()", async () => {
            jest.spyOn(booksController.booksService, "getReviewByBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.getReviewDetailsByBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of getReviewDetailsByBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "getReviewByBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.getReviewDetailsByBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Fetch review details success");

        });
        it("Should raise error on call of updateReviewDetailsByBook()", async () => {
            jest.spyOn(booksController.booksService, "updateReviewByBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.updateReviewDetailsByBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of updateReviewDetailsByBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "updateReviewByBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.updateReviewDetailsByBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Update review details success");

        });
        it("Should raise error on call of deleteReviewByBook()", async () => {
            jest.spyOn(booksController.booksService, "deleteReviewByBook").mockReturnValue(Promise.reject(new Error()));

            const errorSpy = jest.spyOn(errorHandler, 'raiseError');
            const response = mockResponse();
            try {
                await booksController.deleteReviewByBook({} as any, response);
            } catch (error) {
                expect(errorSpy).toHaveBeenCalled();
            }
        });
        it("Should raise error on call of deleteReviewByBook(),when no book found for the req param", async () => {
            const debugSpy = jest.spyOn(booksController.logger, 'logAsDebug');
            jest.spyOn(booksController.booksService, "deleteReviewByBook").mockImplementationOnce(() => Promise.resolve(null) as any);

            const response = mockResponse();
            await booksController.deleteReviewByBook({} as any, response);
            expect(debugSpy).not.toHaveBeenCalledTimes(2);
            expect(debugSpy).not.toHaveBeenCalledWith("Delete review details success");

        });
    })
});