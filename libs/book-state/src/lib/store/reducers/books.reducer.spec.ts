import { initialBookState } from "../state/book.state";
import { bookReducer } from "./books.reducers";
import * as bookActions from "../actions/book.actions";
import { MockBookData } from "../../shared/test-config/mock-data";

describe('Books Reducer', () => {

  it('should return the searched book results', () => {
    const bookState = { ...initialBookState, books: MockBookData.BOOK_LIST };
    const action = { type: bookActions.EBookActions.SearchBooksSuccess, searchText: "angular", books: MockBookData.BOOK_LIST };
    const { books } = bookReducer(bookState, action);
    expect(books).toEqual(MockBookData.BOOK_LIST);
  });
  it('should return the selected book details', () => {
    const bookState = { ...initialBookState };
    const action = { type: bookActions.EBookActions.GetSelectedBookSuccess, book: MockBookData.BOOK_LIST[0] };
    const { selectedBook } = bookReducer(bookState, action);
    expect(selectedBook).toEqual(MockBookData.BOOK_LIST[0]);
  });
  it('should return the update cart books on ADD', () => {
    const bookState = { ...initialBookState, cartBooks: MockBookData.BOOK_LIST };
    const action = { type: bookActions.EBookActions.AddBookToCart, book: MockBookData.BOOK_LIST[0], cartBooks: MockBookData.BOOK_LIST };
    const { cartBooks } = bookReducer(bookState, action);
    expect(cartBooks).toEqual(MockBookData.BOOK_LIST);
  });
  it('should return the updated cart books on DELETE', () => {
    const bookState = { ...initialBookState, ...{ cartBooks: MockBookData.BOOK_LIST } };
    const action = { type: bookActions.EBookActions.DeleteBookFromCart, book: MockBookData.BOOK_LIST[0], cartBooks: MockBookData.BOOK_LIST };
    const { cartBooks } = bookReducer(bookState, action);
    expect(cartBooks).toEqual([MockBookData.BOOK_LIST[1]]);
  });
  it('should return the updated billing address', () => {
    const bookState = { ...initialBookState };
    const action = { type: bookActions.EBookActions.SubmitOrder, billingAddress: MockBookData.BILLING_ADDRESS };
    const { billingAddress } = bookReducer(bookState, action);
    expect(billingAddress).toEqual(MockBookData.BILLING_ADDRESS);
  });
});
