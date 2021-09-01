import { Router } from "express";

import { logger } from "../../loaders/logger";
import { BooksController } from "../../api/controllers/books.controller";
import { bookSchema, reviewSchema } from "../../helpers/validators/joi-validation.schema";
import { validateRequest } from "../middlewares/joi-request-validation";

const booksRouter = Router();
const booksController = new BooksController();

export default () => {
    logger.logAsInfo("Initiated book routes");

    // Book routes
    booksRouter.get('/', booksController.getBooks.bind(booksController))
    booksRouter.post('/', validateRequest(bookSchema), booksController.createBook.bind(booksController))
    booksRouter.get('/:book_id', booksController.getBookDetails.bind(booksController))
    booksRouter.put('/:book_id', validateRequest(bookSchema), booksController.updateBookDetails.bind(booksController))
    booksRouter.delete('/:book_id', booksController.deleteBook.bind(booksController))

    // Review routes
    booksRouter.get('/:book_id/reviews', booksController.getReviewsByBook.bind(booksController))
    booksRouter.post('/:book_id/reviews', validateRequest(reviewSchema), booksController.addReviewToBook.bind(booksController))
    booksRouter.get('/:book_id/reviews/:review_id', booksController.getReviewDetailsByBook.bind(booksController))
    booksRouter.put('/:book_id/reviews/:review_id', validateRequest(reviewSchema), booksController.updateReviewDetailsByBook.bind(booksController))
    booksRouter.delete('/:book_id/reviews/:review_id', booksController.deleteReviewByBook.bind(booksController))

    return booksRouter;
}