export interface IBook {
    _id ?: string;
    name: string;
    author: string[];
    price: string;
    reviews: IReview[];
    publisher: IPublisher;
}
export interface IReview {
    // review_id: string;
    reviwer: string;
    message: string;
}
export interface IPublisher {
    publisher_id: string;
    name: string;
    location: string;
}