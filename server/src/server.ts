// Imports
require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose, { ConnectOptions } from "mongoose";
import processBooks from "./databaseUtils/seeddb";
const app = express();

// Constants
const port = 5000;

app.get("/hello", (req: Request, res: Response) => {
    res.status(200).json({ message: "Hello world" });
});

// Connect to database
mongoose
    .connect(
        process.env.MONGODB_URI as string,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: "wordmarket-db"
        } as ConnectOptions
    )
    .then(() => {
        console.log("Connected to MongoDB");
        processBooks();
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

app.listen(port, () => {
    console.log("process.env", process.env.MONGODB_URI);
    console.log(`App listening on port ${port}`);
});
