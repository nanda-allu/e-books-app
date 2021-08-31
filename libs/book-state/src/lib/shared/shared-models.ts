export interface VolumeInfo {
  title: string;
  subtitle: string;
  imageLinks: ImageInfo;
  authors: string[];
  description: string;
  publisher: string;
  pageCount: number;
  language: string;
  publishedDate: string;
  maturityRating: string;
}

interface ImageInfo {
  smallThumbnail: string;
}

export interface Book {
  id: string;
  volumeInfo: VolumeInfo;
}
export interface BookVolume {
  items: Book[];
  kind: string;
  totalItems: number;
}
export interface CartCountConfig {
  cartCount: number;
  collectionCount: number;
}
export interface BillingAddress {
  name: string;
  email: string;
  phone: string;
  address: string;
}