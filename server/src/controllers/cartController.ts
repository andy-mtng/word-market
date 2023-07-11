import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import UserDocument from "../types/UserDocument";

const saveCart = (req: Request, res: Response) => {
    const email = req.body.email;
    const updatedCart = req.body.cart;
    UserModel.updateOne({ email: email }, { $set: { cart: updatedCart } })
        .then(() => {
            console.log("Cart updated successfully");
            return res.status(200).json({ message: "Cart updated successfully" });
        })
        .catch((error: Error) => {
            console.log("Error saving cart", error);
            return res.status(500).json({ message: "Error saving cart" });
        });
};

const getCart = (req: Request, res: Response) => {
    const user = res.locals.user;
    UserModel.findOne({ _id: user!.id })
        .populate("cart.bookId")
        .exec()
        .then((user: UserDocument | null) => {
            if (user === null) {
                throw new Error("Error fetching cart, user not found");
            }

            return res
                .status(200)
                .json({ populatedCart: user.cart, message: "Cart sucessfully retrieved" });
        })
        .catch((error: Error) => {
            console.log("Error retrieving shopping cart", error);
            return res.status(500).json({ error: error.message });
        });
};

export { saveCart, getCart };
