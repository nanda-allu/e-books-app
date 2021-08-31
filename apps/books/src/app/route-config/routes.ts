import { Routes } from '@angular/router';

export enum RoutesEnum {
  BOOKS = 'books',
  LIST = 'list',
  BOOK_VIEW = 'view',
  ADDRESS_FORM = 'address',
  CART_LIST = 'cartList',
  BOOK_COLLECTION = 'bookCollection',
}
export class RouteConfig {
  static ROUTES: Routes = [
    { path: '', redirectTo: `${RoutesEnum.BOOKS}`, pathMatch: 'full' },
    {
      path: `${RoutesEnum.BOOKS}`,
      loadChildren: () =>
        import('../components/books/books.module').then(
          (mod) => mod.BooksModule
        ),
    },
    {
      path: `${RoutesEnum.ADDRESS_FORM}`,
      loadChildren: () =>
        import('../components/billing/billing.module').then(
          (mod) => mod.BillingModule
        ),
    },
    {
      path: `${RoutesEnum.CART_LIST}`,
      loadChildren: () =>
        import('../components/cart/cart.module').then(
          (mod) => mod.CartModule
        ),
    },
    {
      path: `${RoutesEnum.BOOK_COLLECTION}`,
      loadChildren: () =>
        import('../components/book-collection/book-collection.module').then(
          (mod) => mod.BookCollectionModule
        ),
    }
  ];
}
