import { Document, Types } from "mongoose";

interface ProfileImage {
    data: string;
    contentType: string;
}

interface Cart {
    bookId: Types.ObjectId;
    quantity: number;
}

interface UserDocument extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    cart: Cart[];
    email: string;
    password: string;
    profileImage: ProfileImage;
}

export default UserDocument;
