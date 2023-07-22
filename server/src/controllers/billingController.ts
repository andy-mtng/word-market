const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { Request, Response } from "express";
import Cart from "../types/Cart";
import getAllStripePrices from "../databaseUtils/getAllStripePrices";
import UserModel from "../models/UserModel";
import OrderModel from "../models/OrderModel";
import UserDocument from "../types/UserDocument";

const domain = "http://localhost:3000";

interface line_item {
    price: string;
    quantity: number;
}

const createCheckoutSession = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const cart: Cart[] = user.cart;
    const line_items: line_item[] = [];

    const prices = await getAllStripePrices();

    for (const cartItem of cart) {
        const product = await stripe.products.retrieve(cartItem.bookId.toString());
        const price = prices.find((price: any) => {
            return price.product === product.id;
        });
        line_items.push({ price: price.id, quantity: cartItem.quantity });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: "payment",
        success_url: `${domain}/order-confirmation?success=true`,
        cancel_url: `${domain}/cart?canceled=true`,
        metadata: {
            userId: user.id
        }
    });

    res.redirect(303, session.url);
};

const fulfillOrder = (metadata: any) => {
    return new Promise<string>((resolve, reject) => {
        const userId = metadata.userId;

        UserModel.findById(userId)
            .then((foundUser: UserDocument | null) => {
                if (foundUser === null) {
                    throw new Error("User not found");
                }

                const newOrder = new OrderModel({
                    user: userId,
                    cart: foundUser.cart
                });

                return newOrder.save();
            })
            .then(() => {
                return UserModel.findByIdAndUpdate(userId, { cart: [] });
            })
            .then(() => {
                console.log("Order fulfilled successfully");
                resolve(""); // Resolve the Promise when everything is successful
            })
            .catch((error: Error) => {
                console.log("Error fulfilling order", error);
                reject(error); // Reject the Promise if any error occurs
            });
    });
};

const handleCheckoutCompletion = async (req: Request, res: Response) => {
    const payload = req.body;
    const sig = req.headers["stripe-signature"];

    let event;

    try {
        event = stripe.webhooks.constructEvent(payload, sig, process.env.STRIPE_WEBHOOK_ENDPOINT);
    } catch (error: any) {
        console.log("Webhook error:", error);
        return res.status(400).json({ error: error.message });
    }

    // Handle the checkout.session.completed event
    if (event.type === "checkout.session.completed") {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const stripeSession = await stripe.checkout.sessions.retrieve(event.data.object.id);
        const metadata = stripeSession.metadata;

        // Fulfill the purchase
        try {
            await fulfillOrder(metadata);
        } catch (error: any) {
            console.log("Error fullfilling order", error);
            return res.status(400).json({ error: error.message });
        }
    }
    res.status(200).end();
};

export { createCheckoutSession, handleCheckoutCompletion };
