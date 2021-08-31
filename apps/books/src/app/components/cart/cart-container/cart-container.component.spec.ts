import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookStateModule, MockBookData } from '@book-purchase/book-state';

import { SharedModule } from '../../shared/shared.module';
import { CartContainerComponent } from './cart-container.component';

describe('CartContainerComponent', () => {
  let component: CartContainerComponent;
  let fixture: ComponentFixture<CartContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartContainerComponent],
      imports: [RouterTestingModule.withRoutes([]),
        SharedModule, BrowserAnimationsModule, HttpClientModule,
      StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have initialized component properties', () => {
    expect(component.cartBooks$).toBeDefined();
    expect(component['bookFacadeService']).toBeDefined();
    expect(component.cartBooks$).toBeInstanceOf(Observable);
    expect(component['cloneCartBooks'].length).toBe(0);
  });
  it('should have updated component properties with the book collection', (done) => {
    component['bookFacadeService'].addBookToCart(MockBookData.BOOK_LIST[0]);
    component['bookFacadeService'].cartBooks$.subscribe(books => {
      expect(component['cloneCartBooks'].length).toBe(books.length)
      done();
    });
  });
  it('should match a record on search for angular keyword', (done) => {
    component['bookFacadeService'].addBookToCart(MockBookData.BOOK_LIST[0]);
    component.onSearch('angular');
    component.cartBooks$.subscribe(books => {
      expect(books.length).toBe(1);
      expect(component['cloneCartBooks'].length).toBe(1);
      done();
    })
  });
  it('should not match any records on search for typescript keyword', (done) => {
    component.onSearch('typescript');
    component.cartBooks$.subscribe(books => {
      expect(books.length).toBe(0);
      expect(component['cloneCartBooks'].length).toBe(0);
      done();
    })
    component['bookFacadeService'].addBookToCart(MockBookData.BOOK_LIST[0]);
  });
  it('should unsubscribe for the books subscription on ngOnDestroy()', () => {
    const bookSubscriptionSpy = jest.spyOn(component['subscriptionContainer'], 'unsubscribe');
    component.ngOnDestroy();
    expect(bookSubscriptionSpy).toBeCalled();
    expect(bookSubscriptionSpy).toBeCalledTimes(1);
  })
});
