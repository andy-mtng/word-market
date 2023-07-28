import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import bcrypt from "bcrypt";
import UserDocument from "../types/UserDocument";
import jwt from "jsonwebtoken";

const login = (req: Request, res: Response) => {
    const { email, password } = req.body;
    UserModel.findOne({ email: email }).then((foundUser: UserDocument | null) => {
        bcrypt.compare(password, foundUser?.password as string).then((result: boolean) => {
            if (result === true) {
                const token = jwt.sign({ _id: foundUser?._id }, process.env.SECRET as string, {
                    expiresIn: "3d"
                });

                // Calculate the expiration date for the cookie
                const expirationDate = new Date();
                expirationDate.setDate(expirationDate.getDate() + 3); // 3 days from now

                // Set JWT in browser cookies
                res.cookie("jwt", token, {
                    httpOnly: true,
                    expires: expirationDate // Set the expiration date
                });

                return res.status(200).json({
                    message: "Login successful",
                    user: {
                        firstName: foundUser?.firstName,
                        lastName: foundUser?.lastName,
                        email: email,
                        cart: foundUser?.cart,
                        profileImage: foundUser?.profileImage
                    }
                });
            } else {
                return res.status(400).json({ error: "Authentication failed." });
            }
        });
    });
};

const logout = (req: Request, res: Response) => {
    // Removes the jwt cookie from the client
    res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
    return res.status(200).json({
        message: "Successfully logged out"
    });
};

const signup = (req: Request, res: Response) => {
    const saltRounds = 10;
    const { email, password, firstName, lastName } = req.body;
    bcrypt
        .hash(password, saltRounds)
        .then((hash: string) => {
            const newUser = new UserModel({
                firstName: firstName,
                lastName: lastName,
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
                    res.status(200).json({ message: "Successfully created account" });
                })
                .catch((error: Error) => {
                    console.log("Error saving new user to database", error);
                    throw new Error();
                });
        })
        .catch((error: Error) => {
            console.log("An error occured during account creation", error);
            return res.status(500).json({
                error: "An error An error occured during the account creation"
            });
        });
};

export { login, signup, logout };
