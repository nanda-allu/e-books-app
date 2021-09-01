import request from "supertest";
import mongoose from "mongoose";

import { book, review } from "./tests/mock-data/mock-data";


describe("API endpoint", () => {
    let app: any;
    let authToken: string =
        "Bearer eyJraWQiOiJ2dVpqeDU2bDZoRlpSQnJkczBuRXNhRGs0R0RJRENsT1h0clNPSV9PWW9nIiwiYWxnIjoiUlMyNTYifQ.eyJ2ZXIiOjEsImp0aSI6IkFULnBZR0VwbjI5c1JqRVZSUElEUTRXb2ZISi1BYXhPZzdxbDNCbll5UWg0Tmsub2FyNGFnanE5bnRiREZtTms1ZDYiLCJpc3MiOiJodHRwczovL2Rldi0xNzAyMDk1OS5va3RhLmNvbS9vYXV0aDIvZGVmYXVsdCIsImF1ZCI6ImFwaTovL2RlZmF1bHQiLCJpYXQiOjE2MzAzMTU1NjMsImV4cCI6MTYzMDMxOTE2MywiY2lkIjoiMG9hMWgwdmJ2bUJpRjdTVGI1ZDciLCJ1aWQiOiIwMHUxZnpsNTl0TXg0OEduRjVkNyIsInNjcCI6WyJvZmZsaW5lX2FjY2VzcyIsIm9wZW5pZCIsInByb2ZpbGUiLCJlbWFpbCJdLCJzdWIiOiJuYWxsdUBwa2dsb2JhbC5jb20ifQ.EMLSip8yfVIOjejg2g9R4yXFJ4ImVagpg1Bfzd7cCHtlJPC_Kc_nA3w6IAaxF54WMfDlla2bBWu-ZfoYnF4_QU4cnyx6vEMHykUHUF2L2HV0sv3QqtfqRg3Ulf-Zcw9GEozoqCE0smu9dyK7GgjOq8KCDOSh8KbLnYGk0MPaFIGPcg-xG1EX6d_vdHwuXLf0kS9WWH44x0VOh3mwXTBD6qh8KJAYxD8AmZtpSFAsnZEIAIfBG4Kw3RaUySR0DUBHSTIJ7jjr8o1PsIpa5-cnNo4oNGUosVikKRw1JOfVxHG_CbfVxnr_ka-Ct8bZgkMzzURSKUrOkNxIeFAh3wrQGA";
    beforeEach(async () => {
        app = require("./app");
    });
    afterAll((done) => {
        mongoose.connection.close();
        done();
    });
    describe("Books tests", () => {
        it("GET: should throw error not found, on invalid route", (done) => {
            request(app).get("/test").then(data => {
                expect(data.body).toEqual({
                    statusCode: 404,
                    message: "URL not found",
                });
                done();
            })
        });
        it("GET: should throw error unauthorized, on valid route", (done) => {
            request(app).get("/books").expect(401, done);
        });

        it("GET: should have authorization token", (done) => {
            request(app)
                .get("/books")
                .set({ Authorization: authToken })
                .expect(200, done)
        });
        it("GET: should throw validation shcema error, while creating book", (done) => {
            request(app)
                .post("/books")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toContain('"name" is required');
                    done();
                });
        });
        it("GET: should throw unauthorized error,when no authToken set on headers", (done) => {
            request(app)
                .get("/books")
                .then((data) => {
                    expect(data.body).toEqual({
                        name: "UnauthorizedError",
                        message: "Authorization header is missing",
                    });
                    done();
                });
        });
        it("GET: should throw error, when authToken doesn't have Bearer in it", (done) => {
            request(app)
                .get("/books")
                .set({ Authorization: "accessToken" })
                .then((data) => {
                    expect(data.body).toEqual({
                        name: "UnauthorizedError",
                        message: '"Bearer" is missing in auth token',
                    });
                    done();
                });
        });
        it("GET: should throw error, when book_id is invalid", (done) => {
            request(app)
                .get("/books/B123")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe("Book not found");
                    done();
                });
        });
        it("POST: should throw error, when book_id is invalid", (done) => {
            request(app)
                .put("/books/B123")
                .send(book)
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe("Book not found");
                    done();
                });
        });

        it("DELETE: should throw error, when book_id is invalid", (done) => {
            request(app)
                .delete("/books/B123")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe("Book not found");
                    done();
                });
        });
    })
    describe("Review tests", () => {

        it("GET-reviews: should throw error, when book_id is invalid", (done) => {
            request(app)
                .get("/books/B123/reviews")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe("Review or book not found");
                    done();
                });
        });
        it("POST-reviews: should throw error, when book_id is invalid", (done) => {
            request(app)
                .post("/books/B123/reviews")
                .send(review)
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe("Review or book not found");
                    done();
                });
        });
        it("GET-book-reviews: should throw error, when book_id or review_id is invalid", (done) => {
            request(app)
                .get("/books/B123/reviews/R123")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe(
                        "Review or book not found"
                    );
                    done();
                });
        });

        it("PUT-book-reviews: should throw error, when book_id is invalid", (done) => {
            request(app)
                .put("/books/B123/reviews/R123")
                .send(review)
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe(
                        "Review or book not found"
                    );
                    done();
                });
        });
        it("DELETE-book-reviews: should throw error, when book_id is invalid", (done) => {
            request(app)
                .delete("/books/B123/reviews/R123")
                .set({ Authorization: authToken })
                .then((data) => {
                    expect(data.body.message).toBe(
                        "Review or book not found"
                    );
                    done();
                });
        });
    })
});