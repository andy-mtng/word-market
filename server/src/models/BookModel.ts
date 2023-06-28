import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bestSellerRankSchema = new Schema({
    category: {
        type: String
    },
    rank: {
        type: Number
    }
});

const bookSchema = new Schema({
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
    sellerName: {
        type: String
    },
    bestSellersRank: {
        type: [bestSellerRankSchema]
    }
});

const BookModel = mongoose.model("Book", bookSchema);
export default BookModel;
