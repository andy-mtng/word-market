import { Request, Response } from "express";
import BookDocument from "../types/BookDocument";
import BookModel from "../models/BookModel";

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

export { getBooks };
