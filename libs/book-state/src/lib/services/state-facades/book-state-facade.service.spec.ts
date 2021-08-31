import { TestBed } from '@angular/core/testing';

import { Observable } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { MockBookData } from '../../shared/test-config/mock-data';
import * as bookActions from '../../store/actions/book.actions';
import * as bookStateFacadeService from './book-state-facade.service';
import { BookStateModule } from '../../book-state.module';
import { HttpClientModule } from '@angular/common/http';

describe('BookStateFacadeService', () => {
  let service: bookStateFacadeService.BookStateFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule, HttpClientModule]
    });
    service = TestBed.inject(bookStateFacadeService.BookStateFacadeService);
  });

  it('should have initialized all the state properties', () => {
    expect(service.searchResults$).toBeDefined()
    expect(service.cartBooks$).toBeDefined()
    expect(service.bookCollection$).toBeDefined()
    expect(service.cartCounter$).toBeDefined()
    expect(service.bookCollectionCounter$).toBeDefined()
    expect(service.selectedBook$).toBeDefined()
    expect(service.billingAddress$).toBeDefined()
  });

  it('should have return observable instance on all the state properties', () => {
    expect(service.searchResults$).toBeInstanceOf(Observable)
    expect(service.cartBooks$).toBeInstanceOf(Observable)
    expect(service.bookCollection$).toBeInstanceOf(Observable)
    expect(service.cartCounter$).toBeInstanceOf(Observable)
    expect(service.bookCollectionCounter$).toBeInstanceOf(Observable)
    expect(service.selectedBook$).toBeInstanceOf(Observable)
    expect(service.billingAddress$).toBeInstanceOf(Observable)
  })

  it('should dispatch an action to search the books', () => {
    const searchBooksSpy = jest.spyOn(service['store'], 'dispatch');
    service.searchForBooks('angular');
    expect(searchBooksSpy).toHaveBeenCalled();
    expect(searchBooksSpy).toHaveBeenCalledTimes(1);
    expect(searchBooksSpy).toHaveBeenCalledWith(bookActions.searchResults({ searchText: 'angular' }));
  })
  it('should dispatch an action to get the selected book', () => {
    const getSelectedBookSpy = jest.spyOn(service['store'], 'dispatch');
    service.getSelectedBookById(MockBookData.BOOK_ID);
    expect(getSelectedBookSpy).toHaveBeenCalled();
    expect(getSelectedBookSpy).toHaveBeenCalledTimes(1);
    expect(getSelectedBookSpy).toHaveBeenCalledWith(bookActions.getBookById({ bookId: MockBookData.BOOK_ID }));
  })
  it('should dispatch an action to add book to the cart', () => {
    const getSelectedBookSpy = jest.spyOn(service['store'], 'dispatch');
    service.removeBookFromCart(MockBookData.BOOK_LIST[0]);
    expect(getSelectedBookSpy).toHaveBeenCalled();
    expect(getSelectedBookSpy).toHaveBeenCalledTimes(1);
    expect(getSelectedBookSpy).toHaveBeenCalledWith(bookActions.deleteBookFromCart({ book: MockBookData.BOOK_LIST[0] }));
  })
  it('should dispatch an action to remove book to the cart', () => {
    const getSelectedBookSpy = jest.spyOn(service['store'], 'dispatch');
    service.addBookToCart(MockBookData.BOOK_LIST[0]);
    expect(getSelectedBookSpy).toHaveBeenCalled();
    expect(getSelectedBookSpy).toHaveBeenCalledTimes(1);
    expect(getSelectedBookSpy).toHaveBeenCalledWith(bookActions.addBookToCart({ book: MockBookData.BOOK_LIST[0] }));
  })
  it('should dispatch an action to submit the order', () => {
    const getSelectedBookSpy = jest.spyOn(service['store'], 'dispatch');
    service.submitBillingDetails(MockBookData.BILLING_ADDRESS);
    expect(getSelectedBookSpy).toHaveBeenCalled();
    expect(getSelectedBookSpy).toHaveBeenCalledTimes(1);
    expect(getSelectedBookSpy).toHaveBeenCalledWith(bookActions.submitOrder({ billingAddress: MockBookData.BILLING_ADDRESS }));
  })
});
