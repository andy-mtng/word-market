const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { Request, Response } from "express";
import Cart from "../types/Cart";
import getAllStripePrices from "../databaseUtils/getAllStripePrices";

interface line_item {
    price: string;
    quantity: number;
}

const domain = "http://localhost:3000";
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
        cancel_url: `${domain}/cart?canceled=true`
    });

    res.redirect(303, session.url);
};

export { createCheckoutSession };
