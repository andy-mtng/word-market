import { Request, Response } from "express";
import BookDocument from "../types/BookDocument";
import BookModel from "../models/BookModel";

const getBook = (req: Request, res: Response) => {
    const bookId = req.params.id;
    BookModel.findById(bookId)
        .then((book: BookDocument | null) => {
            if (book === null) {
                console.log("Book not found");
                return res.status(404).json({ message: "Book not found" });
            }

            console.log("Successfully found book by its ID:", bookId);
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

export { getBooks, getBook };
