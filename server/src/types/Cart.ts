import { Types } from "mongoose";

interface Cart {
    bookId: Types.ObjectId;
    quantity: number;
}

export default Cart;
