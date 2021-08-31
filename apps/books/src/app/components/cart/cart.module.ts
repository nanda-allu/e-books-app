import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartContainerComponent } from './cart-container/cart-container.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [{ path: '', component: CartContainerComponent }]
@NgModule({
  declarations: [
    CartContainerComponent
  ],
  imports: [
    CommonModule, SharedModule, RouterModule.forChild(ROUTES)
  ]
})
export class CartModule { }
