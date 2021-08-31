import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BookStateFacadeService, Book } from '@book-purchase/book-state';

@Component({
  selector: 'book-purchase-book-container',
  templateUrl: './book-container.component.html',
  styleUrls: ['./book-container.component.scss'],
})
export class BookContainerComponent implements OnInit {
  books$!: Observable<Book[]>;
  error$!: Observable<string>;

  constructor(private bookStateFacade: BookStateFacadeService) {
  }

  ngOnInit() {
    //Default search to display book list
    this.searchByDefaultBookTitle();
  }

  private searchByDefaultBookTitle() {
    const DEFAULT_STRING = 'angular';
    this.books$ = this.bookStateFacade.searchResults$;
    this.error$ = this.bookStateFacade.searchResultsFailure$;
    this.bookStateFacade.searchForBooks(DEFAULT_STRING);
  }

  onSearch(searchStr: string) {
    this.bookStateFacade.searchForBooks(searchStr);
  }
}
