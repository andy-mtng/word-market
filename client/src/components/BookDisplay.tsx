import { Book as IBook } from "../types/Book";
import { Rating, Star } from "@smastrom/react-rating";
import { useNavigate } from "react-router-dom";
import starStyles from "../styles/starStyles";

interface BookDisplayProps {
    title: string;
    rating: number;
    price: number;
    image: string;
    author: string;
    id: string;
}

function BookDisplay(props: BookDisplayProps): JSX.Element {
    const { title, rating, price, image, author, id } = props;
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col gap-1 rounded-md bg-gray-50 px-8 py-4 transition duration-500 hover:scale-105"
            onClick={() => {
                navigate(`/books/${id}`);
            }}
        >
            {image ? (
                <img
                    className="w-50 h-60 self-center rounded-md object-cover"
                    src={image}
                    alt="Book"
                />
            ) : (
                <div className="w-50 h-60 rounded-md bg-gray-300"></div>
            )}
            <h1 className="w-50 mr-auto mt-3 text-sm font-semibold">{title}</h1>
            <h2 className="mb-5 text-xs text-gray-500">{author ? `by ${author}` : ""}</h2>
            <div className="mt-auto flex justify-between">
                <p className="text-2xl font-medium">${price.toFixed(2)}</p>
                <Rating
                    style={{ maxWidth: 100, marginRight: 0 }}
                    value={rating}
                    readOnly={true}
                    itemStyles={starStyles}
                />
            </div>
        </div>
    );
}

export default BookDisplay;
