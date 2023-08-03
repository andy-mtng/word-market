import { useEffect, useState } from "react";
import axios from "axios";
import useNotificationContext from "../hooks/useNotificationContext";
import { Book as IBook } from "../types/Book";
import BookDisplay from "../components/BookDisplay";
import PaginationBar from "../components/PaginationBar";

function Explore(): JSX.Element {
    const [books, setBooks] = useState<IBook[]>([]);
    const { setShowNotification, setNotificationInfo } = useNotificationContext();
    const [totalPages, setTotalPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const limit = 12;

    useEffect(() => {
        // Display the first page on component load
        handlePageChange(1);
    }, []);

    const handlePageChange = (page: number) => {
        axios
            .get(`/books/page?page=${page}&limit=${limit}`)
            .then((response) => {
                console.log(response);
                if (response.statusText === "OK") {
                    setBooks(response.data.books);
                    setCurrentPage(response.data.currentPage);
                    setTotalPages(response.data.totalPages);
                }
            })
            .catch((error: Error) => {
                console.log(error);
                setShowNotification(true);
                setNotificationInfo({ message: error.message, type: "error" });
            });
    };

    return (
        <div className="flex flex-col items-center">
            <h1 className="mt-4 text-3xl font-bold">Explore</h1>
            <p className="mb-6 mt-2 w-[500px] text-center text-sm text-gray-600">
                Embark on literary journeys and expand your horizons with our captivating book
                collection. Discover tales that will ignite your imagination and knowledge.
            </p>
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
            <PaginationBar
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}

export default Explore;
