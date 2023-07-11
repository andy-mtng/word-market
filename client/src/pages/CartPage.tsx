import useUserContext from "../hooks/useUserContext";
import useNotificationContext from "../hooks/useNotificationContext";
import { useEffect, useState } from "react";
import { PopulatedBook } from "../types/PopulatedBook";
import axios from "axios";
axios.defaults.withCredentials = true;

function CartPage(): JSX.Element {
    const [cart, setCart] = useState<PopulatedBook[]>([]);
    const { user } = useUserContext();
    const { setShowNotification, setNotificationInfo } = useNotificationContext();

    useEffect(() => {
        if (user) {
            axios({
                method: "GET",
                url: "/cart"
            })
                .then((response) => {
                    console.log(response.data.populatedCart);
                    setCart(response.data.populatedCart);
                })
                .catch((error) => {
                    console.log(error);
                    setShowNotification(true);
                    setNotificationInfo({ message: error.message, type: "error" });
                });
        }
    }, []);

    return (
        <div className="mt-6">
            <h1 className="mb-3 text-2xl font-semibold">Cart</h1>
            <hr className="border-1 border-gray-400"></hr>
            {cart.map((cartItem, index) => {
                return (
                    <div key={index}>
                        <p>{index}</p>
                        <h1>{cartItem.bookId.title}</h1>
                    </div>
                );
            })}
        </div>
    );
}

export default CartPage;
