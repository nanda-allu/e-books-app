import { MockBookData } from "../../shared/test-config/mock-data";
import { IAppState } from "../state/app.state";
import { IBookState } from "../state/book.state";
import * as booksSelector from "./books.selector";

describe('Books Selector', () => {
  const mockBookState: IBookState = { billingAddress: MockBookData.BILLING_ADDRESS, bookCollection: MockBookData.BOOK_LIST, cartBooks: MockBookData.BOOK_LIST, selectedBook: MockBookData.BOOK_LIST[0], bookId: MockBookData.BOOK_ID, books: MockBookData.BOOK_LIST };
  const mockAppState: IAppState = { booksState: mockBookState };

  it('should return books from the searchResultsSelector', () => {
    const state: IAppState = {
      ...mockAppState,
    };
    expect(booksSelector.searchResultsSelector.projector(state)).toEqual(MockBookData.BOOK_LIST);
  });
  it('should return books from the getBookByIdSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.getBookByIdSelector.projector(state)).toEqual(MockBookData.BOOK_LIST[0]);
  });
  it('should return books from the cartBooksSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.cartBooksSelector.projector(state)).toEqual(MockBookData.BOOK_LIST);
  });
  it('should return books from the bookCollectionSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.bookCollectionSelector.projector(state)).toEqual(MockBookData.BOOK_LIST);
  });
  it('should return books from the cartCounterSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.cartCounterSelector.projector(state)).toEqual(MockBookData.BOOK_LIST.length);
  });
  it('should return books from the cartCounterSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.cartCounterSelector.projector(state)).toEqual(MockBookData.BOOK_LIST.length);
  });
  it('should return books from the bookCollectionCounterSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.bookCollectionCounterSelector.projector(state)).toEqual(MockBookData.BOOK_LIST.length);
  });
  it('should return books from the billingAddressSelector', () => {
    const state: IAppState = {
      ...mockAppState
    };
    expect(booksSelector.billingAddressSelector.projector(state)).toEqual(MockBookData.BILLING_ADDRESS);
  });
});
