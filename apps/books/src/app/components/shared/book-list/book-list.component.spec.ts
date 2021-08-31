import { By } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Observable, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { BookStateModule, MockBookData } from '@book-purchase/book-state';
import { SharedModule } from '../shared.module';
import { BookListComponent } from './book-list.component';
import { RoutesEnum } from '../../../route-config/routes';
import { RouteParams } from '../../../route-config/route-params';
import { BookViewComponent } from '../../books/book-view/book-view.component';
import { BuyBookFormComponent } from '../../billing/buy-book-form/buy-book-form.component';

let component: BookListComponent;
let fixture: ComponentFixture<BookListComponent>;
describe('BookListComponent', () => {

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      imports: [RouterTestingModule.withRoutes([
        { path: `${RoutesEnum.BOOKS}/${RoutesEnum.BOOK_VIEW}/:${RouteParams.BOOK_ID}`, component: BookViewComponent },
        { path: RoutesEnum.ADDRESS_FORM, component: BuyBookFormComponent }
      ]), SharedModule, StoreModule.forRoot({}), EffectsModule.forRoot([]),
        BrowserAnimationsModule, HttpClientModule, BookStateModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    component.books = of(MockBookData.BOOK_LIST);
    fixture.detectChanges();
  });
  describe('should initialize the component', () => {
    beforeEach(() => {
      component.books = of(MockBookData.BOOK_LIST);
      fixture.detectChanges();
    });
    it('should have set to the default sort order on angular keyvalue pipe', () => {
      expect(component.objectSortOrderFn).toBeDefined();
      expect(component.objectSortOrderFn()).toBe(0);
      expect(component['bookFacadeService']).toBeDefined();
      expect(component['router']).toBeDefined();
    });
    it('should have repeated and displayed mat-card w.r.t books size', () => {
      const cardElements = fixture.debugElement.queryAll(By.css('mat-card'));
      expect(cardElements).toBeDefined();
      expect(cardElements.length).toBe(MockBookData.BOOK_LIST.length);
    });
    it('should have repeated and displayed images w.r.t books size', () => {
      const imgElements = fixture.debugElement.queryAll(By.css('img'));
      expect(imgElements).toBeDefined();
      expect(imgElements.length).toBe(MockBookData.BOOK_LIST.length);
    });
  })
  describe('book list container view', () => {
    beforeEach(() => {
      component.books = of(MockBookData.BOOK_LIST);
      fixture.detectChanges();
    });
    it('should have component properties initialized', (done) => {
      expect(component.cartBookView).toBeFalsy();
      expect(component.cartCollectionView).toBeFalsy();
      component.books.subscribe(books => {
        expect(books.length).toBe(MockBookData.BOOK_LIST.length);
        done();
      })
    });
    it('should not have address-container div section', () => {
      const addressContainerElement = fixture.debugElement.query(By.css('.address-container'));
      expect(addressContainerElement).toBeNull();
    });
    it('should not have delete-cart icon to remove item from cart', () => {
      const removeCartElement = fixture.debugElement.query(By.css('.delete-cart-cursor'));
      expect(removeCartElement).toBeNull();
    });
    it('should not have purchase-btn to display purchase button section', () => {
      const purchaseBtnElement = fixture.debugElement.query(By.css('.purchase-btn'));
      expect(purchaseBtnElement).toBeNull();
    });

    it('should navigate to the view the book details on onBookSelection() call', () => {
      const routerSpy = jest.spyOn(component['router'], 'navigate');
      component.onBookSelection(MockBookData.BOOK_ID);
      expect(routerSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledTimes(1);
      expect(routerSpy).toHaveBeenCalledWith([`${RoutesEnum.BOOKS}/${RoutesEnum.BOOK_VIEW}/${MockBookData.BOOK_ID}`]);
    });
  });
  describe('BookListComponent for cart book list view', () => {

    beforeEach(() => {
      component.cartBookView = true;
      fixture.detectChanges();
    });

    it('should have component properties initialized', (done) => {
      expect(component.cartBookView).toBeTruthy();
      expect(component.cartCollectionView).toBeFalsy();
      component.books.subscribe(books => {
        expect(books.length).toBe(MockBookData.BOOK_LIST.length);
        done();
      })
    });
    it('should not have address-container div section', () => {
      const addressContainerElement = fixture.debugElement.query(By.css('.address-container'));
      expect(addressContainerElement).toBeDefined();
    });
    it('should have delete-cart icon to remove item from cart', () => {
      const removeCartElement = fixture.debugElement.query(By.css('.delete-cart-cursor'));
      expect(removeCartElement).toBeDefined();
    });
    it('should have purchase-btn to display purchase button section', () => {
      const purchaseBtnElement = fixture.debugElement.query(By.css('.purchase-btn'));
      expect(purchaseBtnElement).toBeDefined();
    });
    it('should not navigate to the view the book details on onBookSelection() call', () => {
      const routerSpy = jest.spyOn(component['router'], 'navigate');
      component.onBookSelection(MockBookData.BOOK_ID);
      expect(routerSpy).not.toHaveBeenCalled();
    });
    it('should navigate to input address_form on proceedToPurchase() call', () => {
      const routerSpy = jest.spyOn(component['router'], 'navigate');
      component.proceedToPurchase();
      expect(routerSpy).toHaveBeenCalled();
      expect(routerSpy).toHaveBeenCalledTimes(1);
      expect(routerSpy).toHaveBeenCalledWith([RoutesEnum.ADDRESS_FORM]);
    });
    it('should dispatch action to remove the book from cart removeBook() call', () => {
      const removeBookSpy = jest.spyOn(component['bookFacadeService'], 'removeBookFromCart');
      component.removeBook(MockBookData.BOOK_LIST[0]);
      expect(removeBookSpy).toHaveBeenCalled();
      expect(removeBookSpy).toHaveBeenCalledTimes(1);
      expect(removeBookSpy).toHaveBeenCalledWith(MockBookData.BOOK_LIST[0]);
    });
  });
  describe('BookListComponent for my book collection view', () => {

    beforeEach(() => {
      component.books = of(MockBookData.BOOK_LIST);
      component.cartCollectionView = true;
      fixture.detectChanges();
    });

    it('should have component properties initialized', (done) => {
      expect(component.billingAddress).toBeDefined();
      expect(component.billingAddress).toBeInstanceOf(Observable);
      expect(component.cartBookView).toBeFalsy();
      expect(component.cartCollectionView).toBeTruthy();
      component.books.subscribe(books => {
        expect(books.length).toBe(MockBookData.BOOK_LIST.length);
        done();
      })
    });
    it('should not have address-container div section', () => {
      const addressContainerElement = fixture.debugElement.query(By.css('.address-container'));
      expect(addressContainerElement).toBeDefined();
    });
    it('should have delete-cart icon to remove item from cart', () => {
      const removeCartElement = fixture.debugElement.query(By.css('.delete-cart-cursor'));
      expect(removeCartElement).toBeNull();
    });
    it('should have purchase-btn to display purchase button section', () => {
      const purchaseBtnElement = fixture.debugElement.query(By.css('.purchase-btn'));
      expect(purchaseBtnElement).toBeNull();
    });
  });
});
