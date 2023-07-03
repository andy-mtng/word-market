import mongoose, { Schema, model, Types, Document, Model } from "mongoose";
import IUser from "../types/IUser";

const userSchema = new Schema<IUser>({
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

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
