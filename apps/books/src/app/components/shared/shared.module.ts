import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookStateModule } from '@book-purchase/book-state';

import { BookListComponent } from './book-list/book-list.component';
import { MaterialModule } from '../material/material.module';
import { SearchBookComponent } from './search-book/search-book.component';

@NgModule({
  declarations: [BookListComponent, SearchBookComponent],
  imports: [CommonModule, MaterialModule, BookStateModule],
  exports: [BookListComponent, SearchBookComponent, MaterialModule],
})
export class SharedModule { }
