import { Cart } from "./Cart";
import { ProfilePicture } from "./ProfilePicture";

interface User {
    firstName: string;
    lastName: string;
    email: string;
    cart: Cart[];
    profilePicture: ProfilePicture;
}

export type { User };
