import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import User from "../types/User";
import jwt from "jsonwebtoken";

const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((foundUser: User) => {
        bcrypt.compare(password, foundUser.password).then((result: boolean) => {
            if (result === true) {
                const token = jwt.sign(
                    { _id: foundUser._id },
                    process.env.SECRET as string,
                    { expiresIn: "3d" }
                );
                return res.status(200).json({ email: email, token: token });
            } else {
                return res
                    .status(400)
                    .json({ error: "Authentication failed." });
            }
        });
    });
};

const signup = (req: Request, res: Response) => {
    const saltRounds = 10;
    const { email, password } = req.body;
    bcrypt
        .hash(password, saltRounds)
        .then((hash: string) => {
            const newUser = new UserModel({
                email: email,
                password: hash,
                profileImage: {
                    data: "",
                    contentType: ""
                }
            });

            newUser
                .save()
                .then(() => {
                    console.log("Successfully saved new user to database");
                })
                .catch((error: Error) => {
                    console.log("Error saving new user to database", error);
                });
        })
        .catch((error: Error) => {
            console.log("An error occured during account creation", error);
            return res.status(500).json({
                error: "An error An error occured during the account creation"
            });
        });
};

export { login, signup };
