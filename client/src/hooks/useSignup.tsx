import { useState } from "react";
// import useUserContext from "./useUserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useNotificationContext from "./useNotificationContext";

interface Inputs {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const useSignup = () => {
    // const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    // const { setUser } = useUserContext();
    const { setShowNotification, setNotificationInfo } = useNotificationContext();
    const navigate = useNavigate();

    const signup = (formData: Inputs) => {
        setIsLoading(true);
        // setError(null);

        return axios
            .post("auth/signup", formData)
            .then((response) => {
                console.log(response);
                if (response.statusText === "OK") {
                    navigate("/login");
                }
            })
            .catch((error) => {
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
                console.log(error);
            });
    };

    return { signup, isLoading };
};
