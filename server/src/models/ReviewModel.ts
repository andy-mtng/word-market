import mongoose from "mongoose";
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    reviewContent: {
        type: String,
    },
});

const ReviewModel = mongoose.model("Review", reviewSchema);
export default ReviewModel;
