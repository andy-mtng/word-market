import { ProfileImage } from "../types/ProfileImage";
import defaultProfilePicture from "../assets/default_profile_picture.jpg";
import { Rating } from "@smastrom/react-rating";
import starStyles from "../styles/starStyles";

interface ReviewProps {
    firstName: string;
    lastName: string;
    profilePicture: ProfileImage;
    reviewContent: string;
    rating: number;
}

function Review(props: ReviewProps): JSX.Element {
    const { firstName, lastName, profilePicture, reviewContent, rating } = props;

    return (
        <div className="mb-4">
            <div className="flex items-center gap-3">
                <img
                    className="box-border h-5 w-5 rounded-sm bg-gray-300"
                    alt="Profile"
                    src={
                        profilePicture
                            ? `data:${profilePicture.contentType};base64,${profilePicture.data}`
                            : defaultProfilePicture
                    }
                />
                <h1 className="text-lg">
                    {firstName} {lastName}
                </h1>
            </div>
            <Rating
                style={{ maxWidth: 100, marginRight: 0 }}
                value={rating}
                readOnly={true}
                itemStyles={starStyles}
            />
            <p>{reviewContent}</p>
        </div>
    );
}

export default Review;
