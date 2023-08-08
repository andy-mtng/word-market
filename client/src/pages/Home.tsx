import { useState, useEffect } from "react";
import { Book } from "../types/Book";
import axios from "axios";

import useNotificationContext from "../hooks/useNotificationContext";
import HeroSection from "../components/HeroSection";
import { BsFillLightningChargeFill, BsShieldFillCheck } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";

import HomeFeaturesSection from "../components/HomeFeaturesSection";

function Home(): JSX.Element {
    const [popularBooks, setPopularBooks] = useState<Book[]>([]);
    const { setNotificationInfo, setShowNotification } = useNotificationContext();

    useEffect(() => {
        axios
            .get("/books/popular")
            .then((response) => {
                setPopularBooks(response.data.topBooks);
            })
            .catch((error) => {
                setShowNotification(true);
                setNotificationInfo({ message: "An error occured.", type: "error" });
            });
    }, []);

    return (
        <div>
            <HeroSection />
            <HomeFeaturesSection />
            <div className="mt-14 flex flex-col items-center">
                <h1 className="mx-auto text-2xl font-semibold">Popular Books</h1>
                <p className="text-sm text-gray-400">
                    Trending and highly rated books currently capturing readers' attention and
                    interest
                </p>
            </div>
            <div className="mx-auto my-6 flex justify-center gap-8">
                {popularBooks.map((book) => {
                    return <img className="h-auto w-36 rounded-md" src={book.image} alt="Book" />;
                })}
            </div>
        </div>
    );
}

export default Home;
