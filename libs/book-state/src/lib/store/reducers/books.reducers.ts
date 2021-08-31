import { createReducer, on } from "@ngrx/store";

import { Book } from "../../shared/shared-models";
import { initialBookState } from "../state/book.state";
import * as bookActions from "../actions/book.actions";


export const bookReducer = createReducer(initialBookState,
  on(bookActions.searchResultSuccess, (state, action) => {
    return {
      ...state,
      books: action.books,
      searchText: action.searchText
    }
  }),
  on(bookActions.searchResultFailure, (state, action) => {
    return {
      ...state,
      books: action.books,
      errorMessage: action.errorMessage
    }
  }),
  on(bookActions.getBookByIdSuccess, (state, action) => {
    return {
      ...state,
      selectedBook: action.book
    }
  }),
  on(bookActions.getBookByIdFailure, (state, action) => {
    return {
      ...state,
      errorMessage: action.errorMessage
    }
  }),
  on(bookActions.addBookToCart, (state, action) => {
    const addedCartItems: Book[] = Object.assign([], state.cartBooks)
    if (!addedCartItems.find(book => book.id === action.book.id)) {
      addedCartItems.push(action.book);
    }
    return {
      ...state,
      cartBooks: addedCartItems
    }
  }),
  on(bookActions.deleteBookFromCart, (state, action) => {
    let updatedCartItems: Book[] = Object.assign([], state.cartBooks)
    updatedCartItems = updatedCartItems.filter(book => book.id !== action.book.id);
    return {
      ...state,
      cartBooks: updatedCartItems
    }
  }),
  on(bookActions.submitOrder, (state, action) => {
    return {
      ...state,
      billingAddress: action.billingAddress,
      bookCollection: state.cartBooks
    }
  })
)
