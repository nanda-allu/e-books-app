import { Component, OnDestroy, OnInit } from '@angular/core';

import { Observable, of } from 'rxjs';

import { BookStateFacadeService, Book, SubscriptionsContainer } from '@book-purchase/book-state';

@Component({
  selector: 'book-purchase-cart-container',
  templateUrl: './cart-container.component.html',
  styleUrls: ['./cart-container.component.scss']
})
export class CartContainerComponent implements OnInit, OnDestroy {

  private cloneCartBooks: Book[] = [];
  cartBooks$!: Observable<Book[]>;
  private subscriptionContainer = new SubscriptionsContainer();

  constructor(private bookFacadeService: BookStateFacadeService) { }

  ngOnInit(): void {
    this.getCartBooks();
  }
  private getCartBooks() {
    this.cartBooks$ = this.bookFacadeService.cartBooks$;
    this.subscriptionContainer.add = this.bookFacadeService.cartBooks$.subscribe(books => {
      this.cloneCartBooks = Object.assign([], books);
    });
  }

  onSearch(searchStr: string) {
    const filterResults = this.cloneCartBooks.filter(book => book.volumeInfo.title?.toLowerCase().indexOf(searchStr?.toLowerCase()) !== -1);
    this.cartBooks$ = of(filterResults);
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }
}
