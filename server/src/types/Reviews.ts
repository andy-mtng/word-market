import { Types } from "mongoose";

interface ProfileImage {
    data: string;
    contentType: string;
}

interface Review {
    rating: number;
    user: Types.ObjectId;
    reviewContent: string;
}

export default Review;
