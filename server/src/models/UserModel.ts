import mongoose, { Schema, model } from "mongoose";
import UserDocument from "../types/UserDocument";

const userSchema = new Schema<UserDocument>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cart: {
        type: [
            {
                bookId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Book"
                },
                quantity: {
                    type: Number,
                    default: 0
                }
            }
        ],
        default: []
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        data: String,
        contentType: String
    }
});

const UserModel = model<UserDocument>("User", userSchema);
export default UserModel;
