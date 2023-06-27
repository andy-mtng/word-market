import mongoose from "mongoose";
const Schema = mongoose.Schema;

const bestSellerRankSchema = new Schema({
    category: {
        type: String,
        required: true,
    },
    rank: {
        type: Number,
        required: true,
    },
});

const bookSchema = new Schema({
    ISBN10: {
        type: String,
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    price: {
        // Can be a number or null
        // Did not set required to true to allow null values
        type: mongoose.Schema.Types.Number,
    },
    rating: {
        type: Number,
        required: true,
        default: 0,
    },
    image: {
        type: String,
        required: true,
    },
    categories: {
        type: [String],
        required: true,
    },
    reviews: {
        type: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Review",
            },
        ],
    },
    itemWeight: {
        type: String,
        required: true,
    },
    productDimensions: {
        type: String,
        required: true,
    },
    sellerName: {
        type: String,
        required: true,
    },
    bestSellersRank: {
        type: [bestSellerRankSchema],
        required: true,
    },
});

const BookModel = mongoose.model("Book", bookSchema);
export default BookModel;
