import { Request, Response } from "express";
import OrderModel from "../models/OrderModel";

const getOrders = (req: Request, res: Response) => {
    const user = res.locals.user;

    OrderModel.find({ user: user._id })
        .populate("cart.bookId")
        .exec()
        .then((populatedOrders) => {
            console.log("populatedOrders", populatedOrders[0].cart);
            res.status(200).json({ orders: populatedOrders });
        })
        .catch((error: Error) => {
            console.log("Error finding the order", error);
            res.status(500).json({ error: "Error finding the order" });
        });
};

export { getOrders };
