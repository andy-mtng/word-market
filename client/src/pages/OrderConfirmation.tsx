import { useLocation } from "react-router-dom";
import OrderInfo from "../components/OrderInfo";

function OrderConfirmation(): JSX.Element {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const successParam = searchParams.get("success");

    return (
        <div className="mt-6 flex items-center justify-center">
            <OrderInfo success={successParam === "true"} />
        </div>
    );
}

export default OrderConfirmation;
