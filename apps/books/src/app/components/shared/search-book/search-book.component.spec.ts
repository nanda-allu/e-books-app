import { HttpClientModule } from '@angular/common/http';
import { ElementRef, EventEmitter } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { BookStateModule } from '@book-purchase/book-state';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { SharedModule } from '../shared.module';
import { SearchBookComponent } from './search-book.component';

describe('SearchBookComponent', () => {
  let component: SearchBookComponent;
  let fixture: ComponentFixture<SearchBookComponent>;
  //https://github.com/ant-design/ant-design/issues/21096#issuecomment-732368647
  mockMatchMedia();
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchBookComponent],
      imports: [RouterTestingModule.withRoutes([]), SharedModule, HttpClientModule,
        BrowserAnimationsModule, StoreModule.forRoot({}), EffectsModule.forRoot([]), BookStateModule]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should have initialized component properties', () => {
    expect(component.searchElement).toBeDefined();
    expect(component.searchElement).toBeInstanceOf(ElementRef);
    expect(component.search).toBeInstanceOf(EventEmitter);
  });
  it('should emit the search string using output event', (done) => {
    const searchSpy = jest.spyOn(component.search, 'emit');
    component.searchElement.nativeElement.value = 'object'
    const event = new KeyboardEvent('keyup', { 'bubbles': true });
    component.searchElement.nativeElement.dispatchEvent(event);
    setTimeout(() => {
      expect(searchSpy).toBeCalled();
      expect(searchSpy).toHaveBeenCalledTimes(1);
      expect(searchSpy).toHaveBeenCalledWith('object');
      done();
    }, 1000);
  });
  it('should trigger the output event with multiple dispatch evnets', (done) => {
    const searchSpy = jest.spyOn(component.search, 'emit');
    component.searchElement.nativeElement.value = 'object'
    const event = new KeyboardEvent('keyup', { 'bubbles': true });
    component.searchElement.nativeElement.dispatchEvent(event);

    setTimeout(() => {
      const event2 = new KeyboardEvent('keyup', { 'bubbles': true });
      component.searchElement.nativeElement.dispatchEvent(event2);
      fixture.detectChanges();
      setTimeout(() => {
        expect(searchSpy).toBeCalled();
        expect(searchSpy).toHaveBeenCalledTimes(2);
        done();
      }, 1000);
    }, 1000);
  });

  it('should trigger the output event only once with single dispatch evnet', (done) => {
    const searchSpy = jest.spyOn(component.search, 'emit');
    component.searchElement.nativeElement.value = 'object'
    const event = new KeyboardEvent('keyup', { 'bubbles': true });
    component.searchElement.nativeElement.dispatchEvent(event);

    setTimeout(() => {
      component.searchElement.nativeElement.dispatchEvent(event);
      fixture.detectChanges();
      setTimeout(() => {
        expect(searchSpy).toBeCalled();
        expect(searchSpy).toHaveBeenCalledTimes(1);
        done();
      }, 1000);
    }, 1000);
  });
});
function mockMatchMedia() {
  Object.defineProperty(window, 'matchMedia', {
    value: () => {
      return {
        matches: false,
        addListener: () => jest.fn(),
        removeListener: () => jest.fn()
      };
    }
  });
}

