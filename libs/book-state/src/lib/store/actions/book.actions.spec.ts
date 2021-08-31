import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { MockBookData } from "../../shared/test-config/mock-data";
import * as bookActions from "./book.actions";

describe('BookActions', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    }).compileComponents();
  });
  it('should create an searchResults', () => {
    const action = bookActions.searchResults({ searchText: 'angular' });
    expect(action).toEqual({
      type: bookActions.EBookActions.SearchBooks,
      searchText: 'angular',
    });
  });
  it('should create an searchResultSuccess', () => {
    const action = bookActions.searchResultSuccess({ searchText: 'angular', books: MockBookData.BOOK_LIST });
    expect(action).toEqual({
      type: bookActions.EBookActions.SearchBooksSuccess,
      searchText: 'angular', books: MockBookData.BOOK_LIST
    });
  });
  it('should create an searchResultFailure', () => {
    const action = bookActions.searchResultFailure({ searchText: 'angular', books: [], errorMessage: 'error' });
    expect(action).toEqual({
      type: bookActions.EBookActions.SearchBooksFailure,
      searchText: 'angular', books: [], errorMessage: 'error'
    });
  });
  it('should create an getBookById', () => {
    const action = bookActions.getBookById({ bookId: MockBookData.BOOK_ID });
    expect(action).toEqual({
      type: bookActions.EBookActions.GetSelectedBook,
      bookId: MockBookData.BOOK_ID
    });
  });
  it('should create an getBookByIdSuccess', () => {
    const action = bookActions.getBookByIdSuccess({ book: MockBookData.BOOK_LIST[0] });
    expect(action).toEqual({
      type: bookActions.EBookActions.GetSelectedBookSuccess,
      book: MockBookData.BOOK_LIST[0]
    });
  });
  it('should create an getBookByIdFailure', () => {
    const action = bookActions.getBookByIdFailure({ errorMessage: 'HttpError' });
    expect(action).toEqual({
      type: bookActions.EBookActions.GetSelectedBookFailure,
      errorMessage: 'HttpError'
    });
  });
  it('should create an addBookToCart', () => {
    const action = bookActions.addBookToCart({ book: MockBookData.BOOK_LIST[0] });
    expect(action).toEqual({
      type: bookActions.EBookActions.AddBookToCart,
      book: MockBookData.BOOK_LIST[0]
    });
  });
  it('should create an deleteBookFromCart', () => {
    const action = bookActions.deleteBookFromCart({ book: MockBookData.BOOK_LIST[0] });
    expect(action).toEqual({
      type: bookActions.EBookActions.DeleteBookFromCart,
      book: MockBookData.BOOK_LIST[0]
    });
  });
  it('should create an submitOrder', () => {
    const action = bookActions.submitOrder({ billingAddress: MockBookData.BILLING_ADDRESS });
    expect(action).toEqual({
      type: bookActions.EBookActions.SubmitOrder,
      billingAddress: MockBookData.BILLING_ADDRESS
    });
  });
});
