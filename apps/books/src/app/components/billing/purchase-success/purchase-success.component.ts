import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'book-purchase-purchase-success',
  templateUrl: './purchase-success.component.html',
  styleUrls: ['./purchase-success.component.scss']
})
export class PurchaseSuccessDialogComponent {

  constructor(public dialogRef: MatDialogRef<PurchaseSuccessDialogComponent>) { }

}
