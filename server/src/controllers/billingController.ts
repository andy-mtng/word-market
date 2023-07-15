const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { Request, Response } from "express";
import Cart from "../types/Cart";

interface line_item {
    price: string;
    quantity: number;
}

const domain = "http://localhost:3000";
const createCheckoutSession = async (req: Request, res: Response) => {
    const user = res.locals.user;
    const cart: Cart[] = user.cart;
    // const line_items: line_item[] = [];

    for (const cartItem of cart) {
        const product = await stripe.products.retrieve(cartItem.bookId.toString());
        console.log(product);
        // const price = product["price"];
        // line_items.push({ price: product.default_price, quantity: cartItem.quantity });
    }

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: "price_1NTEXZAFrg5bGStJgoynHynS",
                quantity: 10
            }
        ],
        mode: "payment",
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`
    });

    res.redirect(303, session.url);
};

export { createCheckoutSession };
