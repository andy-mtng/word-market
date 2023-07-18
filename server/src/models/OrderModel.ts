import mongoose, { Schema, model } from "mongoose";
import OrderDocument from "../types/OrderDocument";

const orderSchema = new Schema<OrderDocument>({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
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
    }
});

const OrderModel = model<OrderDocument>("Order", orderSchema);
export default OrderModel;
