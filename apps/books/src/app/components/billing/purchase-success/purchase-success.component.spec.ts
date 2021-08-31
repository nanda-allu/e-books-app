import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { MaterialModule } from '../../material/material.module';

import { PurchaseSuccessDialogComponent } from './purchase-success.component';

describe('PurchaseSuccessDialog', () => {
  let component: PurchaseSuccessDialogComponent;
  let fixture: ComponentFixture<PurchaseSuccessDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PurchaseSuccessDialogComponent],
      imports: [MaterialModule],
      providers: [{ provide: MatDialogRef, useValue: {} }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseSuccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the instance of MatDialogRef', () => {
    expect(component['dialogRef']).toBeDefined();
  });
  it('should have the header as Information on the dialog', () => {
    const dialogHeaderElement = fixture.debugElement.query(By.css('h1'));
    expect(dialogHeaderElement.nativeElement.textContent.trim()).toBe('Information');
  });
  it('should have a button to close the dialog', () => {
    const matButtonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(matButtonElements.length).toBe(1);
  });
});
