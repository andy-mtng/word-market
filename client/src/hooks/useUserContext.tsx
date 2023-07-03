import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";

function useUserContext() {
    const context = useContext(UserContext);

    if (!context) {
        throw new Error("useUserContext must be used within a NotificationContextProvider");
    }

    return context;
}

export default useUserContext;
