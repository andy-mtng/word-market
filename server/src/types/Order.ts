import User from "./User";
import Cart from "./Cart";

interface Order {
    user: User;
    cart: Cart[];
    createdAt: Date;
}

export default Order;
