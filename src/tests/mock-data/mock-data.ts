import { IBook, IReview } from "../../models/book-interfaces";

export const book: IBook = {
  publisher: {
    publisher_id: "P4478",
    name: "Pearson",
    location: "London",
  },
  author: ["Jack"],
  name: "Secrets of life",
  price: "$4.50",
  reviews: [],
};

export const review: IReview = {
  reviwer: "kishore",
  message: "It has good details",
};

export const reviewList: IReview[] = [
  review,
  {
    reviwer: "Nanda",
    message: "Content is excellent",
  },
];
export const booksList: IBook[] = [
  book,
  {
    publisher: {
      publisher_id: "p778321",
      name: "jane",
      location: "india",
    },
    author: ["zukerberg"],
    name: "kishore",
    price: "$3.44",
    reviews: [],
  },
];
