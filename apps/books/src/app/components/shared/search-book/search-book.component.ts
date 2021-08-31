import { AfterViewInit, Component, ElementRef, EventEmitter, OnDestroy, Output, ViewChild } from '@angular/core';

import { Subscription,fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'book-purchase-search-book',
  templateUrl: './search-book.component.html',
  styleUrls: ['./search-book.component.scss']
})
export class SearchBookComponent implements AfterViewInit, OnDestroy {

  @ViewChild('searchRef') searchElement: ElementRef = new ElementRef(null);

  @Output() search: EventEmitter<string> = new EventEmitter();
  private searchSubscription!: Subscription;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  ngAfterViewInit(): void {
    this.listenForSearchEvent();
  }

  private listenForSearchEvent() {
    const INTERVAL_TIME = 1000;
    this.searchSubscription = fromEvent(this.searchElement.nativeElement, 'keyup')
      .pipe(debounceTime(INTERVAL_TIME), distinctUntilChanged())
      .subscribe(() => {
        this.emitSearchValue();
      });
  }

  private emitSearchValue() {
    const inputValue: string = this.searchElement.nativeElement?.value || '';
    const searchValue = inputValue?.trim()?.length ? inputValue?.trim() : 'Angular';
    this.search.emit(searchValue);
  }
  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }
}
