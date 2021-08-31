import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IAppState } from '../state/app.state';


export const searchBooksFeatureSelector = createFeatureSelector<IAppState>('books');

export const searchResultsSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.books);
export const searchResultsFailureSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.errorMessage);
export const getBookByIdSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.selectedBook);
export const getBookByIdFailureSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.errorMessage);
export const cartBooksSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.cartBooks);
export const bookCollectionSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.bookCollection);
export const cartCounterSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.cartBooks?.length);
export const bookCollectionCounterSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.bookCollection?.length);
export const billingAddressSelector = createSelector(searchBooksFeatureSelector, (state: IAppState) => state?.booksState?.billingAddress);

