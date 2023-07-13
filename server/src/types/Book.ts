import BestSellerRank from "./BestSellerRank";

type Book = {
    ISBN10: string;
    brand: string;
    title: string;
    rating: number;
    price: number;
    image: string;
    categories: string[];
    itemWeight: string;
    reviews: any[];
    productDimensions: string;
    amazonLink: string;
    sellerName: string;
    bestSellersRank: BestSellerRank[];
};

export default Book;
