import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

import { of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { BookStateModule, MockBookData } from '@book-purchase/book-state';

import { RoutesEnum } from '../../../route-config/routes';
import { BookViewComponent } from './book-view.component';
import { MaterialModule } from '../../material/material.module';
import { RouteParams } from '../../../route-config/route-params';
import { BookContainerComponent } from '../book-container/book-container.component';
import { BuyBookFormComponent } from '../../billing/buy-book-form/buy-book-form.component';

describe('BookViewComponent', () => {
  let component: BookViewComponent;
  let fixture: ComponentFixture<BookViewComponent>;
  const BOOK_ID = 'XSksdaj';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookViewComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: RoutesEnum.BOOKS, component: BookContainerComponent },
        { path: RoutesEnum.ADDRESS_FORM, component: BuyBookFormComponent }
      ]), MaterialModule, BrowserAnimationsModule, HttpClientModule,
      StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule],
      providers: [{ provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => BOOK_ID } } } }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have the dependencies injected', () => {
    expect(component['router']).toBeDefined();
    expect(component['bookFacadeService']).toBeDefined();
    expect(component['activatedRoute']).toBeDefined();
  });
  it('should get the book by route param and dispatch the action to get the book details', () => {
    const getSelectedBookSpy = jest.spyOn(component['bookFacadeService'], 'getSelectedBookById');
    const bookId = <string>component['activatedRoute'].snapshot.paramMap.get(RouteParams.BOOK_ID);
    component.ngOnInit();
    expect(bookId).toBe(BOOK_ID);
    expect(getSelectedBookSpy).toHaveBeenCalled();
    expect(getSelectedBookSpy).toHaveBeenCalledTimes(1);
    expect(getSelectedBookSpy).toHaveBeenCalledWith(BOOK_ID);
  });
  it('should get the book details', (done) => {
    component['bookFacadeService'].selectedBook$ = of(MockBookData.BOOK_LIST[0]);
    component['bookFacadeService'].selectedBook$.subscribe(selectedBook => {
      expect(selectedBook).toBeDefined();
      expect(selectedBook).toEqual(MockBookData.BOOK_LIST[0]);
      done();
    })
  });
  it('should navigate back to the list on click ADD TO CART button', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    component.addtoCart();
    expect(routerSpy).toBeCalled();
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith([RoutesEnum.BOOKS]);
  });
  it('should dispatch the action on click ADD TO CART button', () => {
    const addToCartSpy = jest.spyOn(component['bookFacadeService'], 'addBookToCart');
    component.addtoCart();
    expect(addToCartSpy).toBeCalled();
    expect(addToCartSpy).toHaveBeenCalledTimes(1);
  });
  it('should navigate to buy book form on click BUY button', () => {
    const routerSpy = jest.spyOn(component['router'], 'navigate');
    component.buyBook();
    expect(routerSpy).toBeCalled();
    expect(routerSpy).toHaveBeenCalledTimes(1);
    expect(routerSpy).toHaveBeenCalledWith([RoutesEnum.ADDRESS_FORM]);
  });
  it('should have two buttons as card actions', () => {
    component.book = MockBookData.BOOK_LIST[0];
    fixture.detectChanges();
    const matButtonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(matButtonElements.length).toBe(2);
  });
  it('should unsubscribe for the books subscription on ngOnDestroy()', () => {
    const bookSubscriptionSpy = jest.spyOn(component['subscriptionContainer'], 'unsubscribe');
    component.ngOnDestroy();
    expect(bookSubscriptionSpy).toBeCalled();
    expect(bookSubscriptionSpy).toBeCalledTimes(1);
  })
});
