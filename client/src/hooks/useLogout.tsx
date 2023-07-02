import { useNavigate } from "react-router-dom";

function useLogout() {
    const navigate = useNavigate();

    const logout = () => {
        document.cookie = `jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `authenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;

        navigate("/");
    };

    return { logout };
}

export default useLogout;
