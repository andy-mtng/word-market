import { useEffect, useState } from "react";
import axios from "axios";
import useNotificationContext from "../hooks/useNotificationContext";
import { Book as IBook } from "../types/Book";
import BookDisplay from "../components/BookDisplay";

function Explore(): JSX.Element {
    const [books, setBooks] = useState<IBook[]>([]);
    const { setShowNotification, setNotificationInfo } = useNotificationContext();

    useEffect(() => {
        console.log("length", books?.length);
        if (books?.length === 0) {
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
        }
    }, []);

    return (
        <div>
            <h1 className="text-xl font-medium">Explore Page</h1>
            <div className="grid grid-cols-4 gap-6">
                {books?.map((book: IBook) => {
                    // return <img key={book._id} src={book.image} alt="Book" />;
                    return (
                        <BookDisplay
                            title={book.title}
                            image={book.image}
                            rating={book.rating}
                            price={book.price}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Explore;
