import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BookStateModule } from '@book-purchase/book-state';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../../material/material.module';

import { BuyBookFormComponent } from './buy-book-form.component';

describe('BuyBookFormComponent', () => {
  let component: BuyBookFormComponent;
  let fixture: ComponentFixture<BuyBookFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BuyBookFormComponent],
      imports: [MaterialModule, BrowserAnimationsModule, HttpClientModule,
        StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyBookFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have initialized the address form', () => {
    expect(component['bookStateFacade']).toBeDefined();
    expect(component.addressForm).toBeDefined();
    expect(Object.values(component.addressForm.value).every(e => e === null)).toBeTruthy();
  });
  it('submit button should be disabled by default', () => {
    const btnElement = fixture.debugElement.query(By.css('button'));
    expect(btnElement.nativeElement).toBeDefined();
    expect(btnElement.nativeElement.disabled).toBeTruthy();
  });
  it('submit button should be enabled on filling the form', () => {
    const formValue = { name: 'kishore', email: 'nallu@pkglobal.com', phone: '9876543233', address: 'xxxxx' }
    component.addressForm.setValue(formValue);
    fixture.detectChanges();
    const btnElement = fixture.debugElement.query(By.css('button'));
    expect(btnElement.nativeElement).toBeDefined();
    expect(btnElement.nativeElement.disabled).toBeFalsy();
  });
  it('update address in service and open the dialog to notify user', () => {
    const formValue = { name: 'kishore', email: 'nallu@pkglobal.com', phone: '9876543233', address: 'xxxxx' }
    component.addressForm.setValue(formValue);
    const addressSpy = jest.spyOn(component['bookStateFacade'], 'submitBillingDetails');
    const dialogSpy = jest.spyOn(component['dialog'], 'open');
    component.submit();
    expect(addressSpy).toBeCalled();
    expect(dialogSpy).toBeCalled();
  });
});
