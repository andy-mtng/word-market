import { Types } from "mongoose";

interface ProfileImage {
    data: string;
    contentType: string;
}

interface Review {
    rating: number;
    user: Types.ObjectId;
    firstName: string;
    lastName: string;
    profileImage: ProfileImage;
    reviewContent: string;
}

export default Review;
