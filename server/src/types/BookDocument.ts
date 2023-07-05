import { Document, Types } from "mongoose";
import Review from "./Reviews";

interface BestSellerRank {
    category: string;
    rank: number;
}

interface BookDocument extends Document {
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

export default BookDocument;
