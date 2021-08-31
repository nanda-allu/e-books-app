import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BookStateFacadeService, Book, SubscriptionsContainer } from '@book-purchase/book-state';

@Component({
  selector: 'book-purchase-book-collection-list',
  templateUrl: './book-collection-list.component.html',
  styleUrls: ['./book-collection-list.component.scss']
})
export class BookCollectionListComponent implements OnInit, OnDestroy {
  private clonedBookCollection: Book[] = [];
  bookCollection$!: Observable<Book[]>;
  private subscriptionContainer = new SubscriptionsContainer();
  constructor(private bookStateFacade: BookStateFacadeService) { }

  ngOnInit(): void {
    this.bookCollection$ = this.bookStateFacade.bookCollection$;
    this.subscriptionContainer.add = this.bookStateFacade.bookCollection$.subscribe(books => {
      this.clonedBookCollection = Object.assign([], books);
    })
  }
  onSearch(searchStr: string) {
    const filterResults = this.clonedBookCollection.filter(book => book.volumeInfo.title?.toLowerCase().indexOf(searchStr?.toLowerCase()) !== -1);
    this.bookCollection$ = of(filterResults);
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }
}
