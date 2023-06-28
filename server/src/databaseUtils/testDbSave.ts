console.log(process.env.MONGODB_URI as string);

import CityModel from "../models/CityModel";
import mongoose, { ConnectOptions } from "mongoose";

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
        const newCity = new CityModel({
            name: "Toronto"
        });

        newCity
            .save()
            .then(() => {
                console.log("Saved city");
            })
            .catch((error: Error) => {
                console.log("Error saving city", error);
            });
    })
    .catch((error) => {
        console.log("Error connecting to MongoDB", error);
    });
