import { useState, useEffect, createContext } from "react";
import useNotificationContext from "../hooks/useNotificationContext";
import axios from "axios";
axios.defaults.withCredentials = true;

interface ProfilePictureContextProviderProps {
    children: React.ReactNode;
}

interface ProfilePicture {
    profilePicture: string;
    updateProfilePicture: () => void;
}

const ProfilePictureContext = createContext<ProfilePicture>({
    profilePicture: "",
    updateProfilePicture: () => null
});

const ProfilePictureContextProvider = ({ children }: ProfilePictureContextProviderProps) => {
    const [profilePicture, setProfilePicture] = useState<string>("");
    const { setNotificationInfo, setShowNotification } = useNotificationContext();

    const updateProfilePicture = () => {
        axios
            .get("/user/image")
            .then((response) => {
                console.log(response);
                setProfilePicture(
                    `data:${response.data.profileImage.contentType};base64,${response.data.profileImage.data}`
                );
            })
            .catch((error) => {
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
            });
    };

    useEffect(() => {
        updateProfilePicture();
    }, []);

    return (
        <ProfilePictureContext.Provider value={{ profilePicture, updateProfilePicture }}>
            {children}
        </ProfilePictureContext.Provider>
    );
};

export { ProfilePictureContextProvider, ProfilePictureContext };
