import { createContext, useState } from "react";
import { Cart } from "../types/Cart";
import { ProfilePicture } from "../types/ProfilePicture";
import { User } from "../types/User";

interface User2 {
    user: User | null;
    setUser: (user: User | null) => void;
}

interface userContextProviderProps {
    children: React.ReactNode;
}

const UserContext = createContext<User2>({
    user: {
        firstName: "",
        lastName: "",
        email: "",
        cart: [],
        profilePicture: {
            data: "",
            contentType: ""
        }
    },
    setUser: () => {}
});

const UserContextProvider = ({ children }: userContextProviderProps) => {
    const [user, setUser] = useState<User | null>(
        JSON.parse(localStorage.getItem("user") as string) || null
    );

    console.log(user);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserContextProvider };
