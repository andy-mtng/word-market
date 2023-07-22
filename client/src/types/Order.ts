import { Book } from "./Book";

interface OrderCartItem {
    bookId: Book;
    quantity: number;
    _id: string;
}

interface Order {
    user: string;
    _id: string;
    cart: OrderCartItem[];
    createdAt: Date;
}

export type { Order };
