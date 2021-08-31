import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Book, BookVolume } from '../../shared/shared-models';

@Injectable({
  providedIn: 'root',
})
export class BooksDataService {
  private readonly AUTH_KEY = 'AIzaSyB-tLAK0Wp8mRjGHOr1Iq9FuWEym6R6Y3o';
  private readonly BASE_URL = 'https://www.googleapis.com/books/v1/volumes?';

  constructor(private httpClient: HttpClient) { }

  public getBooksByQueryParam(param: string): Observable<Book[]> {
    const URL = `${this.BASE_URL}q=${param}&key=${this.AUTH_KEY}`;
    return this.httpClient.get<BookVolume>(URL).pipe(
      map((res) => {
        return res?.items || [];
      })
    );
  }
}
