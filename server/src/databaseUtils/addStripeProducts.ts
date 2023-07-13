// https://stripe.com/docs/api/products/create?lang=node

const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_API_KEY);
import mongoose, { ConnectOptions } from "mongoose";
import connectionString from "./dataBaseConnectionString";
import BookModel from "../models/BookModel";
import BookDocument from "../types/BookDocument";

const createProducts = async () => {
    try {
        const books: BookDocument[] = await BookModel.find({});
        for (const book of books) {
            await stripe.products.create({
                id: book._id,
                name: book.title
            });

            // await stripe.prices.create({
            //     unit_amount: book.price * 100,
            //     currency: "usd",
            //     product: book._id
            // });
        }
    } catch (error) {
        console.log("Error creating Stripe products", error);
    }
};

mongoose
    .connect(connectionString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "wordmarket-db"
    } as ConnectOptions)
    .then(() => {
        console.log("Connected to MongoDB");
        createProducts();
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
