/* eslint-disable @typescript-eslint/no-explicit-any */
import { HttpClientModule } from "@angular/common/http";
import { TestBed } from "@angular/core/testing";
import { EffectsModule } from "@ngrx/effects";
import { StoreModule } from "@ngrx/store";
import { ReplaySubject } from "rxjs";
import { provideMockActions } from '@ngrx/effects/testing';

import { BookEffects } from "./books.effect";
import { EBookActions } from "../actions/book.actions";
import { MockBookData } from "../../shared/test-config/mock-data";

describe('BooksEffects', () => {
  let effects: BookEffects;
  let actions: ReplaySubject<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot({}), EffectsModule.forRoot([]), HttpClientModule],
      providers: [BookEffects, provideMockActions(() => actions)]
    });
    effects = TestBed.inject(BookEffects);
  });

  it('should have initialized the properties', async () => {
    expect(effects).toBeTruthy();
    expect(effects.searchBooks$).toBeDefined();
    expect(effects.searchBookById$).toBeDefined();
  })

  it('should get the books on success action', (done) => {
    actions = new ReplaySubject(1);
    actions.next({
      type: EBookActions.SearchBooks,
      searchText: 'angular',
    });
    effects.searchBooks$.subscribe((data: any) => {
      expect(data.type).toBe(EBookActions.SearchBooksSuccess);
      expect(data?.books.some((book: any) => new RegExp('angular').test(book.volumeInfo.title?.toLowerCase()))).toBeTruthy();
      done();
    });
  });

  it('should return error message on search books failed', (done) => {
    actions = new ReplaySubject(1);
    actions.next({
      type: EBookActions.SearchBooks,
      searchText: '',
    });
    effects.searchBooks$.subscribe((data) => {
      expect(data.type).toBe(EBookActions.SearchBooksFailure);
      done();
    });
  });
  it('should return the selected book on getBookById', (done) => {
    actions = new ReplaySubject(1);
    actions.next({
      type: EBookActions.GetSelectedBook,
      bookId: MockBookData.BOOK_ID,
    });
    effects.searchBookById$.subscribe((data) => {
      expect(data.type).toBe(EBookActions.GetSelectedBookSuccess);
      done();
    });
  });
  it('should return error message on getById failed', (done) => {
    actions = new ReplaySubject(1);
    actions.next({
      type: EBookActions.GetSelectedBook,
      bookId: '',
    });
    effects.searchBookById$.subscribe((data) => {
      expect(data.type).toBe(EBookActions.GetSelectedBookFailure);
      done();
    });
  });
})
