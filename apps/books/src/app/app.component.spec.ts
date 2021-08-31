import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Subscription } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookStateFacadeService, BookStateModule, MockBookData } from '@book-purchase/book-state';

import { AppComponent } from './app.component';
import { MaterialModule } from './components/material/material.module';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [RouterTestingModule.withRoutes([]), StoreModule.forRoot({}), EffectsModule.forRoot([]),
        BrowserAnimationsModule, HttpClientModule, MaterialModule, BookStateModule]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should have defined the component properties', () => {
    expect(component.cartCount).toBe(0);
    expect(component.collectionCount).toBe(0);
    expect(component.routesEnum).toBeDefined();
    expect(component['booksFacade']).toBeDefined();
    expect(component['booksFacade']).toBeInstanceOf(BookStateFacadeService);
  });
  it('should have subscribed for cart count changes', () => {
    const cartCounterSpy = jest.spyOn(component['booksFacade'].cartCounter$, 'subscribe');
    const subscription = component['booksFacade'].cartCounter$.subscribe();
    fixture.detectChanges();
    expect(cartCounterSpy).toBeCalled();
    expect(subscription).toBeInstanceOf(Subscription);
    expect(cartCounterSpy).toHaveBeenCalledTimes(1);
  });
  it('should update the cart counter values on subscription', done => {
    component['booksFacade'].addBookToCart(MockBookData.BOOK_LIST[0]);
    component['booksFacade'].cartCounter$.subscribe(cartCount => {
      expect(cartCount).toBe(1);
      done();
    });
  });
  it('should update the collection counter values on subscription', done => {
    component['booksFacade'].addBookToCart(MockBookData.BOOK_LIST[0]);
    component['booksFacade'].submitBillingDetails(MockBookData.BOOK_LIST[0]);
    component['booksFacade'].bookCollectionCounter$.subscribe(cartCount => {
      expect(cartCount).toBe(1);
      done();
    });
  });
  it('should unsubscribe for the books subscription on ngOnDestroy()', () => {
    const bookSubscriptionSpy = jest.spyOn(component['subscriptionContainer'], 'unsubscribe');
    component.ngOnDestroy();
    expect(bookSubscriptionSpy).toBeCalled();
    expect(bookSubscriptionSpy).toBeCalledTimes(1);
  })

  it('should have toolbar with button,span as children', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const toolBarElement = fixture.debugElement.query(By.css('mat-toolbar'));
    expect(toolBarElement).toBeDefined();
  });
  it('should have side-nav-container,mat-sidenav & mat-sidenav-content with nav items as children', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const sidenavContainerElement = fixture.debugElement.query(By.css('mat-sidenav-container'));
    expect(sidenavContainerElement).toBeDefined();
    const sidenavElement = fixture.debugElement.query(By.css('mat-sidenav'));
    expect(sidenavElement).toBeDefined();
    const sidenavContentElement = fixture.debugElement.query(By.css('mat-sidenav-content'));
    expect(sidenavContentElement).toBeDefined();
  });
  it('should have four buttons & icons for the side navigation', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const matIconElements = fixture.debugElement.queryAll(By.css('mat-icon'));
    expect(matIconElements).toBeDefined();
    expect(matIconElements.length).toBe(4);
    const matButtonElements = fixture.debugElement.queryAll(By.css('button'));
    expect(matButtonElements.length).toBe(4);
  });
});
