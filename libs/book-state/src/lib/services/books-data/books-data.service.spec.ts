import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';

import { MockBookData } from '../../shared/test-config/mock-data';
import { BooksDataService } from './books-data.service';

describe('BooksDataService', () => {
  let service: BooksDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(BooksDataService);
  });

  it('should have initialized the properites', () => {
    expect(service['httpClient']).toBeDefined();
    expect(service.getBooksByQueryParam('')).toBeInstanceOf(Observable);
  });
  it('should return list of books on getBooksByName() call ', (done) => {
    jest.spyOn(service, 'getBooksByQueryParam').mockReturnValue(of(MockBookData.BOOK_LIST));
    const booksAPI = service.getBooksByQueryParam('angular');
    booksAPI.subscribe(books => {
      expect(books.length).toBe(MockBookData.BOOK_LIST.length);
      done();
    })
  });
});
