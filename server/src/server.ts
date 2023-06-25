require('dotenv').config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
const app = express();
const port = 5000;

app.get("/hello", (req: Request, res: Response) => {
    res.status(200).json({message: "Hello world"});
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

mongoose.connect(process.env.MONGODB_URI as string)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
