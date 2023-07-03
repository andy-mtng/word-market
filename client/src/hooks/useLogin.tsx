import { useState } from "react";
import useUserContext from "./useUserContext";
import { useNavigate } from "react-router-dom";
import useNotificationContext from "../hooks/useNotificationContext";
import LoginInputs from "../types/LoginInputs";
import axios from "axios";

export const useLogin = () => {
    // const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const { setUser } = useUserContext();
    const navigate = useNavigate();
    const { setShowNotification, setNotificationInfo } = useNotificationContext();

    const login = async (formData: LoginInputs) => {
        setIsLoading(true);
        // setError(null);
        axios
            .post("auth/login", formData)
            .then((response) => {
                console.log(response);
                if (response.statusText === "OK") {
                    setShowNotification(true);
                    setNotificationInfo({ message: "Successfully logged in", type: "success" });
                    setUser(response.data.user);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    navigate("/");
                }
            })
            .catch((error) => {
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
            });
    };

    return { login, isLoading };
};
