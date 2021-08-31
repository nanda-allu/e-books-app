import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutesEnum } from '../../route-config/routes';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';
import { RouteParams } from '../../route-config/route-params';
import { BookViewComponent } from './book-view/book-view.component';
import { BookContainerComponent } from './book-container/book-container.component';

const ROUTES: Routes = [
  { path: '', redirectTo: `${RoutesEnum.LIST}`, pathMatch: 'full' },
  { path: `${RoutesEnum.LIST}`, component: BookContainerComponent },
  {
    path: `${RoutesEnum.BOOK_VIEW}/:${RouteParams.BOOK_ID}`,
    component: BookViewComponent,
  },
];
@NgModule({
  declarations: [BookContainerComponent, BookViewComponent],
  imports: [CommonModule, SharedModule, RouterModule.forChild(ROUTES)
  ],
})
export class BooksModule { }
