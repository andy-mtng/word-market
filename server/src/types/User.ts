import { Types } from "mongoose";
import Cart from "./Cart";
import ProfileImage from "./ProfileImage";

interface User {
    _id: Types.ObjectId;
    firstName: string;
    lastName: string;
    cart: Cart[];
    email: string;
    password: string;
    profileImage: ProfileImage;
}

export default User;
