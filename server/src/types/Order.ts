import User from "./User";
import Cart from "./Cart";

interface Order {
    user: User;
    cart: Cart[];
}

export default Order;
