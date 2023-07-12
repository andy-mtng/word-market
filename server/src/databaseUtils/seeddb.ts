// Run on the command line using npx ts-node seeddb.ts

// Todo:
// Remove box sets
// Remove books without images potentially
// Remove duplicates

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
            const excludedTitleStrings = ["box", "flash cards", "School Zone"];
            const excludedExactTitles = [
                "A Game of Thrones / A Clash of Kings / A Storm of Swords / A Feast of Crows / A Dance with Dragons",
                "Dr. Seuss's Beginner Book Collection (Cat in the Hat, One Fish Two Fish, Green Eggs and Ham, Hop on Pop, Fox in Socks)",
                "Bob Books, Set 1: Beginning Readers",
                "First Little Readers Parent Pack: Guided Reading Level A: 25 Irresistible Books That Are Just the Right Level for Beginning Readers",
                "The Hunger Games Trilogy: The Hunger Games / Catching Fire / Mockingjay",
                "Greenlights",
                "The Hobbit and The Lord of the Rings",
                "Everyday Tarot Mini Tarot Deck (RP Minis)",
                "Dungeons & Dragons Core Rulebooks Gift Set (Special Foil Covers Edition with Slipcase, Player's Handbook, Dungeon Master's Guide, Monster Manual, DM Screen)",
                "Knock Knock What I Love about You Fill in the Love Book Fill-in-the-Blank Gift Journal, 4.5 x 3.25-Inches",
                "Moonology Oracle Cards: A 44-Card Deck and Guidebook",
                "Wuthering Heights (Chiltern Classic)",
                "Jane Eyre (Chiltern Classic)",
                "The Richest Man in Babylon (Deluxe Hardbound Edition)",
                "VTech Musical Rhymes Book, Pink",
                "A Wrinkle in Time",
                "Dracula",
                "The Rider Tarot Deck",
                "A Game of Thrones / A Clash of Kings / A Storm of Swords / A Feast for Crows / A Dance with Dragons (Song of Ice and Fire Series) (A Song of Ice and Fire)",
                "The Ballad of Songbirds and Snakes (A Hunger Games Novel)",
                "Light Seer's Tarot: A 78-Card Deck & Guidebook",
                "Dune: Book One in the Dune Chronicles",
                "How Not to Die: Discover the Foods Scientifically Proven to Prevent and Reverse Disease"
            ];
            const booksToSave = booksArray
                .filter((bookData) => bookData.image_url !== null)
                // .filter((bookData) => !bookData.title.toLowerCase().includes("box"))
                .filter((bookData) => {
                    return !excludedExactTitles.some((excludedExactTitles) => {
                        return bookData.title.includes(excludedExactTitles);
                    });
                })
                .filter((bookData) => {
                    return !excludedTitleStrings.some((excludedTitleStrings) => {
                        return bookData.title.toLowerCase().includes(excludedTitleStrings);
                    });
                })
                .map((bookData) => {
                    const randomPrice =
                        Math.round((Math.random() * (30.0 - 10.0) + 10.0) * 100) / 100;
                    const newBook: Book = {
                        // Uses default rating: 0 in mongoose schema
                        ISBN10: bookData.ISBN10 ?? null,
                        brand: bookData.brand ?? null,
                        title: bookData.title ?? null,
                        // Other fields could be parsed to get price data
                        rating: 0,
                        price: bookData.final_price ?? bookData.initial_price ?? randomPrice,
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
