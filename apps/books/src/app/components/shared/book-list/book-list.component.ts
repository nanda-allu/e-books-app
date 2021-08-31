import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

import { BookStateFacadeService, BillingAddress, Book } from '@book-purchase/book-state';

import { RoutesEnum } from '../../../route-config/routes';

@Component({
  selector: 'book-purchase-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  @Input() books!: Observable<Book[]>;
  @Input() cartBookView = false;
  @Input() cartCollectionView = false;

  billingAddress!: Observable<BillingAddress>;

  objectSortOrderFn = (): number => {
    return 0;
  }
  constructor(private router: Router, private bookFacadeService: BookStateFacadeService) { }

  ngOnInit() {
    this.billingAddress = this.bookFacadeService.billingAddress$;
  }

  onBookSelection(id: string) {
    if (!this.cartBookView) {
      this.router.navigate([`${RoutesEnum.BOOKS}/${RoutesEnum.BOOK_VIEW}/${id}`]);
    }
  }
  proceedToPurchase() {
    this.router.navigate([RoutesEnum.ADDRESS_FORM]);
  }
  removeBook(book: Book) {
    this.bookFacadeService.removeBookFromCart(book);
  }
}
