import { Service } from "typedi";

import { Books } from "../models/books.model";
import { IBook, IReview } from "../models/book-interfaces";
import { Reviews } from "../models/review.model";


@Service()
export class BookService {
    getBooks(): Promise<IBook[]> {
        try {
            return Books.find({}).populate("reviews")
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createBook(input: IBook): Promise<IBook> {
        try {
            const book = new Books(input);
            return book.save();
        } catch (error) {
            throw new Error(error);
        }
    }
    async getBookDetails(id: string): Promise<IBook> {
        try {
            return Books.findById(id)
        } catch (error) {
            throw new Error(error);
        }
    }
    async updateBook(id: string, data: IBook) {
        try {
            return Books.findByIdAndUpdate(id, {
                ...data,
            });
        } catch (e) {
            throw new Error(e.message);
        }
    }
    async deleteBook(id: string) {
        try {
            return Books.findByIdAndDelete(id);
        } catch (e) {
            throw new Error(e.message);
        }
    }

    async getReviewsByBook(id: string): Promise<IBook> {
        try {
            const reviews = await Books.findById(id, "reviews").populate("reviews");
            return reviews;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async createBookReview(id: string, data: IReview) {
        try {
            const book = await Books.findById(id);
            const review = new Reviews(data);
            await review.save();

            book.reviews.push(review);
            return book.save();

        } catch (error) {
            throw new Error(error.message);
        }
    }
    async getReviewByBook(reviewId: string) {
        try {
            const review: IReview = await Reviews.findById(reviewId);
            return review;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async updateReviewByBook(reviewId: string, data: IReview) {
        try {
            return Reviews.findByIdAndUpdate(reviewId, { ...data });
        } catch (error) {
            throw new Error(error.message);
        }
    }
    async deleteReviewByBook(reviewId: string) {
        try {
            return Reviews.findByIdAndDelete(reviewId);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}