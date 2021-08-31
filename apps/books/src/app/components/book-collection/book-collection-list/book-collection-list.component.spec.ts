import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store'
import { BookStateModule, MockBookData } from '@book-purchase/book-state'

import { SharedModule } from '../../shared/shared.module';
import { BookCollectionListComponent } from './book-collection-list.component';

describe('BookCollectionListComponent', () => {
  let component: BookCollectionListComponent;
  let fixture: ComponentFixture<BookCollectionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCollectionListComponent],
      imports: [RouterTestingModule.withRoutes([]),
        SharedModule, BrowserAnimationsModule, HttpClientModule,
      StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCollectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have initialized component properties', () => {
    expect(component.bookCollection$).toBeDefined();
    expect(component['bookStateFacade']).toBeDefined();
    expect(component.bookCollection$).toBeInstanceOf(Observable);
    expect(component['clonedBookCollection'].length).toBe(0);
  });
  it('should have updated component properties with the book collection', (done) => {
    component['bookStateFacade'].submitBillingDetails(MockBookData.BOOK_LIST[0]);
    component['bookStateFacade'].bookCollection$.subscribe(books => {
      expect(component['clonedBookCollection'].length).toBe(books.length)
      done();
    });
  });
  it('should match a record on search for angular keyword', (done) => {
    component['bookStateFacade'].addBookToCart(MockBookData.BOOK_LIST[0]);
    component['bookStateFacade'].submitBillingDetails(MockBookData.BOOK_LIST[0]);
    component.onSearch('angular');
    component.bookCollection$.subscribe(books => {
      expect(books.length).toBe(1);
      expect(component['clonedBookCollection'].length).toBe(1);
      done();
    })
  });
  it('should not match any records on search for typescript keyword', (done) => {
    component.onSearch('typescript');
    component.bookCollection$.subscribe(books => {
      expect(books.length).toBe(0);
      expect(component['clonedBookCollection'].length).toBe(0);
      done();
    })
    component['bookStateFacade'].submitBillingDetails(MockBookData.BOOK_LIST[0]);
  });
  it('should unsubscribe for the books subscription on ngOnDestroy()', () => {
    const bookSubscriptionSpy = jest.spyOn(component['subscriptionContainer'], 'unsubscribe');
    component.ngOnDestroy();
    expect(bookSubscriptionSpy).toBeCalled();
    expect(bookSubscriptionSpy).toBeCalledTimes(1);
  })
});
