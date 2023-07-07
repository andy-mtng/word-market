import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import useNotificationContext from "../hooks/useNotificationContext";
import { Book } from "../types/Book";
import { Rating } from "@smastrom/react-rating";
import starStyles from "../styles/starStyles";
import { AiOutlineAmazon } from "react-icons/ai";

function BookPage(): JSX.Element {
    const [book, setBook] = useState<Book>();
    const { setShowNotification, setNotificationInfo } = useNotificationContext();
    const categoryColors: string[] = [
        "bg-red-100",
        "bg-blue-100",
        "bg-green-100",
        "bg-purple-100",
        "bg-green-100",
        "bg-yellow-100",
        "bg-orange-100"
    ];
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`/books/${id}`)
            .then((response) => {
                console.log(response);
                if (response.statusText === "OK") {
                    setBook(response.data.data);
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
            <div className="mt-6 flex h-full gap-10">
                <img src={book?.image} alt="Book Cover" />
                <div className="flex w-full flex-col">
                    <h1 className="mb-3 text-3xl font-bold">{book?.title}</h1>
                    <h2 className="mb-2">{book?.brand ? `by ${book.brand}` : ""}</h2>
                    <div className="mb-4 flex flex-row">
                        {book?.categories.map((category) => {
                            const randomColour =
                                categoryColors[Math.floor(Math.random() * categoryColors.length)];
                            return (
                                <span
                                    className={`mr-2 rounded-full px-2 py-0.5 text-xs ${randomColour}`}
                                >
                                    {category}
                                </span>
                            );
                        })}
                    </div>
                    <div className="mb-6 flex items-center gap-2">
                        <p className="text-lg font-medium">{book?.rating}</p>
                        <Rating
                            style={{ maxWidth: 125, marginRight: 0 }}
                            value={book?.rating ?? 0}
                            readOnly={true}
                            itemStyles={starStyles}
                        />
                    </div>
                    {book?.bestSellersRank.map((bestSellerRank) => {
                        return (
                            <div className="flex gap-2">
                                <p>#{bestSellerRank.rank}</p>
                                <p>{bestSellerRank.category}</p>
                            </div>
                        );
                    })}
                    <div className="mt-auto flex">
                        <p className="mr-10 text-2xl font-semibold">${book?.price}</p>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-1 rounded-md bg-green-500 px-3 py-1 text-white">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={2}
                                    stroke="currentColor"
                                    className="h-5 w-5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                                    />
                                </svg>
                                <p className="text-xs font-semibold">ADD TO CART</p>
                            </button>
                            {book?.amazonLink ? (
                                <button className="rounded-md bg-orange-400 px-3 py-1 text-xs font-semibold">
                                    <a
                                        className="flex items-center gap-2"
                                        target="_blank"
                                        href={book.amazonLink}
                                        rel="noreferrer"
                                    >
                                        <AiOutlineAmazon size={20} />
                                        <p>BUY ON AMAZON</p>
                                    </a>
                                </button>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Customer reviews */}
            <div className="mt-10">
                <h1 className="text-xl font-semibold">Customer Reviews</h1>
                {book?.reviews.length === 0 && <p>No reviews for this product.</p>}

                {/* Display all reviews*/}
                {book?.reviews.map((review) => {
                    return (
                        <div>
                            <h1>
                                {review.firstName} {review.lastName}
                            </h1>
                            <h2>Rating: {review.rating}</h2>
                            <p>review.content</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default BookPage;
