import { createAction, props } from '@ngrx/store';
import { BillingAddress, Book } from '../../shared/shared-models';

export enum EBookActions {
  SearchBooks = '[Books Effect] Search Books',
  SearchBooksSuccess = '[Books Component] Search Books Success',
  SearchBooksFailure = '[Books Component] Search Books Failure',
  GetSelectedBook = '[Book Component] Get Selected Book',
  GetSelectedBookSuccess = '[Book Component] Get Selected Book Success',
  GetSelectedBookFailure = '[Book Component] Get Selected Book Failure',
  AddBookToCart = '[Book Component] Add Book To Cart',
  DeleteBookFromCart = '[Book Component] Delete Book From Cart',
  SubmitOrder = '[Book Component] Submit Order',
  GetBookCollection = '[Book Component] Get Book Collection'
}

export const searchResults = createAction(
  EBookActions.SearchBooks,
  props<{ searchText: string }>()
);
export const searchResultSuccess = createAction(
  EBookActions.SearchBooksSuccess,
  props<{ searchText: string, books: Book[] }>()
);
export const searchResultFailure = createAction(
  EBookActions.SearchBooksFailure,
  props<{ searchText: string, books: Book[], errorMessage: string }>()
);

export const getBookById = createAction(
  EBookActions.GetSelectedBook,
  props<{ bookId: string }>()
)
export const getBookByIdSuccess = createAction(
  EBookActions.GetSelectedBookSuccess,
  props<{ book: Book }>()
)
export const getBookByIdFailure = createAction(
  EBookActions.GetSelectedBookFailure,
  props<{ errorMessage: string }>()
)

export const addBookToCart = createAction(
  EBookActions.AddBookToCart,
  props<{ book: Book }>()
)
export const deleteBookFromCart = createAction(
  EBookActions.DeleteBookFromCart,
  props<{ book: Book }>()
)
export const submitOrder = createAction(
  EBookActions.SubmitOrder,
  props<{ billingAddress: BillingAddress }>()
)
