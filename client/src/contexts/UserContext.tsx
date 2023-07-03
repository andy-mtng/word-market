import { createContext, useState } from "react";

interface ProfilePicture {
    data: string;
    contentType: string;
}

interface Cart {
    bookId: string;
    quantity: number;
}

interface User {
    firstName: string;
    lastName: string;
    email: string;
    cart: Cart[];
    profilePicture: ProfilePicture;
}

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
