import mongoose, { Schema, model } from "mongoose";
import ReviewDocument from "../types/ReviewDocument";

const reviewSchema = new Schema<ReviewDocument>({
    rating: {
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reviewContent: {
        type: String
    }
});

const ReviewModel = model<ReviewDocument>("Review", reviewSchema);
export default ReviewModel;
