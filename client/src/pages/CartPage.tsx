import useUserContext from "../hooks/useUserContext";
import useNotificationContext from "../hooks/useNotificationContext";
import { useEffect, useState } from "react";
import { PopulatedBook } from "../types/PopulatedBook";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { Cart } from "../types/Cart";
import { MdOutlineLock } from "react-icons/md";
import axios from "axios";
axios.defaults.withCredentials = true;

function CartPage(): JSX.Element {
    const [cart, setCart] = useState<PopulatedBook[]>([]);
    const [cartRetrieved, setCartRetrieved] = useState<boolean>(false);
    const { user, setUser } = useUserContext();
    const { setShowNotification, setNotificationInfo } = useNotificationContext();
    const subtotal = cart.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.quantity * currentValue.bookId.price;
    }, 0);
    const tax: number = Math.round((subtotal * 0.05 + Number.EPSILON) * 100) / 100;
    const total: number = subtotal + tax;

    useEffect(() => {
        console.log("Getting Cart");
        if (user) {
            axios({
                method: "GET",
                url: "/cart"
            })
                .then((response) => {
                    setCart(response.data.populatedCart);
                    setCartRetrieved(true);
                })
                .catch((error) => {
                    console.log(error);
                    setShowNotification(true);
                    setNotificationInfo({ message: error.message, type: "error" });
                });
        }
    }, []);

    const convertCart = () => {
        const convertedCart: Cart[] = cart.map((cartItem) => {
            return {
                bookId: cartItem.bookId._id,
                quantity: cartItem.quantity
            };
        });
        return convertedCart;
    };

    useEffect(() => {
        // Checking if the cart is retrieved ensures an empty cart is not saved to the user unintentionally
        if (user && cartRetrieved) {
            const convertedCart = convertCart();
            const updatedUser = { ...user, cart: convertedCart };
            setUser(updatedUser); // User context saves changes to localStorage when user changes
            // Save user cart serverside
            axios
                .patch("/cart", updatedUser)
                .then(() => {})
                .catch((error) => {
                    console.log(error);
                    setShowNotification(true);
                    setNotificationInfo({ message: error.message, type: "error" });
                });
        }
    }, [cart]);

    const addOneProduct = (selectedBookId: string) => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.bookId._id === selectedBookId) {
                cartItem.quantity += 1;
                return cartItem;
            }
            return cartItem;
        });
        setCart(updatedCart);
    };

    const removeOneProduct = (selectedBookId: string) => {
        const updatedCart = cart.map((cartItem) => {
            if (cartItem.bookId._id === selectedBookId) {
                cartItem.quantity -= 1;
                return cartItem;
            }
            return cartItem;
        });
        setCart(updatedCart);
    };

    const removeProduct = (selectedBookId: string) => {
        const updatedCart = cart.filter((cartItem) => {
            return cartItem.bookId._id !== selectedBookId;
        });
        setCart(updatedCart);
    };

    return (
        <div className="mt-6 flex gap-14">
            <div className="w-2/3">
                <h1 className="mb-3 text-2xl font-semibold">Shopping Cart</h1>
                <div className="mb-2 flex justify-between text-sm text-gray-400">
                    <p>Product</p>
                    <div className="flex gap-32">
                        <p>Quantity</p>
                        <p>Price</p>
                    </div>
                </div>
                <hr className="border-1 mb-8 border-gray-400"></hr>
                {cart.map((cartItem, index) => {
                    return (
                        <div key={index} className="mb-8 flex justify-between">
                            <div className="flex gap-5">
                                <img
                                    className="h-28 w-28 rounded-md object-cover"
                                    src={cartItem.bookId.image}
                                    alt="Book"
                                />
                                <div className="flex flex-col justify-center gap-1">
                                    <h1 className="font-semibold">
                                        {cartItem.bookId.title.length > 40
                                            ? cartItem.bookId.title.substring(0, 40) + "..."
                                            : cartItem.bookId.title}
                                    </h1>
                                    <h2 className="text-sm text-gray-400">
                                        {cartItem.bookId.brand}
                                    </h2>
                                </div>
                            </div>
                            <div className="mt-3 flex items-center gap-28">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                addOneProduct(cartItem.bookId._id);
                                            }}
                                            className="rounded-sm border border-gray-300 px-2 py-1"
                                        >
                                            <AiOutlinePlus size={16} />
                                        </button>
                                        <p>{cartItem.quantity}</p>
                                        <button
                                            onClick={() => {
                                                if (cartItem.quantity <= 1) {
                                                    removeProduct(cartItem.bookId._id);
                                                } else {
                                                    removeOneProduct(cartItem.bookId._id);
                                                }
                                            }}
                                            className="rounded-sm border border-gray-300 px-2 py-1"
                                        >
                                            <AiOutlineMinus size={16} />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => {
                                            removeProduct(cartItem.bookId._id);
                                        }}
                                        className="flex items-center gap-1 text-sm"
                                    >
                                        <BsFillTrashFill />
                                        Remove
                                    </button>
                                </div>
                                <p className="w-12 text-right font-semibold">
                                    ${cartItem.bookId.price.toFixed(2)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Checkout menu */}
            <div className="flex w-1/3 flex-col gap-3 self-start rounded-md border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex justify-between text-lg">
                    <p className="text-gray-800">Total</p>
                    <p className="font-medium">${total.toFixed(2)}</p>
                </div>
                <form action="/checkout" method="POST">
                    <button
                        className="text-md flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 py-2 text-white"
                        type="submit"
                    >
                        <MdOutlineLock />
                        <p>Checkout</p>
                    </button>
                </form>
            </div>
        </div>
    );
}

export default CartPage;
