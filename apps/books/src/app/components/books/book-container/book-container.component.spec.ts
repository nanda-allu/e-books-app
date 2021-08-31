import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { Observable } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../../shared/shared.module';
import { BookContainerComponent } from './book-container.component';
import { BookStateModule } from '@book-purchase/book-state';

describe('BookContainerComponent', () => {
  let component: BookContainerComponent;
  let fixture: ComponentFixture<BookContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookContainerComponent],
      imports: [HttpClientModule, RouterTestingModule.withRoutes([]),
        SharedModule, BrowserAnimationsModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have initialized component properties', () => {
    expect(component.books$).toBeInstanceOf(Observable);
    expect(component['bookStateFacade']).toBeDefined();
  });

  it('should dispatch the action to fetch the book collection on load', () => {
    const searchForBooksSpy = jest.spyOn(component['bookStateFacade'], 'searchForBooks');
    component.ngOnInit();
    expect(searchForBooksSpy).toHaveBeenCalled();
    expect(searchForBooksSpy).toHaveBeenCalledTimes(1);
    expect(searchForBooksSpy).toHaveBeenCalledWith('angular');
  });
  it('should dispatch the action to fetch the book collection on search', () => {
    const SEARCH_STRING = 'angular';
    const searchForBooksSpy = jest.spyOn(component['bookStateFacade'], 'searchForBooks');
    component.onSearch(SEARCH_STRING)
    expect(searchForBooksSpy).toHaveBeenCalled();
    expect(searchForBooksSpy).toHaveBeenCalledTimes(1);
    expect(searchForBooksSpy).toHaveBeenCalledWith(SEARCH_STRING);
  });
});
