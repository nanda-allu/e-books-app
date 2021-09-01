import Container from "typedi";
import { Request, Response } from 'express'
import { NotFound } from "http-errors";

import { BookService } from "../../service/books.service";
import { LogHandler } from "../../loaders/logger";
import { ErrorHandlerInstance } from "../middlewares/error-handler";

export class BooksController {
    private booksService: BookService;
    private logger = new LogHandler("debug");
    constructor() {
        this.booksService = Container.get(BookService);
    }

    async getBooks(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Fetch books request started");
            const bookList = await this.booksService.getBooks();
            this.logger.logAsDebug("Fetch books success");
            return res.json(bookList).status(200);
        } catch (error) {
            ErrorHandlerInstance.raiseError(error, req, res);
        }
    }

    async createBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Create book request started");
            await this.booksService.createBook(req.body);
            this.logger.logAsDebug("Create book success");
            res.json({
                statusCode: 200,
                message: "Book created succesfully"
            }).status(200)
        } catch (error) {
            ErrorHandlerInstance.raiseError(error, req, res);
        }
    }

    async getBookDetails(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Fetch book details request started");
            const book = await this.booksService.getBookDetails(req.params.book_id);

            if (!book) {
                throw new Error("Book not found");
            }
            this.logger.logAsDebug("Fetch book details success");
            res.json(book).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }

    async updateBookDetails(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Update book details request started");
            const book = await this.booksService.updateBook(req.params.book_id, req.body);

            if (!book) {
                throw new Error("Book update failed");
            }
            this.logger.logAsDebug("Update book details success");
            res.json({ statusCode: 200, message: "Book updated succesfully" }).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }
    async deleteBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Delete book request started");
            const book = await this.booksService.deleteBook(req.params.book_id);

            if (!book) {
                throw new Error("Book delete failed");
            }
            this.logger.logAsDebug("Delete book details success");
            res.json({ statusCode: 200, message: "Book deleted succesfully" }).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }

    // Fetch reviews information
    async getReviewsByBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Fetch reviews request started");
            const data = await this.booksService.getReviewsByBook(req.params.book_id);

            if (!data) {
                throw new Error("Fetch review failed");
            }
            this.logger.logAsDebug("Fetch review details success");
            res.json(data.reviews).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Review or book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }

    async addReviewToBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Add review to book request started");
            const book = await this.booksService.createBookReview(req.params.book_id, req.body);
            if (!book) {
                throw new Error("Failed to add the review");
            }
            this.logger.logAsDebug("Add review details success");
            res.json({ statusCode: 200, message: "Review added succesfully" }).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Review or book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }
    async getReviewDetailsByBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Fetch review details request started");
            const review = await this.booksService.getReviewByBook(req.params.review_id)

            if (!review) {
                throw new Error("Fetch Review failed");
            }
            this.logger.logAsDebug("Fetch review details success");
            res.json(review).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Review or book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }
    async updateReviewDetailsByBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Update review details request started");
            const book = await this.booksService.updateReviewByBook(req.params.review_id, req.body);
            if (!book) {
                throw new Error("Failed to update the review");
            }
            this.logger.logAsDebug("Update review details success");
            res.json({ statusCode: 200, message: "Review updated succesfully" }).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Review or book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }
    async deleteReviewByBook(req: Request, res: Response) {
        try {
            this.logger.logAsDebug("Delete review details request started");
            const review = await this.booksService.deleteReviewByBook(req.params.review_id)

            if (!review) {
                throw new Error("Fetch Review failed");
            }
            this.logger.logAsDebug("Delete review details success");
            res.json({ statusCode: 200, message: "Review deleted succesfully" }).status(200);
        } catch (error) {
            const notFoundError = new NotFound("Review or book not found");
            ErrorHandlerInstance.raiseError(notFoundError, req, res);
        }
    }
}