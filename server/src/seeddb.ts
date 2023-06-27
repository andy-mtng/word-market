import fs from "fs";
import { promisify } from "util";
import BookModel from "./models/BookModel";

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
    price: number | null;
    rating: number;
    image: string;
    categories: string[];
    itemWeight: string;
    productDimensions: string;
    sellerName: string;
    bestSellersRank: BestSellerRank[];
};

const getBooks = (): Promise<any[]> => {
    return readFileAsync("../../amazon_books_data.json", "utf-8")
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
            booksArray.forEach((bookData) => {
                const newBook: Book = {
                    ISBN10: bookData.ISBN10,
                    brand: bookData.brand,
                    title: bookData.title,
                    price: bookData.final_price,
                    rating: 0,
                    image: bookData.image,
                    categories: bookData.categories,
                    itemWeight: bookData.item_weight,
                    productDimensions: bookData.productDimensions,
                    sellerName: bookData.sellerName,
                    bestSellersRank: bookData.best_sellers_rank
                };
                const bookDocument = new BookModel(newBook);
                bookDocument
                    .save()
                    .catch((error: Error) =>
                        console.log("Error saving book to database", error)
                    );
            });
        })
        .catch((error) => {
            console.log("Error getting booksArray", error);
        });
};

processBooks();
