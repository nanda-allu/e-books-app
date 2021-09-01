import Container from "typedi";
import { MockDBService } from "../tests/mock-data/db-handler";
import { review } from "../tests/mock-data/mock-data";
import { Reviews } from "./review.model";

describe("Review Model Test", () => {
    const dbHandler: MockDBService = Container.get(MockDBService);

    beforeAll(async () => await dbHandler.connect());

    afterEach(async () => await dbHandler.deleteDatabase());

    afterAll(async () => await dbHandler.disconnect());

    it("Should allow to save valid review", async () => {
        const validReview = new Reviews(review);
        const savedReview = await validReview.save();

        expect(savedReview._id).toBeDefined();
        expect(savedReview.reviwer).toBe(review.reviwer);
        expect(savedReview.message).toBe(review.message);
    });

    it("Show raise specific error, when the payload is not correct", async () => {
        const review = new Reviews({});
        try {
            await review.save();
        } catch (e) {
            expect(e.message).toContain("Reviwer is required");
            expect(e.message).toContain("Message is required");
        }
    });
});
