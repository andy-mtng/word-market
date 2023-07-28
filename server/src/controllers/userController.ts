import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import UserDocument from "../types/UserDocument";

const uploadProfilePicture = (req: Request, res: Response) => {
    if (req.file === undefined) {
        throw new Error("Image is undefined");
    }

    const user = res.locals.user;

    UserModel.findById(user._id)
        .then((foundUser: UserDocument | null) => {
            if (foundUser === null) {
                throw new Error("User not found");
            }

            foundUser.profileImage.data = req.file!.buffer.toString("base64");
            foundUser.profileImage.contentType = req.file!.mimetype;

            return foundUser.save();
        })
        .then(() => {
            res.status(200).json({ message: "Image saved successfully" });
        })
        .catch((error: Error) => {
            console.log("Error uploading image", error);
            res.status(500).json({ error: "Error uploading image" });
        });
};

const getProfilePicture = (req: Request, res: Response) => {
    const user = res.locals.user;

    UserModel.findById(user._id)
        .then((foundUser: UserDocument | null) => {
            if (foundUser === null) {
                throw new Error("User not found");
            }

            res.status(200).json({
                profileImage: {
                    data: foundUser.profileImage.data,
                    contentType: foundUser.profileImage.contentType
                }
            });
        })
        .catch((error: Error) => {
            console.log("Error getting profile image", error);
            res.status(500).json({ error: "Error getting profile image" });
        });
};

export { uploadProfilePicture, getProfilePicture };
