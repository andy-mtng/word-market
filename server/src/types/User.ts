import { ObjectId } from "mongodb";

interface ProfileImage {
    data: string;
    contentType: string;
}

interface User {
    _id: ObjectId;
    email: string;
    password: string;
    profileImage: ProfileImage;
}

export default User;
