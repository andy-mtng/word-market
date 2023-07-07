import { Request, Response } from "express";
import UserModel from "../models/UserModel";

const saveCart = (req: Request, res: Response) => {
    console.log(req.body);
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

export { saveCart };
