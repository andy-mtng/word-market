import { useNavigate } from "react-router-dom";
import useUserContext from "./useUserContext";
import axios from "axios";

function useLogout() {
    const navigate = useNavigate();
    const { setUser } = useUserContext();

    const logout = () => {
        // document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        // document.cookie = "authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        navigate("/");
        console.log("Logout");
        axios
            .post("auth/logout")
            .then(() => {
                localStorage.removeItem("user");
                setUser(null);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return { logout };
}

export default useLogout;
