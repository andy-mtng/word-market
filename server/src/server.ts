// Imports
require("dotenv").config();
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import authRouter from "./routes/authRoutes";
import cors from "cors";
const app = express();

// Constants
const port = 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/auth", authRouter);

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
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
