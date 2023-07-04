// Run on the command line using npx ts-node seeddb.ts

import fs from "fs";
import { promisify } from "util";
import mongoose, { ConnectOptions } from "mongoose";
import BookModel from "../models/BookModel";
import connectionString from "./dataBaseConnectionString";

const readFileAsync = promisify(fs.readFile);

type BestSellerRank = {
    category: string;
    rank: number;
};

// Add reviews later to the model
type Book = {
    ISBN10: string;
    brand: string;
    title: string;
    rating: number;
    price: number;
    image: string;
    categories: string[];
    itemWeight: string;
    reviews: any[];
    productDimensions: string;
    amazonLink: string;
    sellerName: string;
    bestSellersRank: BestSellerRank[];
};

const getBooks = (): Promise<any[]> => {
    return readFileAsync("./amazon_books_data.json", "utf-8")
        .then((data: string) => {
            try {
                const bookArray: any[] = JSON.parse(data);
                return Promise.resolve(bookArray);
            } catch (error) {
                console.log("Error parsing books JSON string", error);
                return Promise.reject(null);
            }
        })
        .catch((error: Error) => {
            console.log("Error reading the books dataset", error);
            return Promise.reject(null);
        });
};

const processBooks = (): void => {
    getBooks()
        .then((booksArray) => {
            console.log("Starting to save books to database");
            console.log("booksArray[0]", booksArray[0]);
            const booksToSave = booksArray.map((bookData) => {
                const newBook: Book = {
                    // Uses default rating: 0 in mongoose schema
                    ISBN10: bookData.ISBN10 ?? null,
                    brand: bookData.brand ?? null,
                    title: bookData.title ?? null,
                    // Other fields could be parsed to get price data
                    rating: 0,
                    price: bookData.final_price | bookData.initial_price ?? 0,
                    image: bookData.image_url ?? null,
                    categories: bookData.categories ?? [],
                    itemWeight: bookData.item_weight ?? null,
                    productDimensions: bookData.productDimensions ?? null,
                    sellerName: bookData.sellerName ?? null,
                    amazonLink: bookData.url ?? null,
                    reviews: [],
                    bestSellersRank: bookData.best_sellers_rank ?? []
                };
                return newBook;
            });
            BookModel.insertMany(booksToSave)
                .then(() => {
                    console.log("Finished saving books to database");
                })
                .catch((error: Error) => {
                    console.log("Error saving books to database", error);
                });
        })
        .catch((error) => {
            console.log("Error getting booksArray", error);
        });
};

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "wordmarket-db"
    } as ConnectOptions)
    .then(() => {
        console.log("Connected to MongoDB");
        processBooks();
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

export default processBooks;
