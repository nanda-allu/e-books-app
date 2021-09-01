import { Container } from "typedi";
import { MockDBService } from "../tests/mock-data/db-handler";
import { book } from "../tests/mock-data/mock-data";
import { Books } from "./books.model";

describe('meme', () => {

    const mockDB: MockDBService = Container.get(MockDBService);

    beforeAll(async () => await mockDB.connect());

    afterEach(async () => await mockDB.deleteDatabase());

    afterAll(async () => await mockDB.disconnect());


    it("Should allow to insert valid book", async () => {
        const validBook = new Books(book);
        const newBook = await validBook.save();

        expect(newBook._id).toBeDefined();
        expect(newBook.name).toBe(book.name);
        expect(newBook.author.length).toBe(book.author.length);
        expect(newBook.publisher).toEqual(book.publisher);
        expect(newBook.price).toEqual(book.price);
    });

    it("Should raise specific error,with the invalid payload ", async () => {
        const book = new Books({
            name: "TekLoon",
        });
        try {
            await book.save();
        } catch (e) {
            expect(e.message).toContain("Publisher location is required");
            expect(e.message).toContain("Publisher name is required");
            expect(e.message).toContain("Publisher_id is required");
            expect(e.message).toContain("Price is required");
        }
    });
});