import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { BookStateFacadeService, Book, SubscriptionsContainer } from '@book-purchase/book-state';

import { RoutesEnum } from '../../../route-config/routes';
import { RouteParams } from '../../../route-config/route-params';


@Component({
  selector: 'book-purchase-book-view',
  templateUrl: './book-view.component.html',
  styleUrls: ['./book-view.component.scss'],
})
export class BookViewComponent implements OnInit, OnDestroy {
  book!: Book;
  error$!: Observable<string>;

  private subscriptionContainer = new SubscriptionsContainer();

  constructor(
    private activatedRoute: ActivatedRoute,
    private bookFacadeService: BookStateFacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getBookInfoByBookId();
    this.subscribeForSelectedBookDetails();
  }

  private getBookInfoByBookId() {
    const bookId: string = <string>(
      this.activatedRoute.snapshot.paramMap.get(RouteParams.BOOK_ID)
    );
    this.bookFacadeService.getSelectedBookById(bookId);
  }

  private subscribeForSelectedBookDetails() {
    this.error$ = this.bookFacadeService.selectedBookFailure$;
    this.subscriptionContainer.add = this.bookFacadeService.selectedBook$.subscribe(book => {
      this.book = book;
    });
  }

  addtoCart() {
    this.bookFacadeService.addBookToCart(this.book);
    this.router.navigate([RoutesEnum.BOOKS]);
  }

  buyBook() {
    this.router.navigate([RoutesEnum.ADDRESS_FORM]);
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }
}
