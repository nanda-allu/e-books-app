import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ofType, Actions, createEffect } from '@ngrx/effects';
import { Action } from '@ngrx/store';

import { Observable, of } from 'rxjs';
import { debounceTime, map, switchMap, skip, takeUntil, catchError } from 'rxjs/operators';

import { BooksDataService } from '../../services/books-data/books-data.service';
import * as bookActions from '../actions/book.actions';

@Injectable()
export class BookEffects {

  searchBooks$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.EBookActions.SearchBooks),
      debounceTime(800),
      map((action: { searchText: string }) => action.searchText),
      switchMap((query) => {
        const nextSearch$ = this.actions$.pipe(ofType(bookActions.EBookActions.SearchBooks), skip(1));

        takeUntil(nextSearch$)
        return this.booksDataService.getBooksByQueryParam(query).pipe(
          map(books => bookActions.searchResultSuccess({ books: books, searchText: query })),
          catchError((error: HttpErrorResponse) => {
            return this.handleSearchBooksError(error, query);
          }))
      })))


  searchBookById$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(bookActions.EBookActions.GetSelectedBook),
      debounceTime(1000),
      map((action: { bookId: string }) => action.bookId),
      switchMap((query) => {
        return this.booksDataService.getBooksByQueryParam(query).pipe(
          map(books => bookActions.getBookByIdSuccess({ book: books[0] })),
          catchError((error: HttpErrorResponse) => {
            return this.handleGetBookError(error);
          }))

      })))

  constructor(private actions$: Actions, private booksDataService: BooksDataService) { }

  private handleGetBookError(error: HttpErrorResponse) {
    return of(
      bookActions.getBookByIdFailure({
        errorMessage: error.message
      })
    );
  }

  private handleSearchBooksError(error: HttpErrorResponse, query: string) {
    return of(
      bookActions.searchResultFailure({
        books: [],
        errorMessage: error.message,
        searchText: query,
      })
    );
  }
}
