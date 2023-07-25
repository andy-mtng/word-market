import useLogout from "../hooks/useLogout";
import useUserContext from "../hooks/useUserContext";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import { useEffect, useState } from "react";
import { Order } from "../types/Order";
import useNotificationContext from "../hooks/useNotificationContext";
import useProfilePictureContext from "../hooks/useProfileImageContext";
import moment from "moment";
import axios from "axios";
axios.defaults.withCredentials = true;

function Profile(): JSX.Element {
    const { logout } = useLogout();
    const { user } = useUserContext();
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [orders, setOrders] = useState<Order[]>([]);
    const { setNotificationInfo, setShowNotification } = useNotificationContext();
    const { profilePicture, updateProfilePicture } = useProfilePictureContext();

    const handleFileSelect = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const file = ev.target.files?.[0] || null;
        if (file !== null) {
            setImageFile(file);
        }
    };

    const handleFileUpload = () => {
        const formData = new FormData();
        formData.append("image", imageFile!);

        axios
            .post("/user/image", formData)
            .then(() => {
                updateProfilePicture();
                setShowNotification(true);
                setNotificationInfo({ message: "Profile picture updated", type: "success" });
            })
            .catch((error) => {
                console.log(error);
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
            });
    };

    useEffect(() => {
        // Ensures handleFileUpload() only runs when there is a file selected (i.e. user wants to upload a photo)
        // Without this handleFileUpload() runs everytime on page refresh incorrectly
        if (imageFile) {
            handleFileUpload();
        }
    }, [imageFile]);

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
            <div className="mb-2">
                <label className="bg-black" htmlFor="image-input">
                    <img
                        className="mb-3 h-40 w-40 rounded-md border-2 border-gray-200 object-cover hover:cursor-pointer"
                        alt="Profile"
                        src={profilePicture ? profilePicture : defaultProfilePicture}
                    />
                </label>
                <input
                    id="image-input"
                    className="hidden border border-gray-400 bg-gray-100"
                    type="file"
                    onChange={handleFileSelect}
                />
            </div>

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
                className="mb-10 rounded-sm bg-gray-300 px-5 py-2 text-sm text-gray-800"
                onClick={logout}
            >
                LOGOUT
            </button>
        </div>
    );
}

export default Profile;
