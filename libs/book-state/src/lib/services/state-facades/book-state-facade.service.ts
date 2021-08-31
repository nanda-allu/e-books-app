import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { BillingAddress, Book } from '../../shared/shared-models';

import * as bookActions from '../../store/actions/book.actions';
import * as booksSelector from '../../store/selectors/books.selector';

@Injectable({
  providedIn: 'root'
})
export class BookStateFacadeService {

  constructor(private store: Store) { }

  searchResults$ = this.store.select(booksSelector.searchResultsSelector);
  searchResultsFailure$ = this.store.select(booksSelector.searchResultsFailureSelector);
  cartBooks$ = this.store.select(booksSelector.cartBooksSelector);
  bookCollection$ = this.store.select(booksSelector.bookCollectionSelector);
  cartCounter$ = this.store.select(booksSelector.cartCounterSelector);
  bookCollectionCounter$ = this.store.select(booksSelector.bookCollectionCounterSelector);
  selectedBook$ = this.store.select(booksSelector.getBookByIdSelector);
  selectedBookFailure$ = this.store.select(booksSelector.getBookByIdFailureSelector);
  billingAddress$ = this.store.select(booksSelector.billingAddressSelector);


  public searchForBooks(searchStr: string) {
    this.store.dispatch(bookActions.searchResults({ searchText: searchStr }));
  }
  public getSelectedBookById(id: string) {
    this.store.dispatch(bookActions.getBookById({ bookId: id }));
  }
  public addBookToCart(book: Book) {
    this.store.dispatch(bookActions.addBookToCart({ book: book }));
  }
  public removeBookFromCart(book: Book) {
    this.store.dispatch(bookActions.deleteBookFromCart({ book: book }));
  }
  public submitBillingDetails(billingAddress: BillingAddress) {
    this.store.dispatch(bookActions.submitOrder({ billingAddress: billingAddress }));
  }

}
