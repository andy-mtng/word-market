import { Review } from "./Review";

interface BestSellerRank {
    category: string;
    rank: number;
}

interface Book {
    _id: string;
    ISBN10: string;
    brand: string;
    title: string;
    rating: number;
    price: number;
    image: string;
    categories: string[];
    itemWeight: string;
    reviews: Review[];
    productDimensions: string;
    amazonLink: string;
    sellerName: string;
    bestSellersRank: BestSellerRank[];
}

export type { Book };
