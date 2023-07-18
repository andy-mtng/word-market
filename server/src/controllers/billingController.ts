const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { Request, Response } from "express";
import Cart from "../types/Cart";
import getAllStripePrices from "../databaseUtils/getAllStripePrices";

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
        cancel_url: `${domain}/cart?canceled=true`
    });

    res.redirect(303, session.url);
};

const fulfillOrder = (lineItems: any) => {
    console.log("Fulfilling order", lineItems);
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
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(event.data.object.id, {
            expand: ["line_items"]
        });
        const lineItems = sessionWithLineItems.line_items;

        // Fulfill the purchase...
        fulfillOrder(lineItems);
    }
    res.status(200).end();
};

export { createCheckoutSession, handleCheckoutCompletion };
