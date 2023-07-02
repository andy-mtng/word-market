import { NotificationContext } from "../contexts/NotificationContext";
import { useContext } from "react";

function useNotificationContext() {
    const context = useContext(NotificationContext);

    if (!context) {
        throw new Error("useNotificationContext must be used within a NotificationContextProvider");
    }

    return context;
}

export default useNotificationContext;
