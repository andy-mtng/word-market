import { User } from "./User";

interface Review {
    _id: string;
    reviewContent: string;
    user: User;
    rating: number;
}

export type { Review };
