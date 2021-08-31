import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BuyBookFormComponent } from './buy-book-form/buy-book-form.component';
import { MaterialModule } from '../material/material.module';
import { RouterModule, Routes } from '@angular/router';
import { PurchaseSuccessDialogComponent } from './purchase-success/purchase-success.component';

const ROUTES: Routes = [{ path: '', component: BuyBookFormComponent }];
@NgModule({
  imports: [CommonModule, MaterialModule, RouterModule.forChild(ROUTES)],
  declarations: [BuyBookFormComponent, PurchaseSuccessDialogComponent],
  entryComponents: [PurchaseSuccessDialogComponent]
})
export class BillingModule { }
