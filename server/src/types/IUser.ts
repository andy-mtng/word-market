import { Types, Document } from "mongoose";

interface ProfileImage {
    data: string;
    contentType: string;
}

interface Cart {
    bookId: Types.ObjectId;
    quantity: number;
}

interface IUser extends Document {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    cart: Cart[];
    email: string;
    password: string;
    profileImage: ProfileImage;
}

export default IUser;
