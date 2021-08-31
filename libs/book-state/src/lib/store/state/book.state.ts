import { BillingAddress, Book } from "../../shared/shared-models";

export interface IBookState {
  searchText: string;
  books: Book[];
  selectedBook: Book;
  bookId: string;
  cartBooks: Book[];
  bookCollection: Book[];
  billingAddress: BillingAddress;
  errorMessage: string;
}

export const initialBookState: IBookState = {
  searchText: '',
  books: [],
  selectedBook: <Book>{},
  bookId: '',
  cartBooks: [],
  bookCollection: [],
  billingAddress: <BillingAddress>{},
  errorMessage: ''
}
