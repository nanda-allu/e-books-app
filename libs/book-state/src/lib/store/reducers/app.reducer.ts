import { ActionReducerMap } from '@ngrx/store';
import { IAppState } from '../state/app.state';
import { bookReducer } from './books.reducers';

export const appReducers: ActionReducerMap<IAppState> = {
  booksState: bookReducer
}
