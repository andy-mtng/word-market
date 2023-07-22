import useLogout from "../hooks/useLogout";
import useUserContext from "../hooks/useUserContext";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import { useEffect, useState } from "react";
import { Order } from "../types/Order";
import moment from "moment";
import axios from "axios";
axios.defaults.withCredentials = true;

function Profile(): JSX.Element {
    const { logout } = useLogout();
    const { user } = useUserContext();
    const [imageData, setImageData] = useState("");
    const [orders, setOrders] = useState<Order[]>([]);

    useEffect(() => {
        axios
            .get("/orders")
            .then((response) => {
                console.log(response.data.orders[0].cart);
                setOrders(response.data.orders);
            })
            .catch((error: Error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <img
                className="mb-3 h-auto w-36 rounded-md border-2 border-gray-200"
                alt="Profile"
                src={imageData ? imageData : defaultProfilePicture}
            />
            <h1 className="text-medium mb-8 text-3xl">
                {user?.firstName} {user?.lastName}
            </h1>

            {/* Orders */}
            <div className=" mb-16 w-[700px]">
                <div className="relative">
                    <h1 className="text-lg font-bold">Orders</h1>
                    <hr className="border-5 absolute top-12 w-full border-gray-300"></hr>
                </div>
                {orders.map((order) => {
                    return (
                        <div key={order._id} className="flex justify-between">
                            <div>
                                <p className="text-sm text-gray-400">ID</p>
                                <h1>{order._id}</h1>
                            </div>
                            <div className="flex gap-20">
                                <div>
                                    <p className="text-sm text-gray-400">DATE</p>
                                    <h1>{moment(order.createdAt).format("MM-DD-YYYY")}</h1>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">QUANTITY</p>
                                    <h1>{order.cart.length}</h1>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Logout */}
            <button
                className="rounded-sm bg-gray-300 px-5 py-2 text-sm text-gray-800"
                onClick={logout}
            >
                LOGOUT
            </button>
        </div>
    );
}

export default Profile;
