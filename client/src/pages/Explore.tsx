import { useEffect, useState } from "react";
import axios from "axios";
import useNotificationContext from "../hooks/useNotificationContext";
import { Book as IBook } from "../types/Book";
import BookDisplay from "../components/BookDisplay";

function Explore(): JSX.Element {
    const [books, setBooks] = useState<IBook[]>([]);
    const { setShowNotification, setNotificationInfo } = useNotificationContext();

    useEffect(() => {
        axios
            .get("/books")
            .then((response) => {
                console.log(response);
                if (response.statusText === "OK") {
                    setBooks(response.data.data);
                }
            })
            .catch((error: Error) => {
                console.log(error);
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
            });
    }, []);

    return (
        <div>
            <h1 className="text-xl font-medium">Explore Page</h1>
            <div className="grid grid-cols-4 gap-6">
                {books?.map((book: IBook, index) => {
                    return (
                        <BookDisplay
                            title={book.title}
                            image={book.image}
                            rating={book.rating}
                            author={book.brand}
                            price={book.price}
                            id={book._id}
                            key={index}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;
