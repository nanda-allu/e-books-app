import { Books } from '../models/books.model';
import { Reviews } from '../models/review.model';
import { book, review } from '../tests/mock-data/mock-data';
import { BookService } from './books.service';

describe("BooksService on", () => {
    let booksService: BookService;

    beforeEach(async () => {
        booksService = new BookService();
    });

    describe("Books Success CRUD Operations", () => {
        it("Should fetch all books", async () => {
            Books.find = jest.fn().mockImplementationOnce(() => ({
                populate: jest.fn().mockResolvedValueOnce([book]),
            }));
            const response = await booksService.getBooks();
            expect(response).toEqual([book]);
        });
        it("Should create a book", async () => {
            Books.prototype.save = jest
                .fn()
                .mockResolvedValueOnce({ ...book, _id: "B111" });
            const response = await booksService.createBook(book);
            expect(response._id).toBeDefined();
        });

        it("Should fetch book details by id", async () => {
            Books.findById = jest.fn().mockResolvedValueOnce({ ...book });
            const response = await booksService.getBookDetails("B111");
            expect(response).toEqual(book);
        });

        it("Should update book by id", async () => {
            Books.findByIdAndUpdate = jest
                .fn()
                .mockResolvedValueOnce({ ...book, name: "Jokob" });
            const response = await booksService.updateBook("B111", book);
            expect(response.name).toBe("Jokob");
        });

        it("Should delete a book by id", async () => {
            Books.findByIdAndDelete = jest.fn().mockResolvedValueOnce({ ...book });
            const response = await booksService.deleteBook("B111");
            expect(response).toEqual(book);
        });
    });

    describe("Reviews Success CRUD Operations", () => {
        it("Should fetch all reviews", async () => {
            Books.findById = jest.fn().mockImplementationOnce(() => ({
                populate: jest.fn().mockResolvedValueOnce([review]),
            }));
            const response = await booksService.getReviewsByBook("B111");
            expect(response).toEqual([review]);
        });
        it("Should create a review by book id", async () => {
            try {
                Books.findById = jest.fn().mockResolvedValueOnce({
                    ...book,
                    save: jest.fn().mockResolvedValueOnce({ ...book }),
                });
                Reviews.prototype.save = jest
                    .fn()
                    .mockResolvedValueOnce({ ...review, _id: "B111" });
                const response = await booksService.createBookReview("B111", review);
                expect(response?.reviews?.length).toBe(1);
            } catch (e) {
                console.log(e.message);
            }
        });

        it("Should fetch review details by book id", async () => {
            Reviews.findById = jest.fn().mockResolvedValueOnce(review);
            const response = await booksService.getReviewByBook("1");
            expect(response).toEqual(review);
        });

        it("Should update review details by book id", async () => {
            Reviews.findByIdAndUpdate = jest
                .fn()
                .mockResolvedValueOnce({ ...review, reviewer: "Jokob" });
            const response = await booksService.updateReviewByBook(
                "B111",
                review
            );
            expect(response.reviewer).toBe("Jokob");
        });

        it("Should delete review by id", async () => {
            Reviews.findByIdAndDelete = jest
                .fn()
                .mockResolvedValueOnce({ ...review });
            const response = await booksService.deleteReviewByBook("B111");
            expect(response).toEqual(review);
        });
    });

    describe("Books Failure CRUD Operations", () => {
        it("Should raise an error to fetch all books", async () => {
            jest.spyOn(booksService, "getBooks").mockReturnValueOnce(Promise.reject("Failed to retrieve all books"));
            try {
                await booksService.getBooks();
            } catch (error) {
                expect(error).toBe("Failed to retrieve all books");
            }
        });
        it("Should raise an error to create a book", async () => {
            jest.spyOn(booksService, "createBook").mockReturnValueOnce(Promise.reject("Failed to insert a book"));
            try {
                await booksService.createBook(book);
            } catch (error) {
                expect(error).toBe("Failed to insert a book");
            }
        });

        it("Should raise an error to fetch a book", async () => {
            jest.spyOn(booksService, "getBookDetails").mockReturnValueOnce(Promise.reject("Failed to fetch a book"));
            try {
                await booksService.getBookDetails("B111");
            } catch (error) {
                expect(error).toBe("Failed to fetch a book");
            }
        });

        it("Should raise an error to update a book", async () => {
            jest.spyOn(booksService, "updateBook").mockReturnValueOnce(Promise.reject("Failed to update a book"));
            try {
                await booksService.updateBook("B111", book);
            } catch (error) {
                expect(error).toBe("Failed to update a book");
            }
        });

        it("Should raise an error to delete a book", async () => {
            jest.spyOn(booksService, "deleteBook").mockReturnValueOnce(Promise.reject("Failed to delete a book"));
            try {
                await booksService.deleteBook("B111");
            } catch (error) {
                expect(error).toBe("Failed to delete a book");
            }
        });
    });
    describe("Reviews Failure CRUD Operations", () => {
        it("Should raise an error to fetch all reviews", async () => {
            jest.spyOn(booksService, "getReviewsByBook").mockReturnValueOnce(Promise.reject("Failed to retrieve all reviews"));
            try {
                await booksService.getReviewsByBook("B111");
            } catch (error) {
                expect(error).toBe("Failed to retrieve all reviews");
            }
        });
        it("Should raise an error to create a review", async () => {
            jest.spyOn(booksService, "createBookReview").mockReturnValueOnce(Promise.reject("Failed to insert a review"));
            try {
                await booksService.createBookReview("R111", review);
            } catch (error) {
                expect(error).toBe("Failed to insert a review");
            }
        });

        it("Should raise an error to get a review", async () => {
            jest.spyOn(booksService, "getReviewByBook").mockReturnValueOnce(Promise.reject("Failed to get a review"));
            try {
                await booksService.getReviewByBook("R111");
            } catch (error) {
                expect(error).toBe("Failed to get a review");
            }
        });

        it("Should raise an error to update a review", async () => {
            jest.spyOn(booksService, "updateReviewByBook").mockReturnValueOnce(Promise.reject("Failed to update a review"));
            try {
                await booksService.updateReviewByBook("R111", review);
            } catch (error) {
                expect(error).toBe("Failed to update a review");
            }
        });

        it("Should raise an error to delete a review", async () => {
            jest.spyOn(booksService, "deleteReviewByBook").mockReturnValueOnce(Promise.reject("Failed to delete a review"));
            try {
                await booksService.deleteReviewByBook("R111");
            } catch (error) {
                expect(error).toBe("Failed to delete a review");
            }
        });
    });
});