import { ProfilePictureContext } from "../contexts/ProfileImageContext";
import { useContext } from "react";

const useProfilePictureContext = () => {
    const context = useContext(ProfilePictureContext);

    if (!context) {
        throw new Error(
            "useProfilePictureContext must be used within a NotificationContextProvider"
        );
    }

    return context;
};

export default useProfilePictureContext;
