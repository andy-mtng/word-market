const stripe = require("stripe")(process.env.STRIPE_API_KEY);
import { Request, Response } from "express";

const domain = "http://localhost:3000";
const createCheckoutSession = async (req: Request, res: Response) => {
    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                price: "price_1NSsyKAFrg5bGStJFQF7tH9N",
                quantity: 1
            }
        ],
        mode: "payment",
        success_url: `${domain}?success=true`,
        cancel_url: `${domain}?canceled=true`
    });

    res.redirect(303, session.url);
};

export { createCheckoutSession };
