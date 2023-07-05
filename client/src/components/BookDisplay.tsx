import { Book as IBook } from "../types/Book";
import { Rating } from "react-simple-star-rating";

interface BookDisplayProps {
    title: string;
    rating: number;
    price: number;
    image: string;
}

function BookDisplay(props: BookDisplayProps): JSX.Element {
    const { title, rating, price, image } = props;

    return (
        <div className="flex flex-col items-center">
            <img className="w-50 h-auto rounded-md" src={image} alt="Book" />
            <h1 className="center w-50 break-words text-sm font-medium">{title}</h1>
            <div className="flex">
                <Rating
                    initialValue={rating}
                    readonly={true}
                    size={20}
                    SVGstyle={{ display: "inline-block" }}
                />
            </div>
        </div>
    );
}

export default BookDisplay;
