import { MdCheckCircle, MdError } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface OrderInfoProps {
    success: boolean;
}

function OrderInfo(props: OrderInfoProps): JSX.Element {
    const { success } = props;
    const navigate = useNavigate();

    return (
        <div className="flex h-72 flex-col items-center rounded-md border border-gray-200 bg-white p-6 shadow-sm">
            {success ? (
                <MdCheckCircle size={48} color={"green"} />
            ) : (
                <MdError size={48} color={"red"} />
            )}
            <h1 className="mb-5 mt-2 text-3xl font-semibold">{success ? "Success!" : "Oops!"}</h1>
            <p className="text-gray-600">
                {success
                    ? "Thank you for ordering from WordMarket."
                    : "Something went wrong. Please try again later."}
            </p>
            <button
                onClick={() => {
                    navigate("/profile");
                }}
                className="mt-auto w-full rounded-sm bg-gray-800 py-2 text-white"
            >
                View Orders
            </button>
        </div>
    );
}

export default OrderInfo;
