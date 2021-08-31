import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCollectionListComponent } from './book-collection-list/book-collection-list.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [{ path: '', component: BookCollectionListComponent }]
@NgModule({
  declarations: [
    BookCollectionListComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class BookCollectionModule { }
