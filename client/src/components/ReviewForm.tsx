import { Rating } from "react-simple-star-rating";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { Review } from "../types/Review";
import useNotificationContext from "../hooks/useNotificationContext";
import axios from "axios";
axios.defaults.withCredentials = true;

type Inputs = {
    reviewContent: string;
    rating: number;
    bookId: string;
};

type ReviewFormProps = {
    bookId: string | undefined;
    onUpdate: () => void;
};

function ReviewForm(props: ReviewFormProps): JSX.Element {
    const { setNotificationInfo, setShowNotification } = useNotificationContext();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<Inputs>();
    const [rating, setRating] = useState(0);
    const { bookId, onUpdate } = props;

    const calculateOverallRating = (reviews: Review[]): number => {
        const totalRating = reviews.reduce((total, current) => {
            return total + current.rating;
        }, 0);
        return totalRating / reviews.length;
    };

    const handleRating = (rate: number) => {
        setRating(rate);
    };

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        data.rating = rating;
        axios
            .post(`/reviews/${bookId as string}`, data)
            .then(() => {
                console.log("Review created");
                setShowNotification(true);
                setNotificationInfo({ message: "Review created successfully", type: "success" });
            })
            .catch((error) => {
                console.log(error);
                setShowNotification(true);
                setNotificationInfo({ message: "Error creating review", type: "error" });
            })
            .finally(() => {
                onUpdate();
                setRating(0);
                reset();
            });
    };

    return (
        <div className="mb-8">
            <Rating
                initialValue={rating}
                onClick={handleRating}
                emptyStyle={{ display: "flex" }}
                fillStyle={{ display: "-webkit-inline-box" }}
                size={20}
            />
            <form onSubmit={handleSubmit(onSubmit)}>
                <textarea
                    {...register("reviewContent")}
                    className="h-20 w-full resize-none rounded-sm border border-gray-400 p-2"
                />
                <button className="ml-auto" type="submit">
                    SUBMIT
                </button>
            </form>
        </div>
    );
}

export default ReviewForm;
