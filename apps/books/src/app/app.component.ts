import { Component, OnDestroy } from '@angular/core';
// import { Subscription } from 'rxjs';

import { RoutesEnum } from './route-config/routes';
import { BookStateFacadeService, SubscriptionsContainer } from '@book-purchase/book-state';

@Component({
  selector: 'book-purchase-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  cartCount = 0;
  collectionCount = 0;
  routesEnum = RoutesEnum;
  private subscriptionContainer = new SubscriptionsContainer();
  constructor(private booksFacade: BookStateFacadeService) {
    this.subscribeForCartCountChanges();
  }

  private subscribeForCartCountChanges() {
    this.subscriptionContainer.add = this.booksFacade.cartCounter$.subscribe(cartCount => {
      this.cartCount = cartCount;
    });
    this.subscriptionContainer.add = this.booksFacade.bookCollectionCounter$.subscribe(cartCount => {
      this.collectionCount = cartCount;
    });
  }

  ngOnDestroy() {
    this.subscriptionContainer.unsubscribe();
  }
}
