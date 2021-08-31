import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BookEffects } from './store/effects/books.effect';
import { appReducers } from './store/reducers/app.reducer';

@NgModule({
  imports: [CommonModule,
    StoreModule.forFeature('books', appReducers),
    EffectsModule.forFeature([BookEffects])],
})
export class BookStateModule { }
