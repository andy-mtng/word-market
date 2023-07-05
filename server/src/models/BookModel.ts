import mongoose, { Schema, model } from "mongoose";
import BookDocument from "../types/BookDocument";

const bestSellerRankSchema = new Schema({
    category: {
        type: String
    },
    rank: {
        type: Number
    }
});

const bookSchema = new Schema<BookDocument>({
    ISBN10: {
        type: String
    },
    brand: {
        type: String
    },
    title: {
        type: String
    },
    price: {
        type: mongoose.Schema.Types.Number
    },
    rating: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    categories: {
        type: [String]
    },
    reviews: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review"
            }
        ]
    },
    itemWeight: {
        type: String
    },
    productDimensions: {
        type: String
    },
    amazonLink: {
        type: String
    },
    sellerName: {
        type: String
    },
    bestSellersRank: {
        type: [bestSellerRankSchema]
    }
});

const BookModel = model<BookDocument>("Book", bookSchema);
export default BookModel;
