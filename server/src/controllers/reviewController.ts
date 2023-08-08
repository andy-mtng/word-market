import { Request, Response } from "express";
import ReviewModel from "../models/ReviewModel";
import BookModel from "../models/BookModel";
import BookDocument from "../types/BookDocument";
import ReviewDocument from "../types/ReviewDocument";

const updateBookRating = (book: BookDocument): Promise<any> => {
    return new Promise((resolve, reject) => {
        BookModel.findById(book._id)
            .populate("reviews")
            .exec()
            .then((populatedBook) => {
                if (populatedBook === null) {
                    throw new Error("An error occured.");
                }
                const totalRating = populatedBook.reviews.reduce((total: number, current) => {
                    return total + current.rating;
                }, 0);
                const averageRating = totalRating / populatedBook.reviews.length;
                populatedBook.rating = averageRating;

                return populatedBook.save();
            })
            .then((updatedBook) => {
                resolve(updatedBook);
            })
            .catch((error) => {
                reject(error);
            });
    });
};

const createReview = (req: Request, res: Response) => {
    const user = res.locals.user;
    const bookId = req.params.bookId;
    const reviewData = req.body;
    console.log(reviewData);
    const newReview = new ReviewModel({
        rating: reviewData.rating,
        user: user._id,
        reviewContent: reviewData.reviewContent
    });

    let newReviewId;

    newReview
        .save()
        .then((savedReview: ReviewDocument) => {
            newReviewId = savedReview._id;
            return BookModel.findByIdAndUpdate(
                bookId,
                { $push: { reviews: newReviewId } },
                { new: true }
            );
        })
        .then((updatedBook: BookDocument | null) => {
            if (updatedBook === null) {
                throw new Error("Error updating book's ratings");
            }
            return updateBookRating(updatedBook);
        })
        .then(() => {
            console.log("Review saved successfully");
            res.status(201).json({ message: "Review created successfully" });
        })
        .catch((error) => {
            console.log("An error occured while creating the review", error);
            res.status(500).json({ error: "An error occured while creating the review" });
        });
};

export { createReview };
