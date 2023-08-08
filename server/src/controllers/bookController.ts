import { Request, Response } from "express";
import BookDocument from "../types/BookDocument";
import BookModel from "../models/BookModel";

const getBook = (req: Request, res: Response) => {
    const bookId = req.params.id;
    BookModel.findById(bookId)
        .populate({
            path: "reviews",
            populate: {
                path: "user"
            }
        })
        .then((book: BookDocument | null) => {
            if (book === null) {
                console.log("Book not found");
                return res.status(404).json({ message: "Book not found" });
            }

            console.log("Successfully found book by its ID:", book);
            return res.status(200).json({ message: "Book successfully retrieved", data: book });
        })
        .catch((error: Error) => {
            console.log("Error finding the book by its ID", error);
            return res.status(500).json({ error: "Error retrieving the book" });
        });
};

const getBooks = (req: Request, res: Response) => {
    BookModel.find({})
        .then((books: BookDocument[]) => {
            console.log("All books successfully retrieved");
            res.status(200).json({ message: "All books successfully retrieved", data: books });
        })
        .catch((error: Error) => {
            console.log("Error retrieving all books", error);
            res.status(500).json({ error: "Error retrieving all books" });
        });
};

interface PaginationQuery {
    page: string;
    limit: string;
}

const getPaginatedBooks = (req: Request<{}, {}, {}, PaginationQuery>, res: Response) => {
    const { page, limit } = req.query;
    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    BookModel.countDocuments()
        .then((totalBooks) => {
            return BookModel.find()
                .skip(skip)
                .limit(parseInt(limit))
                .then((books) => {
                    res.json({
                        currentPage: pageNum,
                        totalBooks,
                        totalPages: Math.ceil(totalBooks / limitNum),
                        books
                    });
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    res.status(500).json({ error: "Internal Server Error" });
                });
        })
        .catch((error) => {
            console.error("Error counting documents:", error);
            res.status(500).json({ error: "Internal Server Error" });
        });
};

// const updateBookRating = (req: Request, res: Response) => {
//     const bookId = req.query.params;

//     // req.body contains the updated rating
//     BookModel.findByIdAndUpdate(bookId, req.body)
//         .then(() => {
//             console.log("Book rating updated successfully");
//             res.status(200).json({ message: "Book updated successfully" });
//         })
//         .catch((error) => {
//             console.log("Book rating update failed", error);
//             res.status(500).json({ error: "Book rating update failed" });
//         });
// };

export { getBooks, getBook, getPaginatedBooks };
