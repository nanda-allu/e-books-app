import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { BookStateFacadeService } from '@book-purchase/book-state';
import { PurchaseSuccessDialogComponent } from '../purchase-success/purchase-success.component';

@Component({
  selector: 'book-purchase-buy-book-form',
  templateUrl: './buy-book-form.component.html',
  styleUrls: ['./buy-book-form.component.scss'],
})
export class BuyBookFormComponent implements OnInit {
  addressForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog,
    private bookStateFacade: BookStateFacadeService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm() {
    const formConfig = {
      name: [null, Validators.required],
      email: [null, Validators.required],
      phone: [null, Validators.required],
      address: [null, Validators.required]
    };
    this.addressForm = this.formBuilder.group(formConfig);
  }

  submit() {
    const billingAddress = this.addressForm.getRawValue();
    this.bookStateFacade.submitBillingDetails(billingAddress);
    this.notifyUser();
  }
  notifyUser(): void {
    const dialogConfig = { width: '500px' };
    this.dialog.open(PurchaseSuccessDialogComponent, dialogConfig);
  }
}
